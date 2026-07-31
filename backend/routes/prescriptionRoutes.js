import express from "express";
import {
  createPrescription,
  getPrescriptions,
  getMyPrescriptions,
  getPrescriptionById,
  updatePrescription,
  forwardToPharmacy,
  deletePrescription,
} from "../controllers/prescriptionController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Apply authentication middleware to all prescription routes
router.use(protect);

// Get logged-in patient's digital prescriptions (supports both /my and /my-prescriptions)
router.get("/my", getMyPrescriptions);
router.get("/my-prescriptions", getMyPrescriptions);

// Forward prescription to pharmacy
router.put("/:id/forward", forwardToPharmacy);

// Base route: /api/prescriptions
router
  .route("/")
  .get(getPrescriptions)
  .post(authorizeRoles("admin", "doctor", "staff"), createPrescription);

// Single prescription route: /api/prescriptions/:id
router
  .route("/:id")
  .get(getPrescriptionById)
  .put(authorizeRoles("admin", "doctor", "staff"), updatePrescription)
  .delete(authorizeRoles("admin", "doctor"), deletePrescription);

export default router;
