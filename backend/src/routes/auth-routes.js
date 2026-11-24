import express from "express";
import { asyncHandler } from "../middlewares/async-handler.js";
import { resendVerificationEmail, signin, signout, signup, verifyEmail } from "../controllers/auth-controller.js";
import { isAuthorized, isValidData } from "../middlewares/auth-middleware.js";

export const authRouter = express.Router();

authRouter.post("/signup", isValidData, asyncHandler(signup));
authRouter.post("/signin", isValidData, asyncHandler(signin));
authRouter.post("/signout", isAuthorized, asyncHandler(signout));
authRouter.post("/verify-email", isValidData, asyncHandler(verifyEmail));
authRouter.post("/resend-verification", isValidData, asyncHandler(resendVerificationEmail));
