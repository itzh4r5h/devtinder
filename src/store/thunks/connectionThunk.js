import { httpReq } from "@/api/httpReq";
import { asyncThunkHandler } from "../handlers";

export const getConnections = asyncThunkHandler("connections/get_connections", async () => {
  const res = await httpReq.get(`/connection/view`)
  return { data: res.data.connections }
})

