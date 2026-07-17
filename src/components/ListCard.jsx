import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { BadgeCheck, Briefcase, Heart, X } from "lucide-react";

export const ListCard = ({ user }) => {
  return (
    <Card className="relative card border border-white/10 rounded-3xl p-4 gap-4 w-full shrink-0">
      <CardContent className="flex p-0 gap-4">
        <Avatar className="size-30">
          <AvatarImage src={user.imageUrl} alt={user.name} className="object-[50%_15%]"/>
          <AvatarFallback>LR</AvatarFallback>
        </Avatar>

        <div className="">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white text-lg sm:text-2xl leading-7">
              {user.name}
            </span>
            <BadgeCheck className="size-5 fill-[#a78bfa]/20 text-violet-400" />
          </div>
          <div className="text-white/80 text-xs sm:text-sm leading-4 flex items-center gap-1">
            <Briefcase className="size-3 sm:size-3.5" />
            {user.title}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
