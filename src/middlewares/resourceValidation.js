import { store } from "@/store/store";
import { getConnections } from "@/store/thunks/connectionThunk";

export const resourceValidation = async (matchedRoute) => {
  const { resource } = matchedRoute.route.handle || {};
  const params = matchedRoute.params;

  if (!resource) return true;

  const { isConnectionsReceived } = store.getState().connections
  if (!isConnectionsReceived) {
    await store.dispatch(getConnections())
  }

  const { connectionsData } = store.getState().connections;
  console.log(connectionsData)

  if (resource === "connection") {
    return connectionsData.some(
      (conn) => conn.connectionId === params.connectionId
    );
  }

  if (resource === "connection-profile") {
    return connectionsData.some(
      (conn) => conn.user._id === params.userId
    );
  }

  return false;
};
