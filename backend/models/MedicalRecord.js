import mongoose from "mongoose";

const medicalRecordSchema = new mongoose.Schema(
  {
    // ─── Patient & Doctor References ───────────────────────────
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Patient reference is required"],
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Doctor reference is required"],
    },

    // ─── Medical Details ─────────────────────────────────────────
    diagnosis: {
      type: String,
      required: [true, "Diagnosis is required"],
      trim: true,
      minlength: [3, "Diagnosis must be at least 3 characters long"],
      maxlength: [200, "Diagnosis cannot exceed 200 characters"],
    },
    symptoms: {
      type: [String],
      validate: {
        validator: function (v) {
          return v && v.length > 0;
        },
        message: "At least one symptom is required",
      },
    },
    prescription: {
      type: String,
      trim: true,
      maxlength: [2000, "Prescription cannot exceed 2000 characters"],
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [1000, "Notes cannot exceed 1000 characters"],
    },

    // ─── Status ──────────────────────────────────────────────────
    status: {
      type: String,
      enum: {
        values: ["active", "resolved", "chronic"],
        message: "{VALUE} is not a valid status",
      },
      default: "active",
    },

    // ─── Record Date ─────────────────────────────────────────────
    dateOfVisit: {
      type: Date,
      default: Date.now,
      required: [true, "Date of visit is required"],
    },
  },
  {
    timestamps: true,
  }
);

// ─── Indexes for faster queries ──────────────────────────────────
medicalRecordSchema.index({ patient: 1, dateOfVisit: -1 });
medicalRecordSchema.index({ doctor: 1, dateOfVisit: -1 });
medicalRecordSchema.index({ status: 1 });

const MedicalRecord = mongoose.model("MedicalRecord", medicalRecordSchema);

export default MedicalRecord;
