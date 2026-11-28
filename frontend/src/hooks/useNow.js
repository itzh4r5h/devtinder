import { useEffect, useState } from "react";

// current time that re-renders every `intervalMs`, for relative labels like "5m ago"
export const useNow = (intervalMs = 60 * 1000) => {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])

  return now
}
