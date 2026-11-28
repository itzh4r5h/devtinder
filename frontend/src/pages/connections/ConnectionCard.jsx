import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { EllipsisVertical, Unplug } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "motion/react";
import { NavLink, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { Badge } from "@/components/ui/badge";
import { formatListTime } from "@/lib/chat-utils";
import { usePresence } from "@/hooks/usePresence";
import { OnlineDot } from "./chat/OnlineDot";

export const ConnecitonCard = ({ connection }) => {
  const { pathname } = useLocation();

  const isActive = pathname === `/connections/${connection.connectionId}`;
  const myId = useSelector((state) => state.user.user?._id);
  const conversation = useSelector((state) => state.chat.conversations[connection.user._id]);
  const isTyping = useSelector((state) => Boolean(state.chat.typing[connection.user._id]));
  const lastMessage = conversation?.lastMessage;
  const unread = conversation?.unread ?? 0;
  const { online } = usePresence(connection.user._id);

  return (
    <motion.div
      className={`relative card border border-white/10 rounded-xl p-4 w-full ${isActive ? "z-20" : "z-0"}`}
    >
      {isActive ? (
        <motion.div
          layoutId="active_bg"
          id="active_bg"
          className="button-bg h-full w-full absolute inset-0 rounded-xl z-10"
          style={{ opacity: "50%" }}
          transition={{
            type: "spring",
            stiffness: 250,
            damping: 35,
          }}
        />
      ) : null}

      <CardContent className="flex p-0 gap-5 text-foreground items-center relative z-12">
        {/* // for now use user._id instead of connection id later replace it with connection id */}
        <NavLink
          to={`/connections/${connection.connectionId}`}
          className="flex gap-5 items-center flex-1"
        >
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full cursor-pointer w-fit"
          >
            <Avatar className="size-14">
              <AvatarImage src={connection.user.profilePic.url} alt={connection.user.name} />
              {/* to get two characters like from "john doe" it will be - "jd" */}
              <AvatarFallback>
                {connection.user.name.match(/\b\w/g).join("")}
              </AvatarFallback>
              {online && <OnlineDot />}
            </Avatar>
          </Button>

          <div className="flex flex-col justify-center flex-1 min-w-0 cursor-pointer">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-xl text-ellipsis line-clamp-1 capitalize">{connection.user.name}</h3>
              {lastMessage && (
                <time
                  dateTime={lastMessage.createdAt}
                  className={`shrink-0 text-xs ${unread > 0 ? "text-secondary" : "text-muted-foreground"}`}
                >
                  {formatListTime(lastMessage.createdAt)}
                </time>
              )}
            </div>
            <div className="flex items-center justify-between gap-2">
              {isTyping ? (
                <p className="text-secondary line-clamp-1 text-base">typing...</p>
              ) : (
                <p className={`text-ellipsis line-clamp-1 text-base ${unread > 0 ? "text-foreground" : "text-muted-foreground"}`}>
                  {lastMessage
                    ? `${lastMessage.sender === myId ? "you: " : ""}${lastMessage.text}`
                    : "no messages yet, say hi!"}
                </p>
              )}
              {unread > 0 && (
                <Badge className="button-bg shrink-0 text-foreground tabular-nums" aria-label={`${unread} unread messages`}>
                  {unread > 99 ? "99+" : unread}
                </Badge>
              )}
            </div>
          </div>
        </NavLink>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button>
                <EllipsisVertical className="cursor-pointer outline-none" />
              </button>
            }
          />
          <DropdownMenuContent
            className="card border border-white/10 text-foreground py-3 px-2 w-fit flex flex-col gap-y-2"
            align="start"
            side="left"
          >
            {/* view profile and clear chat live in the chat header menu */}
            <DropdownMenuItem className="text-md capitalize tracking-wide cursor-pointer px-3 data-highlighted:bg-red-600 focus:bg-red-600  text-red-600 font-bold">
              <Unplug className="size-5" />
              disconnect
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </motion.div>
  );
};
