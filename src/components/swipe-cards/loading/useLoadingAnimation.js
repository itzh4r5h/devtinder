import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

export function useLoadingAnimation(loaderRefs) {
  const timelines = useRef({
    entrance: null,
    exit: null,
  });

  const equalizer = useRef({
    running: false,
    delayedCall: null,
    previousScales: [],
  });

  useGSAP(
    () => {
      console.log("loader initialized");
    },
    { scope: loaderRefs.current.overlay },
  );
}
