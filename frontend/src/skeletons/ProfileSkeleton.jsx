import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const ProfileSkeleton = () => {
  return (
    <section className="w-full space-y-5 py-5">
      {/* Profile completion */}
      <div className="space-y-3">
        <Skeleton className="h-6 w-40 mx-auto" />

        <div className="flex items-center gap-4">
          <Skeleton className="h-1.5 flex-1 rounded-full" />
          <Skeleton className="h-5 w-14" />
        </div>
      </div>

      {/* Profile cards */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-5">
        {/* Left card */}
        <Card className="relative min-w-0">
          <CardContent className="min-h-[400px] sm:min-h-[500px] flex flex-col items-center justify-center gap-7 p-6">
            <Skeleton className="h-9 w-36" />

            <div className="relative">
              <Skeleton className="size-48 sm:size-64 lg:size-56 xl:size-64 rounded-full" />
              <Skeleton className="absolute -bottom-2 -right-2 size-12 rounded-full" />
            </div>
          </CardContent>
        </Card>

        {/* Right card */}
        <Card className="relative min-w-0">
          <CardContent className="relative space-y-6 p-6 sm:p-8">
            {/* Edit button */}
            <Skeleton className="absolute right-6 top-6 size-12 rounded-full" />

            {/* Role, experience, connections */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pr-14">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-7 w-36 max-w-full" />
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="space-y-3">
              <Skeleton className="h-5 w-28" />
              <div className="space-y-2 pl-0 sm:pl-8">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-3/4" />
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-3">
              <Skeleton className="h-5 w-14" />
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 14 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    className="h-9 w-16 sm:w-20 rounded-full"
                  />
                ))}
              </div>
            </div>

            {/* Age, gender, joined date */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-7 w-28 max-w-full" />
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="space-y-3">
              <Skeleton className="h-5 w-16" />
              <div className="flex gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    className="size-12 rounded-full"
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

