import Appointment from "../models/Appointment.js";

/**
 * @desc    Create a new appointment
 * @route   POST /api/appointments
 * @access  Private (Authenticated users)
 */
export const createAppointment = async (req, res) => {
  try {
    const { patientName, doctor, department, date, time, reason, notes } = req.body;

    if (!date || !time) {
      return res.status(400).json({ message: "Date and time are required" });
    }

    const appointment = new Appointment({
      patient: req.user._id,
      patientName: patientName || req.user.name || "Patient",
      doctor: doctor || "Dr. Sarah Connor",
      department: department || "Cardiology",
      date,
      time,
      reason: reason || "",
      notes: notes || "",
    });

    const createdAppointment = await appointment.save();
    res.status(201).json({
      success: true,
      message: "Appointment created successfully",
      appointment: createdAppointment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get appointments for logged-in user or all if staff/admin
 * @route   GET /api/appointments
 * @access  Private
 */
export const getAppointments = async (req, res) => {
  try {
    let appointments;

    // Staff or Admin get all appointments, patient gets only their own
    if (["admin", "doctor", "receptionist"].includes(req.user.role)) {
      appointments = await Appointment.find()
        .populate("patient", "name email phone")
        .sort({ createdAt: -1 });
    } else {
      appointments = await Appointment.find({ patient: req.user._id }).sort({
        createdAt: -1,
      });
    }

    res.json({
      success: true,
      count: appointments.length,
      appointments,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get single appointment by ID
 * @route   GET /api/appointments/:id
 * @access  Private
 */
export const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate(
      "patient",
      "name email phone"
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Verify ownership or staff privileges
    if (
      appointment.patient._id.toString() !== req.user._id.toString() &&
      !["admin", "doctor", "receptionist"].includes(req.user.role)
    ) {
      return res
        .status(403)
        .json({ message: "Access denied: Not authorized for this appointment" });
    }

    res.json({
      success: true,
      appointment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Update appointment details or status
 * @route   PUT /api/appointments/:id
 * @access  Private
 */
export const updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (
      appointment.patient.toString() !== req.user._id.toString() &&
      !["admin", "doctor", "receptionist"].includes(req.user.role)
    ) {
      return res
        .status(403)
        .json({ message: "Access denied: Not authorized to update this appointment" });
    }

    const { patientName, doctor, department, date, time, reason, status, notes } = req.body;

    if (patientName !== undefined) appointment.patientName = patientName;
    if (doctor !== undefined) appointment.doctor = doctor;
    if (department !== undefined) appointment.department = department;
    if (date !== undefined) appointment.date = date;
    if (time !== undefined) appointment.time = time;
    if (reason !== undefined) appointment.reason = reason;
    if (status !== undefined) appointment.status = status;
    if (notes !== undefined) appointment.notes = notes;

    const updatedAppointment = await appointment.save();

    res.json({
      success: true,
      message: "Appointment updated successfully",
      appointment: updatedAppointment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Cancel or delete an appointment
 * @route   DELETE /api/appointments/:id
 * @access  Private
 */
export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (
      appointment.patient.toString() !== req.user._id.toString() &&
      !["admin", "doctor", "receptionist"].includes(req.user.role)
    ) {
      return res
        .status(403)
        .json({ message: "Access denied: Not authorized to delete this appointment" });
    }

    await appointment.deleteOne();

    res.json({
      success: true,
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
