import Joi from "joi";

export const shareApplicationSchema = Joi.object({
  title: Joi.string()
    .valid("Mr", "Mrs", "Miss", "Ms", "Dr", "Prof")
    .required()
    .messages({
      "any.required": "Title is required",
      "any.only": "Title must be one of: Mr, Mrs, Miss, Ms, Dr, Prof",
    }),

  names: Joi.string().min(2).max(100).required().messages({
    "string.empty": "Names are required",
    "string.min": "Names must be at least 2 characters long",
    "string.max": "Names cannot exceed 100 characters",
  }),

  surname: Joi.string().min(2).max(50).required().messages({
    "string.empty": "Surname is required",
    "string.min": "Surname must be at least 2 characters long",
    "string.max": "Surname cannot exceed 50 characters",
  }),

  postalAddress: Joi.string().min(5).max(200).required().messages({
    "string.empty": "Postal address is required",
    "string.min": "Postal address must be at least 5 characters long",
    "string.max": "Postal address cannot exceed 200 characters",
  }),

  nationalRegistrationNo: Joi.string()
    .pattern(/^[0-9]{2}\/[0-9]{6,7}\/[A-Z]{1}\/[0-9]{2}$/)
    .required()
    .messages({
      "string.empty": "National registration number is required",
      "string.pattern.base":
        "National registration number must be in format: XX/XXXXXX/X/XX (e.g., 12/123456/A/12)",
    }),

  LUSEIDNo: Joi.string().alphanum().min(5).max(20).required().messages({
    "string.empty": "LUSE ID number is required",
    "string.alphanum": "LUSE ID number must contain only letters and numbers",
    "string.min": "LUSE ID number must be at least 5 characters long",
    "string.max": "LUSE ID number cannot exceed 20 characters",
  }),

  email: Joi.string().min(6).max(100).required().email().messages({
    "string.empty": "Email is required",
    "string.email": "Email must be a valid email address",
    "string.min": "Email must be at least 6 characters long",
    "string.max": "Email cannot exceed 100 characters",
  }),

  bankName: Joi.string().min(2).max(100).required().messages({
    "string.empty": "Bank name is required",
    "string.min": "Bank name must be at least 2 characters long",
    "string.max": "Bank name cannot exceed 100 characters",
  }),

  bankAccountName: Joi.string().min(2).max(100).required().messages({
    "string.empty": "Bank account name is required",
    "string.min": "Bank account name must be at least 2 characters long",
    "string.max": "Bank account name cannot exceed 100 characters",
  }),

  bankAccountNo: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(8)
    .max(20)
    .required()
    .messages({
      "string.empty": "Bank account number is required",
      "string.pattern.base": "Bank account number must contain only digits",
      "string.min": "Bank account number must be at least 8 digits long",
      "string.max": "Bank account number cannot exceed 20 digits",
    }),

  bankBranch: Joi.string().min(2).max(100).required().messages({
    "string.empty": "Bank branch is required",
    "string.min": "Bank branch must be at least 2 characters long",
    "string.max": "Bank branch cannot exceed 100 characters",
  }),

  bankSwiftCode: Joi.string()
    .pattern(/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/)
    .required()
    .messages({
      "string.empty": "Bank SWIFT code is required",
      "string.pattern.base":
        "SWIFT code must be 8 or 11 characters (e.g., ABCDZM22 or ABCDZM22XXX)",
    }),

  sharesApplied: Joi.number().integer().positive().required().messages({
    "number.base": "Shares applied must be a number",
    "number.integer": "Shares applied must be a whole number",
    "number.positive": "Shares applied must be greater than 0",
    "any.required": "Shares applied is required",
  }),

  totalConsiderationPaid: Joi.number()
    .positive()
    .precision(2)
    .required()
    .messages({
      "number.base": "Total consideration paid must be a number",
      "number.positive": "Total consideration paid must be greater than 0",
      "any.required": "Total consideration paid is required",
    }),

  applicationDate: Joi.date().iso().max("now").required().messages({
    "date.base": "Application date must be a valid date",
    "date.format": "Application date must be in ISO format (YYYY-MM-DD)",
    "date.max": "Application date cannot be in the future",
    "any.required": "Application date is required",
  }),
});
