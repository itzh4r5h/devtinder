import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { MessageSquareX } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useSocket } from "@/context/socketContext";
import { chatCleared } from "@/store/slices/chatSlice";

// confirm + clear the chat with `user`, only for us (the other person keeps everything)
export const ClearChatDialog = ({ user, open, onOpenChange }) => {
  const dispatch = useDispatch()
  const { emitWithAck } = useSocket()
  const isConnected = useSelector((state) => state.chat.socketStatus === "connected")
  const [clearing, setClearing] = useState(false)

  const handleClear = async () => {
    setClearing(true)
    const res = await emitWithAck("chat:clear", { userId: user._id })
    setClearing(false)

    if (!res?.success) {
      toast.error(res?.message || "couldn't clear the chat")
      return
    }
    // conversationId / clearedAt are null when there was nothing to clear
    if (res.clearedAt) {
      dispatch(chatCleared({ userId: user._id, conversationId: res.conversationId, clearedAt: res.clearedAt }))
    }
    onOpenChange(false)
    toast.success("chat cleared")
  }

  return (
    <AlertDialog open={open} onOpenChange={(next) => !clearing && onOpenChange(next)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/15 text-destructive">
            <MessageSquareX />
          </AlertDialogMedia>
          <AlertDialogTitle className="text-lg">
            Clear chat with <span className="capitalize">{user.name}</span>?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This clears the chat only for you. <span className="capitalize">{user.name}</span> will still see all messages.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={clearing}
            className="cursor-pointer border-white/10 bg-transparent hover:bg-white/5 dark:bg-transparent dark:hover:bg-white/5"
          >
            cancel
          </AlertDialogCancel>
          <Button
            onClick={handleClear}
            disabled={clearing || !isConnected}
            className="cursor-pointer bg-red-600 font-bold text-foreground hover:bg-red-600/80"
          >
            {clearing && <Spinner />}
            {isConnected ? "clear" : "offline"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
