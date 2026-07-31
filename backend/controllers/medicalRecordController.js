import MedicalRecord from '../models/MedicalRecord.js';
import Patient from '../models/Patient.js';

/**
 * @desc    Create a new medical record
 * @route   POST /api/medical-records
 * @access  Private (Admin, Doctor, Staff)
 */
export const createMedicalRecord = async (req, res, next) => {
  try {
    const {
      patient,
      doctor,
      doctorName,
      department,
      title,
      recordType,
      date,
      status,
      labResults,
      diagnosis,
      notes,
      attachmentUrl,
    } = req.body;

    // Validate patient existence if patient ID is provided
    if (patient) {
      const existingPatient = await Patient.findById(patient);
      if (!existingPatient) {
        return res.status(404).json({
          success: false,
          message: 'Patient not found with the provided ID',
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: 'Patient ID is required to create a medical record',
      });
    }

    const medicalRecord = await MedicalRecord.create({
      patient,
      doctor: doctor || (req.user ? req.user._id : undefined),
      doctorName: doctorName || (req.user ? req.user.name : 'Attending Physician'),
      department,
      title,
      recordType,
      date: date || Date.now(),
      status,
      labResults: labResults || [],
      diagnosis,
      notes,
      attachmentUrl,
    });

    const populatedRecord = await MedicalRecord.findById(medicalRecord._id)
      .populate('patient', 'name age gender bloodGroup phone')
      .populate('doctor', 'name email role specialization');

    res.status(201).json({
      success: true,
      message: 'Medical record created successfully',
      data: populatedRecord,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all medical records (with optional filtering)
 * @route   GET /api/medical-records
 * @access  Private
 */
export const getMedicalRecords = async (req, res, next) => {
  try {
    const { patientId, recordType, status, department } = req.query;
    const filter = {};

    if (patientId) filter.patient = patientId;
    if (recordType) filter.recordType = recordType;
    if (status) filter.status = status;
    if (department) filter.department = department;

    const records = await MedicalRecord.find(filter)
      .populate('patient', 'name age gender bloodGroup phone')
      .populate('doctor', 'name email role specialization')
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: records.length,
      data: records,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get logged-in patient's medical records
 * @route   GET /api/medical-records/my-records
 * @access  Private (Patient)
 */
export const getMyMedicalRecords = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized',
      });
    }

    // Find the patient record linked to this logged-in user
    let patientObj = await Patient.findOne({ user: req.user._id });

    if (!patientObj) {
      // Fallback: search by patient email/name matching user
      patientObj = await Patient.findOne({ name: req.user.name });
    }

    if (!patientObj) {
      return res.status(200).json({
        success: true,
        count: 0,
        data: [],
        message: 'No patient record profile found for this user account',
      });
    }

    const records = await MedicalRecord.find({ patient: patientObj._id })
      .populate('patient', 'name age gender bloodGroup phone')
      .populate('doctor', 'name email role specialization')
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: records.length,
      data: records,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single medical record by ID
 * @route   GET /api/medical-records/:id
 * @access  Private
 */
export const getMedicalRecordById = async (req, res, next) => {
  try {
    const record = await MedicalRecord.findById(req.params.id)
      .populate('patient', 'name age gender bloodGroup phone address medicalHistory')
      .populate('doctor', 'name email role specialization');

    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Medical record not found',
      });
    }

    res.status(200).json({
      success: true,
      data: record,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update medical record
 * @route   PUT /api/medical-records/:id
 * @access  Private (Admin, Doctor, Staff)
 */
export const updateMedicalRecord = async (req, res, next) => {
  try {
    let record = await MedicalRecord.findById(req.params.id);

    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Medical record not found',
      });
    }

    record = await MedicalRecord.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate('patient', 'name age gender bloodGroup phone')
      .populate('doctor', 'name email role specialization');

    res.status(200).json({
      success: true,
      message: 'Medical record updated successfully',
      data: record,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete medical record
 * @route   DELETE /api/medical-records/:id
 * @access  Private (Admin, Doctor)
 */
export const deleteMedicalRecord = async (req, res, next) => {
  try {
    const record = await MedicalRecord.findById(req.params.id);

    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Medical record not found',
      });
    }

    await record.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Medical record deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
