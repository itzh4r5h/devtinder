import { SwipeCards } from "@/components/swipe-cards/SwipeCards";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const FeedPreview = ({ mock_users }) => {
  const feedSectionRef = useRef(null);
  const [startLoader, setStartLoader] = useState(false);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: feedSectionRef.current,
      start: "top 45%",
      once: true,
      onEnter: () => setStartLoader(true),
    });

    ScrollTrigger.refresh();
  }, []);

  return (
    <section ref={feedSectionRef} className="overflow-hidden">
      <h1 className="text-foreground text-4xl font-semibold capitalize text-center tracking-wide leading-11">
        see feed in action
      </h1>
      <h3 className="text-secondary text-xl capitalize text-center tracking-wide">
        swipe right for interested, swipe left to ignore
      </h3>

      {startLoader && <SwipeCards users={mock_users} />}
    </section>
  );
};
