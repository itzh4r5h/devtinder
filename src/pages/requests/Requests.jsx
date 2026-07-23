import { Tabs } from "@/components/Tabs";
import { Inbox, Send } from "lucide-react";
import { useLocation } from "react-router";
import { Received } from "./Received";
import { MOCK_USERS } from "@/mock/user-data";

export const Requests = () => {
  const location = useLocation();
  const activeRoute = location.pathname;
  const tabs = [
    {
      name: "received",
      Icon: Inbox,
      route: "/requests/received",
    },
    {
      name: "sent",
      Icon: Send,
      route: "/requests/sent",
    },
  ];

    const modified_mock_users = MOCK_USERS.map((user) => {
      const firstName = user.name.split(" ")[0].toLowerCase();
      return { ...user, imageUrl: `/images/${firstName}.webp` };
    });

  return (
    <section className="my-6">
  
      <div className="md:w-2/3 lg:w-1/2 mx-auto"> 
        <Tabs activeRoute={activeRoute} tabs={tabs}/>
      </div>

      {activeRoute === tabs[0].route && <Received users={modified_mock_users}/>}
    </section>
  );
};
