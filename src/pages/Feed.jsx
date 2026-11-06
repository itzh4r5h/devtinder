import { SwipeCards } from "@/components/swipe-cards/SwipeCards";
import { useSelector } from "react-redux";

export const Feed = () => {
  const { users } = useSelector(state => state.feed)

  return (
    <section
      className="w-full flex-1 flex flex-col overflow-hidden sm:min-h-170"
    >
      <SwipeCards users={users} />
    </section>
  );
};
