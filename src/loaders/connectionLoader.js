import { store } from "@/store/store";
import { getConnections } from "@/store/thunks/connectionThunk";

export const connectionLoader = async () => {
  await store.dispatch(getConnections())
  return null
}  
