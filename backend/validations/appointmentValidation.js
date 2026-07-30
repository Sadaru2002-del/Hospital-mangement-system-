import Joi from "joi";

const objectId = Joi.string()
    .hex()
    .length(24)
    .messages({
        "string.length": "Invalid MongoDB ObjectId",
        "string.hex": "Invalid MongoDB ObjectId",
    });

const appointmentTimePattern =
    /^(0[1-9]|1[0-2]):([0-5][0-9]) (AM|PM)$/;

// Create Appointment Validation

export const createAppointmentValidation = Joi.object({

    patient: objectId.required().messages({
        "any.required": "Patient is required",
    }),

    doctor: objectId.required().messages({
        "any.required": "Doctor is required",
    }),

    bookedBy: objectId.required().messages({
        "any.required": "Booked By is required",
    }),

    appointmentDate: Joi.date()
        .greater("now")
        .required()
        .messages({
            "date.base": "Appointment date is invalid",
            "date.greater": "Appointment date must be in the future",
            "any.required": "Appointment date is required",
        }),

    appointmentTime: Joi.string()
        .pattern(appointmentTimePattern)
        .required()
        .messages({
            "string.pattern.base":
                "Time format must be like 09:30 AM",
            "any.required": "Appointment time is required",
        }),

    type: Joi.string()
        .valid(
            "consultation",
            "follow-up",
            "emergency",
            "routine-checkup",
            "lab-test",
            "surgery"
        )
        .default("consultation"),

    status: Joi.string()
        .valid(
            "pending",
            "confirmed",
            "completed",
            "cancelled",
            "no-show"
        )
        .default("pending"),

    symptoms: Joi.string()
        .max(500)
        .allow("", null),

    notes: Joi.string()
        .max(1000)
        .allow("", null),

    prescription: Joi.string()
        .max(2000)
        .allow("", null),

    cancellationReason: Joi.string()
        .max(300)
        .allow("", null),

    cancelledBy: objectId.allow(null),

});


// Update Appointment Validation

export const updateAppointmentValidation = Joi.object({

    doctor: objectId,

    appointmentDate: Joi.date()
        .greater("now")
        .messages({
            "date.greater": "Appointment date must be in the future",
        }),

    appointmentTime: Joi.string()
        .pattern(appointmentTimePattern),

    type: Joi.string().valid(
        "consultation",
        "follow-up",
        "emergency",
        "routine-checkup",
        "lab-test",
        "surgery"
    ),

    status: Joi.string().valid(
        "pending",
        "confirmed",
        "completed",
        "cancelled",
        "no-show"
    ),

    symptoms: Joi.string()
        .max(500)
        .allow("", null),

    notes: Joi.string()
        .max(1000)
        .allow("", null),

    prescription: Joi.string()
        .max(2000)
        .allow("", null),

}).min(1);

// Cancel Appointment Validation

export const cancelAppointmentValidation = Joi.object({

    cancelledBy: objectId.required(),

    cancellationReason: Joi.string()
        .required()
        .max(300)
        .messages({
            "any.required": "Cancellation reason is required",
        }),

});


//Appointment Id Validation
export const appointmentIdValidation = Joi.object({

    id: objectId.required(),

});