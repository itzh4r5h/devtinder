import { httpReq } from "@/api/httpReq";
import { asyncThunkHandler } from "../handlers";
import { clearUser, setUser } from "../slices/userSlice";

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

export const signin = asyncThunkHandler('auth/signin', async (userInfo, dispatch) => {
  const res = await httpReq.post('/auth/signin', userInfo)
  const data = res.data
  dispatch(setUser(data.user))
  return data.message
})

export const signout = asyncThunkHandler('auth/signout', async (_, dispatch) => {
  const res = await httpReq.post('/auth/signout')
  const data = res.data
  dispatch(clearUser())
  return data.message
})
