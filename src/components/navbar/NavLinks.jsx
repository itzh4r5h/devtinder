import {
  Cable,
  Flame,
  Heart,
  Users,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProfileMenu } from "./ProfileMenu";
import { Link, NavLink, useLocation } from "react-router";
import { motion } from "motion/react";

const NavLi = ({ Icon, name }) => {
  return (
    <NavLink
      to={`/${name === 'requests'?name+'/received':name}`}
      className={({ isActive }) =>
        isActive ? "text-foreground" : "text-muted-foreground"
      }
    >
      {({ isActive }) => {
        return (
          <motion.div className="relative">
            <div className="flex items-center gap-x-2 px-1">
              <Icon
                strokeWidth={2.5}
                className={`size-5 ${isActive && "active-icon"}`}
              />
              <span className="text-lg capitalize tracking-wide">{name}</span>
            </div>

            {isActive ? (
              <motion.div
                layoutId="underline"
                id="underline"
                className="absolute inset-0 rounded-full active-bar h-0.5 top-7.5"
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 35,
                }}
              />
            ) : null}
          </motion.div>
        );
      }}
    </NavLink>
  );
};

export const NavLinks = ({ forDrawer, isLoggedIn }) => {
  const drawer = "flex flex-col gap-y-4 p-4 pt-6 h-full pb-8";
  const forNav = `${isLoggedIn && "hidden"} md:flex gap-x-5 items-center`;
  const location = useLocation();
  const activeRoute = location.pathname;

  const linksAfterSignin = [
    {
      name: "feed",
      icon: Flame,
    },
    {
      name: "requests",
      icon: Heart,
    },
    {
      name: "connections",
      icon: Users,
    },
    ...(forDrawer
      ? [
          {
            name: "profile",
            icon: UserIcon,
          },
          {
            name: "settings",
            icon: SettingsIcon,
          },
        ]
      : []),
  ];

  return (
    <ul className={`${forDrawer ? drawer : forNav}`}>
      {!isLoggedIn && (
        <Link to={activeRoute !== "/" ? "/" : "/signup"}>
          <Button
            variant="outline"
            size="lg"
            className="button-bg font-bold text-lg cursor-pointer capitalize"
          >
            {activeRoute !== "/" ? (
              <ArrowLeft strokeWidth={2.5} className="size-5" />
            ) : (
              <Cable />
            )}
            {activeRoute !== "/" ? "Back" : "Get Started"}
          </Button>
        </Link>
      )}

      {isLoggedIn &&
        linksAfterSignin.map((link) => (
          <li className="w-fit" key={link.name}>
            <NavLi Icon={link.icon} name={link.name} />
          </li>
        ))}

      {isLoggedIn && forDrawer && (
        <Button
          variant="outline"
          size="lg"
          className="button-bg font-bold text-lg cursor-pointer capitalize w-ful mt-auto"
        >
          <LogOutIcon /> Sign out
        </Button>
      )}

      {isLoggedIn && !forDrawer && <ProfileMenu />}
    </ul>
  );
};
