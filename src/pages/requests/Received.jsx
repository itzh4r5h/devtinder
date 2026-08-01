import { RequestsCard } from "@/pages/requests/RequestsCard";
import {
  motion,
  useAnimationControls,
  useMotionValue,
  useTransform,
} from "motion/react";
import { AnimatePresence, LayoutGroup } from "motion/react";
import { useEffect, useState } from "react";
import { RequestsCardModal } from "./RequestsCardModal";

export const Received = ({ users }) => {
  const [cards, setCards] = useState(users);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    document.body.style.overflow = selectedUser ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedUser]);

  const x = useMotionValue(0);
  const controls = useAnimationControls();
  const swipeDistance = Math.floor(Math.min(window.innerWidth * 0.19, 200));
  const opacity = useTransform(
    x,
    [-swipeDistance, -50, 0, 50, swipeDistance],
    [0, 1, 1, 1, 0],
  );
  const rotate = useTransform(x, [-swipeDistance, swipeDistance], [-20, 20]);

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

    setCards((prev) =>
      prev.filter((cardUser) => cardUser._id !== selectedUser._id),
    );
    setIsAnimating(false);
    setSelectedUser(null);
  };

  return (
    <LayoutGroup>
      <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-5 lg:gap-6 mt-10">
        {cards.map((user) => (
          <div
            onClick={() => setSelectedUser(user)}
            key={user._id}
            className="max-w-40 sm:max-w-60 md:max-w-50 lg:max-w-70 w-full cursor-pointer"
          >
            <RequestsCard
              user={user}
              isSelected={selectedUser?._id === user._id}
            />
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedUser && (
          <>
            <motion.div
              className="fixed inset-0 z-100 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.2,
                delay: 0.05,
              }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedUser(null)}
            />

            <div className="fixed inset-0 z-150 flex items-center justify-center pointer-events-none">
              <motion.div
                initial={{ opacity: 1, rotate: 0, x: 0 }}
                animate={controls}
                dragConstraints={{
                  left: 0,
                  right: 0,
                }}
                dragElastic={0.5}
                style={{
                  x,
                  opacity,
                  rotate,
                }}
              >
                <RequestsCardModal
                  user={selectedUser}
                  onAccept={() => swipeCard("right")}
                  onReject={() => swipeCard("left")}
                />
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
};
