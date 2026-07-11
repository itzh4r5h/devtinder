import { redirect } from "react-router";

export const authMiddleware = async ({ request }) => {
  const url = new URL(request.url);

  const authRoutes = ["/signin", "/signup"];
  const protectedRoutes = ["/feed", "/requests", "/connections", "/profile", "/settings"];

  const isLoggedIn = false;

  // Guest trying to access protected page
  if (!isLoggedIn && protectedRoutes.includes(url.pathname)) {
    throw redirect("/signin");
  }

  // Logged-in user trying to access auth pages
  if (isLoggedIn && authRoutes.includes(url.pathname)) {
    throw redirect("/feed");
  }
};
