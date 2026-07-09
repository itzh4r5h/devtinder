import { SwipeCards } from "@/components/swipe-cards/SwipeCards";

export const FeedPreview = ({ mock_users }) => {
  return (
    <section>
      <h1 className="text-foreground text-4xl font-semibold capitalize text-center tracking-wide leading-11">
        see feed in action
      </h1>
      <h3 className="text-secondary text-xl capitalize text-center tracking-wide">
        swipe right for interested, swipe left to ignore
      </h3>

      <SwipeCards users={mock_users} />
    </section>
  );
};
