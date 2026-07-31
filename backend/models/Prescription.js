import mongoose from "mongoose";
import generatePrescriptionId from "../utils/generatePrescriptionId.js";

/**
 * Medication sub-schema
 * Each prescription can contain one or more prescribed medications.
 */
const medicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Medicine name is required"],
      trim: true,
    },
    // e.g. "Oral Capsule", "Oral Tablet", "Non-drowsy Antihistamine"
    type: {
      type: String,
      trim: true,
      default: "",
    },
    dosage: {
      type: String,
      required: [true, "Dosage is required"],
      trim: true,
    },
    frequency: {
      type: String,
      required: [true, "Frequency is required"],
      trim: true,
    },
    duration: {
      type: String,
      required: [true, "Duration is required"],
      trim: true,
    },
  },
  { _id: true }
);

/**
 * Prescription Schema (e-Prescription)
 * Represents a digitally issued prescription linking a doctor, a patient,
 * and (optionally) the appointment it was issued during.
 */
const prescriptionSchema = new mongoose.Schema(
  {
    // Human-readable identifier printed on the prescription document
    prescriptionId: {
      type: String,
      unique: true,
      index: true,
    },

    // Reference to the patient (ObjectId ref to User/Patient, kept Mixed
    // to match the same flexible pattern used by the Appointment model)
    patient: {
      type: mongoose.Schema.Types.Mixed,
      ref: "User",
      required: [true, "A prescription must belong to a patient"],
    },
    patientName: {
      type: String,
      required: [true, "Patient name is required"],
      trim: true,
    },
    // Display string, e.g. "May 14, 1982 (41y)"
    patientDob: {
      type: String,
      trim: true,
    },

    // Reference to the doctor who issued the prescription
    doctor: {
      type: mongoose.Schema.Types.Mixed,
      ref: "User",
      required: [true, "A prescription must be issued by a doctor"],
    },
    physicianName: {
      type: String,
      required: [true, "Physician name is required"],
      trim: true,
    },
    physicianSpecialty: {
      type: String,
      trim: true,
      default: "",
    },
    // National Provider Identifier
    physicianNpi: {
      type: String,
      trim: true,
      default: "",
    },

    // Optional link back to the appointment this prescription was issued during
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      default: null,
    },

    // Snapshot of the issuing hospital/clinic details at time of issuance
    hospital: {
      name: { type: String, default: "Medimate Central Hospital" },
      address: { type: String, trim: true, default: "" },
      phone: { type: String, trim: true, default: "" },
      email: { type: String, trim: true, default: "" },
    },

    medications: {
      type: [medicationSchema],
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length > 0,
        message: "At least one medication is required",
      },
    },

    // Free-form doctor's instructions/notes shown on the prescription
    instructions: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      enum: ["active", "completed", "cancelled"],
      default: "active",
    },

    issuedDate: {
      type: Date,
      default: Date.now,
    },
    signedDate: {
      type: Date,
      default: Date.now,
    },

    // Cancellation details (mirrors Appointment's cancellation pattern)
    cancelledBy: {
      type: mongoose.Schema.Types.Mixed,
      ref: "User",
      default: null,
    },
    cancellationReason: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

prescriptionSchema.index({ patient: 1, createdAt: -1 });
prescriptionSchema.index({ doctor: 1, createdAt: -1 });

// Auto-generate a human-readable prescriptionId before first save
prescriptionSchema.pre("validate", function (next) {
  if (!this.prescriptionId) {
    this.prescriptionId = generatePrescriptionId();
  }
  next();
});

const Prescription = mongoose.model("Prescription", prescriptionSchema);
export default Prescription;