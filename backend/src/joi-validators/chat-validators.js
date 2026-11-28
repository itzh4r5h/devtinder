import Joi from "joi";
import { getOnlyErrorMessage } from "../utils/cleanup-helpers.js";
import { validateMongoId } from "./connnection-validators.js";

const MAX_MESSAGE_LENGTH = 2000;

const mongoId = (label) =>
  Joi.string()
    .trim()
    .custom(validateMongoId)
    .label(label)
    .messages({ "any.invalid": `invalid ${label}` });

const textSchema = Joi.string()
  .trim()
  .min(1)
  .max(MAX_MESSAGE_LENGTH)
  .required()
  .label("message")
  .messages({
    "string.empty": "message can't be empty",
    "string.max": `message can't exceed ${MAX_MESSAGE_LENGTH} characters`,
  });

// validates and returns { error, value } with the trimmed values
const run = (schema, data) => {
  const { error, value } = schema.validate(data);
  return { error: getOnlyErrorMessage(error), value };
};

export const sendMessageValidator = (data) =>
  run(
    Joi.object({
      userId: mongoId("user id").required(),
      text: textSchema,
    }),
    data,
  );

export const getMessagesValidator = (data) =>
  run(
    Joi.object({
      userId: mongoId("user id").required(),
      before: mongoId("cursor"),
      limit: Joi.number().integer().min(1).max(50).default(30).label("limit"),
    }),
    data,
  );

export const userIdValidator = (data) =>
  run(Joi.object({ userId: mongoId("user id").required() }), data);
