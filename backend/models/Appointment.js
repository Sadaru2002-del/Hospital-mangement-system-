import mongoose from 'mongoose';

/**
 * Appointment Schema
 * Manages the scheduling of patient visits with doctors.
 */
const appointmentSchema = new mongoose.Schema(
  {
    // Reference to the patient booking the appointment
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: [true, 'An appointment must belong to a patient'],
    },

    // Reference to the doctor handling the appointment
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Refers to a User document where role === 'doctor'
      required: [true, 'An appointment must be assigned to a doctor'],
    },

    // Scheduling details
    appointmentDate: {
      type: Date,
      required: [true, 'Please specify the appointment date and time'],
      validate: {
        validator: function (value) {
          // Ensure appointment date is not in the past
          // (Adding a slight buffer in case of time sync issues)
          return value >= new Date(Date.now() - 5 * 60 * 1000);
        },
        message: 'Appointment date cannot be in the past',
      },
    },
    
    // Patient's reason for the visit
    reason: {
      type: String,
      required: [true, 'Please provide a reason for the appointment'],
      trim: true,
      maxlength: [500, 'Reason cannot exceed 500 characters'],
    },

    // Current status of the appointment
    status: {
      type: String,
      enum: {
        values: ['Scheduled', 'Completed', 'Cancelled'],
        message: '{VALUE} is not a valid status',
      },
      default: 'Scheduled',
    },

    // Additional notes added by the doctor or receptionist
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    // Automatically manage createdAt and updatedAt timestamps
    timestamps: true,
  }
);

// Compile and export the model
const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;
