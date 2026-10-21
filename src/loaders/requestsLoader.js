import { store } from "@/store/store";
import { getReceviedRequests, getSentRequests } from "@/store/thunks/requestsThunk";

export const requestLoader = async ({ request }) => {
  const url = new URL(request.url);
  const pathname = url.pathname;
  if (pathname.includes('received')) {
    await store.dispatch(getReceviedRequests())
  }
  else if (pathname.includes('sent')) {
    await store.dispatch(getSentRequests())
  }
  return null
}  
