import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { createAnimationEngine } from "./animationEngine";
import { createEqualizerEngine } from "./equalizerEngine";
import { createProgressEngine } from "./progressEngine";

gsap.registerPlugin(useGSAP);

export const useLoadingAnimation = (
  loaderRefs,
  { onEntranceComplete, onProgressEngine },
) => {
  const animationRef = useRef(null);
  const equalizerRef = useRef(null);
  const progressRef = useRef(null);

  useGSAP(
    () => {
      /**
       * Create Engines
       */
      animationRef.current = createAnimationEngine(loaderRefs, {
        onEntranceComplete: () => {
          equalizerRef.current.start();

          onEntranceComplete?.();
        },
      });

      equalizerRef.current = createEqualizerEngine(loaderRefs);

      progressRef.current = createProgressEngine(loaderRefs);

      /**
       * Expose progress engine
       */
      onProgressEngine?.(progressRef.current);

      /**
       * Initial State
       */
      animationRef.current.setInitialState();

      /**
       * Build Timeline
       */
      animationRef.current.buildEntrance();

      /**
       * Play Entrance
       */
      animationRef.current.playEntrance();

      return () => {
        equalizerRef.current.destroy();

        animationRef.current.destroy();
      };
    },
    {
      scope: loaderRefs.current.overlay,
    },
  );

  /**
   * Called when loading reaches 100%
   */
  const finish = () => {
    equalizerRef.current.stop();

    animationRef.current.playExit();
  };

  return {
    finish,
  };
};
