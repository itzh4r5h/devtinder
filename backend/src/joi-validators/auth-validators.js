import Joi from "joi";
import { getOnlyErrorMessage } from "../utils/cleanup-helpers.js";
import { NAME_PATTERN, NAME_PATTERN_MESSAGE } from "../constants/name-pattern.js";

const passwordObj = {
  password: Joi.string()
    .min(8)
    .max(20)
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$",
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
    name: Joi.string().trim().pattern(NAME_PATTERN).min(3).max(20).required().lowercase().messages({
      "string.pattern.base": NAME_PATTERN_MESSAGE,
    }),
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
    // only check that a password was sent, strength rules apply at signup and reset.
    // otherwise changing the rules would lock out users with older passwords
    password: Joi.string().max(20).required().messages({
      "string.empty": "password is required",
      "any.required": "password is required",
      "string.max": "invalid credentials",
    }),
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

// used by routes that only need an email, like resend verification and forgot password
export const emailValidator = (data) => {

  const schema = Joi.object({
    email: Joi.string().trim().lowercase().email().required(),
  });

  const { error } = schema.validate(data);

  const errorMessage = getOnlyErrorMessage(error);
  return errorMessage;
};

export const resetPasswordValidator = (data) => {

  const schema = Joi.object({
    email: Joi.string().trim().lowercase().email().required(),
    // otp is 6 letters/digits, case doesn't matter
    otp: Joi.string().trim().alphanum().length(6).required().messages({
      "string.empty": "otp is required",
      "any.required": "otp is required",
      "string.alphanum": "invalid otp",
      "string.length": "otp must be 6 characters",
    }),
    ...passwordObj,
  });

  const { error } = schema.validate(data);

  const errorMessage = getOnlyErrorMessage(error);
  return errorMessage;
};
