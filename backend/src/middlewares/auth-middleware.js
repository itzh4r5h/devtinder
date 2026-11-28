import jwt from "jsonwebtoken";
import { CustomError } from "./error-middleware.js";
import { User } from "../models/user-model.js";

// shared by the http auth middleware and the socket handshake
// returns the user and the decoded token, throws if the session is invalid
export const getUserFromToken = async (token) => {
  if (!token) {
    throw new CustomError("invalid session, please signin!", 401);
  }

  const payload = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(payload.id).select("+passwordChangedAt");

  // also reject tokens issued before a password reset, so old sessions are logged out
  if (!user || user.isTokenIssuedBeforePasswordChange(payload.iat)) {
    throw new CustomError("invalid session, please signin!", 401);
  }

  return { user, payload };
};

export const isAuthorized = async (req, res, next) => {
  const { user } = await getUserFromToken(req.cookies?.token);

  req.user = user;

  next();
};

// only for post, put and patch requests
export const isValidData = async (req, res, next) => {
  // it will check whether req.body is defined or not
  // if defined get all the keys
  // keys like - ["name", "age"]
  // if keys are 0 then throw error
  if (!req.body || Object.keys(req.body).length === 0) {
    throw new CustomError("invalid data", 400);
  }
  next();
};
