import { CustomError } from "./error-middleware.js";

// chat is only available to users who have at least one connection
export const hasConnections = async (req, res, next) => {
  if (!req.user.connections || req.user.connections < 1) {
    throw new CustomError("connect with someone to start chatting", 403);
  }
  next();
};
