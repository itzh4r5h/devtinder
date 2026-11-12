import { store } from "@/store/store";
import { getReceviedRequests, getSentRequests } from "@/store/thunks/requestsThunk";

export const requestLoader = ({ params }) => {
  const allowedStatuses = ["received", "sent"];

  if (!allowedStatuses.includes(params.status)) {
    throw new Response("Not Found", {
      status: 404,
    });
  }
  if (params.status === 'received') {
    return {
      requestsPromise: store.dispatch(getReceviedRequests()).unwrap()
    }
  }

  if (params.status === 'sent') {
    return {
      requestsPromise: store.dispatch(getSentRequests()).unwrap()
    }
  }

  return null
}  
