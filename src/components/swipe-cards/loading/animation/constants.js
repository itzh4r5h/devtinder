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

  
  EQUALIZER: {
    STEP: 0.08,
    MIN_DURATION: 0.02,
    MAX_DURATION: 0.12,
    MIN_DELTA: -0.5,
    MAX_DELTA: 0.5,
  },
};

export const EASES = {
  BAR_ENTER: "back.out",
  PROGRESS: "power2.out",
};

export const BAR_PERSONALITIES = [
  { min: 0.55, max: 0.9 },
  { min: 0.65, max: 1.0 },
  { min: 0.55, max: 1.1 },
  { min: 0.7, max: 1.25 },
  { min: 0.55, max: 1.1 },
  { min: 0.65, max: 1.0 },
  { min: 0.55, max: 0.9 },
];

export const random = gsap.utils.random;

export const clamp = gsap.utils.clamp;
