import mongoose from 'mongoose';

/**
 * Medication sub-schema
 * Stores medication details inside a digital prescription.
 */
const medicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Medication name is required'],
      trim: true,
    },
    type: {
      type: String,
      trim: true,
      default: 'Oral Tablet',
    },
    dosage: {
      type: String,
      required: [true, 'Dosage is required'],
      trim: true,
    },
    frequency: {
      type: String,
      required: [true, 'Frequency is required'],
      trim: true,
    },
    duration: {
      type: String,
      required: [true, 'Duration is required'],
      trim: true,
    },
    instructions: {
      type: String,
      trim: true,
    },
  },
  { _id: true }
);

/**
 * Prescription Schema (e-Prescription)
 */
const prescriptionSchema = new mongoose.Schema(
  {
    prescriptionId: {
      type: String,
      unique: true,
      index: true,
      trim: true,
    },
    patient: {
      type: mongoose.Schema.Types.Mixed,
      ref: 'Patient',
      required: [true, 'A prescription must belong to a patient'],
    },
    patientName: {
      type: String,
      trim: true,
    },
    patientDob: {
      type: String,
      trim: true,
    },
    doctor: {
      type: mongoose.Schema.Types.Mixed,
      ref: 'User',
    },
    doctorName: {
      type: String,
      trim: true,
    },
    physicianName: {
      type: String,
      trim: true,
    },
    physicianSpecialty: {
      type: String,
      trim: true,
      default: '',
    },
    physicianNpi: {
      type: String,
      trim: true,
      default: '',
    },
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Appointment',
      default: null,
    },
    hospital: {
      name: { type: String, default: 'Medimate Central Hospital' },
      address: { type: String, trim: true, default: '1200 Healthcare Plaza, Colombo' },
      phone: { type: String, trim: true, default: '+94 00876500' },
      email: { type: String, trim: true, default: 'contact@medsys.hospital' },
    },
    medications: {
      type: [medicationSchema],
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length > 0,
        message: 'At least one medication is required',
      },
    },
    instructions: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ['Active', 'active', 'Fulfilled', 'completed', 'Cancelled', 'cancelled', 'Expired'],
      default: 'Active',
    },
    issuedDate: {
      type: Date,
      default: Date.now,
    },
    signedDate: {
      type: Date,
      default: Date.now,
    },
    forwardedToPharmacy: {
      type: Boolean,
      default: false,
    },
    cancelledBy: {
      type: mongoose.Schema.Types.Mixed,
      ref: 'User',
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

// Compound indexes
prescriptionSchema.index({ patient: 1, createdAt: -1 });
prescriptionSchema.index({ doctor: 1, createdAt: -1 });

// Pre-save hook to generate unique RX identifier if not present
prescriptionSchema.pre('save', function (next) {
  if (!this.prescriptionId) {
    const year = new Date().getFullYear();
    const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    this.prescriptionId = `RX-${year}-${randomNum}-${randomHex}`;
  }
  next();
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);
export default Prescription;
