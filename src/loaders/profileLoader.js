import { store } from "@/store/store";
import { getUser } from "@/store/thunks/userThunk";

export const profileLoader = async () => {
  await store.dispatch(getUser())
  return null
}  
