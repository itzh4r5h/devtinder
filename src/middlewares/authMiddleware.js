import { routes } from "@/constants/routes";
import { store } from "@/store/store";
import { checkIsUserLoggedIn } from "@/store/thunks/authThunk";
import { getConnections } from "@/store/thunks/connectionThunk";
import { redirect } from "react-router";
import { toast } from "react-toastify";

export const authMiddleware = async ({ request }) => {
  const { isAuthChecked } = store.getState().auth
  const { isConnectionsReceived } = store.getState().connections

  if (!isAuthChecked) {
    await store.dispatch(checkIsUserLoggedIn("auth_check"))
  }

  const { isLoggedIn } = store.getState().auth;
  const { user } = store.getState().user;

  if (!isConnectionsReceived && user.isProfileCompleted) {
    await store.dispatch(getConnections())
  }

  const { connectionsData } = store.getState().connections
  const url = new URL(request.url);
  const pathname = url.pathname;
  if (isLoggedIn && user?.profileCompletionCount < 100 && pathname !== '/profile') {
    toast.info("please complete your profile first")
    throw redirect('/profile')
  }

  const id = request.url.split("/")[4];

  const connectionIds = connectionsData.map((conn) => conn.connectionId);

  const { signin, signup, feed, connections, profile, settings } = routes;

  const allowedRoutes = [
    "/",
    ...(!isLoggedIn ? [signup, signin] :
      [feed,
        "/requests/received",
        "/requests/sent",
        connections,
        profile,
        settings,
      ]
    )
  ];

  const isAllowed = allowedRoutes.some((route) => {
    let modifiedRoute = route;
    if (isLoggedIn) {
      const isConnectionRoute = pathname.startsWith("/connections");
      if (isConnectionRoute && connectionIds.includes(id)) {
        modifiedRoute += `/${id}`;
      }
    }
    return pathname === modifiedRoute;
  });

  if (!isAllowed) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return null;
};
