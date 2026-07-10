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
    <div className="my-10 relative">
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: loading ? 0 : 1,
        }}
        transition={{
          opacity: { duration: loading ? 0 : 0.9, ease: "easeOut" },
        }}
        style={{
          visibility: loading ? "hidden" : "visible",
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
          <div className=" capitalize h-140 w-fit text-center flex items-center flex-col justify-center tracking-wide">
            <h2 className="text-muted-foreground text-5xl leading-15">
              you have swiped all devs
            </h2>
            <p className="text-secondary text-lg">
              click on refresh button to experience it again!
            </p>
          </div>
        )}
        <Button
          onClick={refreshCards}
          variant="outline"
          className={`${cards.length < 1 ? "button-bg cursor-pointer" : "bg-card cursor-not-allowed"} font-bold capitalize rounded-full size-10 absolute z-100 -bottom-13`}
        >
          <RotateCcw strokeWidth={3} className="size-6" />
        </Button>
      </motion.div>

      {loading && (
        <LoadingScreen
          imageUrls={imageUrls}
          loadingFinish={() => {
            setLoading(false);
          }}
        />
      )}
    </div>
  );
};

const MotionCard = ({ user, index, cards, setCards }) => {
  const x = useMotionValue(0);
  const controls = useAnimationControls();
  const opacity = useTransform(x, [-200, -20, 0, 20, 200], [0, 1, 1, 1, 0]);
  const rotate = useTransform(x, [-200, 200], [-20, 20]);
  const isFront = user._id === cards[cards.length - 1]._id;
  const stackScale = isFront ? 1 : 0.95;
  const stackRotate = isFront ? 0 : index % 2 ? 10 : -10;

  const boxShadow = useTransform(
    x,
    [20, 200],
    ["0 0 0px rgba(0,0,0,0)", "0 0 40px var(--primary)"],
  );

  const handleDragEnd = async () => {
    if (Math.abs(x.get()) < 200) return;
    const currentX = x.get();

    x.stop();

    await controls.start({
      x: currentX > 0 ? currentX + 600 : currentX - 600,
      opacity: 0,
      transition: {
        duration: 0.25,
        ease: "easeOut",
      },
    });

    setCards((prev) => prev.filter((cardUser) => cardUser._id !== user._id));
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
      }}
      exit={{
        opacity: 0,
        scale: 1.05,
      }}
      className="cursor-grab active:cursor-grabbing origin-bottom"
    >
      <motion.div
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
        <UserCard user={user} boxShadow={boxShadow} />
      </motion.div>
    </motion.article>
  );
};
