import React from "react";
import { isRouteErrorResponse, useRouteError } from "react-router";
import { NotFound } from "./not-found/NotFound";

export const Error = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 404:
        return <NotFound />;

    //   case 401:
    //     return <Unauthorized />;

    //   case 403:
    //     return <Forbidden />;

    //   case 500:
    //     return <ServerError />;

      default:
        return <div>{error}</div>;
    }
  }

  return <div>{error}</div>;
};
