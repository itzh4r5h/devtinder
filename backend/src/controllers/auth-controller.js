import { CustomError } from "../middlewares/error-middleware.js";
import { User } from "../models/user-model.js";
import { signinValidator, signupValidator, verifyEmailValidator } from "../joi-validators/auth-validators.js";
import { profileCompletion } from "../utils/profileCompletion.js";
import { sendEmail } from "../utils/sendEmail.js";
import { emailVerification } from "../email-templates/email-verification.js";
import crypto from "crypto";

const FIFTEEN_MINS = 15 * 60 * 1000;
const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;
// minimum gap between two verification emails for the same account
const RESEND_COOLDOWN = 60 * 1000;

// creates a random token for the email link and returns it with its sha256 hash
// only the hash is stored in db, the raw token goes in the email
const generateVerificationToken = () => {
  const token = crypto.randomBytes(32).toString("hex");
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  return { token, tokenHash };
};

// sends the verification email, throws CustomError if resend fails
const sendVerificationEmail = async (user, token) => {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
  const resendUrl = `${process.env.FRONTEND_URL}/resend-verification`;

  const error = await sendEmail({
    from: "no-reply",
    to: user.email,
    subject: "Verify your DevTinder account",
    htmlBody: emailVerification({ name: user.name, verificationUrl, resendUrl }),
  });

  if (error) {
    throw new CustomError("failed to send verification email, please try again", 500);
  }
};

// mongo filter that matches users whose cooldown has passed (or who never got an email)
const cooldownPassedFilter = (now) => ({
  $or: [
    { lastVerificationSent: { $exists: false } },
    { lastVerificationSent: { $lte: new Date(now - RESEND_COOLDOWN) } },
  ],
});

// throws a 429 with how long the user has to wait, also sets the Retry-After header
const throwCooldownError = (lastVerificationSent, now, res) => {
  const waitMs = (lastVerificationSent?.getTime() ?? now) + RESEND_COOLDOWN - now;
  const waitSecs = Math.max(1, Math.ceil(waitMs / 1000));
  res.set("Retry-After", String(waitSecs));
  throw new CustomError(`please wait ${waitSecs} seconds before requesting a new link`, 429);
};

const setTokenInCookie = (user, res) => {
  const token = user.generateJWT();

  const ONE_MIN = 60 * 1000;
  const ONE_HOUR = 60 * ONE_MIN;
  const ONE_DAY = 24 * ONE_HOUR;

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'prod' ? true : false,
    sameSite: 'lax',
    maxAge: ONE_DAY,
  });
};

const removePasswordFromUser = (user) => {
  const userData = user.toObject();
  delete userData.password;
  delete userData.verificationTokenHash;

  return userData;
};

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  // will get either error message or undefined
  const errorMessage = signupValidator({ name, email, password });

  if (errorMessage) {
    throw new CustomError(errorMessage, 400);
  }

  let user = await User.findOne({ email });

  if (user?.isVerified) {
    throw new CustomError("account already exists", 409);
  }

  const { token, tokenHash } = generateVerificationToken();
  const now = Date.now();
  const verificationFields = {
    verificationTokenHash: tokenHash,
    tokenExpiration: new Date(now + FIFTEEN_MINS),
    lastVerificationSent: new Date(now),
  };

  if (user) {
    // rate limit: claim the send slot first, in one query, so repeated or parallel
    // signups can't send more than one email per cooldown (or change the password)
    const claimed = await User.findOneAndUpdate(
      { _id: user._id, isVerified: false, ...cooldownPassedFilter(now) },
      { lastVerificationSent: new Date(now) },
    );

    if (!claimed) {
      const latest = await User.findById(user._id);

      if (latest?.isVerified) {
        throw new CustomError("account already exists", 409);
      }

      throwCooldownError(latest?.lastVerificationSent, now, res);
    }

    // email exists but was never verified, so overwrite it with the new signup details
    user.set({
      name,
      password, // re-hashed by the pre save hook
      ...verificationFields,
      unverifiedExpiresAt: new Date(now + SEVEN_DAYS),
    });
    await user.save();
  } else {
    user = await User.create({ name, email, password, ...verificationFields });
  }

  await sendVerificationEmail(user, token);

  // no cookie here, the user gets logged in only after verifying the email
  res.status(201).json({
    success: true,
    message: 'verification link sent, check your email!',
    // seconds until another email can be requested, lets the frontend show a countdown
    retryAfter: RESEND_COOLDOWN / 1000,
  });
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  const errorMessage = signinValidator({ email, password });

  if (errorMessage) {
    throw new CustomError(errorMessage, 400);
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new CustomError("invalid credentials", 401);
  }

  const isPasswordValid = await user.verifyPassword(password);

  if (!isPasswordValid) {
    throw new CustomError("invalid credentials", 401);
  }

  const userData = removePasswordFromUser(user);
  const { profileCompletionCount } = profileCompletion(userData)
  userData.profileCompletionCount = profileCompletionCount

  setTokenInCookie(user, res);
  res.status(200).json({
    success: true,
    message: 'signed in successfully',
    user: userData
  });
};

export const signout = async (req, res) => {
  res.clearCookie('token', { httpOnly: true })

  res.status(200).json({
    success: true,
    message: 'signed out successfully'
  })
}

export const verifyEmail = async (req, res) => {
  const { token } = req.body;

  const errorMessage = verifyEmailValidator({ token });

  if (errorMessage) {
    throw new CustomError(errorMessage, 400);
  }

  // only the hash is stored in db, so hash the token from the link to look the user up
  const tokenHash = crypto.createHash("sha256").update(token.trim()).digest("hex");

  const user = await User.findOne({ verificationTokenHash: tokenHash });

  if (!user) {
    throw new CustomError("invalid or already used verification link", 400);
  }

  if (!user.tokenExpiration || user.tokenExpiration.getTime() < Date.now()) {
    throw new CustomError("verification link expired, please request a new one", 400);
  }

  // mark as verified and clear the token fields, unsetting unverifiedExpiresAt
  // also keeps the user safe from the ttl index
  user.isVerified = true;
  user.verificationTokenHash = undefined;
  user.tokenExpiration = undefined;
  user.unverifiedExpiresAt = undefined;
  await user.save();

  const userData = removePasswordFromUser(user);
  const { profileCompletionCount } = profileCompletion(userData)
  userData.profileCompletionCount = profileCompletionCount

  // verifying the email logs the user in
  setTokenInCookie(user, res);
  res.status(200).json({
    success: true,
    message: "email verified successfully",
    user: userData
  });
};
