import { Code2, Heart } from "lucide-react";
import { Link } from "react-router";

export const Logo = () => {
  return (
    <Link
      to="/"
      className="flex items-center gap-2 w-fit cursor-pointer"
    >
      <div className="relative size-9 button-bg rounded-xl flex justify-center items-center">
        <Code2 className="size-5 text-white" strokeWidth={3} />
        <Heart className="size-3.5 fill-primary drop-shadow-[0_0_4px_var(--primary)] text-primary absolute -right-1 -bottom-1" />
      </div>
      <div className="text-bg text-2xl">DevTinder</div>
    </Link>
  );
};
