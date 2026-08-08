import { redirect } from "react-router";

export const authMiddleware = async ({ request }) => {
  const isLoggedIn = true;

  const url = new URL(request.url);

  const authRoutes = ["/signin", "/signup"];
  const protectedRoutes = [
    "/feed",
    "/requests",
    "/connections",
    "/profile",
    "/settings",
  ];

  // Guest trying to access protected page
  const isProtectedRoute = protectedRoutes.some(
    (route) => url.pathname === route || url.pathname.startsWith(`${route}/`),
  );

  if (!isLoggedIn && isProtectedRoute) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  // Logged-in user trying to access auth pages
  if (isLoggedIn && authRoutes.includes(url.pathname)) {
    throw new Response("Not Found", {
      status: 404,
    });
  }
};
