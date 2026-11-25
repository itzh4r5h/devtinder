import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";

export const PasswordInput = (props) => {
  const [visible, setVisible] = useState(false);
  const Icon = visible ? Eye : EyeOff;

  return (
    <div className="relative">
      <Lock className="top-1/2 -translate-y-1/2 size-4 text-foreground absolute left-3" />
      <Input
        placeholder="••••••••"
        className="border-white/10 border-0 border-solid px-9 text-foreground"
        {...props}
        type={visible ? "text" : "password"}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Hide password" : "Show password"}
        aria-pressed={visible}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
      >
        <Icon className="size-4" />
      </button>
    </div>
  );
};
