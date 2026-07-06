import { useRef } from "react";
import { LoadingBars } from "./LoadingBars";
import { LoadingProgress } from "./LoadingProgress";

export const LoadingScreen = () => {
  const containerRef = useRef(null);

  const overlayRef = useRef(null);

  const barsRef = useRef([]);

  const progressRefs = {
    container: useRef(null),
    track: useRef(null),
    fill: useRef(null),
    percentage: useRef(null),
  };

  return (
    <div
      ref={containerRef}
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
      <div
        ref={overlayRef}
        className="flex w-full max-w-md flex-col items-center px-6"
      >
        <LoadingBars ref={barsRef} />
        <LoadingProgress progressRefs={progressRefs} />
      </div>
    </div>
  );
};
