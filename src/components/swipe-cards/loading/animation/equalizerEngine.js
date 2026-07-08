import gsap from "gsap";

import { BAR_PERSONALITIES, TIMINGS, random, clamp } from "../constants";

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

  return {};
};
