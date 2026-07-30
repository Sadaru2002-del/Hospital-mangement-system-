import Appointment from "../models/Appointment.js";
import Patient from "../models/Patient.js";
import User from "../models/User.js";

/**
 * @desc    Book a new appointment
 * @route   POST /api/appointments
 * @access  Private (Authenticated users)
 */
export const createAppointment = async (req, res) => {
  try {
    const {
      patientId,
      patientName,
      doctorId,
      doctor,
      department,
      date,
      time,
      appointmentDate,
      appointmentTime,
      reason,
      symptoms,
      type,
      notes,
    } = req.body;

    const finalDate = date || appointmentDate;
    const finalTime = time || appointmentTime;

    if (!finalDate && !appointmentDate) {
      return res.status(400).json({
        success: false,
        message: "Date / Appointment Date is required for booking an appointment.",
      });
    }

    // Determine patient ID / reference
    let targetPatientId = patientId || req.user._id;
    if (!patientId && req.user.role === "patient") {
      try {
        const patientProfile = await Patient.findOne({ user: req.user._id });
        if (patientProfile) {
          targetPatientId = patientProfile._id;
        }
      } catch (err) {
        // Fall back to req.user._id
      }
    }

    // Determine doctor ID / reference
    let targetDoctor = doctorId || doctor || "Dr. Sarah Connor";
    if (doctorId && typeof doctorId === "string" && doctorId.match(/^[0-9a-fA-F]{24}$/)) {
      const docUser = await User.findById(doctorId);
      if (docUser) {
        targetDoctor = docUser._id;
      }
    }

    const appointment = new Appointment({
      patient: targetPatientId,
      patientName: patientName || req.user.name || "Patient",
      doctor: targetDoctor,
      department: department || "Cardiology",
      date: finalDate,
      appointmentDate: finalDate ? new Date(finalDate) : new Date(),
      time: finalTime || "10:00 AM",
      appointmentTime: finalTime || "10:00 AM",
      reason: reason || symptoms || "General Consultation",
      symptoms: symptoms || "",
      type: type || "consultation",
      notes: notes || "",
      bookedBy: req.user._id,
      status: "Scheduled",
    });

    const createdAppointment = await appointment.save();

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      appointment: createdAppointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to book appointment",
    });
  }
};

/**
 * @desc    View appointments with role-based filtering, search, and pagination
 * @route   GET /api/appointments
 * @access  Private
 */
export const getAppointments = async (req, res) => {
  try {
    const { status, doctor, department, date, search, patientId, page = 1, limit = 50 } = req.query;

    let query = {};

    // Role-based access filtering
    if (req.user.role === "patient") {
      let patientIds = [req.user._id];
      try {
        const patientProfile = await Patient.findOne({ user: req.user._id });
        if (patientProfile) {
          patientIds.push(patientProfile._id);
        }
      } catch (err) {}
      query.patient = { $in: patientIds };
    } else if (req.user.role === "doctor") {
      query.doctor = { $in: [req.user._id, req.user.name] };
    } else if (patientId) {
      query.patient = patientId;
    }

    if (status) {
      query.status = status;
    }
    if (department) {
      query.department = new RegExp(department, "i");
    }
    if (doctor) {
      query.doctor = new RegExp(doctor, "i");
    }
    if (date) {
      query.date = date;
    }
    if (search) {
      query.$or = [
        { patientName: new RegExp(search, "i") },
        { doctor: new RegExp(search, "i") },
        { reason: new RegExp(search, "i") },
        { department: new RegExp(search, "i") },
      ];
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, parseInt(limit, 10) || 50);
    const skip = (pageNum - 1) * limitNum;

    const total = await Appointment.countDocuments(query);
    const appointments = await Appointment.find(query)
      .populate("patient", "name email phone age gender bloodGroup")
      .populate("doctor", "name email phone")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    res.json({
      success: true,
      count: appointments.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      appointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch appointments",
    });
  }
};

/**
 * @desc    View current logged-in user's appointments
 * @route   GET /api/appointments/my
 * @access  Private
 */
export const getMyAppointments = async (req, res) => {
  try {
    let patientIds = [req.user._id];
    try {
      const patientProfile = await Patient.findOne({ user: req.user._id });
      if (patientProfile) {
        patientIds.push(patientProfile._id);
      }
    } catch (err) {}

    const appointments = await Appointment.find({ patient: { $in: patientIds } })
      .populate("patient", "name email phone")
      .populate("doctor", "name email phone")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: appointments.length,
      appointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch user appointments",
    });
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
      .populate("patient", "name age gender phone email")
      .populate("doctor", "name email phone");

    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    // Verify ownership or staff privileges
    if (req.user.role === "patient") {
      let isOwner = appointment.patient && appointment.patient._id.toString() === req.user._id.toString();
      if (!isOwner) {
        const patientProfile = await Patient.findOne({ user: req.user._id });
        if (patientProfile && appointment.patient && appointment.patient._id.toString() === patientProfile._id.toString()) {
          isOwner = true;
        }
      }
      if (!isOwner) {
        return res.status(403).json({ success: false, message: "Access denied: Not authorized for this appointment" });
      }
    } else if (req.user.role === "doctor") {
      const isAssignedDoctor =
        appointment.doctor &&
        (appointment.doctor._id?.toString() === req.user._id.toString() || appointment.doctor === req.user.name);
      if (!isAssignedDoctor && !["admin", "receptionist"].includes(req.user.role)) {
        return res.status(403).json({ success: false, message: "Access denied: Not authorized for this appointment" });
      }
    }

    res.json({
      success: true,
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch appointment details",
    });
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
    if (req.user.role === "patient") {
      let isOwner = appointment.patient.toString() === req.user._id.toString();
      if (!isOwner) {
        const patientProfile = await Patient.findOne({ user: req.user._id });
        if (patientProfile && appointment.patient.toString() === patientProfile._id.toString()) {
          isOwner = true;
        }
      }
      if (!isOwner) {
        return res.status(403).json({ success: false, message: "Access denied" });
      }
    }

    const { patientName, doctor, doctorId, department, date, time, appointmentDate, reason, status, notes } = req.body;

    if (patientName !== undefined) appointment.patientName = patientName;
    if (doctorId !== undefined) appointment.doctor = doctorId;
    else if (doctor !== undefined) appointment.doctor = doctor;
    if (department !== undefined) appointment.department = department;
    if (date !== undefined) appointment.date = date;
    if (appointmentDate !== undefined) appointment.appointmentDate = new Date(appointmentDate);
    else if (date !== undefined) appointment.appointmentDate = new Date(date);
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
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update appointment",
    });
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
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    // Authorization check
    if (req.user.role === "patient") {
      let isOwner = appointment.patient.toString() === req.user._id.toString();
      if (!isOwner) {
        const patientProfile = await Patient.findOne({ user: req.user._id });
        if (patientProfile && appointment.patient.toString() === patientProfile._id.toString()) {
          isOwner = true;
        }
      }
      if (!isOwner) {
        return res.status(403).json({ success: false, message: "Access denied to delete this appointment" });
      }
    }

    await appointment.deleteOne();

    res.json({
      success: true,
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete appointment",
    });
  }
};
