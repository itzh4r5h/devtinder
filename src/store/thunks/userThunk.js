import { httpReq } from "@/api/httpReq";
import { asyncThunkHandler } from "../handlers";
import { setUser } from "../slices/userSlice";

export const getUser = asyncThunkHandler('user/get_user', async () => {
  const res = await httpReq.get('/users/me')
  const user = res.data
  return user
})

export const updateProfile = asyncThunkHandler('user/update_profile', async (userInfo, dispatch) => {
  const res = await httpReq.patch('/users/edit', userInfo)
  const data = res.data
  dispatch(setUser(data.user))
  return data.message
})
