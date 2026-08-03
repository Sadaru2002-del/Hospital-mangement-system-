import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    // ─── Reference Details ───────────────────────────────────────
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Patient reference is required"],
    },
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      // This can be optional if a payment is made for something other than a direct appointment (e.g., pharmacy)
    },

    // ─── Payment Details ─────────────────────────────────────────
    amount: {
      type: Number,
      required: [true, "Payment amount is required"],
      min: [0, "Payment amount cannot be negative"],
    },
    paymentMethod: {
      type: String,
      required: [true, "Payment method is required"],
      enum: {
        values: ["cash", "card", "online", "insurance"],
        message: "{VALUE} is not a valid payment method",
      },
    },
    paymentStatus: {
      type: String,
      required: [true, "Payment status is required"],
      enum: {
        values: ["pending", "completed", "failed", "refunded"],
        message: "{VALUE} is not a valid payment status",
      },
      default: "pending",
    },
    transactionId: {
      type: String,
      trim: true,
      // Useful for online or card payments to store gateway transaction ID
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },

    // ─── Date ────────────────────────────────────────────────────
    paymentDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// ─── Indexes for faster queries ──────────────────────────────────
paymentSchema.index({ patient: 1, paymentDate: -1 });
paymentSchema.index({ paymentStatus: 1 });
paymentSchema.index({ transactionId: 1 });

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
