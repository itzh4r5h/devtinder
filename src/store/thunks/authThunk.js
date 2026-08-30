import { httpReq } from "@/api/httpReq";
import { asyncThunkHandler } from "../handlers";
import { setUser } from "../slices/userSlice";

export const signup = asyncThunkHandler('auth/signup', async (userInfo, dispatch) => {
  const data = await httpReq.post('/auth/signup', userInfo)
  dispatch(setUser(data.user))
  return data.message
})
