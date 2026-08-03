import { validationResult } from "express-validator";

// Middleware to validate payment request
const paymentValidate = (req, res, next) => {
  const errors = validationResult(req);

  // If there are validation errors, return a 400 response with the error details
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation Failed",
      errors: errors.array(),
    });
  }

  next();
};

export default paymentValidate;