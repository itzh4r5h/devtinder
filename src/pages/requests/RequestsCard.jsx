import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { BadgeCheck, Briefcase, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
const MotionCard = motion.create(Card);

export const RequestsCard = ({ user, isSelected, sentReq = false }) => {
  return (
    <motion.div
      animate={{
        opacity: isSelected ? 0 : 1,
      }}
      transition={{
        duration: 0.18,
      }}
      style={{
        pointerEvents: isSelected ? "none" : "auto",
      }}
    >
      <MotionCard
        layout
        layoutId={`card-${user._id}`}
        className="relative card border border-white/10 gap-4 rounded-xl sm:rounded-3xl w-full p-2  sm:p-4"
      >
        <CardContent className="flex p-0 flex-col gap-2 pb-11 sm:pb-14">
          <motion.div
            className="relative w-full rounded-2xl h-35 sm:h-50 md:h-40 lg:h-60"
            layoutId={`image-container-${user._id}`}
          >
            <motion.img
              layoutId={`image-${user._id}`}
              src={user.imageUrl}
              alt={user.name}
              className="object-cover w-full h-full will-change-transform object-[50%_15%] rounded-lg sm:rounded-2xl"
              draggable={false}
              loading="lazy"
              fetchPriority="high"
              decoding="async"
            />

            <motion.div
              layoutId={`name-title-${user._id}`}
              className="absolute -bottom-11 sm:-bottom-14"
            >
              <div className="flex items-center gap-2">
                <span className="font-bold text-white tracking-wide text-base sm:text-xl md:text-lg lg:text-2xl text-ellipsis line-clamp-1">
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
        </CardContent>
        <AnimatePresence initial={false}>
          {sentReq && (
            <Button
              variant="outline"
              size="lg"
              className="button-bg font-bold text-base sm:text-lg cursor-pointer capitalize rounded-full text-foreground"
            >
              <X className="size-4 sm:size-5" strokeWidth={2.5} />
              cancel
            </Button>
          )}
        </AnimatePresence>
      </MotionCard>
    </motion.div>
  );
};
