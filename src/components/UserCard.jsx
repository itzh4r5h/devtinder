import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { BadgeCheck, Briefcase, Heart, X } from "lucide-react";

export const UserCard = () => {
  return (
    <Card className="relative card border border-white/10 -rotate-3 rounded-3xl  p-4 gap-4 w-80 sm:w-100">
      <CardContent className="flex p-0 flex-col gap-4">
        <div className="relative rounded-2xl w-full h-72 sm:h-95 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1772971919691-598c37fe4b81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjBwb3J0cmFpdCUyMG1hbiUyMGNvZGluZ3xlbnwxfDJ8fHwxNzgxOTE1NDczfDA&ixlib=rb-4.1.0&q=80&w=400"
            alt="Alex Chen"
            className="object-cover w-full h-full"
            data-photoid="HKnvq4krutI"
            data-authorname="Mikhail Seleznev"
            data-authorurl="https://unsplash.com/@mihmihfoto"
            data-blurhash="LF9s@x0Lxt%0SzaKkWRjIss+t7Ip"
          />
          <div className="bg-[linear-gradient(to_top,oklch(0.145_0_0/.85),transparent)] absolute inset-x-0 bottom-0 h-24" />
          <div className="absolute inset-x-3 bottom-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-lg sm:text-2xl leading-7">
                Alex Chen
              </span>
              <BadgeCheck className="size-5 fill-[#a78bfa]/20 text-violet-400" />
            </div>
            <div className="text-white/80 text-xs sm:text-sm leading-4 flex items-center gap-1">
              <Briefcase className="size-3 sm:size-3.5" />
              Full Stack Dev
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
            <Badge className='text-foreground bg-cyan-600 leading-4 sm:text-sm h-7 px-3'>React</Badge>
            <Badge className='text-foreground bg-green-800 leading-4 sm:text-sm h-7 px-3'>Node.js</Badge>
            <Badge className='text-foreground bg-blue-800 leading-4 sm:text-sm h-7 px-3'>TypeScript</Badge>
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-2 p-0 pb-4 gap-4 bg-transparent border-0">
        <Button
          variant="outline"
          size="lg"
          className="bg-transparent rounded-full sm:text-lg text-foreground border-white/10 border-0 border-solid cursor-pointer capitalize h-11"
        >
          <X className="size-4 sm:size-5" />
          Ignore
        </Button>
        <Button variant="outline" size="lg" className="button-bg font-bold sm:text-lg cursor-pointer capitalize rounded-full text-foreground h-11">
          <Heart className="size-4 sm:size-5" />
          Interested
        </Button>
      </CardFooter>
    </Card>
  );
};
