import { httpReq } from "@/api/httpReq";
import { asyncThunkHandler } from "../handlers";

export const getReceviedRequests = asyncThunkHandler("requests/get_recevied_reqs", async () => {
  const res = await httpReq.get(`/connection/review`)
  return { data: res.data.connectionRequests }
})

// reviewData inlcudes connectionId and status i.e. accept or reject
export const reviewRecievedReq = asyncThunkHandler("requests/review_recevied_req", async (reviewData) => {
  const res = await httpReq.post(`/connection/review`, reviewData)
  return { message: res.data.message }
})

export const getSentRequests = asyncThunkHandler("requests/get_sent_reqs", async () => {
  const res = await httpReq.get(`/connection/req`)
  return { data: res.data.connectionRequests }
})
