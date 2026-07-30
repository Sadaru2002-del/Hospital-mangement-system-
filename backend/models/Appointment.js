import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Patient user ID is required"],
    },
    patientName: {
      type: String,
      required: [true, "Patient name is required"],
      trim: true,
    },
    doctor: {
      type: String,
      trim: true,
      default: "Dr. Sarah Connor",
    },
    department: {
      type: String,
      trim: true,
      default: "Cardiology",
    },
    date: {
      type: String,
      required: [true, "Appointment date is required"],
    },
    time: {
      type: String,
      required: [true, "Appointment time is required"],
    },
    reason: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: ["Scheduled", "Completed", "Cancelled"],
      default: "Scheduled",
    },
    notes: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
