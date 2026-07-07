import gsap from "gsap";

export const BAR_COUNT = 7;

export const BAR_HEIGHTS = [
  80,
  120,
  100,
  150,
  100,
  120,
  80,
];

export const TIMINGS = {
  BAR_ENTER: 0.75,
  BAR_STAGGER: 0.08,

  PROGRESS_FADE: 0.45,

  PAUSE_BEFORE_EQUALIZER: 0.15,

  EQUALIZER_DURATION: {
    MIN: 0.25,
    MAX: 0.55,
  },

  EQUALIZER_DELAY: {
    MIN: 0.18,
    MAX: 0.35,
  },

  PAUSE_BEFORE_EXIT: 0.2,
};

export const EASES = {
  BAR_ENTER: "back.out(1.8)",
  PROGRESS: "power2.out",
  BAR: "sine.inOut",
};

export const random = gsap.utils.random;

export const clamp = gsap.utils.clamp;