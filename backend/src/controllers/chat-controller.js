import { CustomError } from "../middlewares/error-middleware.js";
import {
  getMessages,
  listConversations,
} from "../services/chat-service.js";
import {
  getMessagesValidator,
} from "../joi-validators/chat-validators.js";

// ==================================== LIST CONVERSATIONS ====================================
export const viewConversations = async (req, res) => {
  const conversations = await listConversations(req.user._id);

  res.status(200).json({
    success: true,
    conversations,
  });
};

// ==================================== VIEW MESSAGES WITH A CONNECTION ====================================
export const viewMessages = async (req, res) => {
  const { error, value } = getMessagesValidator({
    userId: req.params.userId,
    before: req.query?.before,
    limit: req.query?.limit,
  });

  if (error) {
    throw new CustomError(error, 400);
  }

  const data = await getMessages(req.user._id, value.userId, {
    before: value.before,
    limit: value.limit,
  });

  res.status(200).json({
    success: true,
    ...data,
  });
};
