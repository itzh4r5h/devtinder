import { httpReq } from "@/api/httpReq";
import { asyncThunkHandler } from "../handlers";
import { setUser } from "../slices/userSlice";

export const signup = asyncThunkHandler('auth/signup', async (userInfo, dispatch) => {
  const res = await httpReq.post('/auth/signup', userInfo)
  const data = res.data
  dispatch(setUser(data.user))
  return data.message
})

export const checkIsUserLoggedIn = asyncThunkHandler('auth/auth_check', async (_, dispatch) => {
  const res = await httpReq.get('/users/me')
  const user = res.data
  dispatch(setUser(user))
})
