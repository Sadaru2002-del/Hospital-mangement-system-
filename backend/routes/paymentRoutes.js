import express from "express";
import { createPaymentIntent, verifyPayment } from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Route to create a payment intent
router.post("/create-intent", protect, createPaymentIntent);

// Route to verify successful payment
router.post("/verify", protect, verifyPayment);

export default router;
