import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
      maxlength: [50, 'Name cannot be more than 50 characters']
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, 'Please provide a valid email']
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [8, 'Password must be at least 8 characters'],
      select: false, // Prevents password from being returned in queries by default
    },
    role: {
      type: String,
      required: true,
      enum: {
        values: ['admin', 'doctor', 'receptionist', 'patient'],
        message: '{VALUE} is not a supported role'
      },
      default: 'patient',
    },
    phone: {
      type: String,
      validate: {
        validator: function(v) {
          // simple regex for validating basic phone numbers (can be adjusted based on region)
          return !v || /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
      }
    },
  },
  {
    timestamps: true,
  }
);

// Password Hashing middleware (bcrypt)
userSchema.pre('save', async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();
  
  try {
    // Generate salt with 10 rounds
    const salt = await bcrypt.genSalt(10);
    // Hash password with the salt
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords during authentication
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
