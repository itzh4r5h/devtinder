import gsap from "gsap";
import { BAR_PERSONALITIES, TIMINGS, random, clamp } from "./constants";


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

  return { start, stop };
};
