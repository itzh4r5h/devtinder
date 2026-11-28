import { useCallback, useEffect, useEffectEvent, useMemo, useRef } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { createSocket } from "@/api/socket";
import { httpReq } from "@/api/httpReq";
import { SocketContext } from "./socketContext";
import { setIsLoggedIn } from "@/store/slices/authSlice";
import { clearUser } from "@/store/slices/userSlice";
import {
  messageReceived,
  messagesRead,
  resetChat,
  setSocketStatus,
  setTyping,
} from "@/store/slices/chatSlice";
import { getConversations, getMessages } from "@/store/thunks/chatThunk";
import { TYPING_TIMEOUT_MS } from "@/lib/chat-utils";

const ACK_TIMEOUT_MS = 10 * 1000

// one socket per logged in session. it lives here (not in redux, it isn't serializable),
// redux only holds what the ui renders: socket status, conversations, threads, typing
export const SocketProvider = ({ children }) => {
  const dispatch = useDispatch()
  const store = useStore()
  const navigate = useNavigate()
  const socketRef = useRef(null)

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const myId = useSelector((state) => state.user.user?._id)
  const isProfileCompleted = useSelector((state) => state.user.user?.isProfileCompleted)

  // the backend refuses the handshake for an incomplete profile anyway
  const canChat = Boolean(isLoggedIn && myId && isProfileCompleted)

  const onSessionExpired = useEffectEvent((message) => {
    toast.error(message || "session expired, please signin!")
    // logging out here also tears the socket down (canChat becomes false)
    dispatch(setIsLoggedIn(false))
    dispatch(clearUser())
    navigate("/signin", { replace: true })
  })

  useEffect(() => {
    if (!canChat) return

    const socket = createSocket()
    socketRef.current = socket
    const typingTimers = new Map()
    let hasConnected = false
    // set on cleanup, so an async handler can't revive a torn down socket
    let disposed = false

    const clearTypingTimer = (userId) => {
      clearTimeout(typingTimers.get(userId))
      typingTimers.delete(userId)
    }

    // events sent while we were offline are lost, so fetch the latest state again
    const resync = () => {
      dispatch(getConversations())
      const { activeChatUserId } = store.getState().chat
      if (activeChatUserId) dispatch(getMessages({ userId: activeChatUserId }))
    }

    socket.on("connect", () => {
      dispatch(setSocketStatus({ status: "connected" }))
      if (hasConnected) resync()
      hasConnected = true
    })

    socket.on("connect_error", (err) => {
      // socket.active is false when the server's auth middleware refused us,
      // socket.io won't retry on its own then. network errors keep retrying
      if (socket.active) {
        dispatch(setSocketStatus({ status: "disconnected" }))
        return
      }
      if (err.data?.statusCode === 403) {
        // e.g. "please, complete your profile first" - shown on the composer, not retried
        dispatch(setSocketStatus({ status: "unavailable", error: err.message }))
        return
      }
      onSessionExpired(err.message)
    })

    socket.on("disconnect", async (reason) => {
      dispatch(setSocketStatus({ status: "disconnected" }))
      // the server drops the socket when the jwt expires, check if the session is still valid
      if (reason === "io server disconnect") {
        try {
          await httpReq.get("/users/me")
          if (!disposed) socket.connect()
        } catch {
          if (!disposed) onSessionExpired()
        }
      }
    })

    socket.on("chat:message", (message) => {
      const { conversationUsers } = store.getState().chat
      const isMine = message.sender === myId

      if (!isMine) clearTypingTimer(message.sender)

      // our own message from another tab in a conversation this tab doesn't know yet
      if (isMine && !conversationUsers[message.conversationId]) {
        dispatch(getConversations()).then(() => dispatch(messageReceived({ message, myId })))
        return
      }
      dispatch(messageReceived({ message, myId }))
    })

    socket.on("chat:typing", ({ userId }) => {
      dispatch(setTyping({ userId, typing: true }))
      clearTypingTimer(userId)
      typingTimers.set(
        userId,
        setTimeout(() => {
          typingTimers.delete(userId)
          dispatch(setTyping({ userId, typing: false }))
        }, TYPING_TIMEOUT_MS)
      )
    })

    socket.on("chat:read", (event) => {
      dispatch(messagesRead({ ...event, myId }))
    })

    dispatch(setSocketStatus({ status: "connecting" }))
    dispatch(getConversations())
    socket.connect()

    return () => {
      disposed = true
      typingTimers.forEach(clearTimeout)
      socket.removeAllListeners()
      socket.disconnect()
      socketRef.current = null
      dispatch(resetChat())
    }
  }, [canChat, myId, dispatch, store])

  // resolves with the server's ack ({ success, ... }), never rejects
  const emitWithAck = useCallback(
    (event, payload) =>
      new Promise((resolve) => {
        const socket = socketRef.current
        if (!socket?.connected) {
          resolve({ success: false, message: "you are offline, reconnecting..." })
          return
        }
        socket.timeout(ACK_TIMEOUT_MS).emit(event, payload, (err, res) => {
          resolve(err ? { success: false, message: "server didn't respond, try again" } : res)
        })
      }),
    []
  )

  // fire and forget (typing), dropped while offline
  const emit = useCallback((event, payload) => {
    const socket = socketRef.current
    if (socket?.connected) socket.volatile.emit(event, payload)
  }, [])

  const value = useMemo(() => ({ emitWithAck, emit }), [emitWithAck, emit])

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
}
