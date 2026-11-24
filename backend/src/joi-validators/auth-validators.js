import Joi from "joi";
import { getOnlyErrorMessage } from "../utils/cleanup-helpers.js";

const passwordObj = {
  password: Joi.string()
    .min(8)
    .max(20)
    .pattern(
      new RegExp(
        "^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$",
      ),
    )
    .required()
    .messages({
      "string.empty": "password is required",
      "string.min": "password must be at least 8 characters",
      "string.max": "password cann't exceed 20 characters",
      "string.pattern.base":
        "password must have uppercase and lowercase letters, numbers and sepcial characters",
    }),
};

export const signupValidator = (data) => {

  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required().trim().lowercase(),
    email: Joi.string().trim().lowercase().email().required(),
    ...passwordObj,
  });

  const { error } = schema.validate(data);

  const errorMessage = getOnlyErrorMessage(error);
  return errorMessage;
};

export const signinValidator = (data) => {

  const schema = Joi.object({
    email: Joi.string().trim().lowercase().email().required(),
    ...passwordObj,
  });

  const { error } = schema.validate(data);

  const errorMessage = getOnlyErrorMessage(error);
  return errorMessage;
};

export const verifyEmailValidator = (data) => {

  // token is 32 random bytes in hex, i.e. 64 hex characters
  const schema = Joi.object({
    token: Joi.string().trim().hex().length(64).required().messages({
      "string.empty": "verification token is required",
      "any.required": "verification token is required",
      "string.hex": "invalid verification link",
      "string.length": "invalid verification link",
    }),
  });

  const { error } = schema.validate(data);

  const errorMessage = getOnlyErrorMessage(error);
  return errorMessage;
};
