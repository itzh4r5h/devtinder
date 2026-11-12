import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const ConnectionsSkeleton = () => {
  return (

    <section className="w-full h-full min-h-[calc(100dvh-5rem)] grid grid-cols-1 md:grid-cols-[minmax(280px,1fr)_minmax(0,2fr)] gap-3">
      {/* Left: Conversation list */}

      <div className="flex flex-col gap-3 rounded-xl overflow-y-scroll scrollbar-none min-h-0">
        {Array.from({ length: 8 }).map((_, index) => (
          <Card key={index} className="h-24 shrink-0">
            <CardContent className="flex h-full items-center gap-4 p-4">
              <Skeleton className="size-16 shrink-0 rounded-full" />

              <div className="min-w-0 flex-1 space-y-2">
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-4 w-full max-w-52" />
              </div>

              <div className="flex shrink-0 flex-col gap-1">
                <Skeleton className="size-1 rounded-full" />
                <Skeleton className="size-1 rounded-full" />
                <Skeleton className="size-1 rounded-full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Right: Chat area */}

      <div className="hidden md:block bg-card rounded-xl">
        <Skeleton className='h-full w-full' />
      </div>
    </section>
  );
};

