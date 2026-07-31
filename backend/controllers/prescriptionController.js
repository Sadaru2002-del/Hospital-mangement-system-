import Prescription from "../models/Prescription.js";
import Patient from "../models/Patient.js";

/**
 * Resolve the current patient's list of matching IDs (User _id and linked Patient _id).
 */
const getPatientIdsForUser = async (userId) => {
  const ids = [userId];
  try {
    const patientProfile = await Patient.findOne({ user: userId });
    if (patientProfile) {
      ids.push(patientProfile._id);
    }
  } catch (err) {
    // Fall back to user id
  }
  return ids;
};

/**
 * @desc    Create a new digital prescription
 * @route   POST /api/prescriptions
 * @access  Private (Admin, Doctor, Staff)
 */
export const createPrescription = async (req, res, next) => {
  try {
    const {
      patient,
      patientName,
      patientDob,
      doctor,
      doctorName,
      physicianName,
      physicianSpecialty,
      physicianNpi,
      hospital,
      medications,
      instructions,
      status,
      issuedDate,
      signedDate,
      prescriptionId,
      appointment,
    } = req.body;

    if (!patient && !patientName) {
      return res.status(400).json({
        success: false,
        message: "Patient reference or name is required to issue a prescription",
      });
    }

    const prescription = await Prescription.create({
      prescriptionId,
      patient: patient || req.user._id,
      patientName: patientName || req.user.name || "Patient",
      patientDob,
      doctor: doctor || (req.user ? req.user._id : undefined),
      doctorName: doctorName || physicianName || (req.user ? req.user.name : "Dr. Attending Physician"),
      physicianName: physicianName || doctorName || (req.user ? req.user.name : "Dr. Attending Physician"),
      physicianSpecialty,
      physicianNpi,
      hospital,
      medications: medications || [],
      instructions: instructions || [],
      status: status || "Active",
      issuedDate: issuedDate || Date.now(),
      signedDate: signedDate || Date.now(),
      appointment,
    });

    const populatedPrescription = await Prescription.findById(prescription._id)
      .populate("patient", "name age gender bloodGroup phone email")
      .populate("doctor", "name email role specialization");

    res.status(201).json({
      success: true,
      message: "E-Prescription created successfully",
      prescription: populatedPrescription,
      data: populatedPrescription,
    });
  } catch (error) {
    next ? next(error) : res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    View prescriptions with role-based filtering, search, and pagination
 * @route   GET /api/prescriptions
 * @access  Private
 */
export const getPrescriptions = async (req, res, next) => {
  try {
    const { status, doctor, patientId, prescriptionId, search, page = 1, limit = 50 } = req.query;

    let query = {};

    // Role-based access filtering
    if (req.user.role === "patient") {
      const patientIds = await getPatientIdsForUser(req.user._id);
      query.patient = { $in: patientIds };
    } else if (req.user.role === "doctor") {
      query.$or = [{ doctor: req.user._id }, { doctorName: new RegExp(req.user.name, "i") }, { physicianName: new RegExp(req.user.name, "i") }];
    } else if (patientId) {
      query.patient = patientId;
    }

    if (status) {
      query.status = status;
    }
    if (prescriptionId) {
      query.prescriptionId = prescriptionId;
    }
    if (doctor) {
      query.$or = [{ physicianName: new RegExp(doctor, "i") }, { doctorName: new RegExp(doctor, "i") }];
    }
    if (search) {
      query.$or = [
        { patientName: new RegExp(search, "i") },
        { physicianName: new RegExp(search, "i") },
        { doctorName: new RegExp(search, "i") },
        { prescriptionId: new RegExp(search, "i") },
        { "medications.name": new RegExp(search, "i") },
      ];
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, parseInt(limit, 10) || 50);
    const skip = (pageNum - 1) * limitNum;

    const total = await Prescription.countDocuments(query);
    const prescriptions = await Prescription.find(query)
      .populate("patient", "name email phone age gender bloodGroup")
      .populate("doctor", "name email phone role specialization")
      .populate("appointment", "date time department")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    res.status(200).json({
      success: true,
      count: prescriptions.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      prescriptions,
      data: prescriptions,
    });
  } catch (error) {
    next ? next(error) : res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    View current logged-in patient's prescriptions
 * @route   GET /api/prescriptions/my or GET /api/prescriptions/my-prescriptions
 * @access  Private (Patient)
 */
export const getMyPrescriptions = async (req, res, next) => {
  try {
    const patientIds = await getPatientIdsForUser(req.user._id);

    const prescriptions = await Prescription.find({ patient: { $in: patientIds } })
      .populate("patient", "name email phone age gender bloodGroup")
      .populate("doctor", "name email phone role specialization")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: prescriptions.length,
      prescriptions,
      data: prescriptions,
    });
  } catch (error) {
    next ? next(error) : res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Get single prescription by ID or prescriptionId
 * @route   GET /api/prescriptions/:id
 * @access  Private
 */
export const getPrescriptionById = async (req, res, next) => {
  try {
    const { id } = req.params;

    let prescription;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      prescription = await Prescription.findById(id)
        .populate("patient", "name age gender bloodGroup phone address email")
        .populate("doctor", "name email phone role specialization")
        .populate("appointment", "date time department");
    }

    if (!prescription) {
      prescription = await Prescription.findOne({ prescriptionId: id })
        .populate("patient", "name age gender bloodGroup phone address email")
        .populate("doctor", "name email phone role specialization")
        .populate("appointment", "date time department");
    }

    if (!prescription) {
      return res.status(404).json({ success: false, message: "Prescription not found" });
    }

    // Role verification
    if (req.user.role === "patient") {
      const patientIds = await getPatientIdsForUser(req.user._id);
      const isOwner =
        prescription.patient &&
        patientIds.some((pId) => pId.toString() === (prescription.patient._id || prescription.patient).toString());

      if (!isOwner) {
        return res.status(403).json({ success: false, message: "Access denied: Not authorized for this prescription" });
      }
    }

    res.status(200).json({
      success: true,
      prescription,
      data: prescription,
    });
  } catch (error) {
    next ? next(error) : res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Update prescription details or status
 * @route   PUT /api/prescriptions/:id
 * @access  Private (Admin, Doctor, Staff)
 */
export const updatePrescription = async (req, res, next) => {
  try {
    let prescription = await Prescription.findById(req.params.id);
    if (!prescription) {
      prescription = await Prescription.findOne({ prescriptionId: req.params.id });
    }

    if (!prescription) {
      return res.status(404).json({ success: false, message: "Prescription not found" });
    }

    prescription = await Prescription.findByIdAndUpdate(prescription._id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate("patient", "name age gender bloodGroup phone")
      .populate("doctor", "name email role specialization");

    res.status(200).json({
      success: true,
      message: "Prescription updated successfully",
      prescription,
      data: prescription,
    });
  } catch (error) {
    next ? next(error) : res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Forward prescription to in-house pharmacy
 * @route   PUT /api/prescriptions/:id/forward
 * @access  Private
 */
export const forwardToPharmacy = async (req, res, next) => {
  try {
    let prescription = await Prescription.findById(req.params.id);
    if (!prescription) {
      prescription = await Prescription.findOne({ prescriptionId: req.params.id });
    }

    if (!prescription) {
      return res.status(404).json({ success: false, message: "Prescription not found" });
    }

    prescription.forwardedToPharmacy = true;
    await prescription.save();

    res.status(200).json({
      success: true,
      message: "Prescription successfully forwarded to in-house pharmacy",
      prescription,
      data: prescription,
    });
  } catch (error) {
    next ? next(error) : res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Delete or cancel a prescription
 * @route   DELETE /api/prescriptions/:id
 * @access  Private (Admin, Doctor)
 */
export const deletePrescription = async (req, res, next) => {
  try {
    let prescription = await Prescription.findById(req.params.id);
    if (!prescription) {
      prescription = await Prescription.findOne({ prescriptionId: req.params.id });
    }

    if (!prescription) {
      return res.status(404).json({ success: false, message: "Prescription not found" });
    }

    await prescription.deleteOne();

    res.status(200).json({
      success: true,
      message: "Prescription deleted successfully",
    });
  } catch (error) {
    next ? next(error) : res.status(500).json({ success: false, message: error.message });
  }
};
