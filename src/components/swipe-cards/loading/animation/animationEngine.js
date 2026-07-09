import gsap from "gsap";

import { EASES, TIMINGS } from "./constants";

export const createAnimationEngine = (loaderRefs) => {
  const entranceTimeline = gsap.timeline({
    paused: true,
  });
  const exitTimeline = gsap.timeline({
    paused: true,
  });
  const { bars, progress, overlay } = loaderRefs.current;
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
    entranceTimeline.clear();

    entranceTimeline.to(bars, {
      yPercent: 0,

      duration: BAR.ENTER,

      ease: EASES.BAR_ENTER,

      stagger: {
        each: BAR.STAGGER,
      },
    });

    entranceTimeline.to(
      progress.container,
      {
        opacity: 1,
        duration: TIMINGS.PROGRESS_FADE,
        ease: EASES.PROGRESS,
      },
      "-=0.4",
    );
  };

  const init = () => {
    setInitialState();
    buildEntrance();
  };

  /**
   * ----------------------------------------
   * Play Entrance
   * ----------------------------------------
   */
  const playEntrance = () => {
    entranceTimeline.play(-0.1);
  };

  /**
   * ----------------------------------------
   * On Completion of Entrance
   * ----------------------------------------
   */
  const onEntranceComplete = (startEqualizer, startImagesPreloader) => {
    entranceTimeline.call(() => {
      startEqualizer();
      startImagesPreloader();
    });
  };

  const playExit = (loadingFinish) => {
    exitTimeline.clear();

    // ---------------------------------
    // Normalize Bars
    // ---------------------------------
    exitTimeline.to(bars, {
      scaleY: 1,
      duration: 0.08,
      ease: "power1.out",
      overwrite: true,
    });

    // ---------------------------------
    // Fade Progress
    // ---------------------------------
    exitTimeline.to(progress.container, {
      opacity: 0,
      y: 12,
      duration: 0.25,
      ease: "power2.in",
    },"+=0.2");

    // ---------------------------------
    // Bars Exit
    // ---------------------------------
    exitTimeline.to(
      bars,
      {
        yPercent: 300,

        duration: 0.45,

        ease: "power3.in",

        stagger: {
          each: BAR.STAGGER,
          from: "end",
        },
      },
    );

    // ---------------------------------
    // Overlay Fade
    // ---------------------------------
    exitTimeline.to(
      overlay,
      {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      },
    );

    exitTimeline.call(() => {
      stop()
      loadingFinish();
    });

    exitTimeline.play(0);
  };

  /**
   * ----------------------------------------
   * stop
   * ----------------------------------------
   */
  const stop = () => {
    entranceTimeline.kill();
    exitTimeline.kill();
  };

  return {
    init,

    playEntrance,

    onEntranceComplete,

    playExit,

    stop,
  };
};
