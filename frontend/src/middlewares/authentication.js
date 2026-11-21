import { store } from "@/store/store"
import { checkIsUserLoggedIn } from "@/store/thunks/authThunk"


export const authentication = async () => {
  const { isAuthChecked } = store.getState().auth

  if (!isAuthChecked) {
    await store.dispatch(checkIsUserLoggedIn("auth_check"))
  }

  const { isLoggedIn } = store.getState().auth

  return isLoggedIn
} 
