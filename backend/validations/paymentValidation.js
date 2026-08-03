import { body } from "express-validator";

// Validation rules for payment processing
export const paymentValidation = [
    body("paymentMethod")
        .notEmpty()
        .withMessage("Payment method is required")
        .isIn(["card", "insurance"])
        .withMessage("Invalid payment method"),

    // Validate amount
    body("amount")
        .notEmpty()
        .withMessage("Amount is required")
        .isFloat({ min: 1 })
        .withMessage("Amount must be greater than 0"),

    // Validate card details if payment method is card
    body("cardNumber")
        .if(body("paymentMethod").equals("card"))
        .notEmpty()
        .withMessage("Card number is required")
        .matches(/^[0-9]{16}$/)
        .withMessage("Card number must contain exactly 16 digits"),

    // Validate cardholder name if payment method is card
    body("cardName")
        .if(body("paymentMethod").equals("card"))
        .trim()
        .notEmpty()
        .withMessage("Cardholder name is required")
        .matches(/^[A-Za-z ]+$/)
        .withMessage("Cardholder name can contain only letters"),

    // Validate expiry date and CVV if payment method is card
    body("expiry")
        .if(body("paymentMethod").equals("card"))
        .matches(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)
        .withMessage("Expiry date must be MM/YY"),

    // Validate CVV if payment method is card
    body("cvv")
        .if(body("paymentMethod").equals("card"))
        .matches(/^[0-9]{3,4}$/)
        .withMessage("CVV must be 3 or 4 digits"),

    // Validate insurance details if payment method is insurance
    body("insuranceProvider")
        .if(body("paymentMethod").equals("insurance"))
        .notEmpty()
        .withMessage("Insurance provider is required"),

    // Validate policy number if payment method is insurance
    body("policyNumber")
        .if(body("paymentMethod").equals("insurance"))
        .notEmpty()
        .withMessage("Policy number is required")
];