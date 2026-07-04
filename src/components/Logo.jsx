import { Code2, Heart } from "lucide-react";

export const Logo = () => {
  return (
    <div className="flex items-center gap-2 w-fit">
      <a className="cursor-pointer relative size-9 button-bg rounded-xl flex justify-center items-center">
        <Code2 className="size-5 text-white" strokeWidth={3}/>
        <Heart className="size-3.5 fill-primary drop-shadow-[0_0_4px_var(--primary)] text-pink-500 absolute -right-1 -bottom-1" />
      </a>
      <a className="cursor-pointer text-bg text-2xl">
        DevTinder
      </a>
    </div>
  );
};
