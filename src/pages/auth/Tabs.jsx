import { motion } from "motion/react";
import { Link } from "react-router";
import { LogIn, UserPlus } from "lucide-react";

export const Tabs = ({ activeRoute }) => {
  const tabs = [
    {
      name: "sign in",
      Icon: LogIn,
      route: "/signin",
    },
    {
      name: "sign up",
      Icon: UserPlus,
      route: "/signup",
    },
  ];

  return (
    <div className="grid grid-cols-2 items-center justify-center rounded-full bg-neutral-800 p-1.5 gap-10">
      {tabs.map(({ name, Icon, route }) => {
        return (
          <motion.div className="relative" key={name}>
            {activeRoute === route && (
              <motion.div
                layoutId="auth-tab"
                className="absolute inset-0 rounded-full active-bar border border-solid border-white/50"
                transition={{
                  type: "spring",
                  stiffness: 450,
                  damping: 35,
                }}
              />
            )}

            <Link
              to={route}
              className={`relative z-10 font-semibold rounded-full ${activeRoute === route ? "text-foreground" : "text-muted-foreground"} text-lg cursor-pointer flex justify-center items-center gap-2 py-0.5 capitalize`}
            >
              <Icon className="size-5" />
              {name}
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
};
