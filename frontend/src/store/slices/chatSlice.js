import { createSlice } from "@reduxjs/toolkit";
import { buildCases } from "../handlers";
import { getConversations, getMessages } from "../thunks/chatThunk";
import { signout } from "../thunks/authThunk";

const emptyThread = () => ({
  messages: [],
  hasMore: false,
  nextCursor: null,
  // idle | loading | loaded | error
  status: "idle",
  loadingOlder: false,
  // messages at or before this were cleared by us (one-sided clear chat)
  clearedAt: null,
  // the in-flight "load older" request, a clear chat cancels it
  olderRequestId: null,
})

const initialState = {
  // keyed by the other user's id: { conversationId, lastMessage, unread }
  conversations: {},
  conversationsLoaded: false,
  // conversationId -> other user's id, socket events only carry the conversationId
  conversationUsers: {},
  // keyed by the other user's id
  threads: {},
  // other user's id -> true while they are typing
  typing: {},
  // connection's user id -> { online, lastSeenAt }
  presence: {},
  // the thread that is open on screen, new messages there don't count as unread
  activeChatUserId: null,
  // idle | connecting | connected | disconnected | unavailable
  socketStatus: "idle",
  // reason shown when socketStatus is "unavailable"
  socketError: null,
}

const getThread = (state, userId) => {
  if (!state.threads[userId]) state.threads[userId] = emptyThread()
  return state.threads[userId]
}

const getConversation = (state, userId, conversationId) => {
  if (!state.conversations[userId]) {
    state.conversations[userId] = { conversationId, lastMessage: null, unread: 0 }
  }
  const conversation = state.conversations[userId]
  if (conversationId) {
    conversation.conversationId = conversationId
    state.conversationUsers[conversationId] = userId
  }
  return conversation
}

const isPending = (message) => Boolean(message.tempId)

// merges messages into a thread: no duplicates (newer copy wins, e.g. readAt set),
// sorted oldest -> newest, unsent (pending / failed) messages always stay at the bottom
const mergeMessages = (current, incoming) => {
  const byId = new Map()
  current.filter((m) => !isPending(m)).forEach((m) => byId.set(m._id, m))
  incoming.forEach((m) => byId.set(m._id, m))

  const sent = [...byId.values()].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
  return [...sent, ...current.filter(isPending)]
}

// drops messages a fetch started before a clear chat may still bring back
const afterClear = (messages, clearedAt) =>
  clearedAt ? messages.filter((m) => new Date(m.createdAt) > new Date(clearedAt)) : messages

const setLastMessage = (conversation, message) => {
  const current = conversation.lastMessage
  if (!current || new Date(message.createdAt) >= new Date(current.createdAt)) {
    conversation.lastMessage = { sender: message.sender, text: message.text, createdAt: message.createdAt }
  }
}

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSocketStatus: (state, action) => {
      const { status, error = null } = action.payload
      state.socketStatus = status
      state.socketError = error
    },
    setActiveChatUserId: (state, action) => {
      state.activeChatUserId = action.payload
      if (action.payload) {
        state.typing[action.payload] = state.typing[action.payload] ?? false
      }
    },
    setTyping: (state, action) => {
      const { userId, typing } = action.payload
      state.typing[userId] = typing
    },

    // optimistic message shown while chat:send waits for its ack
    addPendingMessage: (state, action) => {
      const { userId, tempId, text, sender } = action.payload
      getThread(state, userId).messages.push({
        _id: tempId,
        tempId,
        conversationId: state.conversations[userId]?.conversationId ?? null,
        sender,
        text,
        createdAt: new Date().toISOString(),
        readAt: null,
        status: "pending",
      })
    },
    // chat:send ack succeeded, swap the pending message for the saved one
    confirmMessage: (state, action) => {
      const { userId, tempId, message } = action.payload
      const thread = getThread(state, userId)
      thread.messages = mergeMessages(
        thread.messages.filter((m) => m.tempId !== tempId),
        [message]
      )
      setLastMessage(getConversation(state, userId, message.conversationId), message)
    },
    failMessage: (state, action) => {
      const { userId, tempId, error } = action.payload
      const message = getThread(state, userId).messages.find((m) => m.tempId === tempId)
      if (message) {
        message.status = "failed"
        message.error = error
      }
    },
    removeMessage: (state, action) => {
      const { userId, tempId } = action.payload
      const thread = getThread(state, userId)
      thread.messages = thread.messages.filter((m) => m.tempId !== tempId)
    },

    // chat:message - from the other user, or our own message sent from another tab
    messageReceived: (state, action) => {
      const { message, myId } = action.payload
      const isMine = message.sender === myId
      const otherUserId = isMine ? state.conversationUsers[message.conversationId] : message.sender

      // our own message from another tab in a conversation this tab doesn't know yet,
      // the socket provider refetches /conversations for this case
      if (!otherUserId) return

      const conversation = getConversation(state, otherUserId, message.conversationId)
      setLastMessage(conversation, message)

      if (!isMine) {
        state.typing[otherUserId] = false
        if (state.activeChatUserId !== otherUserId) conversation.unread += 1
      }

      // a thread exists once it was fetched (or is being fetched - merging dedupes against
      // the response), a thread never opened gets the message with its first fetch
      const thread = state.threads[otherUserId]
      if (thread) {
        thread.messages = mergeMessages(thread.messages, [message])
      }
    },

    // chat:read - the other user read our messages, or we read theirs in another tab
    messagesRead: (state, action) => {
      const { conversationId, userId: readerId, readAt, myId } = action.payload
      const otherUserId = readerId === myId ? state.conversationUsers[conversationId] : readerId
      if (!otherUserId) return

      if (readerId === myId) {
        const conversation = state.conversations[otherUserId]
        if (conversation) conversation.unread = 0
      }

      // whoever read, the messages that were sent TO the reader are now read
      const thread = state.threads[otherUserId]
      thread?.messages.forEach((m) => {
        if (!m.readAt && !isPending(m) && m.sender !== readerId) m.readAt = readAt
      })
    },
    // ack of our own chat:read
    markConversationRead: (state, action) => {
      const { userId, conversationId, readAt } = action.payload
      const conversation = state.conversations[userId]
      if (conversation) conversation.unread = 0
      if (conversationId) state.conversationUsers[conversationId] = userId

      state.threads[userId]?.messages.forEach((m) => {
        if (!m.readAt && !isPending(m) && m.sender === userId) m.readAt = readAt
      })
    },

    // ack of our own chat:clear, or chat:cleared from our other tabs (only has conversationId)
    chatCleared: (state, action) => {
      const { conversationId, clearedAt } = action.payload
      const userId = action.payload.userId ?? state.conversationUsers[conversationId]
      if (!userId || !clearedAt) return

      const conversation = getConversation(state, userId, conversationId)
      conversation.lastMessage = null
      conversation.unread = 0

      const thread = getThread(state, userId)
      thread.clearedAt = clearedAt
      thread.messages = thread.messages.filter((m) => isPending(m) || new Date(m.createdAt) > new Date(clearedAt))
      // older pages are all cleared now
      thread.hasMore = false
      thread.nextCursor = null
      thread.loadingOlder = false
      thread.olderRequestId = null
    },

    // presence:list ack, the full state for all connections
    setPresenceList: (state, action) => {
      const presence = {}
      action.payload.forEach(({ userId, online, lastSeenAt }) => {
        presence[userId] = { online, lastSeenAt }
      })
      state.presence = presence
    },
    presenceChanged: (state, action) => {
      const { userId, online, lastSeenAt } = action.payload
      const current = state.presence[userId]
      state.presence[userId] = {
        online,
        lastSeenAt: lastSeenAt ?? current?.lastSeenAt ?? null,
      }
    },

    resetChat: () => initialState,
  },
  extraReducers: (builder) => {
    buildCases(builder, getConversations, {
      fulfilled: (state, action) => {
        const conversations = {}
        action.payload.forEach(({ conversationId, user, lastMessage, unread }) => {
          conversations[user._id] = { conversationId, lastMessage, unread }
          state.conversationUsers[conversationId] = user._id
        })
        state.conversations = conversations
        state.conversationsLoaded = true
      },
    })

    buildCases(builder, getMessages, {
      pending: (state, action) => {
        const { userId, before } = action.meta.arg
        const thread = getThread(state, userId)
        if (before) {
          thread.loadingOlder = true
          thread.olderRequestId = action.meta.requestId
        }
        // a refetch of an already loaded thread (e.g. after reconnect) stays quiet
        else if (thread.status !== "loaded") thread.status = "loading"
      },
      fulfilled: (state, action) => {
        const { userId, before } = action.meta.arg
        const { conversationId, messages, hasMore, nextCursor } = action.payload
        const thread = getThread(state, userId)

        // an older page requested before a clear chat only holds cleared messages
        if (before) {
          if (thread.olderRequestId !== action.meta.requestId) return
          thread.olderRequestId = null
          thread.loadingOlder = false
        }

        thread.messages = mergeMessages(thread.messages, afterClear(messages, thread.clearedAt))
        // the cursor only moves when paging up or on the first load,
        // a refresh of the latest page must not lose the older pages' cursor
        if (before || thread.status !== "loaded") {
          thread.hasMore = hasMore
          thread.nextCursor = nextCursor
        }
        thread.status = "loaded"

        if (conversationId) getConversation(state, userId, conversationId)
      },
      rejected: (state, action) => {
        const { userId, before } = action.meta.arg
        const thread = getThread(state, userId)
        if (before) {
          if (thread.olderRequestId === action.meta.requestId) {
            thread.loadingOlder = false
            thread.olderRequestId = null
          }
        } else if (thread.status !== "loaded") {
          thread.status = "error"
        }
      },
    })

    buildCases(builder, signout, {
      fulfilled: () => initialState,
    })
  },
})

export const {
  setSocketStatus,
  setActiveChatUserId,
  setTyping,
  addPendingMessage,
  confirmMessage,
  failMessage,
  removeMessage,
  messageReceived,
  messagesRead,
  markConversationRead,
  chatCleared,
  setPresenceList,
  presenceChanged,
  resetChat,
} = chatSlice.actions
export const chatReducer = chatSlice.reducer
