import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  useAnimationControls,
} from "motion/react";
import { UserCard } from "./UserCard";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { RotateCcw } from "lucide-react";

export const SwipeCards = ({ users }) => {
  const [cards, setCards] = useState(users);

  const [imagesReady, setImagesReady] = useState(false);

  const preloadImage = (src) =>
    new Promise((resolve) => {
      const img = new Image();

      img.src = src;

      img.onload = async () => {
        try {
          await img.decode();
        } catch {}

        resolve();
      };

      img.onerror = resolve;
    });

  useEffect(() => {
    const preloadAllImages = async () => {
      await Promise.all(cards.map((card) => preloadImage(card.imageUrl)));

      // Optional: Let the loading animation play a bit longer
      await new Promise((resolve) => setTimeout(resolve, 500));

      setImagesReady(true);
    };

    preloadAllImages();
  }, [cards]);

  const refreshCards = () => {
    if (cards.length > 0) return;
    setImagesReady(false)
    setCards(users);
  };

  if (!imagesReady) {
    return (
      <div className="grid place-items-center my-10 h-145 text-5xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="grid place-items-center my-10 relative">
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
    </div>
  );
};

const MotionCard = ({ user, index, cards, setCards }) => {
  const x = useMotionValue(0);
  const controls = useAnimationControls();
  const opacity = useTransform(x, [-200, 0, 200], [0, 1, 0]);
  const rotate = useTransform(x, [-200, 200], [-20, 20]);
  const isFront = user._id === cards[cards.length - 1]._id;
  const stackScale = isFront ? 1 : 0.95;
  const stackRotate = isFront ? 0 : index % 2 ? 10 : -10;

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
        <UserCard user={user} />
      </motion.div>
    </motion.article>
  );
};
