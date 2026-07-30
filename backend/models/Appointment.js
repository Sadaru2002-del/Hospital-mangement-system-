import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    // Patient reference & info
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Patient is required"],
    },
    patientName: {
      type: String,
      trim: true,
    },

    // Doctor (supports ObjectId reference or String doctor name)
    doctor: {
      type: mongoose.Schema.Types.Mixed,
      required: [true, "Doctor is required"],
      default: "Dr. Sarah Connor",
    },

    department: {
      type: String,
      trim: true,
      default: "Cardiology",
    },

    // Appointment Date & Time
    date: {
      type: String,
      trim: true,
    },
    appointmentDate: {
      type: Date,
    },
    time: {
      type: String,
      trim: true,
    },
    appointmentTime: {
      type: String,
      trim: true,
    },

    type: {
      type: String,
      default: "consultation",
    },

    // Status
    status: {
      type: String,
      enum: ["Scheduled", "Completed", "Cancelled", "pending", "confirmed", "no-show"],
      default: "Scheduled",
    },

    // Notes & Reason
    reason: {
      type: String,
      trim: true,
      default: "",
    },
    symptoms: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
      default: "",
    },
    prescription: {
      type: String,
      trim: true,
    },

    // Cancellation info
    cancelledBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    cancellationReason: {
      type: String,
      trim: true,
    },

    // Booked By reference
    bookedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

appointmentSchema.index({ patient: 1, createdAt: -1 });

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
