import App from "@/App";
import { routes } from "@/constants/routes";
import { appLoader } from "@/loaders/appLoader";
import { connectionsLoader } from "@/loaders/connectionsLoader";
import { authMiddleware } from "@/middlewares/authMiddleware";
import { Auth } from "@/pages/auth/Auth";
import { Connections } from "@/pages/connections/Connections";
import { Error } from "@/pages/Error";
import { Feed } from "@/pages/Feed";
import { Home } from "@/pages/home/Home";
import { NotFound } from "@/pages/not-found/NotFound";
import { Profile } from "@/pages/profile/Profile";
import { Requests } from "@/pages/requests/Requests";
import { AccountSettings } from "@/pages/settings/AccountSettings";

import { createBrowserRouter } from "react-router";

const {signin,signup,feed,requests,connections,connections_with_id,profile,settings} = routes

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    loader: appLoader,
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
            path: signin,
            Component: Auth,
          },
          {
            path: signup,
            Component: Auth,
          },
          {
            path: feed,
            Component: Feed,
          },
          {
            path: requests,
            Component: Requests,
          },
          {
            path: connections,
            Component: Connections,
          },
          {
            path: connections_with_id,
            loader: connectionsLoader,
            Component: Connections,
          },
          {
            path: profile,
            Component: Profile,
          },
          {
            path: settings,
            Component: AccountSettings,
          },
        ],
      }
    ],
  },
]);
