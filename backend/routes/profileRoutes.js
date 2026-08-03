import express from "express";
import {
  getMyProfile,
  updateMyProfile,
  changePassword,
  getUserProfileById,
  deleteMyProfile,
} from "../controllers/profileController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Apply authentication middleware to all profile routes
router.use(protect);

// Routes for logged-in user profile (/api/profile/me or /api/profile)
router.get("/me", getMyProfile);
router.put("/me", updateMyProfile);
router.delete("/me", deleteMyProfile);

// Password change endpoint
router.put("/change-password", changePassword);
router.put("/password", changePassword);

// Base route: GET /api/profile, PUT /api/profile
router
  .route("/")
  .get(getMyProfile)
  .put(updateMyProfile);

// Public/Staff lookup route by user ID: GET /api/profile/:id
router.get("/:id", getUserProfileById);

export default router;
