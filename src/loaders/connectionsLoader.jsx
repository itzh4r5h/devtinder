import { MOCK_USERS } from "@/mock/user-data";

export const connectionsLoader = ({ request }) => {
    const id = request.url.split("/")[4]
  
    // replace it with real connection ids
    const connectionIds = MOCK_USERS.map((user)=>user._id)

  if (!connectionIds.includes(id)) {
     throw new Response("Not Found", {
      status: 404,
    });
  }

  return null;
}