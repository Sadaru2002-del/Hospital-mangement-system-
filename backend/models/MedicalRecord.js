import mongoose from 'mongoose';

/**
 * MedicalRecord Schema
 * Stores clinical history, lab reports, test results, and consultation records.
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

const medicalRecordSchema = new mongoose.Schema(
  {
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
    title: {
      type: String,
      required: [true, 'Record title is required'],
      trim: true,
    },
    recordType: {
      type: String,
      required: [true, 'Record type is required'],
      enum: {
        values: ['Lab Report', 'Consultation', 'Prescription', 'Diagnostic Test', 'General History'],
        message: '{VALUE} is not a valid record type',
      },
      default: 'Lab Report',
    },
    date: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: {
        values: ['Normal', 'Abnormal', 'Pending', 'Confirmed', 'Completed'],
        message: '{VALUE} is not a valid status option',
      },
      default: 'Normal',
    },
    labResults: [labResultSchema],
    diagnosis: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
    attachmentUrl: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const MedicalRecord = mongoose.model('MedicalRecord', medicalRecordSchema);
export default MedicalRecord;
