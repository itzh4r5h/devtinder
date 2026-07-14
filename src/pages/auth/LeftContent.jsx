import { Atom, Braces, Cpu, Terminal, User } from "lucide-react";
import { Logo } from "@/components/Logo";
import { motion } from "motion/react";

export const LeftContent = () => {
  return (
    <motion.div
      layout
      transition={{
        layout: {
          duration: 0.4,
          ease: "backOut",
        },
      }}
      className="hidden sm:flex relative bg-transparent p-12 flex-col justify-center overflow-hidden flex-1"
    >
      <Icons />
      {/* circle begin */}
      <div className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-72 bg-[radial-gradient(circle,oklch(0.627_0.265_303.9/.35),transparent_70%)] blur-2xl rounded-full absolute" />
      {/* circle end */}
      <div className="relative z-10 flex flex-col gap-6">
        <Logo />
        <h1 className="leading-tight font-bold text-5xl tracking-wide">
          Where Devs
          <br />
          Connect
          <span className="text-[oklch(0.645_0.246_16.439)]">❤️‍🔥</span>
        </h1>
        <p className="max-w-sm text-muted-foreground text-lg leading-6 tracking-wide">
          Swipe right on your next pair-programming partner, co-founder, or
          open-source collaborator.
        </p>
        <div className="flex mt-2 items-center gap-4">
          <div className="-space-x-2 flex">
            {[1, 2, 3].map((item) => {
              return (
                <div
                  key={item}
                  className="size-8 rounded-full bg-neutral-800 border-white/10 border border-solid flex justify-center items-center"
                >
                  <User className="size-4 text-muted-foreground" />
                </div>
              );
            })}
          </div>
          <span className="text-muted-foreground text-md leading-5">
            12k+ devs already matched
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const Icons = () => {
  const icons = [
    {
      Icon: Atom,
      boxCss: "top-[12%] left-[18%] size-14",
      iconCss: "size-7 text-[oklch(0.696_0.17_162.48)]",
    },
    {
      Icon: Cpu,
      boxCss: "top-[28%] right-[16%] size-12",
      iconCss: "size-6 text-[oklch(0.769_0.188_70.08)]",
    },
    {
      Icon: Terminal,
      boxCss: "bottom-[15%] left-[24%] size-12",
      iconCss: "size-6 text-[oklch(0.696_0.17_162.48)]",
    },
    {
      Icon: Braces,
      boxCss: "bottom-[34%] right-[22%] size-10",
      iconCss: "size-5 text-secondary",
    },
  ];

  return (
    <>
      {icons.map(({ Icon, boxCss, iconCss }) => {
        return (
          <div
            key={iconCss}
            className={`${boxCss} rounded-2xl bg-neutral-900/60 border-white/10 border border-solid flex absolute justify-center items-center cursor-pointer z-100`}
          >
            <Icon className={`${iconCss}`} />
          </div>
        );
      })}
    </>
  );
};
