import { routes } from "@/constants/routes";
import { MOCK_USERS } from "@/mock/user-data";
import { store } from "@/store/store";

export const authMiddleware = ({ request }) => {
  const { isLoggedIn } = store.getState().auth;
  const url = new URL(request.url);
  const pathname = url.pathname;
  const id = request.url.split("/")[4];

  // replace it with real connection ids
  const connectionIds = MOCK_USERS.map((user) => user._id);

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
