import { createPaymentValidation } from "../validations/payment_validate.js";

const paymentValidate = (req, res, next) => {
  const { error, value } = createPaymentValidation.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

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

  // Replace request body with validated & sanitized data
  req.body = value;

  next();
};

export default paymentValidate;