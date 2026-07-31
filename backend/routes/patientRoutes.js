import express from "express";
import {
  getAllPatients,
  getPatientById,
  getMyPatientProfile,
  addMedicalHistory,
  getPatientMedicalHistory,
  createPatient,
} from "../controllers/patientController.js";
import { protect, adminOnly, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Route for getting all patients and creating a new patient
router
  .route("/")
  .get(protect, authorizeRoles("admin", "doctor"), getAllPatients)
  .post(protect, createPatient);

// Route for logged in user to get their own patient profile
router.route("/me").get(protect, getMyPatientProfile);

// Route for getting a specific patient by ID
router
  .route("/:id")
  .get(protect, getPatientById);

// Routes for medical history
router
  .route("/:id/medical-history")
  .get(protect, getPatientMedicalHistory)
  .post(protect, authorizeRoles("admin", "doctor"), addMedicalHistory);

export default router;
