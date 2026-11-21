import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

import { X } from "lucide-react";
import { useState } from "react";
import { Logo } from "../Logo";
import { NavLinks } from "./NavLinks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";

export const NavbarMobile = ({ isLoggedIn, direction = "right" }) => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector(state => state.user)
  return (
    <Drawer open={open} onOpenChange={setOpen} swipeDirection={direction}>
      <DrawerTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full cursor-pointer"
          >
            <Avatar size="lg">
              <AvatarImage src={user?.profilePic.url} alt={user?.name} />
              <AvatarFallback>{user?.name[0].toUpperCase()}</AvatarFallback>
            </Avatar>
          </Button>
        }
      />

      <DrawerContent className="card border-l border-border text-foreground">
        {/* header begins */}
        <DrawerHeader className="flex flex-row items-center justify-between">
          <Logo />
          <DrawerClose
            render={
              <Button variant="ghost" className="px-0">
                <X className="size-9 font-bold cursor-pointer outline-none" />
              </Button>
            }
          />
        </DrawerHeader>
        {/* header ends */}

        <NavLinks forDrawer={true} isLoggedIn={isLoggedIn} />
      </DrawerContent>
    </Drawer>
  );
};
