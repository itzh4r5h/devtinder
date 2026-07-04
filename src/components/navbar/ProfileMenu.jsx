import {
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const ProfileMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
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
        }
      />
      <DropdownMenuContent className='bg-card text-foreground p-4 w-fit space-y-2' alignOffset={-6} >
        <DropdownMenuItem className='text-md capitalize tracking-wide cursor-pointer dropdown-item'>
          <UserIcon className="size-5"/>
          Profile
        </DropdownMenuItem>
        
        <DropdownMenuItem className='text-md capitalize tracking-wide cursor-pointer dropdown-item'>
          <SettingsIcon className="size-5"/>
          Settings
        </DropdownMenuItem>
      
        <DropdownMenuItem className='text-md capitalize tracking-wide cursor-pointer dropdown-item'>
          <LogOutIcon className="size-5"/>
          sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
