import { motion } from "motion/react";
import useParallax from "./useParallax";

export const Circle = ({breakPoints}) => {
  const { x, y } = useParallax(0.4,true);

  const {sm} = breakPoints

  return (
    <div className="absolute left-1/2 top-1/2 h-[60%] w-[60%] min-h-100 min-w-100 -translate-x-1/2 -translate-y-1/2">
      <motion.div
        initial={{
          width: 0,
          height: 0,
          opacity: 0,
        }}
        animate={{
          width: sm?800:400,
          height: sm?800:400,
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          ease: [1, 0.06, 0.25, 1],
        }}
        className="absolute left-1/2 top-1/2 rounded-full bg-[rgba(54,24,79,.2)] shadow-[inset_5px_20px_40px_rgba(54,24,79,.25),inset_5px_0_5px_rgba(50,36,62,.3),inset_5px_5px_20px_rgba(50,36,62,.25),2px_2px_5px_rgba(255,255,255,.2)]"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </div>
  );
};
