import { store } from "@/store/store";
import { getUser } from "@/store/thunks/userThunk";

export const profileLoader = async () => {
  const { user } = store.getState().user
  if (user?.isProfileCompleted) {
    await store.dispatch(getUser())
  }
  return null
}  
