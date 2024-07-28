const Joi = require("joi");

const carousalSchema = Joi.object({
    title: Joi.string().min(3).max(30).required().messages({
        "string.min": "Title must be at least 3 characters long",
        "string.max": "Title must be at most 30 characters long",
        "any.required": "Title is required"
    }),
    description: Joi.string().min(3).max(30).required().messages({
        "string.min": "Description must be at least 3 characters long",
        "string.max": "Description must be at most 30 characters long",
        "any.required": "Description is required"
    }),
})

module.exports = carousalSchema 