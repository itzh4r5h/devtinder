import { store } from "@/store/store";
import { redirect } from "react-router";
import { toast } from "react-toastify";

export const authorization = (matchedRoute, isLoggedIn) => {
  const access = matchedRoute.route.handle.access
  const { user } = store.getState().user
  if (isLoggedIn && !user?.isProfileCompleted && matchedRoute?.pathname !== '/profile') {
    toast.info("please complete your profile first")
    throw redirect('/profile')
  }
  if (access === 'public') return true
  if (access === 'guest') return !isLoggedIn
  if (access === 'protected') return isLoggedIn

  return false
};
