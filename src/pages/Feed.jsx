import { SwipeCards } from "@/components/swipe-cards/SwipeCards";
import { MOCK_USERS } from "@/mock/user-data";

export const Feed = () => {
  const modified_mock_users = MOCK_USERS.map((user) => {
    const firstName = user.name.split(" ")[0].toLowerCase();
    return { ...user, imageUrl: `/images/${firstName}.webp` };
  });

  return (
    <section
      className="w-full flex-1 flex flex-col overflow-hidden sm:min-h-170"
    >
      <SwipeCards users={modified_mock_users} />
    </section>
  );
};
