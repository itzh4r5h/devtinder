import { store } from "@/store/store";
import { getConnections } from "@/store/thunks/connectionThunk";

export const connectionLoader = async () => {
  await store.dispatch(getConnections())
  return null
}

export const getConnectionProfileData = async ({ request }) => {
  const { connectionsData } = store.getState().connections
  const url = new URL(request.url);
  const userId = url.pathname.split("/")[3]
  const userData = connectionsData.filter((conn) => conn.user._id === userId)[0].user
  return userData
}
