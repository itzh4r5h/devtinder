import { useCallback, useRef } from "react";

export const useImagePreloader = ({
  imageUrls,
  minimumDuration = 2500,
}) => {
  const startTime = useRef(0);
  const finish = useRef(null);
  const progressEngine = useRef(null);
  const started = useRef(false);
  const completed = useRef(false)

  const getLoader = (loader) => {
    finish.current = loader.finish;
  };

  const setProgressEngine = (engine) => {
    progressEngine.current = engine;
  };

  // Call this only when the new image URLs are available.


  const start = useCallback(async () => {
    if (started.current || !imageUrls.length) return;

    started.current = true;
    startTime.current = performance.now();

    let loadedCount = 0;
    const totalImages = imageUrls.length;

    // Keep 100% reserved for final completion.


    const promises = imageUrls.map((url) => {
      return new Promise((resolve) => {
        const image = new Image();

        const handleComplete = () => {
          loadedCount++;
          const percentage = Math.round(
            (loadedCount / totalImages) * 100
          );
          progressEngine.current?.update(percentage);
          resolve();
        };

        image.onload = handleComplete
        image.onerror = handleComplete
        image.src = url;
      });
    });

    await Promise.all(promises);

    const elapsed = performance.now() - startTime.current;
    const remaining = Math.max(
      0,
      minimumDuration - elapsed
    );

    await new Promise((resolve) =>
      setTimeout(resolve, remaining)
    );

    finish.current?.();
  }, [imageUrls, minimumDuration]);


  const finishEmpty = useCallback(() => {
    if (completed.current) return;

    completed.current = true;

    const elapsed = started.current
      ? performance.now() - startTime.current
      : 0;

    const remaining = Math.max(0, minimumDuration - elapsed);
    const finishDelay = Math.max(0, remaining - 300);
    setTimeout(() => {
      progressEngine.current?.update(100);

      setTimeout(() => {
        finish.current?.();
      }, finishDelay);
    }, remaining);
  }, [minimumDuration]);

  return {
    start,
    getLoader,
    setProgressEngine,
    finishEmpty
  };
};
;
