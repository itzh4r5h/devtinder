import { routes } from "@/constants/routes";

export const appLoader = ({ request }) => {
  const url = new URL(request.url);
  const pathname = url.pathname;

  const { signin, signup, feed, connections, profile, settings } = routes;

  const allowedRoutes = [
    "/",
    signin,
    signup,
    feed,
    "/requests/received",
    "/requests/sent",
    connections,
    profile,
    settings,
  ];

  const isAllowed = allowedRoutes.some(
    (route) => pathname === route
  );

  if (!isAllowed) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return null;
};
