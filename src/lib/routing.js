import App from "@/App";
import { connectionLoader, getConnectionProfileData } from "@/loaders/connectionLoader";
import { profileLoader } from "@/loaders/profileLoader";
import { requestLoader } from "@/loaders/requestsLoader";
import { authMiddleware } from "@/middlewares/authMiddleware";
import { Auth } from "@/pages/auth/Auth";
import { Connections } from "@/pages/connections/Connections";
import { Error } from "@/pages/Error";
import { Feed } from "@/pages/Feed";
import { Home } from "@/pages/home/Home";
import { Profile } from "@/pages/profile/Profile";
import { Requests } from "@/pages/requests/Requests";
import { AccountSettings } from "@/pages/settings/AccountSettings";
import { store } from "@/store/store";
import { getUsers } from "@/store/thunks/feedThunk";
import { createBrowserRouter } from "react-router";


export const routes = [
  {
    path: "/",
    Component: App,
    middleware: [authMiddleware],
    ErrorBoundary: Error,
    children: [
      {
        index: true,
        Component: Home,
        handle: {
          access: "public"
        }
      },
      {
        path: '/signin',
        Component: Auth,
        handle: {
          access: "guest"
        }
      },
      {
        path: '/signup',
        Component: Auth,
        handle: {
          access: "guest"
        }
      },
      {
        path: '/feed',
        Component: Feed,
        loader: () => store.dispatch(getUsers()),
        handle: {
          access: "protected"
        }
      },
      {
        path: '/requests/:status',
        Component: Requests,
        loader: requestLoader,
        handle: {
          access: "protected",
        }
      },
      {
        path: '/connections',
        Component: Connections,
        loader: connectionLoader,
        handle: {
          access: "protected"
        }
      },
      {
        path: '/connections/profile/:userId',
        Component: Profile,
        loader: getConnectionProfileData,
        handle: {
          access: "protected",
          resource: 'connection-profile'
        }
      },
      {
        path: '/connections/:connectionId',
        Component: Connections,
        handle: {
          access: "protected",
          resource: 'connection'
        }
      },
      {
        path: '/profile',
        Component: Profile,
        loader: profileLoader,
        handle: {
          access: "protected"
        }
      },
      {
        path: '/settings',
        Component: AccountSettings,
        handle: {
          access: "protected"
        }
      },
    ],
  },
];


export const router = createBrowserRouter(routes)
