import { motion } from "motion/react";
import React from "react";
import useParallax from "./useParallax";

export const ErrorCode = ({breakPoints}) => {
  const front = useParallax(0.6,true);
  const shadow = useParallax(0.5,true);

  const {sm} = breakPoints

  return (
    <>
      {/* 404 Shadow */}
      <motion.p
        initial={{
          opacity: 0,
          scale: sm?10:5,
          rotate: sm?10:5,
        }}
        animate={{
          opacity: 0.7,
          scale: 1,
          rotate: 0,
        }}
        transition={{
          delay: 1,
          duration: 0.6,
          ease: [0.3, 0.8, 1, 1.05],
        }}
        className="absolute left-1/2 top-1/2 text-[100px] sm:text-[200px] font-bold tracking-[4px] text-[#36184F] blur-md opacity-70"
        style={{
          x: shadow.x,
          y: shadow.y,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        404
      </motion.p>

      {/* 404 */}
      <motion.p
        initial={{
          opacity: 0,
          scale: sm?10:5,
          rotate: sm?10:5,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          rotate: 0,
        }}
        transition={{
          delay: 1.2,
          duration: 0.6,
          ease: [0.3, 0.8, 1, 1.05],
        }}
        className="absolute left-1/2 top-1/2 z-10 text-[80px] sm:text-[200px] font-bold tracking-[4px] text-white"
        style={{
          x: front.x,
          y: front.y,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        404
      </motion.p>
    </>
  );
};
