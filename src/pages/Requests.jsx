import { Tabs } from "@/components/Tabs";
import { Inbox, Send } from "lucide-react";
import { useLocation } from "react-router";

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

  return (
    <section className="mt-6">
  
      <div className="md:w-2/3 lg:w-1/2 mx-auto"> 
        <Tabs activeRoute={activeRoute} tabs={tabs}/>
      </div>


    </section>
  );
};
