import express from 'express';
import {
  createPrescription,
  getPrescriptions,
  getMyPrescriptions,
  getPrescriptionById,
  updatePrescription,
  forwardToPharmacy,
  deletePrescription,
} from '../controllers/prescriptionController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get patient's own digital prescriptions
router.get('/my-prescriptions', protect, getMyPrescriptions);

// Forward prescription to pharmacy
router.put('/:id/forward', protect, forwardToPharmacy);

// Base route: /api/prescriptions
router
  .route('/')
  .get(protect, getPrescriptions)
  .post(protect, authorizeRoles('admin', 'doctor', 'staff'), createPrescription);

// Single prescription route: /api/prescriptions/:id
router
  .route('/:id')
  .get(protect, getPrescriptionById)
  .put(protect, authorizeRoles('admin', 'doctor', 'staff'), updatePrescription)
  .delete(protect, authorizeRoles('admin', 'doctor'), deletePrescription);

export default router;
