import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import prescriptionRoutes from "./routes/prescriptionRoutes.js";

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes || authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/prescriptions", prescriptionRoutes);

// Health check (combined)
app.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "Hospital Management API is running...",
  });
});

// Root route status check
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Hospital Management System API is running",
  });
});

// Global error handler (keep your existing one here)