import mongoose from "mongoose";

const { Schema } = mongoose;

// encrypted copy of the latest message, so the conversation list needs no extra query per row
const lastMessageSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User" },
    ciphertext: String,
    iv: String,
    authTag: String,
    keyVersion: Number,
    createdAt: Date,
  },
  { _id: false },
);

const conversationSchema = new Schema(
  {
    // always exactly 2 users, stored sorted by id
    participants: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      required: [true, "participants are required"],
      validate: {
        validator: (value) => value.length === 2,
        message: "conversation must have exactly 2 participants",
      },
    },
    // "<smallerId>_<largerId>" - unique, so a pair can only ever have one conversation
    participantsKey: {
      type: String,
      required: [true, "participants key is required"],
    },
    lastMessage: {
      type: lastMessageSchema,
      default: null,
    },
    lastMessageAt: {
      type: Date,
      default: null,
    },
    // unread message count per participant, keyed by user id
    unread: {
      type: Map,
      of: Number,
      default: {},
    },
  },
  { timestamps: true },
);

conversationSchema.index({ participantsKey: 1 }, { unique: true });
conversationSchema.index({ participants: 1, lastMessageAt: -1 });

export const Conversation = mongoose.model("Conversation", conversationSchema);
