import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { BadgeCheck, Briefcase, Heart, X } from "lucide-react";

import { TAG_COLORS, TAG_LABELS } from "@/mock/tag";
import { AnimatePresence, motion } from "motion/react";
import { memo } from "react";

export const UserCard = memo(function UserCard({
  user,
  variant,
  actions,
  expanded,
}) {
  const { primary, secondary } = actions ?? {};

  const buttonStyles = {
    primary:
      "button-bg font-bold sm:text-lg cursor-pointer capitalize rounded-full text-foreground h-11",
    secondary:
      "bg-transparent rounded-full sm:text-lg text-foreground border-white/10 border-0 border-solid cursor-pointer capitalize h-11",
  };

  return (
    <Card
      className={`relative card border border-white/10 gap-4 rounded-3xl ${variant.name === "compact" ? "max-w-40 p-2 sm:p-4 sm:max-w-60 md:max-w-50 lg:max-w-70 w-full cursor-pointer hover:scale-[1.1] transition-transform ease-in-out duration-300" : "p-4 w-72 sm:w-100"}`}
    >
      <CardContent className={`flex p-0 flex-col ${variant.name === 'compact' ? 'gap-2' :'gap-4'}`}>
        <Image
          variant={variant}
          url={user.imageUrl}
          name={user.name}
          title={user.title}
        />

        {variant.name === "compact" && (
          <div >
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-base sm:text-xl md:text-lg lg:text-2xl leading-7 text-ellipsis line-clamp-1 tracking-wide">
                {user.name}
              </span>
              <BadgeCheck className="size-5 fill-[#a78bfa]/20 text-violet-400" />
            </div>
            <div className="text-white/80 text-xs sm:text-sm leading-4 flex items-center gap-1">
              <Briefcase className="size-3 sm:size-3.5" />
              <span className="text-ellipsis line-clamp-1">{user.title}</span>
            </div>
          </div>
        )}

        <AnimatePresence>
          {expanded && (
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
          )}
        </AnimatePresence>
      </CardContent>

      <AnimatePresence>
        {expanded && (
          <CardFooter className="grid grid-cols-2 p-0 pb-4 gap-4 bg-transparent border-0">
            {actions ? (
              <>
                <Button
                  onClick={secondary.onClick}
                  variant="outline"
                  size="lg"
                  className={buttonStyles.secondary}
                >
                  <secondary.icon className="size-4 sm:size-5" />
                  {secondary.label}
                </Button>
                <Button
                  onClick={primary.onClick}
                  variant="outline"
                  size="lg"
                  className={buttonStyles.primary}
                >
                  <primary.icon className="size-4 sm:size-5" />
                  {primary.label}
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="lg"
                  className={buttonStyles.secondary}
                >
                  <X className="size-4 sm:size-5" />
                  ignore
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className={buttonStyles.primary}
                >
                  <Heart className="size-4 sm:size-5" />
                  interested
                </Button>
              </>
            )}
          </CardFooter>
        )}
      </AnimatePresence>
    </Card>
  );
});

const Image = ({ variant, url, name, title }) => {
  const styles = "relative rounded-2xl w-full overflow-hidden";
  const commonImageClasses = "object-cover w-full h-full will-change-transform";

  const variants = {
    feed: {
      Component: motion.div,
      className: "h-64 sm:h-95",
      style: {
        boxShadow: variant.boxShadow,
        transition: "box-shadow 0.15s ease-out",
      },
      imageClasses: commonImageClasses,
    },
    default: {
      Component: "div",
      className: "h-64 sm:h-95",
      imageClasses: commonImageClasses,
    },
    compact: {
      Component: motion.div,
      className: "h-35 sm:h-50 md:h-40 lg:h-60",
      imageClasses: commonImageClasses + " object-[50%_15%]",
    },
  };

  const config = variants[variant.name];

  if (!config) return null;

  const { Component, className, style, imageClasses } = config;

  return (
    <Component className={`${styles} ${className}`} style={style}>
      <img
        src={url}
        alt={name}
        className={imageClasses}
        draggable={false}
        loading="lazy"
        fetchPriority="high"
        decoding="async"
      />
      {variant.name !== "compact" && (
        <>
          <div className="bg-[linear-gradient(to_top,oklch(0.145_0_0/.85),transparent)] absolute inset-x-0 bottom-0 h-24" />
          <div className="absolute inset-x-3 bottom-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-lg sm:text-2xl leading-7">
                {name}
              </span>
              <BadgeCheck className="size-5 fill-[#a78bfa]/20 text-violet-400" />
            </div>
            <div className="text-white/80 text-xs sm:text-sm leading-4 flex items-center gap-1">
              <Briefcase className="size-3 sm:size-3.5" />
              {title}
            </div>
          </div>
        </>
      )}
    </Component>
  );
};
