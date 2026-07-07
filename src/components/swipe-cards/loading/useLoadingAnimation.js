import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

export function useLoadingAnimation(loaderRefs) {
  const {
    overlayRef,
    barsRef,
    progressRefs,
  } = loaderRefs;

  useGSAP(() => {

  });
}