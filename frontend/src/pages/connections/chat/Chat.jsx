import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { MessageScrollerProvider } from "@/components/ui/message-scroller";
import { useSocket } from "@/context/socketContext";
import { usePageVisible } from "@/hooks/usePageVisible";
import {
  addPendingMessage,
  confirmMessage,
  failMessage,
  markConversationRead,
  removeMessage,
  setActiveChatUserId,
} from "@/store/slices/chatSlice";
import { getMessages } from "@/store/thunks/chatThunk";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatComposer } from "./ChatComposer";

const EMPTY_THREAD = { messages: [], hasMore: false, nextCursor: null, status: "idle", loadingOlder: false }

let tempIdCounter = 0
// crypto.randomUUID needs a secure context, which the LAN dev server (vite --host) isn't
const createTempId = () => `temp-${Date.now()}-${++tempIdCounter}`

// the thread with one connection: header, messages and composer.
// mount it with key={userId} so switching chats starts fresh
export const Chat = ({ connection }) => {
  const { user } = connection
  const userId = user._id
  const dispatch = useDispatch()
  const { emitWithAck, emit } = useSocket()
  const isPageVisible = usePageVisible()

  const myId = useSelector((state) => state.user.user?._id)
  const thread = useSelector((state) => state.chat.threads[userId]) ?? EMPTY_THREAD
  const unread = useSelector((state) => state.chat.conversations[userId]?.unread ?? 0)
  const isTyping = useSelector((state) => Boolean(state.chat.typing[userId]))
  const { socketStatus, socketError } = useSelector((state) => state.chat)

  // mark this thread as open (its new messages don't count as unread) and fetch the latest page.
  // an already loaded thread is refreshed quietly and merged
  useEffect(() => {
    dispatch(setActiveChatUserId(userId))
    dispatch(getMessages({ userId }))
    return () => {
      dispatch(setActiveChatUserId(null))
    }
  }, [userId, dispatch])

  // read receipts: whenever there is something unread from them and the user can see it
  const hasUnreadFromThem = unread > 0 || thread.messages.some((m) => m.sender === userId && !m.readAt)
  useEffect(() => {
    if (!hasUnreadFromThem || !isPageVisible || socketStatus !== "connected") return

    emitWithAck("chat:read", { userId }).then((res) => {
      if (res?.success) {
        dispatch(markConversationRead({ userId, conversationId: res.conversationId, readAt: res.readAt }))
      }
    })
  }, [hasUnreadFromThem, isPageVisible, socketStatus, userId, emitWithAck, dispatch])

  const { hasMore, loadingOlder, nextCursor, status } = thread
  const loadOlder = useCallback(() => {
    if (status !== "loaded" || !hasMore || loadingOlder || !nextCursor) return
    dispatch(getMessages({ userId, before: nextCursor }))
  }, [status, hasMore, loadingOlder, nextCursor, userId, dispatch])

  // the sending socket only gets its message back through the ack
  const sendMessage = async (text) => {
    const tempId = createTempId()
    dispatch(addPendingMessage({ userId, tempId, text, sender: myId }))

    const res = await emitWithAck("chat:send", { toUserId: userId, text })
    if (res?.success) {
      dispatch(confirmMessage({ userId, tempId, message: res.message }))
    } else {
      const error = res?.message || "message not sent"
      dispatch(failMessage({ userId, tempId, error }))
      toast.error(error)
    }
  }

  const retryMessage = (message) => {
    dispatch(removeMessage({ userId, tempId: message.tempId }))
    sendMessage(message.text)
  }

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col">
      <ChatHeader user={user} isTyping={isTyping} />

      <MessageScrollerProvider autoScroll defaultScrollPosition="end">
        <ChatMessages
          thread={thread}
          myId={myId}
          otherUserName={user.name}
          isTyping={isTyping}
          onLoadOlder={loadOlder}
          onRetry={retryMessage}
          onReload={() => dispatch(getMessages({ userId }))}
        />
        <ChatComposer
          socketStatus={socketStatus}
          socketError={socketError}
          onSend={sendMessage}
          onTyping={() => emit("chat:typing", { toUserId: userId })}
        />
      </MessageScrollerProvider>
    </div>
  )
}
