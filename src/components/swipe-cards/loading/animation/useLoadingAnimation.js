import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { createAnimationEngine } from "./animationEngine";

gsap.registerPlugin(useGSAP);

export const useLoadingAnimation = (loaderRefs) => {
  const timelines = useRef({
    entrance: null,
    exit: null,
  });

  const equalizer = useRef({
    running: false,
    delayedCall: null,
    previousScales: [],
  });

  useGSAP(
    () => {
      const animation = createAnimationEngine(loaderRefs, {
        onEntranceComplete() {
          console.log("entrance finished");
        },
      });

      animation.setInitialState();

      animation.buildEntrance();

      animation.playEntrance();

      return () => {
        animation.destroy();
      };
    },
    { scope: loaderRefs.current.overlay },
  );
};
