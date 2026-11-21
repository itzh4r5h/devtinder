import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const RequestsSkekelton = () => {
  return (

    <div className="flex flex-1 flex-wrap justify-center items-center gap-4 sm:gap-5 lg:gap-6 mt-10">
      {Array(5).fill(1).map((el, index) => {
        return <div className="max-w-40 sm:max-w-60 md:max-w-50 lg:max-w-70 w-full">
          <Card
            key={index}
            className="relative card border border-white/10 gap-4 rounded-xl sm:rounded-3xl w-full p-2  sm:p-4"
          >
            <CardContent className="flex p-0 flex-col gap-2 pb-11 sm:pb-14">
              <div
                className="relative w-full rounded-2xl h-35 sm:h-50 md:h-40 lg:h-60"
              >
                <Skeleton className="w-full h-full" />
                <div
                  className="absolute -bottom-11 sm:-bottom-14"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white tracking-wide capitalize text-base sm:text-xl md:text-lg lg:text-2xl text-ellipsis line-clamp-1">
                      <Skeleton className="h-5 w-30" />
                    </span>
                    <Skeleton className="size-5 rounded-full" />
                  </div>
                  <div className="text-white/80 text-xs sm:text-sm leading-4 flex items-center gap-2 mt-2">
                    <Skeleton className="size-3 sm:size-3.5" />
                    <Skeleton className="h-2 w-40 flex-1" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      })}
    </div>
  )
}

