import { motion } from "motion/react";
import React from "react";

export const LayerContent = ({ children,breakPoints }) => {
   const {sm} = breakPoints

  return (
    <motion.div
      initial={{
        width: "0px",
        opacity: 1,
      }}
      animate={{
        width: sm?"600px":"320px",
      }}
      transition={{
        duration: 0.9,
        ease: "backInOut",
      }}
      className="absolute left-1/2 top-1/2 h-80 sm:h-150 -translate-x-1/2 -translate-y-1/2"
    >
      {children}
    </motion.div>
  );
};
