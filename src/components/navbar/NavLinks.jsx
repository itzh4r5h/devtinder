import {
  Cable,
  House,
  Sparkles,
  Workflow,
  Flame,
  Heart,
  Users,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProfileMenu } from "./ProfileMenu";

const NavLi = ({ Icon, name, isActive }) => {
  return (
    <a
      href=""
      className={`${isActive ? "text-foreground" : "text-muted-foreground"}`}
    >
      <div className="flex items-center gap-x-2">
        <Icon
          strokeWidth={2.5}
          className={`size-5 ${isActive && "active-icon"}`}
        />
        <span className="text-lg capitalize tracking-wide">{name}</span>
      </div>
      <div className={`${isActive ? "block" : "invisible"} mt-0.5`}>
        <span className="w-full rounded-full h-0.5 active-bar block"></span>
      </div>
    </a>
  );
};

export const NavLinks = ({ forDrawer,isLoggedIn }) => {

  const drawer = "flex flex-col gap-y-4 p-4 pt-6 h-full";
  const forNav = "hidden md:flex gap-x-5 items-center";

  const linksBeforeSignin = [
    {
      name: "home",
      icon: House,
      isActive: true,
    },
    {
      name: "how it works",
      icon: Workflow,
      isActive: false,
    },
    {
      name: "features",
      icon: Sparkles,
      isActive: false,
    },
  ];

  const linksAfterSignin = [
    {
      name: "feed",
      icon: Flame,
      isActive: true,
    },
    {
      name: "requests",
      icon: Heart,
      isActive: false,
    },
    {
      name: "connections",
      icon: Users,
      isActive: false,
    },
    ...(forDrawer
      ? [
          {
            name: "Profile",
            icon: UserIcon,
            isActive: false,
          },
          {
            name: "Settings",
            icon: SettingsIcon,
            isActive: false,
          },
        ]
      : []),
  ];

  return (
    <ul className={`${forDrawer ? drawer : forNav}`}>
      {!isLoggedIn &&
        linksBeforeSignin.map((link) => (
          <li className="w-fit" key={link.name}>
            <NavLi
              key={link.name}
              Icon={link.icon}
              name={link.name}
              isActive={link.isActive}
            />
          </li>
        ))}

      {!isLoggedIn && (
        <Button
          variant="outline"
          size="lg"
          className={`button-bg font-bold text-lg cursor-pointer capitalize ${forDrawer && "w-full mt-auto"}`}
        >
          <Cable /> Get Started
        </Button>
      )}

      {isLoggedIn &&
        linksAfterSignin.map((link) => (
          <li className="w-fit" key={link.name}>
            <NavLi Icon={link.icon} name={link.name} isActive={link.isActive} />
          </li>
        ))}

      {isLoggedIn && forDrawer && (
        <Button
          variant="outline"
          size="lg"
          className={`button-bg font-bold text-lg cursor-pointer capitalize ${forDrawer && "w-full mt-auto"}`}
        >
          <LogOutIcon /> Sign out
        </Button>
      )}

      {isLoggedIn && !forDrawer && <ProfileMenu />}
    </ul>
  );
};
