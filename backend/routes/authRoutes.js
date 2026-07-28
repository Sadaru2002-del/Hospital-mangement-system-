import express from "express";
import {
  registerUser,
  loginUser,
  getMe,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/register", registerUser); // POST /api/auth/register
router.post("/login", loginUser);       // POST /api/auth/login

// Private route — requires valid JWT
router.get("/me", protect, getMe);      // GET  /api/auth/me

export default router;
