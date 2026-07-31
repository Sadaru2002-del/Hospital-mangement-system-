import Prescription from "../models/Prescription.js";
import Patient from "../models/Patient.js";

/**
 * Resolve the current patient's list of matching IDs (their User _id and,
 * if it exists, their linked Patient profile _id). Mirrors the same helper
 * logic used throughout appointmentController.js so a prescription can be
 * looked up whichever id it was actually stored against.
 */
const getPatientIdsForUser = async (userId) => {
  const ids = [userId];
  try {
    const patientProfile = await Patient.findOne({ user: userId });
    if (patientProfile) {
      ids.push(patientProfile._id);
    }
  } catch (err) {
    // Fall back to just the user id
  }
  return ids;
};

/**
 * @desc    View prescriptions with role-based filtering, search, and pagination
 * @route   GET /api/prescriptions
 * @access  Private
 */
export const getPrescriptions = async (req, res) => {
  try {
    const { status, doctor, patientId, search, page = 1, limit = 50 } = req.query;

    let query = {};

    // Role-based access filtering
    if (req.user.role === "patient") {
      const patientIds = await getPatientIdsForUser(req.user._id);
      query.patient = { $in: patientIds };
    } else if (req.user.role === "doctor") {
      query.doctor = { $in: [req.user._id, req.user.name] };
    } else if (patientId) {
      query.patient = patientId;
    }

    if (status) {
      query.status = status;
    }
    if (doctor) {
      query.physicianName = new RegExp(doctor, "i");
    }
    if (search) {
      query.$or = [
        { patientName: new RegExp(search, "i") },
        { physicianName: new RegExp(search, "i") },
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
      .populate("doctor", "name email phone")
      .populate("appointment", "date time department")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    res.json({
      success: true,
      count: prescriptions.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      prescriptions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch prescriptions",
    });
  }
};

/**
 * @desc    View current logged-in patient's prescriptions
 * @route   GET /api/prescriptions/my
 * @access  Private
 */
export const getMyPrescriptions = async (req, res) => {
  try {
    const patientIds = await getPatientIdsForUser(req.user._id);

    const prescriptions = await Prescription.find({ patient: { $in: patientIds } })
      .populate("patient", "name email phone")
      .populate("doctor", "name email phone")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: prescriptions.length,
      prescriptions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch your prescriptions",
    });
  }
};

/**
 * @desc    Get single prescription by ID (the "view e-prescription" endpoint
 *          used to render the printable digital prescription document)
 * @route   GET /api/prescriptions/:id
 * @access  Private
 */
export const getPrescriptionById = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id)
      .populate("patient", "name age gender phone email")
      .populate("doctor", "name email phone")
      .populate("appointment", "date time department");

    if (!prescription) {
      return res.status(404).json({ success: false, message: "Prescription not found" });
    }

    // Verify ownership or staff privileges
    if (req.user.role === "patient") {
      const patientIds = await getPatientIdsForUser(req.user._id);
      const isOwner =
        prescription.patient &&
        patientIds.some((id) => id.toString() === prescription.patient._id.toString());

      if (!isOwner) {
        return res.status(403).json({ success: false, message: "Access denied: Not authorized for this prescription" });
      }
    } else if (req.user.role === "doctor") {
      const isIssuingDoctor =
        prescription.doctor &&
        (prescription.doctor._id?.toString() === req.user._id.toString() || prescription.doctor === req.user.name);

      if (!isIssuingDoctor && !["admin", "receptionist"].includes(req.user.role)) {
        return res.status(403).json({ success: false, message: "Access denied: Not authorized for this prescription" });
      }
    }

    res.json({
      success: true,
      prescription,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch prescription details",
    });
  }
};