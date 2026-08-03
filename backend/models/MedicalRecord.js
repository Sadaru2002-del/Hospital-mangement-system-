import mongoose from 'mongoose';

/**
 * Sub-schema for individual lab report parameter results
 */
const labResultSchema = new mongoose.Schema({
  parameter: {
    type: String,
    required: [true, 'Lab parameter name is required'],
    trim: true,
  },
  value: {
    type: String,
    required: [true, 'Parameter value is required'],
    trim: true,
  },
  unit: {
    type: String,
    trim: true,
  },
  referenceRange: {
    type: String,
    trim: true,
  },
  isAbnormal: {
    type: Boolean,
    default: false,
  },
});

/**
 * MedicalRecord Schema
 * Stores clinical history, lab reports, test results, diagnoses, and consultation records.
 */
const medicalRecordSchema = new mongoose.Schema(
  {
    // ─── Patient & Doctor References ───────────────────────────
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: [true, 'Patient reference is required'],
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    doctorName: {
      type: String,
      trim: true,
    },
    department: {
      type: String,
      trim: true,
      default: 'General Medicine',
    },

    // ─── Record Identity & Type ──────────────────────────────────
    title: {
      type: String,
      trim: true,
      default: 'Medical Record',
    },
    recordType: {
      type: String,
      enum: {
        values: ['Lab Report', 'Consultation', 'Prescription', 'Diagnostic Test', 'General History'],
        message: '{VALUE} is not a valid record type',
      },
      default: 'Consultation',
    },

    // ─── Clinical & Diagnostic Details ─────────────────────────
    diagnosis: {
      type: String,
      trim: true,
    },
    symptoms: {
      type: [String],
    },
    prescription: {
      type: String,
      trim: true,
    },
    labResults: [labResultSchema],
    notes: {
      type: String,
      trim: true,
    },
    attachmentUrl: {
      type: String,
      trim: true,
    },

    // ─── Status ──────────────────────────────────────────────────
    status: {
      type: String,
      enum: {
        values: ['Normal', 'Abnormal', 'Pending', 'Confirmed', 'Completed', 'active', 'resolved', 'chronic'],
        message: '{VALUE} is not a valid status',
      },
      default: 'Normal',
    },

    // ─── Record Dates ────────────────────────────────────────────
    date: {
      type: Date,
      default: Date.now,
    },
    dateOfVisit: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// ─── Indexes for faster queries ──────────────────────────────────
medicalRecordSchema.index({ patient: 1, createdAt: -1 });
medicalRecordSchema.index({ doctor: 1, createdAt: -1 });
medicalRecordSchema.index({ status: 1 });

const MedicalRecord = mongoose.model('MedicalRecord', medicalRecordSchema);
export default MedicalRecord;
