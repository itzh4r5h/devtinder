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

export const updateProfilePic = asyncThunkHandler('user/update_profile_pic', async ({ pic }, dispatch) => {
  const formData = new FormData()
  formData.append('pic', pic)
  console.log(formData.get("pic"))
  const res = await httpReq.patch('/users/pic', formData)
  const data = res.data
  dispatch(setUser(data.user))
  return data.message
})
