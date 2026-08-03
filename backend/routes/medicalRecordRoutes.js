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

// Protect all medical record routes with authentication middleware
router.use(protect);

// Get patient's own medical records
router.get('/my-records', getMyMedicalRecords);

// Base route: /api/medical-records
router
  .route('/')
  .get(getMedicalRecords)
  .post(authorizeRoles('admin', 'doctor', 'receptionist'), createMedicalRecord);

// Single record route: /api/medical-records/:id
router
  .route('/:id')
  .get(getMedicalRecordById)
  .put(authorizeRoles('admin', 'doctor', 'receptionist'), updateMedicalRecord)
  .delete(authorizeRoles('admin', 'doctor'), deleteMedicalRecord);

export default router;
