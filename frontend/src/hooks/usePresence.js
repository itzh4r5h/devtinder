import { useSelector } from "react-redux";

// { online, lastSeenAt } of a connection. while our own socket is down the data
// is stale, so nobody is shown as online
export const usePresence = (userId) => {
  const presence = useSelector((state) => state.chat.presence[userId])
  const isConnected = useSelector((state) => state.chat.socketStatus === "connected")

  return {
    online: Boolean(isConnected && presence?.online),
    lastSeenAt: presence?.lastSeenAt ?? null,
  }
}
