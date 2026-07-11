import { MOCK_USERS } from "@/mock/user-data";
import { FeedPreview } from "./FeedPreview";
import { Hero } from "./Hero";
import { HowItWorks } from "./HowItWorks";

export const Home = () => {
  return (
    <div className="space-y-20 mt-15">
      <Hero user={MOCK_USERS[8]} />
      <HowItWorks />
      <FeedPreview mock_users={MOCK_USERS} />

      <section className="flex flex-col justify-center text-6xl font-medium leading-[1.05] tracking-tight">
  <p className="self-start">
    <span className="text-bg tracking-wider">One swipe</span>
  </p>

  <p className="self-center text-5xl text-muted-foreground my-5">
    could lead to your next
  </p>

  <div className="flex flex-col w-fit sm:w-1/2 lg:w-2/5 mx-auto">
    <span className="text-bg tracking-wider self-start">
      teammate.
    </span>

    <span className="text-bg tracking-wider self-center">
      mentor.
    </span>

    <span className="text-bg tracking-wider self-end">
      startup.
    </span>
  </div>

  <p className="self-end mt-8 max-w-3xl text-right">
    Discover people who share your
    <span className="text-bg"> passion</span> for building.
  </p>

  <p className="self-center mt-10 text-5xl text-muted-foreground capitalize leading-13">
    More connections. More code. More possibilities.
  </p>

  <p className="self-end mt-20 text-4xl">
    — Welcome to <span className="text-bg">DevTinder</span>
  </p>
</section>
    </div>
  );
};
