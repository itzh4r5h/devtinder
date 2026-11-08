import { store } from "@/store/store";
import { getReceviedRequests, getSentRequests } from "@/store/thunks/requestsThunk";

export const requestLoader = async ({ params }) => {
  const allowedStatuses = ["received", "sent"];

  if (!allowedStatuses.includes(params.status)) {
    throw new Response("Not Found", {
      status: 404,
    });
  }
  if (params.status === 'received') {
    await store.dispatch(getReceviedRequests())
    return
  }

  if (params.status === 'sent') {
    await store.dispatch(getSentRequests())
    return
  }

  return null
}  
