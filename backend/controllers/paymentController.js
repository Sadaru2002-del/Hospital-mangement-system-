import Payment from "../models/Payment.js";
import Appointment from "../models/Appointment.js";
import crypto from "crypto";

/**
 * @desc    Process / Create a new payment
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

    // Default patient to logged-in user if not explicitly provided or if patient role
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

    // Mask card details if provided
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

    // Default billing items if none provided
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
      cardDetails: sanitizedCardDetails,
      insuranceDetails: paymentMethod === "insurance" ? insuranceDetails : undefined,
      billingItems: items,
      notes,
      paidAt: new Date(),
    });

    // If linked to an appointment, update appointment payment status if applicable
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
 * @desc    Get patient billing summary (totals, history, active bill)
 * @route   GET /api/payments/summary
 * @access  Private (Patient, Staff, Admin)
 */
export const getBillingSummary = async (req, res) => {
  try {
    const targetPatientId = req.user.role === "patient" ? req.user._id : (req.query.patientId || req.user._id);

    const payments = await Payment.find({ patient: targetPatientId, status: "completed" });
    const totalPaid = payments.reduce((acc, curr) => acc + (curr.amount || 0), 0);

    // Mock active/pending bill items if no pending payments found
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
 * @desc    Get all payment records (Filterable)
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

    // Restrict patients to their own payments
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
