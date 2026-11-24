import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LeftContent } from "./LeftContent";

// same layout as the sign in / sign up page: hero on the left, card on the right
export const AuthCardLayout = ({ Icon, iconClassName, title, description, children, iconPositions }) => {
  return (
    <section className="flex flex-wrap h-full">
      <LeftContent iconPositions={iconPositions} />

      <div className="flex px-0 py-5 sm:p-12 md:py-5 md:px-0 lg:p-12 justify-center items-center flex-1">
        <Card className="max-w-md card rounded-2xl border border-white/10 p-6 gap-5 w-full">
          <CardHeader className="text-center p-0 items-center gap-2">
            <div className="size-12 rounded-xl bg-neutral-800 border-white/10 border border-solid flex justify-center items-center">
              <Icon strokeWidth={2.5} className={cn("size-6 active-icon", iconClassName)} />
            </div>
            <CardTitle className="font-bold text-2xl text-foreground leading-tight">
              {title}
            </CardTitle>
            {description && (
              <CardDescription className="text-muted-foreground text-base">
                {description}
              </CardDescription>
            )}
          </CardHeader>
          {children && <CardContent className="p-0">{children}</CardContent>}
        </Card>
      </div>
    </section>
  );
};
