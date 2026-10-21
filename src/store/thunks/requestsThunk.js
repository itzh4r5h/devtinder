import { httpReq } from "@/api/httpReq";
import { asyncThunkHandler } from "../handlers";

export const getReceviedRequests = asyncThunkHandler("requests/get_recevied_reqs", async () => {
  const res = await httpReq.get(`/connection/review`)
  return { data: res.data.connectionRequests }
})

export const getSentRequests = asyncThunkHandler("requests/get_sent_reqs", async () => {
  const res = await httpReq.get(`/connection/req`)
  return { data: res.data.connectionRequests }
})
