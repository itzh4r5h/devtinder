import gsap from "gsap";

<<<<<<< HEAD
<<<<<<< HEAD
import { BAR_PERSONALITIES, TIMINGS, random, clamp } from "../constants";
=======
import { BAR_PERSONALITIES, TIMINGS, random, clamp, EASES } from "../constants";
>>>>>>> cc934be (feature(loader):equalizer completed)
=======
import { BAR_PERSONALITIES, TIMINGS, random, clamp } from "./constants";
>>>>>>> 58e96c2 (feat(loader): progress update based on images loading done)

export const createEqualizerEngine = (loaderRefs) => {
  const state = {
    running: false,
    delayedCall: null,
    previousScales: [],
  };

  const { EQUALIZER } = TIMINGS;

  const getBars = () => loaderRefs.current.bars;

  const initialize = () => {
    state.previousScales = BAR_PERSONALITIES.map(() => 1);
  };

  const getNextScale = (index) => {
    const previous = state.previousScales[index];

    const config = BAR_PERSONALITIES[index];

    let next = previous + random(EQUALIZER.MIN_DELTA, EQUALIZER.MAX_DELTA);

    next = clamp(config.min, config.max, next);

    state.previousScales[index] = next;

    return next;
  };

<<<<<<< HEAD
  return {};
=======
  const animateWave = () => {
    if (!state.running) return;

    getBars().forEach((bar, index) => {
      gsap.to(bar, {
        scaleY: getNextScale(index),

        duration: gsap.utils.random(
          EQUALIZER.MIN_DURATION,
          EQUALIZER.MAX_DURATION,
        ),

        ease: "none",
      });
    });

    state.delayedCall = gsap.delayedCall(EQUALIZER.STEP, animateWave);
  };

  const start = () => {
    if (state.running) return;

    state.running = true;

    initialize();

    animateWave();
  };

  const stop = () => {
    state.running = false;

    state.delayedCall?.kill();

    state.delayedCall = null;
  };

<<<<<<< HEAD
  const destroy = () => {
    stop();
  };

  return { start, stop, destroy };
>>>>>>> cc934be (feature(loader):equalizer completed)
=======
  return { start, stop };
>>>>>>> 2c591d9 (refactor: simplify loading screen animation orchestration)
};
