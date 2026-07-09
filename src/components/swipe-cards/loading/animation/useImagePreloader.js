import { useCallback, useRef } from "react";

export const useImagePreloader = ({
  imageUrls,
  minimumDuration = 2500,
  onProgress,
  onComplete,
}) => {
  const loadedCount = useRef(0);

  const startTime = useRef(0);

  const start = useCallback(async () => {
    if (!imageUrls.length) {
      onProgress?.(100);
      onComplete?.();
      return;
    }

    startTime.current = performance.now();

    loadedCount.current = 0;

    const promises = imageUrls.map((url) => {
      return new Promise((resolve) => {
        const image = new Image();

        const complete = () => {
          loadedCount.current++;

          const progress = Math.round(
            (loadedCount.current / imageUrls.length) * 100
          );

          onProgress?.(progress);

          resolve();
        };

        image.onload = complete;
        image.onerror = complete;

        image.src = url;
      });
    });

    await Promise.all(promises);

    const elapsed =
      performance.now() - startTime.current;

    const remaining = Math.max(
      0,
      minimumDuration - elapsed
    );

    await new Promise((resolve) =>
      setTimeout(resolve, remaining)
    );

    onComplete?.();
  }, [
    imageUrls,
    minimumDuration,
    onProgress,
    onComplete,
  ]);

  return {
    start,
  };
};