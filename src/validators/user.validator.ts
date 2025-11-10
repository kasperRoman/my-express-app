import joi from "joi"
import { regexConstant } from "../constants/regex.constant";

export class UserValidator {
    public static create = joi.object({
        name: joi.string()
            .min(3)
            .max(50)
            .trim()
            .required()
            .messages({
                "string.base": "Name must be a string",
                "string.empty": "Name is required",
                "string.min": "Name must be at least 3 characters",
                "string.max": "Name must be at most 50 characters",
                "any.required": "Name is required"
            }),

        age: joi.number()
            .integer()
            .min(18)
            .max(120)
            .required()
            .messages({
                "number.base": "Age must be a number",
                "number.min": "Age must be at least 18",
                "number.max": "Age must be at most 120",
                "any.required": "Age is required"
            }),

        email: joi.string()
            .email()
            .trim()
            .required()
            .messages({
                "string.email": "Email must be valid",
                "any.required": "Email is required"
            }),

        password: joi.string()
            .regex(regexConstant.PASSWORD)
            .min(8)
            .max(100)
            .trim()
            .required()
            .messages({
                "string.min": "Password must be at least 8 characters",
                "string.max": "Password must be at most 100 characters",
                "any.required": "Password is required"
            }),

        phone: joi.string()
            .regex(regexConstant.PHONE)
            .trim()
            .optional()
            .messages({
                "string.pattern.base": "Phone must be a valid number"
            })
    });
    public static update = joi.object({
        name: joi.string()
            .min(3)
            .max(50)
            .trim()
            .messages({
                "string.base": "Name must be a string",
                "string.empty": "Name is required",
                "string.min": "Name must be at least 3 characters",
                "string.max": "Name must be at most 50 characters",
                "any.required": "Name is required"
            }),

        age: joi.number()
            .integer()
            .min(18)
            .max(120)
            .messages({
                "number.base": "Age must be a number",
                "number.min": "Age must be at least 18",
                "number.max": "Age must be at most 120",
                "any.required": "Age is required"
            }),

        email: joi.string()
            .email()
            .trim()
            .messages({
                "string.email": "Email must be valid",
                "any.required": "Email is required"
            }),

        password: joi.string()
            .regex(regexConstant.PASSWORD)
            .min(8)
            .max(100)
            .trim()
            .messages({
                "string.min": "Password must be at least 8 characters",
                "string.max": "Password must be at most 100 characters",
                "any.required": "Password is required"
            }),

        phone: joi.string()
            .regex(regexConstant.PHONE)
            .trim()
            .messages({
                "string.pattern.base": "Phone must be a valid number"
            })
    });
}