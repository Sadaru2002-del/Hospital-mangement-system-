import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    // ─── Patient & Doctor References ───────────────────────────
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Patient is required"],
    },

    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Doctor is required"],
    },

    // ─── Appointment Details ────────────────────────────────────
    appointmentDate: {
      type: Date,
      required: [true, "Appointment date is required"],
    },

    appointmentTime: {
      type: String,
      required: [true, "Appointment time is required"],
      trim: true,
      // e.g. "09:30 AM", "02:00 PM"
    },

    type: {
      type: String,
      required: [true, "Appointment type is required"],
      enum: {
        values: ["consultation", "follow-up", "emergency", "routine-checkup", "lab-test", "surgery"],
        message: "{VALUE} is not a valid appointment type",
      },
      default: "consultation",
    },

    // ─── Status ─────────────────────────────────────────────────
    status: {
      type: String,
      enum: {
        values: ["pending", "confirmed", "completed", "cancelled", "no-show"],
        message: "{VALUE} is not a valid status",
      },
      default: "pending",
    },

    // ─── Medical Notes ───────────────────────────────────────────
    symptoms: {
      type: String,
      trim: true,
      maxlength: [500, "Symptoms cannot exceed 500 characters"],
    },

    notes: {
      type: String,
      trim: true,
      maxlength: [1000, "Notes cannot exceed 1000 characters"],
    },

    prescription: {
      type: String,
      trim: true,
      maxlength: [2000, "Prescription cannot exceed 2000 characters"],
    },

    // ─── Cancellation ───────────────────────────────────────────
    cancelledBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    cancellationReason: {
      type: String,
      trim: true,
      maxlength: [300, "Cancellation reason cannot exceed 300 characters"],
    },

    // ─── Booked By (receptionist / patient / admin) ─────────────
    bookedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "BookedBy is required"],
    },
  },
  {
    timestamps: true, // createdAt & updatedAt auto-generated
  }
);

// ─── Indexes for faster queries ──────────────────────────────────
appointmentSchema.index({ patient: 1, appointmentDate: -1 });
appointmentSchema.index({ doctor: 1, appointmentDate: 1 });
appointmentSchema.index({ status: 1 });
appointmentSchema.index({ appointmentDate: 1 });

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
