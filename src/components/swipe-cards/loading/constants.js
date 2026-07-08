import gsap from "gsap";

export const BAR_COUNT = 7;

export const BAR_HEIGHTS = [80, 120, 100, 150, 100, 120, 80];

export const TIMINGS = {
  // for bars
  BAR: {
    ENTER: 1.2,
    STAGGER: 0.1,
  },

  // loading progress
  PROGRESS_FADE: 0.45,

  // for equalizer
  PAUSE_BEFORE_EQUALIZER: 0.15,

  EQUALIZER: {
    STEP: 0.18,
    MIN_DURATION: 0.22,
    MAX_DURATION: 0.45,
    MIN_DELTA: -0.25,
    MAX_DELTA: 0.25,
  },

  PAUSE_BEFORE_EXIT: 0.2,
};

export const EASES = {
  BAR_ENTER: "back.out",
  PROGRESS: "power2.out",
  BAR: "sine.inOut",
};

export const BAR_PERSONALITIES = [
  { min: 0.55, max: 0.9 },
  { min: 0.65, max: 1.0 },
  { min: 0.55, max: 1.1 },
  { min: 0.8, max: 1.25 },
  { min: 0.55, max: 1.1 },
  { min: 0.65, max: 1.0 },
  { min: 0.55, max: 0.9 },
];

export const random = gsap.utils.random;

export const clamp = gsap.utils.clamp;
