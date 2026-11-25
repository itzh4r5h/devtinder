import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const { Schema } = mongoose;

const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

const hideResetOtpFields = (doc, ret) => {
  delete ret.resetPasswordOtpHash;
  delete ret.resetPasswordOtpExpiration;
  delete ret.resetPasswordOtpAttempts;
  delete ret.lastResetOtpSent;
  delete ret.passwordChangedAt;
  return ret;
};

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      minLength: [3, "name must be at least 3 characters"],
      maxLength: [20, "name cannot exceed 20 characters"],
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "account already exists"],
      maxLength: [254, "email is too long"],
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, "invalid email"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      select: false,
    },
    profilePic: {
      url: {
        type: String,
        required: [true, "profile pic url is required"],
        default: 'none'
      },
      fileId: {
        type: String,
        required: [true, "profile pic file id is required"],
        default: 'none'
      },
    },
    role: {
      type: String,
      trim: true,
      lowercase: true,
      minLength: [2, 'role must be at least 2 characters'],
      maxLength: [40, "role can't exceed 500 characters"]
    },
    experience: {
      type: String,
      trim: true,
      lowercase: true,
      enum: {
        values: ['beginner', 'intermediate', 'advanced', 'expert'],
        message: "experience must be beginner or intermediate or advanced or expert",
      },
    },
    connections: {
      type: Number,
      default: 0,
      min: [0, "connections can't be less than 0"]
    },
    age: {
      type: Number,
      min: [11, "age must be between 11-100"],
      max: [100, "age must be between 11-100"],
    },
    gender: {
      type: String,
      trim: true,
      lowercase: true,
      enum: {
        values: ["male", "female", "others"],
        message: "gender must be male or female or others",
      },
    },
    description: {
      type: String,
      trim: true,
      lowercase: true,
      minLength: [50, 'description must be at least 50 characters'],
      maxLength: [500, "description can't exceed 500 characters"]
    },
    tags: {
      type: [
        {
          type: String,
          maxLength: [30, "tag name can't exceed 30 characters"],
          minLength: [1, "tag name must be at least 1 character"],
          trim: true,
          lowercase: true,
        },
      ],
      validate: {
        validator: function(value) {
          return value.length <= 15;
        },
        message: "maximum 15 tags are allowed",
      },
    },
    socials: {
      github: {
        type: String,
        maxLength: [40, "github username can't exceed 40 characters"],
        minLength: [1, "github username must be at least 1 character"],
        trim: true,
        lowercase: true,
      },
      linkedin: {
        type: String,
        maxLength: [100, "linkedin username can't exceed 100 characters"],
        minLength: [3, "linkedin username must be at least 3 character"],
        trim: true,
        lowercase: true,
      },
      x: {
        type: String,
        maxLength: [15, "x username can't exceed 15 characters"],
        minLength: [1, "x username must be at least 1 character"],
        trim: true,
        lowercase: true,
      },
    },
    isProfileCompleted: {
      type: Boolean,
      default: false,
    },

    // ---------- email verification ----------
    isVerified: {
      type: Boolean,
      default: false,
    },
    // sha256 hash of the token sent in the email (raw token is never stored)
    verificationTokenHash: {
      type: String,
      select: false,
    },
    // when the current verification token stops being valid
    tokenExpiration: {
      type: Date,
    },
    // when the last verification email was sent, used for rate limiting resends
    lastVerificationSent: {
      type: Date,
    },
    // deadline to verify the account; the TTL index below deletes the user
    // once this date passes, but only while isVerified is false
    unverifiedExpiresAt: {
      type: Date,
      default: () => new Date(Date.now() + SEVEN_DAYS),
    },

    // ---------- forgot password ----------
    // sha256 hash of the 6 character otp sent in the email (raw otp is never stored)
    resetPasswordOtpHash: {
      type: String,
      select: false,
    },
    // when the current reset otp stops being valid
    resetPasswordOtpExpiration: {
      type: Date,
      select: false,
    },
    // wrong otp attempts for the current otp, stops brute forcing it
    resetPasswordOtpAttempts: {
      type: Number,
      default: 0,
      select: false,
    },
    // when the last reset otp email was sent, used for rate limiting
    lastResetOtpSent: {
      type: Date,
      select: false,
    },
    // when the password was last reset, tokens issued before this are rejected
    passwordChangedAt: {
      type: Date,
      select: false,
    },
  }
  ,
  {
    timestamps: true,
    // never send the reset otp fields in any response, even if they were selected
    toJSON: { transform: hideResetOtpFields },
    toObject: { transform: hideResetOtpFields },
  },
);

// TTL index: delete users who haven't verified their email by unverifiedExpiresAt.
// partialFilterExpression keeps verified users out of the index, so they are never deleted.
userSchema.index(
  { unverifiedExpiresAt: 1 },
  {
    expireAfterSeconds: 0,
    partialFilterExpression: { isVerified: false },
  },
);

// hash the password before saving in DB
userSchema.pre("save", async function() {
  // if password is not modified then no need for hashing
  if (!this.isModified("password")) return;

  const hashedPassword = await bcrypt.hash(this.password, 12);
  this.password = hashedPassword;
});

// methods
userSchema.methods.verifyPassword = async function(passwordByUser) {
  const isPasswordValid = await bcrypt.compare(passwordByUser, this.password);
  return isPasswordValid;
};

userSchema.methods.generateJWT = function() {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return token
};


// true if the jwt was issued before the password was last changed
// iat is in seconds, so compare in seconds too (a token from the same second still passes)
userSchema.methods.isTokenIssuedBeforePasswordChange = function(tokenIssuedAt) {
  if (!this.passwordChangedAt) return false;
  return tokenIssuedAt < Math.floor(this.passwordChangedAt.getTime() / 1000);
};

export const User = mongoose.model("User", userSchema);
