import Joi from "joi";

export const authFormValidator = (route) => {
  const baseSchema = {};
  if (route.toLowerCase() === "/signup") {
    baseSchema.username = Joi.string().alphanum().trim().min(5).max(10).required().messages({
      "string.empty": "username is required",
      "string.min": "username must be at least 5 characters",
      "string.max": "username cann't exceed 10 characters",
    });

    baseSchema.name = Joi.string().trim().min(3).max(20).required().messages({
      "string.empty": "Name is required",
      "string.min": "Name must be at least 3 characters",
      "string.max": "Name cann't exceed 20 characters",
    });

  }

  baseSchema.email = Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Invalid email",
    });

  baseSchema.password = Joi.string()
    .trim()
    .min(8)
    .max(20)
    .pattern(
      new RegExp(
        "^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$"
      )
    )
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 8 characters",
      "string.max": "Password cann't exceed 20 characters",
      "string.pattern.base": "password must have uppercase and lowercase letters, numbers and sepcial characters",
    });


  return Joi.object(baseSchema);
};
