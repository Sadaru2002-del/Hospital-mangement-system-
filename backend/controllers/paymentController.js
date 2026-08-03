import Stripe from "stripe";
import Payment from "../models/Payment.js";
import Appointment from "../models/Appointment.js";
import dotenv from "dotenv";

dotenv.config();

// Initialize stripe with secret key from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder");

/**
 * @desc    Create a payment intent
 * @route   POST /api/payments/create-intent
 * @access  Private
 */
export const createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency, appointmentId } = req.body;
    const userId = req.user._id; // Assuming auth middleware adds user to req

    // 1. Validate inputs
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    // 2. Create Stripe Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe expects amount in smallest currency unit (e.g., cents)
      currency: currency || "lkr",
      metadata: {
        userId: userId.toString(),
        appointmentId: appointmentId || "general",
      },
    });

    // 3. Save pending payment to our database
    const payment = new Payment({
      patient: userId,
      appointment: appointmentId || null,
      amount: amount,
      paymentStatus: "pending",
      transactionId: paymentIntent.id,
      paymentMethod: "online",
    });

    await payment.save();

    // 4. Send client secret to frontend
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentId: payment._id,
    });
  } catch (error) {
    console.error("Error in createPaymentIntent:", error);
    res.status(500).json({ message: error.message || "Failed to create payment intent" });
  }
};

/**
 * @desc    Verify payment success
 * @route   POST /api/payments/verify
 * @access  Private
 */
export const verifyPayment = async (req, res) => {
  try {
    const { paymentId, paymentIntentId } = req.body;

    if (!paymentId || !paymentIntentId) {
      return res.status(400).json({ message: "Missing payment information" });
    }

    // Retrieve payment intent from Stripe to confirm status
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === "succeeded") {
      // Update our database
      const payment = await Payment.findById(paymentId);
      if (!payment) {
        return res.status(404).json({ message: "Payment record not found" });
      }

      payment.paymentStatus = "completed";
      await payment.save();

      // Optional: If this payment was for an appointment, you could update appointment status here
      if (payment.appointment) {
        await Appointment.findByIdAndUpdate(payment.appointment, {
          paymentStatus: "completed",
        });
      }

      return res.status(200).json({ success: true, message: "Payment verified successfully", payment });
    } else {
      return res.status(400).json({ success: false, message: "Payment not completed in Stripe", status: paymentIntent.status });
    }
  } catch (error) {
    console.error("Error in verifyPayment:", error);
    res.status(500).json({ message: error.message || "Failed to verify payment" });
  }
};
