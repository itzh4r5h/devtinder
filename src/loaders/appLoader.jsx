import { routes } from "@/constants/routes";

export const appLoader = ({ request }) => {
  const activeRoute = `/${request.url.split("/")[3]}`

  const { signin, signup, feed, connections, profile, settings } = routes;

  const allowedRoutes = ["/", signin, signup, feed, connections, profile, settings]

  if (!allowedRoutes.includes(activeRoute)) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return null;
};
