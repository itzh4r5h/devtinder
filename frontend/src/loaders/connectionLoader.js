import { store } from "@/store/store";
import { getConnections } from "@/store/thunks/connectionThunk";

export const connectionLoader = () => {
  return {
    connectionPromise: store.dispatch(getConnections()).unwrap()
  }
}

export const getConnectionProfileData = async ({ request }) => {
  const { connectionsData } = store.getState().connections
  const url = new URL(request.url);
  const userId = url.pathname.split("/")[3]
  const userData = connectionsData.filter((conn) => conn.user._id === userId)[0].user
  return { connectionProfileData: userData }
}
