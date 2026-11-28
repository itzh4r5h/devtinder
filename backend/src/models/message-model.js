import mongoose from "mongoose";

const { Schema } = mongoose;

// message text is never stored in plain text, only the AES-256-GCM output
const messageSchema = new Schema(
  {
    conversation: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
      required: [true, "conversation is required"],
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "sender is required"],
    },
    ciphertext: {
      type: String,
      required: [true, "ciphertext is required"],
    },
    iv: {
      type: String,
      required: [true, "iv is required"],
    },
    authTag: {
      type: String,
      required: [true, "auth tag is required"],
    },
    // which master key encrypted this message, allows key rotation later
    keyVersion: {
      type: Number,
      default: 1,
    },
    readAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

// cursor pagination: newest first inside a conversation
messageSchema.index({ conversation: 1, _id: -1 });

export const Message = mongoose.model("Message", messageSchema);
