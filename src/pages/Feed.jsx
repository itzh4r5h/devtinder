import { SwipeCards } from "@/components/swipe-cards/SwipeCards";
import { MOCK_USERS } from "@/mock/user-data";

export const Feed = () => {
  const modified_mock_users = MOCK_USERS.map((user) => {
    const firstName = user.name.split(" ")[0].toLowerCase();
    return { ...user, imageUrl: `/images/${firstName}.webp` };
  });

  return (
    <section
      className="overflow-hidden h-150 sm:h-170 flex flex-col"
    >
      <SwipeCards users={modified_mock_users} />
    </section>
  );
};
