import { store } from "@/store/store";
import { verifyEmail } from "@/store/thunks/authThunk";

// runs once per visit of the email link, so the one time token is never sent twice
export const verifyEmailLoader = ({ request }) => {
  const token = new URL(request.url).searchParams.get("token");

  if (!token) {
    return { verifyPromise: null };
  }

  return {
    verifyPromise: store.dispatch(verifyEmail(token)).unwrap()
  };
};
