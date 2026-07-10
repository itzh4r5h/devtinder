import { useCallback, useRef } from "react";

const decodedImages = new Set();

export const useImagePreloader = ({ imageUrls, minimumDuration = 2500 }) => {

  const loadedCount = useRef(0);

  const startTime = useRef(0);

  const finish = useRef(null);

  const progressEngine = useRef(null);

  const getLoader = (loader) => {
    finish.current = loader.finish;
  };

  const setProgressEngine = (engine) => {
    progressEngine.current = engine;
  };

  const onProgress = (value) => {
    progressEngine.current?.update(value);
  };

  const onComplete = () => {
    finish.current();
  };

  const start = useCallback(async () => {
    if (!imageUrls.length) {
      onProgress(100);
      onComplete();
      return;
    }

    startTime.current = performance.now();

    loadedCount.current = 0;

    const complete = (resolve) => {
      loadedCount.current++;

      const progress = Math.round(
        (loadedCount.current / imageUrls.length) * 100,
      );

      onProgress(progress);

      resolve?.();
    };

    const promises = imageUrls.map((url) => {

      if (decodedImages.has(url)) {
        complete();
        return Promise.resolve();
      }

      return new Promise((resolve) => {
        const image = new Image();

        const handleComplete = () => {
          decodedImages.add(url);
          complete(resolve);
        };

        image.onload = handleComplete;
        image.onerror = handleComplete;

        image.src = url;
      });
    });

    await Promise.all(promises);

    const elapsed = performance.now() - startTime.current;

    const remaining = Math.max(0, minimumDuration - elapsed);

    await new Promise((resolve) => setTimeout(resolve, remaining));

    onComplete();
  }, [imageUrls, minimumDuration, onProgress, onComplete]);

  return {
    start,
    getLoader,
    setProgressEngine,
  };
};
