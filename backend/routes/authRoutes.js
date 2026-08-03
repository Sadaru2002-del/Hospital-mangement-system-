import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getMe,
  getAllUsers,
} from "../controllers/authController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public Authentication Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected User Self Routes (Requires valid JWT)
router.get("/me", protect, getMe || getUserProfile);

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// Protected Admin Routes (Requires Admin role)
router.get("/users", protect, adminOnly, getAllUsers);

export default router;
