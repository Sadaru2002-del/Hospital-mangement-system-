import mongoose from 'mongoose';

/**
 * Appointment Schema
 * Manages the scheduling of patient visits with doctors.
 */
const appointmentSchema = new mongoose.Schema(
  {
    // Reference to the patient (ObjectId ref to User/Patient or String)
    patient: {
      type: mongoose.Schema.Types.Mixed,
      ref: 'User',
      required: [true, 'An appointment must belong to a patient'],
    },
    patientName: {
      type: String,
      trim: true,
    },

    // Reference to the doctor handling the appointment (ObjectId ref to User or String)
    doctor: {
      type: mongoose.Schema.Types.Mixed,
      ref: 'User',
      required: [true, 'An appointment must be assigned to a doctor'],
    },

    department: {
      type: String,
      trim: true,
      default: 'Cardiology',
    },

    // Scheduling details
    date: {
      type: String,
      trim: true,
    },
    appointmentDate: {
      type: Date,
      default: Date.now,
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
      default: 'consultation',
    },

    // Reason for the visit
    reason: {
      type: String,
      trim: true,
      default: '',
    },
    symptoms: {
      type: String,
      trim: true,
    },

    // Current status of the appointment
    status: {
      type: String,
      enum: ['Scheduled', 'Completed', 'Cancelled', 'pending', 'confirmed', 'no-show', 'cancelled'],
      default: 'Scheduled',
    },

    // Additional notes added by doctor, staff, or patient
    notes: {
      type: String,
      trim: true,
      default: '',
    },

    // Cancellation details
    cancelledBy: {
      type: mongoose.Schema.Types.Mixed,
      ref: 'User',
      default: null,
    },
    cancellationReason: {
      type: String,
      trim: true,
    },
    bookedBy: {
      type: mongoose.Schema.Types.Mixed,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

appointmentSchema.index({ patient: 1, createdAt: -1 });

const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;
