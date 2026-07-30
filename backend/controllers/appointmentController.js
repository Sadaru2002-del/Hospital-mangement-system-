import Appointment from "../models/Appointment.js";
import Patient from "../models/Patient.js";
import User from "../models/User.js";

/**
 * @desc    Book a new appointment
 * @route   POST /api/appointments
 * @access  Private
 */
export const createAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, appointmentDate, reason, notes } = req.body;

    // Validate required fields
    if (!doctorId || !appointmentDate || !reason) {
      return res.status(400).json({ 
        success: false, 
        message: "Doctor ID, appointment date, and reason are required." 
      });
    }

    // Determine the patient ID
    let finalPatientId = patientId;

    // If no patientId is provided, assume the logged-in user is a patient booking for themselves
    if (!finalPatientId) {
      if (req.user.role === 'patient') {
        // Find the patient profile linked to this user account
        const patientProfile = await Patient.findOne({ user: req.user._id });
        if (!patientProfile) {
          return res.status(404).json({ 
            success: false, 
            message: "Patient profile not found for this user. Please complete your profile first." 
          });
        }
        finalPatientId = patientProfile._id;
      } else {
        return res.status(400).json({ 
          success: false, 
          message: "Staff must provide a patientId when booking an appointment." 
        });
      }
    }

    // Validate if doctor exists and has 'doctor' role
    const doctor = await User.findById(doctorId);
    if (!doctor || doctor.role !== 'doctor') {
      return res.status(404).json({ 
        success: false, 
        message: "Selected doctor not found or invalid role." 
      });
    }

    // Create the appointment
    const appointment = new Appointment({
      patient: finalPatientId,
      doctor: doctorId,
      appointmentDate,
      reason,
      notes: notes || "",
      status: "Scheduled"
    });

    const createdAppointment = await appointment.save();

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      appointment: createdAppointment,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Get appointments based on user role (View Appointments API)
 * @route   GET /api/appointments
 * @access  Private
 */
export const getAppointments = async (req, res) => {
  try {
    let query = {};

    // Determine query based on role
    if (req.user.role === 'patient') {
      // Find the patient's profile ID first
      const patientProfile = await Patient.findOne({ user: req.user._id });
      if (!patientProfile) {
        return res.status(404).json({ 
          success: false, 
          message: "Patient profile not found. Cannot retrieve appointments." 
        });
      }
      query.patient = patientProfile._id;
    } else if (req.user.role === 'doctor') {
      // Doctor sees only their assigned appointments
      query.doctor = req.user._id;
    }
    // Admin and receptionist can see all appointments (empty query)

    const appointments = await Appointment.find(query)
      .populate("patient", "name age gender phone bloodGroup")
      .populate("doctor", "name email phone")
      .sort({ appointmentDate: 1 }); // Sort by upcoming dates first

    res.json({
      success: true,
      count: appointments.length,
      appointments,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Get single appointment by ID
 * @route   GET /api/appointments/:id
 * @access  Private
 */
export const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate("patient", "name age gender phone")
      .populate("doctor", "name email phone");

    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    // Authorization check
    if (req.user.role === 'patient') {
      const patientProfile = await Patient.findOne({ user: req.user._id });
      if (!patientProfile || appointment.patient._id.toString() !== patientProfile._id.toString()) {
        return res.status(403).json({ success: false, message: "Access denied: Not authorized for this appointment" });
      }
    } else if (req.user.role === 'doctor') {
      if (appointment.doctor._id.toString() !== req.user._id.toString()) {
        return res.status(403).json({ success: false, message: "Access denied: Not authorized for this appointment" });
      }
    }

    res.json({
      success: true,
      appointment,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    // Authorization check
    if (req.user.role === 'patient') {
      const patientProfile = await Patient.findOne({ user: req.user._id });
      if (!patientProfile || appointment.patient.toString() !== patientProfile._id.toString()) {
        return res.status(403).json({ success: false, message: "Access denied" });
      }
      // Patients should only be allowed to update reason, notes or cancel (status)
      if (req.body.status && !['Scheduled', 'Cancelled'].includes(req.body.status)) {
        return res.status(400).json({ success: false, message: "Invalid status update" });
      }
    } else if (req.user.role === 'doctor' && appointment.doctor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const { doctorId, appointmentDate, reason, status, notes } = req.body;

    if (doctorId !== undefined) appointment.doctor = doctorId;
    if (appointmentDate !== undefined) appointment.appointmentDate = appointmentDate;
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
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Delete an appointment
 * @route   DELETE /api/appointments/:id
 * @access  Private
 */
export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    // Only Admin or Receptionist should delete completely. Patients can only cancel.
    if (!["admin", "receptionist"].includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: "Access denied: Only admins or receptionists can delete appointments. Consider updating the status to 'Cancelled'." 
      });
    }

    await appointment.deleteOne();

    res.json({
      success: true,
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
