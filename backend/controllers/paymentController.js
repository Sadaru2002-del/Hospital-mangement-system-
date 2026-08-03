import Stripe from "stripe";
import Payment from "../models/Payment.js";
import Appointment from "../models/Appointment.js";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

// Initialize stripe with secret key from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder");

/**
 * @desc    Process / Create a new payment directly
 * @route   POST /api/payments
 * @access  Private (Patient, Staff, Admin)
 */
export const processPayment = async (req, res) => {
  try {
    const {
      patientId,
      appointmentId,
      prescriptionId,
      amount,
      currency = "LKR",
      paymentMethod = "card",
      cardDetails,
      insuranceDetails,
      billingItems,
      notes,
    } = req.body;

    const targetPatientId = req.user.role === "patient" ? req.user._id : (patientId || req.user._id);

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Payment amount must be greater than zero",
      });
    }

    // Generate unique transaction ID
    const randomHex = crypto.randomBytes(4).toString("hex").toUpperCase();
    const transactionId = `TXN-${Date.now()}-${randomHex}`;

    let sanitizedCardDetails;
    if (paymentMethod === "card" && cardDetails) {
      const cardNumberClean = (cardDetails.cardNumber || "").replace(/\s+/g, "");
      const lastFourDigits = cardNumberClean.slice(-4) || "0000";
      sanitizedCardDetails = {
        cardHolderName: cardDetails.cardHolderName || cardDetails.cardName || "Valued Cardholder",
        lastFourDigits,
        brand: cardDetails.brand || "VISA",
      };
    }

    const items = billingItems && billingItems.length > 0
      ? billingItems
      : [{ description: "Medical Consultation & Care Services", category: "Consultation", amount }];

    const newPayment = await Payment.create({
      patient: targetPatientId,
      appointment: appointmentId || null,
      prescription: prescriptionId || null,
      transactionId,
      amount,
      currency,
      paymentMethod,
      status: "completed",
      paymentStatus: "completed",
      cardDetails: sanitizedCardDetails,
      insuranceDetails: paymentMethod === "insurance" ? insuranceDetails : undefined,
      billingItems: items,
      notes,
      paidAt: new Date(),
    });

    if (appointmentId) {
      await Appointment.findByIdAndUpdate(appointmentId, {
        isPaid: true,
        paymentStatus: "Paid",
      }).catch((err) => console.log("Appointment payment status sync skipped:", err.message));
    }

    const populatedPayment = await Payment.findById(newPayment._id)
      .populate("patient", "name email phone")
      .populate("appointment", "date doctor specialization");

    res.status(201).json({
      success: true,
      message: "Payment processed successfully",
      data: populatedPayment,
    });
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to process payment",
      error: error.message,
    });
  }
};

/**
 * @desc    Create a Stripe payment intent
 * @route   POST /api/payments/create-intent
 * @access  Private
 */
export const createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency, appointmentId } = req.body;
    const userId = req.user._id;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: currency || "lkr",
      metadata: {
        userId: userId.toString(),
        appointmentId: appointmentId || "general",
      },
    });

    const payment = new Payment({
      patient: userId,
      appointment: appointmentId || null,
      amount: amount,
      status: "pending",
      paymentStatus: "pending",
      transactionId: paymentIntent.id,
      paymentMethod: "online",
    });

    await payment.save();

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
 * @desc    Verify Stripe payment success
 * @route   POST /api/payments/verify
 * @access  Private
 */
export const verifyPayment = async (req, res) => {
  try {
    const { paymentId, paymentIntentId } = req.body;

    if (!paymentId || !paymentIntentId) {
      return res.status(400).json({ message: "Missing payment information" });
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === "succeeded") {
      const payment = await Payment.findById(paymentId);
      if (!payment) {
        return res.status(404).json({ message: "Payment record not found" });
      }

      payment.status = "completed";
      payment.paymentStatus = "completed";
      await payment.save();

      if (payment.appointment) {
        await Appointment.findByIdAndUpdate(payment.appointment, {
          isPaid: true,
          paymentStatus: "Paid",
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

/**
 * @desc    Get logged-in user's payment records
 * @route   GET /api/payments/my
 * @access  Private (Patient)
 */
export const getMyPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ patient: req.user._id })
      .populate("appointment", "date doctor specialization")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: payments.length,
      data: payments,
    });
  } catch (error) {
    console.error("Error fetching my payments:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve payments",
      error: error.message,
    });
  }
};

/**
 * @desc    Get patient billing summary
 * @route   GET /api/payments/summary
 * @access  Private (Patient, Staff, Admin)
 */
export const getBillingSummary = async (req, res) => {
  try {
    const targetPatientId = req.user.role === "patient" ? req.user._id : (req.query.patientId || req.user._id);

    const payments = await Payment.find({ patient: targetPatientId, status: "completed" });
    const totalPaid = payments.reduce((acc, curr) => acc + (curr.amount || 0), 0);

    const pendingPayments = await Payment.find({ patient: targetPatientId, status: "pending" });
    const outstandingAmount = pendingPayments.reduce((acc, curr) => acc + (curr.amount || 0), 0);

    res.status(200).json({
      success: true,
      data: {
        totalPaid,
        outstandingAmount,
        completedTransactionsCount: payments.length,
        pendingTransactionsCount: pendingPayments.length,
        recentPayments: payments.slice(0, 5),
      },
    });
  } catch (error) {
    console.error("Error fetching billing summary:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve billing summary",
      error: error.message,
    });
  }
};

/**
 * @desc    Get all payment records
 * @route   GET /api/payments
 * @access  Private (Admin, Staff)
 */
export const getPayments = async (req, res) => {
  try {
    const { status, paymentMethod, patientId } = req.query;
    const query = {};

    if (status) query.status = status;
    if (paymentMethod) query.paymentMethod = paymentMethod;
    if (patientId) query.patient = patientId;

    const payments = await Payment.find(query)
      .populate("patient", "name email phone")
      .populate("appointment", "date doctor")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: payments.length,
      data: payments,
    });
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve payments list",
      error: error.message,
    });
  }
};

/**
 * @desc    Get single payment by ID
 * @route   GET /api/payments/:id
 * @access  Private
 */
export const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate("patient", "name email phone")
      .populate("appointment", "date doctor specialization");

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment record not found",
      });
    }

    if (req.user.role === "patient" && payment.patient._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Access denied to this payment record",
      });
    }

    res.status(200).json({
      success: true,
      data: payment,
    });
  } catch (error) {
    console.error("Error fetching payment by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve payment details",
      error: error.message,
    });
  }
};

/**
 * @desc    Update payment status
 * @route   PUT /api/payments/:id/status
 * @access  Private (Admin, Staff)
 */
export const updatePaymentStatus = async (req, res) => {
  try {
    const { status, notes } = req.body;

    if (!["pending", "completed", "failed", "refunded"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment status provided",
      });
    }

    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment record not found",
      });
    }

    payment.status = status;
    payment.paymentStatus = status;
    if (notes) payment.notes = notes;
    await payment.save();

    res.status(200).json({
      success: true,
      message: `Payment status updated to ${status}`,
      data: payment,
    });
  } catch (error) {
    console.error("Error updating payment status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update payment status",
      error: error.message,
    });
  }
};
