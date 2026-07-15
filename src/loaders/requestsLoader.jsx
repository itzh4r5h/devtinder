

export const requestsLoader = ({ params }) => {
  const allowedStatuses = ["received", "sent"];

  if (!allowedStatuses.includes(params.status)) {
     throw new Response("Not Found", {
      status: 404,
    });
  }

  return null;
}