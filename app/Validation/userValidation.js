const Joi = require("joi");
const signUpSchema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
        "string.min": "Name must be at least 3 characters long",
        "string.max": "Name must be at most 30 characters long",
        "any.required": "Name is required"
    }),
    phone: Joi.string().length(10).pattern(/^[0-9]+$/).required().messages({
        "string.length": "Phone number must be 10 digits",
        "string.pattern.base": "Phone number must be a number",
        "any.required": "Phone number is required"
    }),
    email: Joi.string().email().required().messages({
        "string.email": "Email must be a valid email address",
        "any.required": "Email is required"
    }),
    password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,13}$/).required().messages({
        "string.pattern.base": "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character",
        "any.required": "Password is required"
    }),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
        "any.only": "Passwords do not match",
        "any.required": "Confirm password is required"
    }),
})

const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email": "Email must be a valid email address",
        "any.required": "Email is required"
    }),
    password: Joi.string().required().messages({
        "any.required": "Password is required"
    }),
})

module.exports = { signUpSchema, loginSchema }