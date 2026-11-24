import { useEffect, useState } from "react";

// returns the whole seconds left until targetTime (a ms timestamp), 0 once it has passed
export const useCountdown = (targetTime) => {
  const [now, setNow] = useState(() => Date.now());
  const secondsLeft = Math.max(0, Math.ceil((targetTime - now) / 1000));
  const isRunning = secondsLeft > 0;

  useEffect(() => {
    const tick = () => setNow(Date.now());
    // sync right away when the target changes, then keep ticking while counting down
    const first = setTimeout(tick, 0);
    const id = isRunning ? setInterval(tick, 250) : null;

    return () => {
      clearTimeout(first);
      if (id) clearInterval(id);
    };
  }, [targetTime, isRunning]);

  return secondsLeft;
};
