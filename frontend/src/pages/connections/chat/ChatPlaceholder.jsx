import { MessagesSquare } from "lucide-react";

// desktop right pane when no connection is selected
export const ChatPlaceholder = () => (
  <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center text-muted-foreground">
    <MessagesSquare className="size-14 active-icon" strokeWidth={1.5} />
    <h3 className="text-2xl text-bg">your messages</h3>
    <p>pick a connection on the left to start chatting</p>
  </div>
)
