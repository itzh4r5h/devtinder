import express from "express";
import { isAuthorized } from "../middlewares/auth-middleware.js";
import { asyncHandler } from "../middlewares/async-handler.js";
import { checkProfileCompletion } from "../middlewares/check-profile-completion.js";
import {
  viewConversations,
  viewMessages,
} from "../controllers/chat-controller.js";

export const chatRouter = express.Router();

// every chat route needs a logged in user with a completed profile
chatRouter.use(isAuthorized, checkProfileCompletion);

// for listing all conversations with last message and unread count
chatRouter.get("/conversations", asyncHandler(viewConversations));
// for viewing messages with a connection (?before=<messageId>&limit=30)
chatRouter.get("/:userId/messages", asyncHandler(viewMessages));
