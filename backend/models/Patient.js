import mongoose from 'mongoose';

/**
 * Patient Schema
 * Represents a patient record in the hospital management system.
 * It stores personal details, contact info, and medical history.
 */
const patientSchema = new mongoose.Schema(
  {
    // Link to the user authentication account (optional)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false, // A patient might be registered without creating an online account yet
    },

    // Basic personal details
    name: {
      type: String,
      required: [true, 'Patient name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    age: {
      type: Number,
      required: [true, 'Patient age is required'],
      min: [0, 'Age cannot be negative'],
      max: [120, 'Please enter a valid age'],
    },
    gender: {
      type: String,
      required: [true, 'Gender is required'],
      enum: {
        values: ['Male', 'Female', 'Other'],
        message: '{VALUE} is not a valid gender option',
      },
    },

    // Medical details
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message: 'Please provide a valid blood group',
      },
    },

    // Contact information
    address: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Contact number is required'],
      validate: {
        validator: function (v) {
          // Simple validation for phone numbers
          return !v || /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },

    // Detailed medical history array
    medicalHistory: [
      {
        condition: {
          type: String,
          required: [true, 'Medical condition is required'],
        },
        diagnosedDate: {
          type: Date,
        },
        treatment: {
          type: String,
        },
      },
    ],
  },
  {
    // Automatically manage createdAt and updatedAt timestamps
    timestamps: true,
  }
);

// Compile and export the model
const Patient = mongoose.model('Patient', patientSchema);
export default Patient;
