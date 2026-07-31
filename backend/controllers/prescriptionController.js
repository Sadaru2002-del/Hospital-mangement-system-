import Prescription from '../models/Prescription.js';
import Patient from '../models/Patient.js';

/**
 * @desc    Create a new digital prescription
 * @route   POST /api/prescriptions
 * @access  Private (Admin, Doctor, Staff)
 */
export const createPrescription = async (req, res, next) => {
  try {
    const {
      patient,
      doctor,
      doctorName,
      hospital,
      medications,
      instructions,
      status,
      issuedDate,
      signedDate,
      prescriptionId,
    } = req.body;

    // Validate patient existence
    if (!patient) {
      return res.status(400).json({
        success: false,
        message: 'Patient ID is required to issue a prescription',
      });
    }

    const existingPatient = await Patient.findById(patient);
    if (!existingPatient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found with the provided ID',
      });
    }

    const prescription = await Prescription.create({
      prescriptionId,
      patient,
      doctor: doctor || (req.user ? req.user._id : undefined),
      doctorName: doctorName || (req.user ? req.user.name : 'Dr. Attending Physician'),
      hospital,
      medications,
      instructions,
      status,
      issuedDate: issuedDate || Date.now(),
      signedDate: signedDate || Date.now(),
    });

    const populatedPrescription = await Prescription.findById(prescription._id)
      .populate('patient', 'name age gender bloodGroup phone')
      .populate('doctor', 'name email role specialization');

    res.status(201).json({
      success: true,
      message: 'E-Prescription created successfully',
      data: populatedPrescription,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all prescriptions (with optional filtering)
 * @route   GET /api/prescriptions
 * @access  Private
 */
export const getPrescriptions = async (req, res, next) => {
  try {
    const { patientId, doctorId, status, prescriptionId } = req.query;
    const filter = {};

    if (patientId) filter.patient = patientId;
    if (doctorId) filter.doctor = doctorId;
    if (status) filter.status = status;
    if (prescriptionId) filter.prescriptionId = prescriptionId;

    const prescriptions = await Prescription.find(filter)
      .populate('patient', 'name age gender bloodGroup phone')
      .populate('doctor', 'name email role specialization')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: prescriptions.length,
      data: prescriptions,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get logged-in patient's digital prescriptions
 * @route   GET /api/prescriptions/my-prescriptions
 * @access  Private (Patient)
 */
export const getMyPrescriptions = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized',
      });
    }

    // Find patient record linked to logged-in user
    let patientObj = await Patient.findOne({ user: req.user._id });
    if (!patientObj) {
      patientObj = await Patient.findOne({ name: req.user.name });
    }

    if (!patientObj) {
      return res.status(200).json({
        success: true,
        count: 0,
        data: [],
        message: 'No patient record found for this user account',
      });
    }

    const prescriptions = await Prescription.find({ patient: patientObj._id })
      .populate('patient', 'name age gender bloodGroup phone')
      .populate('doctor', 'name email role specialization')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: prescriptions.length,
      data: prescriptions,
    });
  } catch (error) {
    next(error);
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

    // Support looking up by Mongo _id OR unique prescriptionId string
    let prescription;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      prescription = await Prescription.findById(id)
        .populate('patient', 'name age gender bloodGroup phone address')
        .populate('doctor', 'name email role specialization');
    }

    if (!prescription) {
      prescription = await Prescription.findOne({ prescriptionId: id })
        .populate('patient', 'name age gender bloodGroup phone address')
        .populate('doctor', 'name email role specialization');
    }

    if (!prescription) {
      return res.status(404).json({
        success: false,
        message: 'Prescription not found',
      });
    }

    res.status(200).json({
      success: true,
      data: prescription,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update prescription
 * @route   PUT /api/prescriptions/:id
 * @access  Private (Admin, Doctor, Staff)
 */
export const updatePrescription = async (req, res, next) => {
  try {
    let prescription = await Prescription.findById(req.params.id);

    if (!prescription) {
      return res.status(404).json({
        success: false,
        message: 'Prescription not found',
      });
    }

    prescription = await Prescription.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate('patient', 'name age gender bloodGroup phone')
      .populate('doctor', 'name email role specialization');

    res.status(200).json({
      success: true,
      message: 'Prescription updated successfully',
      data: prescription,
    });
  } catch (error) {
    next(error);
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
      return res.status(404).json({
        success: false,
        message: 'Prescription not found',
      });
    }

    prescription.forwardedToPharmacy = true;
    await prescription.save();

    res.status(200).json({
      success: true,
      message: 'Prescription successfully forwarded to in-house pharmacy',
      data: prescription,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete / Cancel prescription
 * @route   DELETE /api/prescriptions/:id
 * @access  Private (Admin, Doctor)
 */
export const deletePrescription = async (req, res, next) => {
  try {
    const prescription = await Prescription.findById(req.params.id);

    if (!prescription) {
      return res.status(404).json({
        success: false,
        message: 'Prescription not found',
      });
    }

    await prescription.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Prescription deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
