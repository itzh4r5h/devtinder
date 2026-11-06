import { httpReq } from "@/api/httpReq";
import { asyncThunkHandler } from "../handlers";

export const getUsers = asyncThunkHandler("feed/get_users", async (page = 1) => {
  const res = await httpReq.get(`/connection/feed?page=${page}`)
  return { data: res.data }
})

export const sendConnectionReq = asyncThunkHandler('feed/send_req', async (connectionInfo) => {
  const res = await httpReq.post('/connection/req', connectionInfo)
  const data = res.data
  return { message: data.message }
})
