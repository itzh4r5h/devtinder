import { httpReq } from "@/api/httpReq";
import { asyncThunkHandler } from "../handlers";
import { MESSAGES_PAGE_SIZE } from "@/lib/chat-utils";

// conversations that have at least one message, newest first
export const getConversations = asyncThunkHandler("chat/get_conversations", async () => {
  const res = await httpReq.get("/chat/conversations")
  return { data: res.data.conversations }
})

// one page of messages with a user (oldest -> newest).
// pass `before` (the previous nextCursor) to load older messages
export const getMessages = asyncThunkHandler("chat/get_messages", async ({ userId, before }) => {
  const res = await httpReq.get(`/chat/${userId}/messages`, {
    params: { limit: MESSAGES_PAGE_SIZE, ...(before ? { before } : {}) },
  })
  const { conversationId, messages, hasMore, nextCursor } = res.data
  return { data: { conversationId, messages, hasMore, nextCursor } }
})
