import App from "@/App";
import { requestsLoader } from "@/loaders/requestsLoader";
import { authMiddleware } from "@/middlewares/authMiddleware";
import { Auth } from "@/pages/auth/Auth";
import { Connections } from "@/pages/Connections";
import { Error } from "@/pages/Error";
import { Feed } from "@/pages/Feed";
import { Home } from "@/pages/home/Home";
import { NotFound } from "@/pages/not-found/NotFound";
import { Profile } from "@/pages/Profile";
import { Requests } from "@/pages/Requests";
import { Settings } from "@/pages/Settings";

import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    ErrorBoundary: Error,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        middleware: [authMiddleware],
        children: [
          {
            path: "/signin",
            Component: Auth,
          },
          {
            path: "/signup",
            Component: Auth,
          },
        ],
      },
      {
        middleware: [authMiddleware],
        children: [
          {
            path: "/feed",
            Component: Feed,
          },
          {
            path: "/requests/:status",
            loader: requestsLoader,
            Component: Requests,
          },
          {
            path: "/connections",
            Component: Connections,
          },
          {
            path: "/profile",
            Component: Profile,
          },
          {
            path: "/settings",
            Component: Settings,
          },
        ],
      },
      {
        path: "*",
        Component: NotFound
      }
    ],
  },
]);
