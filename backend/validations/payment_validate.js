import Joi from "joi";
import mongoose from "mongoose";

// MongoDB ObjectId Validator
const objectId = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error("any.invalid");
  }
  return value;
};

// Create Payment Validation Schema
export const createPaymentValidation = Joi.object({
  // Patient
  patient: Joi.string()
    .required()
    .custom(objectId, "ObjectId Validation")
    .messages({
      "string.empty": "Patient ID is required.",
      "any.required": "Patient ID is required.",
      "any.invalid": "Invalid Patient ID.",
    }),

  // Appointment 
  appointment: Joi.string()
    .custom(objectId, "ObjectId Validation")
    .allow(null, "")
    .optional()
    .messages({
      "any.invalid": "Invalid Appointment ID.",
    }),

  // Amount
  amount: Joi.number()
    .required()
    .positive()
    .precision(2)
    .messages({
      "number.base": "Amount must be a valid number.",
      "number.positive": "Amount must be greater than zero.",
      "any.required": "Payment amount is required.",
    }),

  // Payment Method
  paymentMethod: Joi.string()
    .required()
    .valid("cash", "card", "online", "insurance")
    .messages({
      "any.only":
        "Payment method must be cash, card, online, or insurance.",
      "any.required": "Payment method is required.",
      "string.empty": "Payment method is required.",
    }),

  // Payment Status
  paymentStatus: Joi.string()
    .valid("pending", "completed", "failed", "refunded")
    .default("pending")
    .messages({
      "any.only":
        "Payment status must be pending, completed, failed, or refunded.",
    }),

  // Transaction ID
  transactionId: Joi.string()
    .trim()
    .max(100)
    .allow("", null)
    .messages({
      "string.max": "Transaction ID cannot exceed 100 characters.",
    }),

  // Description
  description: Joi.string()
    .trim()
    .max(500)
    .allow("", null)
    .messages({
      "string.max": "Description cannot exceed 500 characters.",
    }),

  // Payment Date
  paymentDate: Joi.date()
    .optional()
    .messages({
      "date.base": "Payment date must be a valid date.",
    }),
});