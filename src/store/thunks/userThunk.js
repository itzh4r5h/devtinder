import { httpReq } from "@/api/httpReq";
import { asyncThunkHandler } from "../handlers";

export const getUser = asyncThunkHandler('user/get_user', async () => {
  const res = await httpReq.get('/users/me')
  const user = res.data
  return { data: user }
})

export const updateProfile = asyncThunkHandler('user/update_profile', async (userInfo) => {
  const res = await httpReq.patch('/users/edit', userInfo)
  const data = res.data
  return { message: data.message, data: data.user }
})

export const updateProfilePic = asyncThunkHandler('user/update_profile_pic', async ({ pic }) => {
  const formData = new FormData()
  formData.append('pic', pic)
  const res = await httpReq.patch('/users/pic', formData)
  const data = res.data
  return { message: data.message, data: data.user }
})
