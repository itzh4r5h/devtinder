import Joi from "joi";

const emailSchema = Joi.string()
  .trim()
  .email({ tlds: { allow: false } })
  .required()
  .messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email",
  });

// same rules as the backend: letters only, single spaces between words (e.g. "john doe")
const NAME_PATTERN = /^[a-zA-Z]+( [a-zA-Z]+)*$/;

const nameSchema = Joi.string().trim().pattern(NAME_PATTERN).min(3).max(20).required().messages({
  "string.empty": "Name is required",
  "string.min": "Name must be at least 3 characters",
  "string.max": "Name cann't exceed 20 characters",
  "string.pattern.base": "Name can only contain letters and single spaces between words",
});

// same rules as the backend: lowercase, uppercase, number and special character
const passwordSchema = Joi.string()
  .trim()
  .min(8)
  .max(20)
  .pattern(
    new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$"
    )
  )
  .required()
  .messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 8 characters",
    "string.max": "Password cann't exceed 20 characters",
    "string.pattern.base": "password must have uppercase and lowercase letters, numbers and sepcial characters",
  });

// for the resend verification and forgot password forms, only needs the email
export const emailFormValidator = () => Joi.object({ email: emailSchema });

// for the "enter otp + new password" step of forgot password
export const resetPasswordFormValidator = () =>
  Joi.object({
    otp: Joi.string().trim().alphanum().length(6).required().messages({
      "string.empty": "Code is required",
      "string.alphanum": "Invalid code",
      "string.length": "Code must be 6 characters",
    }),
    password: passwordSchema,
    confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
      "string.empty": "Please confirm your password",
      "any.only": "Passwords don't match",
    }),
  });

export const authFormValidator = (route) => {
  const baseSchema = {};
  if (route.toLowerCase() === "/signup") {
    baseSchema.name = nameSchema;
  }

  baseSchema.email = emailSchema;
  // sign in only checks a password was typed, like the backend. strength rules apply
  // at signup and reset, otherwise older passwords made under looser rules get locked out
  baseSchema.password =
    route.toLowerCase() === "/signup"
      ? passwordSchema
      : Joi.string().required().messages({ "string.empty": "Password is required" });

  return Joi.object(baseSchema);
};
