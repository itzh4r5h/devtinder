import { store } from "@/store/store";
import { getUser } from "@/store/thunks/userThunk";

export const profileLoader = () => {
  return {
    userPromise: store.dispatch(getUser()).unwrap()
  }
}  
