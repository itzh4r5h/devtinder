import { Code2, Heart } from "lucide-react";

export const Logo = () => {
  return (
    <div className="flex items-center gap-2 w-fit">
      <a className="cursor-pointer relative size-9 bg-[linear-gradient(135deg,#7c3aed,#ec4899)] shadow-[0_0_20px_oklch(0.627_0.265_303.9/.6)] rounded-xl flex justify-center items-center">
        <Code2 className="size-5 text-white" />
        <Heart className="size-3.5 fill-[#ec4899] drop-shadow-[0_0_4px_#ec4899] text-pink-500 absolute -right-1 -bottom-1" />
      </a>
      <a className="cursor-pointer bg-[linear-gradient(90deg,#a78bfa,#ec4899)] bg-clip-text text-transparent font-bold text-2xl">
        DevTinder
      </a>
    </div>
  );
};
