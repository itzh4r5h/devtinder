import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { BadgeCheck, Briefcase, Heart, X } from "lucide-react";

import { TAG_COLORS, TAG_LABELS } from "@/constants/tag";
import { motion } from "motion/react";
import { memo } from "react";

export const UserCard = memo(function UserCard({
  user,
  style,
  onInterested,
  onIgnore
}) {


  return (
    <Card className="relative card border border-white/10 gap-4 rounded-3xl p-4 w-72 sm:w-100">
      <CardContent className="flex p-0 flex-col gap-4">
        <motion.div className="relative rounded-2xl w-full overflow-hidden h-64 sm:h-95" style={style}>
          <img
            src={user.imageUrl}
            alt={user.name}
            className="object-cover w-full h-full will-change-transform"
            draggable={false}
            loading="lazy"
            fetchPriority="high"
            decoding="async"
          />

          <div className="bg-[linear-gradient(to_top,oklch(0.145_0_0/.85),transparent)] absolute inset-x-0 bottom-0 h-24" />
          <div className="absolute inset-x-3 bottom-3">
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
        </motion.div>

        <div className="flex flex-wrap gap-2 h-18">
          {user.tags.map((tag) => {
            return (
              <Badge
                key={tag.toLowerCase()}
                className={`text-foreground ${TAG_COLORS[tag.toLowerCase()] ?? "bg-neutral-500 text-foreground"} leading-4 sm:text-sm h-7 px-3`}
              >
                {TAG_LABELS[tag.toLowerCase()] ?? tag}
              </Badge>
            );
          })}
        </div>
      </CardContent>

      <CardFooter className="grid grid-cols-2 p-0 pb-4 gap-4 bg-transparent border-0">
        <Button
          onClick={onIgnore}
          variant="outline"
          size="lg"
          className="bg-transparent rounded-full sm:text-lg text-foreground border-white/10 border-0 border-solid cursor-pointer capitalize h-11"
        >
          <X className="size-4 sm:size-5" />
          ignore
        </Button>
        <Button
          onClick={onInterested}
          variant="outline"
          size="lg"
          className="button-bg font-bold sm:text-lg cursor-pointer capitalize rounded-full text-foreground h-11"
        >
          <Heart className="size-4 sm:size-5" />
          interested
        </Button>
      </CardFooter>
    </Card>
  );
});

