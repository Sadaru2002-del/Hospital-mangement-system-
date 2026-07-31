import express from "express";
import {
  getPrescriptions,
  getMyPrescriptions,
  getPrescriptionById,
} from "../controllers/prescriptionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Apply authentication middleware to all prescription routes
router.use(protect);

// View e-Prescription routes
router.route("/").get(getPrescriptions);
router.route("/my").get(getMyPrescriptions);
router.route("/:id").get(getPrescriptionById);

export default router;