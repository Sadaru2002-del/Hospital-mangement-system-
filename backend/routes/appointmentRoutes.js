import express from "express";
import {
  createAppointment,
  getAppointments,
  getMyAppointments,
  getAppointmentById,
  updateAppointment,
  cancelAppointment,
  deleteAppointment,
} from "../controllers/appointmentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Apply authentication middleware to all appointment routes
router.use(protect);

// Routes
router.route("/").post(createAppointment).get(getAppointments);
router.route("/my").get(getMyAppointments);
router.route("/:id/cancel").put(cancelAppointment).patch(cancelAppointment);
router
  .route("/:id")
  .get(getAppointmentById)
  .put(updateAppointment)
  .delete(deleteAppointment);

export default router;


