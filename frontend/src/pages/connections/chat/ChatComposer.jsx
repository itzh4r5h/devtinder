import { useRef, useState } from "react";
import { SendHorizontal, WifiOff } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { useMessageScroller } from "@/components/ui/message-scroller";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { MAX_MESSAGE_LENGTH, TYPING_THROTTLE_MS } from "@/lib/chat-utils";
import { cn } from "@/lib/utils";

// show the counter only when the user gets close to the limit
const COUNTER_FROM = MAX_MESSAGE_LENGTH - 200

const OFFLINE_NOTICE = {
  idle: "connecting to chat...",
  connecting: "connecting to chat...",
  disconnected: "you're offline, reconnecting...",
}

export const ChatComposer = ({ socketStatus, socketError, onSend, onTyping }) => {
  const [text, setText] = useState("")
  const lastTypingAt = useRef(0)
  const { scrollToEnd } = useMessageScroller()
  // on phones Enter adds a new line, sending is done with the button
  const isTouch = useMediaQuery("(pointer: coarse)")

  const isConnected = socketStatus === "connected"
  const notice = isConnected ? null : socketStatus === "unavailable" ? socketError : OFFLINE_NOTICE[socketStatus]
  const trimmed = text.trim()
  const canSend = isConnected && trimmed.length > 0 && trimmed.length <= MAX_MESSAGE_LENGTH

  const submit = () => {
    if (!canSend) return
    onSend(trimmed)
    setText("")
    lastTypingAt.current = 0
    requestAnimationFrame(() => scrollToEnd({ behavior: "smooth" }))
  }

  const handleChange = (e) => {
    const value = e.target.value
    setText(value)

    const now = Date.now()
    if (value.trim() && now - lastTypingAt.current > TYPING_THROTTLE_MS) {
      lastTypingAt.current = now
      onTyping()
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !isTouch && !e.nativeEvent.isComposing) {
      e.preventDefault()
      submit()
    }
  }

  return (
    <div className="flex flex-col gap-2 border-t border-white/10 p-3 md:px-5">
      {notice && (
        <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground" role="status">
          {socketStatus === "disconnected" ? <WifiOff className="size-4" /> : socketStatus !== "unavailable" && <Spinner />}
          {notice}
        </p>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault()
          submit()
        }}
      >
        <InputGroup className="rounded-2xl border-white/25 bg-white/5 dark:bg-white/5 has-disabled:bg-white/[0.03] dark:has-disabled:bg-white/[0.03] has-[[data-slot=input-group-control]:focus-visible]:border-secondary has-[[data-slot=input-group-control]:focus-visible]:ring-secondary/45 has-[[data-slot=input-group-control]:focus-visible]:shadow-[0_0_16px_oklch(0.627_0.265_303.9/0.45)]">
          <InputGroupTextarea
            value={text}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={!isConnected}
            maxLength={MAX_MESSAGE_LENGTH}
            autoFocus={!isTouch}
            rows={1}
            placeholder={isConnected ? "type a message..." : "chat is unavailable right now"}
            aria-label="message"
            className="min-h-11 max-h-36 px-4 py-3 text-base placeholder:text-neutral-400"
          />
          <InputGroupAddon align="inline-end" className="self-end pb-1.5">
            {text.length >= COUNTER_FROM && (
              <span
                className={cn(
                  "text-xs tabular-nums",
                  text.length >= MAX_MESSAGE_LENGTH ? "text-destructive" : "text-muted-foreground"
                )}
              >
                {MAX_MESSAGE_LENGTH - text.length}
              </span>
            )}
            <InputGroupButton
              type="submit"
              size="icon-sm"
              disabled={!canSend}
              aria-label="send message"
              className="button-bg cursor-pointer rounded-full text-foreground disabled:shadow-none"
            >
              <SendHorizontal />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </form>
    </div>
  )
}
