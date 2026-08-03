import mongoose from "mongoose";

const billingItemSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["Consultation", "Lab Test", "Pharmacy", "Hospital Charge", "Procedure", "Other"],
    default: "Consultation",
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
});

const paymentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: false,
    },
    prescription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Prescription",
      required: false,
    },
    transactionId: {
      type: String,
      unique: true,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: "LKR",
    },
    paymentMethod: {
      type: String,
      enum: ["card", "insurance", "cash", "bank_transfer"],
      default: "card",
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "completed",
    },
    cardDetails: {
      cardHolderName: String,
      lastFourDigits: String,
      brand: String,
    },
    insuranceDetails: {
      provider: String,
      policyNumber: String,
      claimId: String,
    },
    billingItems: [billingItemSchema],
    notes: {
      type: String,
    },
    paidAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
