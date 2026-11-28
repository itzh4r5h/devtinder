import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { getInitials } from "@/lib/chat-utils";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

export const ChatHeader = ({ user, isTyping }) => {
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

      <Link to={`/connections/profile/${user._id}`} className="flex min-w-0 items-center gap-3">
        <Avatar className="size-11">
          <AvatarImage src={user.profilePic?.url} alt={user.name} />
          <AvatarFallback className="bg-neutral-800 text-foreground uppercase">
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>

        <div className="flex min-w-0 flex-col">
          <h3 className="truncate text-lg capitalize leading-tight">{user.name}</h3>
          {isTyping ? (
            <span className="text-sm text-secondary">typing...</span>
          ) : (
            user.role && <span className="truncate text-sm text-muted-foreground capitalize">{user.role}</span>
          )}
        </div>
      </Link>
    </header>
  );
};
