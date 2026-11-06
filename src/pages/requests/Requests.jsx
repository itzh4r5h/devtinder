import { Tabs } from "@/components/Tabs";
import { Inbox, Send } from "lucide-react";
import { useLocation } from "react-router";
import { Received } from "./Received";
import { Sent } from "./Sent";
import { useSelector } from "react-redux";

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


  const { received, sent } = useSelector(state => state.requests)

  return (
    <section className="my-6 flex flex-1 flex-col">

      <div className="md:w-2/3 lg:w-1/2 mx-auto">
        <Tabs activeRoute={activeRoute} tabs={tabs} />
      </div>

      {activeRoute === tabs[0].route && <Received users={received} />}
      {activeRoute === tabs[1].route && <Sent users={sent} />}
    </section>
  );
};
