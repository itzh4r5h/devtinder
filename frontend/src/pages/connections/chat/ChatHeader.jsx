import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatLastSeen, getInitials } from "@/lib/chat-utils";
import { usePresence } from "@/hooks/usePresence";
import { useNow } from "@/hooks/useNow";
import { ArrowLeft, EllipsisVertical, MessageSquareX, UserIcon } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { OnlineDot } from "./OnlineDot";
import { ClearChatDialog } from "./ClearChatDialog";

// typing > online > last seen > role
const Status = ({ user, isTyping }) => {
  const { online, lastSeenAt } = usePresence(user._id)
  const now = useNow()

  if (isTyping) return <span className="text-sm text-secondary">typing...</span>
  if (online) return <span className="text-sm text-green-500">online</span>
  if (lastSeenAt) return <span className="truncate text-sm text-muted-foreground">{formatLastSeen(lastSeenAt, now)}</span>
  if (user.role) return <span className="truncate text-sm text-muted-foreground capitalize">{user.role}</span>
  return null
}

export const ChatHeader = ({ user, isTyping }) => {
  const { online } = usePresence(user._id)
  const navigate = useNavigate()
  const [clearOpen, setClearOpen] = useState(false)

  return (
    <header className="flex items-center gap-3 border-b border-white/10 px-3 py-3 md:px-5">
      {/* the list and the thread take turns on mobile */}
      <Link
        to="/connections"
        aria-label="back to connections"
        className={buttonVariants({ variant: "ghost", size: "icon", className: "md:hidden rounded-full hover:bg-white/5" })}
      >
        <ArrowLeft className="size-5" />
      </Link>

      <Link to={`/connections/profile/${user._id}`} className="flex min-w-0 flex-1 items-center gap-3">
        <Avatar className="size-11">
          <AvatarImage src={user.profilePic?.url} alt={user.name} />
          <AvatarFallback className="bg-neutral-800 text-foreground uppercase">
            {getInitials(user.name)}
          </AvatarFallback>
          {online && <OnlineDot className="size-3!" />}
        </Avatar>

        <div className="flex min-w-0 flex-col">
          <h3 className="truncate text-lg capitalize leading-tight">{user.name}</h3>
          <Status user={user} isTyping={isTyping} />
        </div>
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <button aria-label="chat options" className="cursor-pointer rounded-full p-1.5 outline-none hover:bg-white/5">
              <EllipsisVertical className="size-5" />
            </button>
          }
        />
        <DropdownMenuContent
          className="card border border-white/10 text-foreground py-3 px-2 w-fit flex flex-col gap-y-2"
          align="end"
          side="bottom"
        >
          <DropdownMenuItem
            onClick={() => navigate(`/connections/profile/${user._id}`)}
            className="text-md capitalize tracking-wide cursor-pointer dropdown-item px-3"
          >
            <UserIcon className="size-5" />
            view profile
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setClearOpen(true)}
            className="text-md capitalize tracking-wide cursor-pointer px-3 data-highlighted:bg-red-600 focus:bg-red-600 text-red-600 data-highlighted:text-foreground font-bold"
          >
            <MessageSquareX className="size-5" />
            clear chat
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ClearChatDialog user={user} open={clearOpen} onOpenChange={setClearOpen} />
    </header>
  );
};
