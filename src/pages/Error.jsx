import { isRouteErrorResponse, useRouteError } from "react-router";
import { NotFound } from "./not-found/NotFound";

export const Error = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 404:
        return <NotFound />;

      default:
        return error.data;
    }
  }

  return error.data
};
