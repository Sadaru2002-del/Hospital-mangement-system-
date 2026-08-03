import express from "express";
import {
  processPayment,
  createPaymentIntent,
  verifyPayment,
  getMyPayments,
  getBillingSummary,
  getPayments,
  getPaymentById,
  updatePaymentStatus,
} from "../controllers/paymentController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// All payment routes require JWT authentication
router.use(protect);

// Stripe payment integration endpoints
router.post("/create-intent", createPaymentIntent);
router.post("/verify", verifyPayment);

// Patient routes for personal payment history & billing summary
router.get("/my", getMyPayments);
router.get("/my-payments", getMyPayments);
router.get("/summary", getBillingSummary);

// Single payment operations & status updates
router.get("/:id", getPaymentById);
router.put("/:id/status", authorizeRoles("admin", "staff"), updatePaymentStatus);

// Base /api/payments route
router
  .route("/")
  .get(authorizeRoles("admin", "staff"), getPayments)
  .post(processPayment);

export default router;
