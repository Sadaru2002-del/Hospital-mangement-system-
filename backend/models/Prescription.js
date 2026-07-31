import mongoose from 'mongoose';

/**
 * Medication Item Sub-Schema
 */
const medicationItemSchema = new mongoose.Schema({
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
});

/**
 * Prescription Schema
 * Represents an electronic prescription issued by a physician to a patient.
 */
const prescriptionSchema = new mongoose.Schema(
  {
    prescriptionId: {
      type: String,
      unique: true,
      trim: true,
    },
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
    hospital: {
      name: {
        type: String,
        default: 'Medimate Central Hospital',
      },
      address: {
        type: String,
        default: '1200 Healthcare Plaza, Colombo',
      },
      phone: {
        type: String,
        default: '+94 00876500',
      },
      email: {
        type: String,
        default: 'contact@medsys.hospital',
      },
    },
    medications: {
      type: [medicationItemSchema],
      validate: [
        function (val) {
          return val.length > 0;
        },
        'At least one prescribed medication is required',
      ],
    },
    instructions: [
      {
        type: String,
        trim: true,
      },
    ],
    status: {
      type: String,
      enum: {
        values: ['Active', 'Fulfilled', 'Cancelled', 'Expired'],
        message: '{VALUE} is not a valid prescription status',
      },
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
  },
  {
    timestamps: true,
  }
);

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
