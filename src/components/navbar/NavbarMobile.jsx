import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "../Logo";
import { NavLinks } from "./NavLinks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const NavbarMobile = ({isLoggedIn}) => {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen} swipeDirection="right">
      <DrawerTrigger
        render={
          isLoggedIn ? (
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full cursor-pointer"
            >
              <Avatar size="lg">
                <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
                <AvatarFallback>LR</AvatarFallback>
              </Avatar>
            </Button>
          ) : (
            <Button variant="ghost" className="px-0">
              <Menu className="size-9 cursor-pointer outline-none" />
            </Button>
          )
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

        <NavLinks forDrawer={true} isLoggedIn={isLoggedIn}/>
      </DrawerContent>
    </Drawer>
  );
};
