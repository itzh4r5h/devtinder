import { motion } from "motion/react";
import React from "react";

export const Piece = ({ piece, breakPoints }) => {
  const {
    top,
    left,
    right,
    width,
    height,
    color,
    direction,
    delay,
    distance,
    duration,
  } = piece;

  const { sm } = breakPoints;

  const scale = sm ? 1 : 0.4;

  const pieceHeight = height * scale;
  const pieceWidth = width * scale;

  const animate = {
    width: [pieceWidth, pieceWidth * 0.8, pieceWidth],
  };

  if (left !== undefined) {
    animate.left = [left, "80%", left];
  }

  if (right !== undefined) {
    animate.right = [right, "80%", right];
  }

  return (
    <motion.span
      animate={animate}
      transition={{
        delay,
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`absolute rounded-full ${color}`}
      style={{
        top,
        left,
        right,
        width: pieceWidth,
        height: pieceHeight,
      }}
    />
  );
};
