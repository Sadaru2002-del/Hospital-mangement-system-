import { createPaymentValidation } from "../validations/payment_validate.js";

// Middleware to validate payment request body
const paymentValidate = (req, res, next) => {
  const { error, value } = createPaymentValidation.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  // If validation fails, return a 400 response with error details
  if (error) {
    return res.status(400).json({
      success: false,
      message: "Validation Failed",
      errors: error.details.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      })),
    });
  }


  req.body = value;

  next();
};

export default paymentValidate;