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
  
  /**
   * ----------------------------------------
   * Set Initial State
   * ----------------------------------------
   */
  const setInitialState = () => {

    gsap.set(bars, {
      yPercent: 140,
      opacity: 1,
      scaleY: 1,
      transformOrigin: "bottom center",
    });

    gsap.set(progress.container, {
      opacity: 0,
      y: 20,
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

      duration: TIMINGS.BAR_ENTER,

      ease: EASES.BAR_ENTER,

      stagger: TIMINGS.BAR_STAGGER,
    });

    timeline.to(
      progress.container,
      {
        opacity: 1,
        y: 0,

        duration: TIMINGS.PROGRESS_FADE,

        ease: EASES.PROGRESS,
      },
      "-=0.2",
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
    timeline.restart();
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
