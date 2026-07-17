import { Button } from "@/components/ui/button";
import { Circle, Flame } from "lucide-react";
import { UserCard } from "../../components/UserCard";
import { Link } from "react-router";


export const Hero = ({user}) => {
  return (
    <section className="flex flex-col gap-10 lg:flex-row">
      <div className="space-y-10 flex-2">
        {/* tag line begins*/}
        <div className="flex items-center gap-2 rounded-full px-3 py-2 border-border/25 border w-fit">
          <Circle className="size-2 fill-primary text-primary drop-shadow-[0_0_4px_var(--primary)]" />
          <p className="text-muted-foreground text-sm">
            Where great code meets great minds
          </p>
        </div>
        {/* tag line ends */}

        <h1 className="capitalize font-extrabold text-6xl leading-15 sm:text-7xl tracking-wide sm:leading-20">
          find your <span className="text-bg">dev soulmate</span> <br /> 💻️
          <span className="inline-block translate-y-1.5">❤️</span>
        </h1>

        <p className="text-muted-foreground text-lg tracking-wide leading-7">
          Connect with developers who share your stack, passion and vision.
          Swipe right on collaboration.
        </p>

        <Link to="/feed">
        <Button
          variant="outline"
          size="lg"
          className="button-bg font-bold text-xl cursor-pointer capitalize rounded-full py-6 px-5"
        >
          <Flame className="size-6" /> start swiping
        </Button>
        </Link>

        <div className="flex flex-wrap flex-row items-center justify-center gap-10 w-fit mt-5">
          <div>
            <h3 className="text-3xl tracking-wide font-bold leading-6">50k+</h3>
            <span className="capitalize text-muted-foreground tracking-wide text-sm">
              active devs
            </span>
          </div>
          <div>
            <h3 className="text-3xl tracking-wide font-bold leading-6">
              120k+
            </h3>
            <span className="capitalize text-muted-foreground tracking-wide text-sm">
              matches made
            </span>
          </div>
          <div>
            <h3 className="text-3xl tracking-wide font-bold leading-6">98%</h3>
            <span className="capitalize text-muted-foreground tracking-wide text-sm">
              code vibes
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-center flex-1">
        <span className="-rotate-3">
          <UserCard user={user} variant={{name:'default'}} expanded={true}/>
        </span>
      </div>
    </section>
  );
};
