import { useEffect } from "react";
import { useMotionValue, useSpring } from "motion/react";

export default function useParallax(
  depth = 1,
  strength = 0.3,
  reverse = false,
) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const translateX = useSpring(x, {
    stiffness: 80,
    damping: 18,
  });

  const translateY = useSpring(y, {
    stiffness: 80,
    damping: 18,
  });

  useEffect(() => {
    const handleMove = (e) => {
      const { innerWidth, innerHeight } = window;

      const multiplier = reverse ? -1 : 1;

      const mouseX = e.clientX - innerWidth / 2;
      const mouseY = e.clientY - innerHeight / 2;

      x.set(-mouseX * depth * strength * multiplier);
      y.set(-mouseY * depth * strength * multiplier);
    };

    window.addEventListener("pointermove", handleMove,{passive:true});

    return () => window.removeEventListener("pointermove", handleMove);
  }, [depth, x, y]);

  return {
    x: translateX,
    y: translateY,
  };
}
