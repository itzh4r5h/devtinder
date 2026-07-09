import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { createAnimationEngine } from "./animationEngine";
import { createEqualizerEngine } from "./equalizerEngine";

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
      const equalizer = createEqualizerEngine(loaderRefs);

      const animation = createAnimationEngine(loaderRefs, {
        onEntranceComplete() {
          equalizer.start();
        },
      });

      animation.setInitialState();

      animation.buildEntrance();

      animation.playEntrance();

      return () => {
        animation.destroy();
        equalizer.destroy()
      };
    },
    { scope: loaderRefs.current.overlay },
  );
};
