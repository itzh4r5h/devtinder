import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import useParallax from "./useParallax";
import { Link } from "react-router";

export const ErrorText = () => {
  const { x, y } = useParallax(0.5, true);

  return (
    <div className="relative -translate-x-1/2 -translate-y-1/3 mt-3 sm:mt-0 sm:-translate-y-1/6 z-20 flex min-h-125 w-[60%] min-w-100 items-end justify-center">
      <motion.article
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 1.8,
          duration: 0.6,
          ease: "easeOut",
        }}
        style={{
          x: x,
          y: y,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="absolute top-1/2 left-1/2 w-100 text-center"
      >
        <p className="mb-5 tracking-wide text-white font-semibold sm:font-extrabold text-lg sm:text-2xl">
          Uh oh! Looks like you got lost.
          <br />
          Go back to the homepage if you dare!
        </p>

        <Link to="/">
          <Button
            variant="outline"
            size="lg"
            className="button-bg font-bold text-md sm:text-lg cursor-pointer uppercase px-6"
          >
            I Dare
          </Button>
        </Link>
      </motion.article>
    </div>
  );
};
