import express from 'express';
import {
  createMedicalRecord,
  getMedicalRecords,
  getMyMedicalRecords,
  getMedicalRecordById,
  updateMedicalRecord,
  deleteMedicalRecord,
} from '../controllers/medicalRecordController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get patient's own medical records
router.get('/my-records', protect, getMyMedicalRecords);

// Base route: /api/medical-records
router
  .route('/')
  .get(protect, getMedicalRecords)
  .post(protect, authorizeRoles('admin', 'doctor', 'staff'), createMedicalRecord);

// Single record route: /api/medical-records/:id
router
  .route('/:id')
  .get(protect, getMedicalRecordById)
  .put(protect, authorizeRoles('admin', 'doctor', 'staff'), updateMedicalRecord)
  .delete(protect, authorizeRoles('admin', 'doctor'), deleteMedicalRecord);

export default router;
