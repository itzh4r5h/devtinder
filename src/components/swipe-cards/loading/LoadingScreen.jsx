import { useRef } from "react";
import { LoadingBars } from "./LoadingBars";
import { LoadingProgress } from "./LoadingProgress";
import { useLoadingAnimation } from "./animation/useLoadingAnimation";

export const LoadingScreen = () => {
  const loaderRefs = useRef({
    overlay: null,
    bars: [],
    progress: {
      container: null,
      track: null,
      fill: null,
      percentage: null,
    },
  });

  useLoadingAnimation(loaderRefs);

  return (
    <div
      ref={(el) => {
        loaderRefs.current.overlay = el;
      }}
      className="
        absolute
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-background/10 backdrop-blur-md
        h-140
      "
    >
      <div className="flex w-full max-w-md flex-col items-center px-6 pt-20 overflow-hidden">
        <LoadingBars loaderRefs={loaderRefs} />
        <LoadingProgress loaderRefs={loaderRefs} />
      </div>
    </div>
  );
};
