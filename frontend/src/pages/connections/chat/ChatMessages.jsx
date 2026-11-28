import { useEffect, useMemo, useRef } from "react";
import { AlertCircle, Check, CheckCheck, Clock, RotateCw } from "lucide-react";
import { Bubble, BubbleContent, BubbleGroup } from "@/components/ui/bubble";
import { Marker, MarkerContent } from "@/components/ui/marker";
import { Message, MessageContent, MessageFooter } from "@/components/ui/message";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { buildThreadRows, formatDayLabel, formatTime } from "@/lib/chat-utils";
import { cn } from "@/lib/utils";

// start loading older messages when the user scrolls this close to the top
const LOAD_OLDER_OFFSET_PX = 150
const UNAVAILABLE_TEXT = "[message unavailable]"

// sent / seen ticks for our own messages
const MessageStatus = ({ message }) => {
  if (message.status === "pending") return <Clock className="size-3.5" aria-label="sending" />
  if (message.status === "failed") return null
  if (message.readAt) return <CheckCheck className="size-4 text-secondary" aria-label="seen" />
  return <Check className="size-4" aria-label="sent" />
}

const MessageGroup = ({ group, isMine, onRetry }) => {
  const last = group.messages[group.messages.length - 1]

  return (
    <Message align={isMine ? "end" : "start"} className="py-1.5">
      <MessageContent className="gap-1">
        {/* w-full: MessageContent sets self-end on its children for our own messages, which
            would shrink the group to its content and make the bubbles' max-w-% resolve
            against that tiny width, so sent bubbles wrapped much narrower than received ones */}
        <BubbleGroup className="w-full gap-1">
          {group.messages.map((message) => {
            const failed = message.status === "failed"
            const unavailable = message.text === UNAVAILABLE_TEXT

            return (
              <Bubble
                key={message._id}
                align={isMine ? "end" : "start"}
                variant={failed ? "destructive" : isMine ? "default" : "muted"}
                className={cn(message.status === "pending" && "opacity-60", "max-w-[85%] md:max-w-[70%]")}
              >
                <BubbleContent className={cn(unavailable && "italic text-muted-foreground")}>
                  {message.text}
                </BubbleContent>

                {failed && (
                  <span className="flex items-center gap-1 self-end text-xs text-destructive">
                    <AlertCircle className="size-3.5" />
                    {message.error || "not sent"}
                    <Button
                      variant="ghost"
                      size="xs"
                      className="h-5 cursor-pointer px-1 text-foreground hover:bg-white/10"
                      onClick={() => onRetry(message)}
                    >
                      <RotateCw /> retry
                    </Button>
                  </span>
                )}
              </Bubble>
            )
          })}
        </BubbleGroup>

        {last.status !== "failed" && (
          <MessageFooter className="gap-1 px-1">
            <time dateTime={last.createdAt}>{formatTime(last.createdAt)}</time>
            {isMine && <MessageStatus message={last} />}
          </MessageFooter>
        )}
      </MessageContent>
    </Message>
  )
}

const TypingBubble = () => (
  <Message align="start" className="py-1.5">
    <MessageContent>
      <Bubble variant="muted" aria-label="typing">
        <BubbleContent className="flex items-center gap-1 py-3">
          {[0, 150, 300].map((delay) => (
            <span
              key={delay}
              className="size-1.5 animate-bounce rounded-full bg-secondary shadow-[0_0_6px_var(--secondary)]"
              style={{ animationDelay: `${delay}ms` }}
            />
          ))}
        </BubbleContent>
      </Bubble>
    </MessageContent>
  </Message>
)

export const ChatMessages = ({ thread, myId, otherUserName, isTyping, onLoadOlder, onRetry, onReload }) => {
  const viewportRef = useRef(null)
  const rows = useMemo(() => buildThreadRows(thread.messages), [thread.messages])
  const { status, hasMore, loadingOlder } = thread

  const handleScroll = (e) => {
    if (e.currentTarget.scrollTop < LOAD_OLDER_OFFSET_PX) onLoadOlder()
  }

  // if the first page doesn't fill the viewport there is nothing to scroll, keep loading
  useEffect(() => {
    const viewport = viewportRef.current
    if (status === "loaded" && hasMore && !loadingOlder && viewport && viewport.scrollHeight <= viewport.clientHeight) {
      onLoadOlder()
    }
  }, [status, hasMore, loadingOlder, rows, onLoadOlder])

  if (status === "idle" || status === "loading") {
    return (
      <div className="flex flex-1 items-center justify-center text-muted-foreground">
        <Spinner className="size-6 text-secondary" />
      </div>
    )
  }

  if (status === "error") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 text-muted-foreground">
        <p>couldn't load messages</p>
        <Button variant="outline" className="cursor-pointer border-white/10" onClick={onReload}>
          <RotateCw /> try again
        </Button>
      </div>
    )
  }

  return (
    <MessageScroller className="flex-1">
      <MessageScrollerViewport ref={viewportRef} onScroll={handleScroll} className="px-3 md:px-5">
        <MessageScrollerContent className="py-4">
          {loadingOlder && (
            <div className="flex justify-center py-2">
              <Spinner className="text-secondary" />
            </div>
          )}

          {!hasMore && rows.length > 0 && (
            <Marker variant="separator" className="py-2 text-xs">
              <MarkerContent>start of your conversation</MarkerContent>
            </Marker>
          )}

          {rows.length === 0 && !isTyping && (
            <div className="m-auto flex flex-col items-center gap-1 text-center text-muted-foreground">
              <span className="text-4xl">👋</span>
              <p>
                say hi to <span className="text-bg capitalize">{otherUserName}</span>
              </p>
            </div>
          )}

          {rows.map((row) => (
            <MessageScrollerItem key={row.key} messageId={row.key}>
              {row.type === "day" ? (
                <Marker variant="separator" className="py-3 text-xs">
                  <MarkerContent className="rounded-full border border-white/10 bg-white/5 px-3 py-0.5">
                    {formatDayLabel(row.date)}
                  </MarkerContent>
                </Marker>
              ) : (
                <MessageGroup group={row} isMine={row.sender === myId} onRetry={onRetry} />
              )}
            </MessageScrollerItem>
          ))}

          {isTyping && (
            <MessageScrollerItem messageId="typing">
              <TypingBubble />
            </MessageScrollerItem>
          )}
        </MessageScrollerContent>
      </MessageScrollerViewport>

      <MessageScrollerButton direction="end" />
    </MessageScroller>
  )
}
