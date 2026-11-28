import { AvatarBadge } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

// green "online" dot, render it inside an <Avatar>
export const OnlineDot = ({ className }) => (
  <AvatarBadge
    aria-label="online"
    className={cn(
      "size-3.5! bg-green-500 ring-[3px] ring-neutral-900 shadow-[0_0_8px_var(--color-green-500)]",
      className
    )}
  />
)
