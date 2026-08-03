import Patient from "../models/Patient.js";

// @desc    Get all patients (with their medical history)
// @route   GET /api/patients
// @access  Private/Admin or Doctor
export const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find({}).populate("user", "name email role");
    res.status(200).json({
      success: true,
      count: patients.length,
      data: patients,
    });
  } catch (error) {
    console.error("Get all patients error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get a single patient's details and medical history by ID
// @route   GET /api/patients/:id
// @access  Private
export const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).populate("user", "name email role");

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json({
      success: true,
      data: patient,
    });
  } catch (error) {
    console.error("Get patient error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get logged in user's patient profile and medical history
// @route   GET /api/patients/me
// @access  Private (Patient only)
export const getMyPatientProfile = async (req, res) => {
  try {
    const patient = await Patient.findOne({ user: req.user._id }).populate("user", "name email");

    if (!patient) {
      return res.status(404).json({ message: "Patient profile not found for this user" });
    }

    res.status(200).json({
      success: true,
      data: patient,
    });
  } catch (error) {
    console.error("Get my profile error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Add medical history to a patient
// @route   POST /api/patients/:id/medical-history
// @access  Private/Admin or Doctor
export const addMedicalHistory = async (req, res) => {
  const { condition, diagnosedDate, treatment } = req.body;

  try {
    if (!condition) {
      return res.status(400).json({ message: "Condition is required" });
    }

    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const newMedicalHistory = {
      condition,
      diagnosedDate,
      treatment,
    };

    patient.medicalHistory.push(newMedicalHistory);
    await patient.save();

    res.status(201).json({
      success: true,
      message: "Medical history added successfully",
      data: patient.medicalHistory,
    });
  } catch (error) {
    console.error("Add medical history error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get medical history of a patient
// @route   GET /api/patients/:id/medical-history
// @access  Private
export const getPatientMedicalHistory = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json({
      success: true,
      count: patient.medicalHistory.length,
      data: patient.medicalHistory,
    });
  } catch (error) {
    console.error("Get medical history error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Create a new patient record (useful if a patient registers or admin creates it)
// @route   POST /api/patients
// @access  Private
export const createPatient = async (req, res) => {
  const { name, age, gender, bloodGroup, address, phone, user } = req.body;

  try {
    const patientExists = await Patient.findOne({ phone });
    if (patientExists) {
       return res.status(400).json({ message: "Patient with this phone already exists" });
    }
    
    const newPatient = await Patient.create({
      user: user || req.user._id,
      name,
      age,
      gender,
      bloodGroup,
      address,
      phone,
    });

    res.status(201).json({
      success: true,
      message: "Patient created successfully",
      data: newPatient,
    });
  } catch (error) {
    console.error("Create patient error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
