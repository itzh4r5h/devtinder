import { getMatchedRoute } from "@/lib/utils";
import { authentication } from "./authentication";
import { authorization } from "./authorization";
import { resourceValidation } from "./resourceValidation";

export const authMiddleware = async ({ request }) => {
  const isLoggedIn = await authentication();

  const pathname = new URL(request.url).pathname;

  // Match only once
  const matchedRoute = getMatchedRoute(pathname);

  if (!matchedRoute) {
    throw new Response("Not Found", { status: 404 });
  }

  // Authorization
  if (!authorization(matchedRoute, isLoggedIn)) {
    throw new Response("Not Found", { status: 404 });
  }

  // Resource validation
  const isValidResource = await resourceValidation(matchedRoute)
  if (isLoggedIn && !isValidResource) {
    throw new Response("Not Found", { status: 404 });
  }

  return null;
}
