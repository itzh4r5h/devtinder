import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  EllipsisVertical,
  MessageSquareMore,
  Unplug,
  UserIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "motion/react";
import { NavLink, useLocation } from "react-router";

export const ConnecitonCard = ({ user }) => {
  const { pathname } = useLocation();

  const isActive = pathname === `/connections/${user._id}`;

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
          to={`/connections/${user._id}`}
          className="flex gap-5 items-center flex-1"
        >
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full cursor-pointer w-fit"
          >
            <Avatar className="size-14">
              <AvatarImage src={user.imageUrl} alt={user.name} />
              {/* to get two characters like from "john doe" it will be - "jd" */}
              <AvatarFallback>
                {user.name.match(/\b\w/g).join("")}
              </AvatarFallback>
            </Avatar>
          </Button>

          <div className="flex flex-col justify-center flex-1 cursor-pointer">
            <h3 className="text-xl text-ellipsis line-clamp-1">{user.name}</h3>
            <p className="text-muted-foreground text-ellipsis line-clamp-1 text-base">
              here comes the last message it it exists...
            </p>
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
            <DropdownMenuItem className="text-md capitalize tracking-wide cursor-pointer dropdown-item px-3">
              <UserIcon className="size-5" />
              view profile
            </DropdownMenuItem>

            <DropdownMenuItem className="text-md capitalize tracking-wide cursor-pointer dropdown-item px-3">
              <MessageSquareMore className="size-5" />
              clear chat
            </DropdownMenuItem>

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
