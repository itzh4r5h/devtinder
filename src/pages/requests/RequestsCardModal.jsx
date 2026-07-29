import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { BadgeCheck, Briefcase, Heart, X } from "lucide-react";

import { TAG_COLORS, TAG_LABELS } from "@/mock/tag";
import { AnimatePresence, motion } from "motion/react";
const MotionCard = motion.create(Card);

export const RequestsCardModal = ({ user }) => {
  return (
    <MotionCard
      onClick={(e) => e.stopPropagation()}
      layout
      layoutId={`card-${user._id}`}
      className="relative card border border-white/10 gap-4 rounded-3xl p-4 w-72 sm:w-100 pointer-events-auto"
    >
      <CardContent className="flex p-0 flex-col gap-4">
        <motion.div
          className="relative w-full rounded-2xl h-64 sm:h-95 overflow-hidden"
          layoutId={`image-container-${user._id}`}
        >
          <motion.img
            layoutId={`image-${user._id}`}
            src={user.imageUrl}
            alt={user.name}
            className="object-cover w-full h-full will-change-transform object-[50%_15%]"
            draggable={false}
            loading="lazy"
            fetchPriority="high"
            decoding="async"
          />

          <div className="bg-[linear-gradient(to_top,oklch(0.145_0_0/.85),transparent)] absolute inset-x-0 bottom-0 h-24" />
          <motion.div
            layoutId={`name-title-${user._id}`}
            className="absolute inset-x-3 bottom-3"
          >
            <div className="flex items-center gap-2">
              <span className="font-bold text-white tracking-wide text-lg sm:text-2xl">
                {user.name}
              </span>
              <BadgeCheck className="size-5 fill-[#a78bfa]/20 text-violet-400" />
            </div>
            <div className="text-white/80 text-xs sm:text-sm leading-4 flex items-center gap-1">
              <Briefcase className="size-3 sm:size-3.5" />
              <span className="text-ellipsis line-clamp-1">{user.title}</span>
            </div>
          </motion.div>
        </motion.div>

        <AnimatePresence initial={false}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.3,
            }}
          >
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
          </motion.div>
        </AnimatePresence>
      </CardContent>

      <AnimatePresence initial={false}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.3,
          }}
        >
          <CardFooter className="grid grid-cols-2 p-0 pb-4 gap-4 bg-transparent border-0">
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent rounded-full sm:text-lg text-foreground border-white/10 border-0 border-solid cursor-pointer capitalize h-11"
            >
              <X className="size-4 sm:size-5" />
              reject
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="button-bg font-bold sm:text-lg cursor-pointer capitalize rounded-full text-foreground h-11"
            >
              <Heart className="size-4 sm:size-5" />
              accept
            </Button>
          </CardFooter>
        </motion.div>
      </AnimatePresence>
    </MotionCard>
  );
};
