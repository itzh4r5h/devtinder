import { httpReq } from "@/api/httpReq";
import { asyncThunkHandler } from "../handlers";

export const getUser = asyncThunkHandler('user/get_user', async () => {
  const res = await httpReq.get('/users/me')
  const user = res.data
  return user
})
