import { useSyncExternalStore } from "react";

const subscribe = (callback) => {
  document.addEventListener("visibilitychange", callback)
  window.addEventListener("focus", callback)
  window.addEventListener("blur", callback)
  return () => {
    document.removeEventListener("visibilitychange", callback)
    window.removeEventListener("focus", callback)
    window.removeEventListener("blur", callback)
  }
}

const getSnapshot = () => document.visibilityState === "visible" && document.hasFocus()

// true while the tab is visible and focused, i.e. the user can actually see new messages
export const usePageVisible = () => useSyncExternalStore(subscribe, getSnapshot)
