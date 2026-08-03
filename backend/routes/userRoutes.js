import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
} from '../controllers/userController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public Authentication Routes
router.post('/', registerUser);
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected User Profile Routes (Logged-in User)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// Protected Administrative User Management Routes (Admin Only)
router.get('/', protect, adminOnly, getAllUsers);

export default router;
