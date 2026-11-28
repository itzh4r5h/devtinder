import { CustomError } from "../middlewares/error-middleware.js";
import { Connection } from "../models/connection-model.js";
import { Conversation } from "../models/conversation-model.js";
import { Message } from "../models/message-model.js";
import { decryptMessage, encryptMessage } from "../utils/chat-encryption.js";

const UNAVAILABLE_MESSAGE = "[message unavailable]";

// same key for (a, b) and (b, a)
const getParticipantsKey = (a, b) => [a.toString(), b.toString()].sort().join("_");

const toMessageDto = (message, conversationId, text) => ({
  _id: message._id,
  conversationId,
  sender: message.sender,
  text: text ?? decryptMessage(message, conversationId) ?? UNAVAILABLE_MESSAGE,
  createdAt: message.createdAt,
  readAt: message.readAt ?? null,
});

// ==================================== ACCESS CONTROL ====================================
// chat is only allowed between two users with an accepted connection
export const assertConnected = async (userId, otherUserId) => {
  if (userId.toString() === otherUserId.toString()) {
    throw new CustomError("invalid req - same user", 400);
  }

  const connection = await Connection.exists({
    $or: [
      { fromUser: userId, toUser: otherUserId },
      { fromUser: otherUserId, toUser: userId },
    ],
    status: "accepted",
  });

  if (!connection) {
    throw new CustomError("you can only chat with your connections", 403);
  }
};

const findConversation = (userId, otherUserId) =>
  Conversation.findOne({ participantsKey: getParticipantsKey(userId, otherUserId) });

const getOrCreateConversation = async (userId, otherUserId) => {
  const participantsKey = getParticipantsKey(userId, otherUserId);
  const participants = participantsKey.split("_");

  try {
    return await Conversation.findOneAndUpdate(
      { participantsKey },
      { $setOnInsert: { participantsKey, participants } },
      { upsert: true, returnDocument: "after" },
    );
  } catch (error) {
    // two first messages at the same time - the other request created it, so just read it
    if (error.code === 11000) {
      return Conversation.findOne({ participantsKey });
    }
    throw error;
  }
};

// ==================================== SEND MESSAGE ====================================
export const sendMessage = async (senderId, toUserId, text) => {
  await assertConnected(senderId, toUserId);

  const conversation = await getOrCreateConversation(senderId, toUserId);
  const encrypted = encryptMessage(text, conversation._id, senderId);

  const message = await Message.create({
    conversation: conversation._id,
    sender: senderId,
    ...encrypted,
  });

  await Conversation.updateOne(
    { _id: conversation._id },
    {
      $set: {
        lastMessage: { sender: senderId, ...encrypted, createdAt: message.createdAt },
        lastMessageAt: message.createdAt,
      },
      $inc: { [`unread.${toUserId}`]: 1 },
    },
  );

  return toMessageDto(message, conversation._id, text);
};

// ==================================== GET MESSAGES (cursor pagination) ====================================
// returns messages oldest -> newest; pass nextCursor as `before` to load older ones
export const getMessages = async (userId, otherUserId, { before, limit }) => {
  await assertConnected(userId, otherUserId);

  const conversation = await findConversation(userId, otherUserId);
  if (!conversation) {
    return { conversationId: null, messages: [], hasMore: false, nextCursor: null };
  }

  const filter = { conversation: conversation._id };
  if (before) filter._id = { $lt: before };

  // hide everything this user cleared
  const clearedAt = conversation.clearedAt?.get(userId.toString());
  if (clearedAt) filter.createdAt = { $gt: clearedAt };

  const docs = await Message.find(filter)
    .sort({ _id: -1 })
    .limit(limit + 1)
    .lean();

  const hasMore = docs.length > limit;
  const page = docs.slice(0, limit).reverse();

  return {
    conversationId: conversation._id,
    messages: page.map((message) => toMessageDto(message, conversation._id)),
    hasMore,
    nextCursor: hasMore ? page[0]._id : null,
  };
};

// ==================================== LIST CONVERSATIONS ====================================
export const listConversations = async (userId) => {
  const conversations = await Conversation.find({
    participants: userId,
    lastMessageAt: { $ne: null },
  })
    .sort({ lastMessageAt: -1 })
    .populate("participants", "name profilePic role")
    .lean();

  const id = userId.toString();

  return conversations.map((conversation) => {
    const user = conversation.participants.find((p) => p._id.toString() !== id);
    const last = conversation.lastMessage;
    const clearedAt = conversation.clearedAt?.[id];
    const isLastCleared = last && clearedAt && last.createdAt <= clearedAt;

    return {
      conversationId: conversation._id,
      user,
      lastMessage: last && !isLastCleared
        ? {
          sender: last.sender,
          text: decryptMessage(last, conversation._id) ?? UNAVAILABLE_MESSAGE,
          createdAt: last.createdAt,
        }
        : null,
      unread: conversation.unread?.[id] ?? 0,
    };
  });
};

// ==================================== MARK AS READ ====================================
export const markRead = async (userId, otherUserId) => {
  await assertConnected(userId, otherUserId);

  const conversation = await findConversation(userId, otherUserId);
  if (!conversation) {
    return { conversationId: null, readAt: null };
  }

  const readAt = new Date();

  await Message.updateMany(
    { conversation: conversation._id, sender: otherUserId, readAt: null },
    { $set: { readAt } },
  );
  await Conversation.updateOne(
    { _id: conversation._id },
    { $set: { [`unread.${userId}`]: 0 } },
  );

  return { conversationId: conversation._id, readAt };
};

// ==================================== CLEAR CHAT (one-sided) ====================================
// hides every message up to now for this user only; once both users have cleared,
// messages neither of them can see anymore are deleted from the db
export const clearChat = async (userId, otherUserId) => {
  await assertConnected(userId, otherUserId);

  const clearedAt = new Date();

  const conversation = await Conversation.findOneAndUpdate(
    { participantsKey: getParticipantsKey(userId, otherUserId) },
    {
      $set: {
        [`clearedAt.${userId}`]: clearedAt,
        [`unread.${userId}`]: 0,
      },
    },
    { returnDocument: "after" },
  );

  if (!conversation) {
    return { conversationId: null, clearedAt: null };
  }

  const otherClearedAt = conversation.clearedAt?.get(otherUserId.toString());
  if (otherClearedAt) {
    // both cleared - nobody can see anything older than the earlier clear
    const cutoff = otherClearedAt < clearedAt ? otherClearedAt : clearedAt;

    await Message.deleteMany({ conversation: conversation._id, createdAt: { $lte: cutoff } });
    await Conversation.updateOne(
      { _id: conversation._id, "lastMessage.createdAt": { $lte: cutoff } },
      { $set: { lastMessage: null } },
    );
  }

  return { conversationId: conversation._id, clearedAt };
};
