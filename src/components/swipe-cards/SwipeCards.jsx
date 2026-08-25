import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  useAnimationControls,
} from "motion/react";
import { UserCard } from "../UserCard";
import { useState } from "react";
import { Button } from "../ui/button";
import { RotateCcw } from "lucide-react";
import { LoadingScreen } from "./loading/LoadingScreen";

export const SwipeCards = ({ users }) => {
  const [cards, setCards] = useState(users);

  const [loading, setLoading] = useState(true);

  const imageUrls = cards.map((user) => user.imageUrl);

  const refreshCards = () => {
    if (cards.length > 0) return;
    setLoading(true);
    setCards(users);
  };

  return (
    <div className="relative select-none flex-1 w-full flex items-center justify-center">
      {loading ? (
        <LoadingScreen
          imageUrls={imageUrls}
          loadingFinish={() => {
            setLoading(false);
          }}
        />
      ) : (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            opacity: { duration: 0.8, ease: "easeOut" },
          }}
          className="grid place-items-center"
        >
          {cards.length > 0 ? (
            <AnimatePresence>
              {cards.map((user, index) => {
                return (
                  <MotionCard
                    key={user._id}
                    user={user}
                    index={index}
                    cards={cards}
                    setCards={setCards}
                  />
                );
              })}
            </AnimatePresence>
          ) : (
            <div className=" capitalize h-full w-fit text-center flex items-center flex-col justify-center tracking-wide">
              <h2 className="text-muted-foreground text-3xl leading-10">
                you have swiped all devs
              </h2>
              <p className="text-secondary text-lg">
                click on refresh button to experience it again!
              </p>
              <Button
                onClick={refreshCards}
                variant="outline"
                className="button-bg cursor-pointer font-bold capitalize rounded-full size-10 mt-10"
              >
                <RotateCcw strokeWidth={3} className="size-6" />
              </Button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

const MotionCard = ({ user, index, cards, setCards }) => {
  const x = useMotionValue(0);
  const controls = useAnimationControls();
  const swipeDistance = Math.floor(Math.min(window.innerWidth * 0.19, 200));
  const opacity = useTransform(
    x,
    [-swipeDistance, -50, 0, 50, swipeDistance],
    [0, 1, 1, 1, 0],
  );
  const rotate = useTransform(x, [-swipeDistance, swipeDistance], [-20, 20]);
  const isFront = user._id === cards[cards.length - 1]._id;
  const stackScale = isFront ? 1 : 0.95;
  const stackRotate = isFront ? 0 : index % 2 ? 10 : -10;

  const boxShadow = useTransform(
    x,
    [20, 200],
    ["0 0 0px rgba(0,0,0,0)", "0 0 40px var(--primary)"],
  );

  const [isAnimating, setIsAnimating] = useState(false);

  const swipeCard = async (direction) => {
    // to prevent double clicks, clicked but then dragged back, double taps on mobile
    if (isAnimating) return;

    setIsAnimating(true);

    const currentX = x.get();
    const targetX =
      direction === "right"
        ? currentX + swipeDistance
        : currentX - swipeDistance;

    x.stop();

    await controls.start({
      x: targetX,
      transition: {
        duration: 0.25,
        ease: "easeOut",
      },
    });

    setCards((prev) => prev.filter((cardUser) => cardUser._id !== user._id));

    setIsAnimating(false);
  };

  const handleDragEnd = async () => {
    if (Math.abs(x.get()) < swipeDistance) return;

    const direction = x.get() > 0 ? "right" : "left";
    await swipeCard(direction, "drag");
  };

  return (
    <motion.article
      layout="position"
      animate={{
        scale: stackScale,
        rotate: stackRotate,
        origin: "bottom",
      }}
      transition={{
        layout: {
          type: "spring",
          stiffness: 220,
          damping: 24,
        },
        scale: {
          type: "spring",
          stiffness: 260,
          damping: 24,
        },
        rotate: {
          duration: 0.35,
          ease: "easeOut",
        },
      }}
      style={{
        gridRow: 1,
        gridColumn: 1,
        pointerEvents: isAnimating ? "none" : "auto",
      }}
      exit={{
        opacity: 0,
      }}
      className="cursor-grab active:cursor-grabbing origin-bottom"
    >
      <motion.div
        animate={controls}
        drag={isFront ? "x" : false}
        dragConstraints={{
          left: 0,
          right: 0,
        }}
        dragElastic={0.5}
        onDragEnd={handleDragEnd}
        style={{
          x,
          opacity,
          rotate,
        }}
      >
        <UserCard
          user={user}
          style={{
            boxShadow: boxShadow,
            transition: "box-shadow 0.15s ease-out",
          }}
          onInterested = {() => swipeCard("right")}
          onIgnore = {() => swipeCard("left")}
        />
      </motion.div>
    </motion.article>
  );
};
