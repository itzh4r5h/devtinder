import App from "@/App";
import { Home } from "@/pages/home/Home";
import { createBrowserRouter } from "react-router";


export const router = createBrowserRouter([
    {
        path: '/',
        Component: App,
        children: [
            {
                index: true,
                Component: Home
            }
        ]
    }
])