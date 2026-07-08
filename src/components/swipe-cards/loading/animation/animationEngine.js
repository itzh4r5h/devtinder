import gsap from "gsap";

import { EASES, TIMINGS } from "../constants";

export const createAnimationEngine = (
  loaderRefs,
  { onEntranceComplete } = {},
) => {
  const timeline = gsap.timeline({
    paused: true,
  });
  const { bars, progress } = loaderRefs.current;
  const { BAR } = TIMINGS;

  /**
   * ----------------------------------------
   * Set Initial State
   * ----------------------------------------
   */
  const setInitialState = () => {
    gsap.set(bars, {
      yPercent: 300,
      transformOrigin: "bottom center",
    });

    gsap.set(progress.container, {
      opacity: 0,
    });

    gsap.set(progress.fill, {
      width: "0%",
    });
  };

  /**
   * ----------------------------------------
   * Entrance Timeline
   * ----------------------------------------
   */
  const buildEntrance = () => {
    timeline.clear();

    timeline.to(bars, {
      yPercent: 0,

      duration: BAR.ENTER,

      ease: EASES.BAR_ENTER,

      stagger: {
        each: BAR.STAGGER,
      },
    });

    timeline.to(
      progress.container,
      {
        opacity: 1,
        duration: TIMINGS.PROGRESS_FADE,
        ease: EASES.PROGRESS,
      },
      "-=0.4",
    );

    timeline.call(() => {
      onEntranceComplete?.();
    });

    return timeline;
  };

  /**
   * ----------------------------------------
   * Play Entrance
   * ----------------------------------------
   */
  const playEntrance = () => {
    timeline.play(0);
  };

  /**
   * ----------------------------------------
   * Reset
   * ----------------------------------------
   */
  const reset = () => {
    timeline.pause(0);

    setInitialState();
  };

  /**
   * ----------------------------------------
   * Destroy
   * ----------------------------------------
   */
  const destroy = () => {
    timeline.kill();
  };

  return {
    setInitialState,

    buildEntrance,

    playEntrance,

    reset,

    destroy,
  };
};
