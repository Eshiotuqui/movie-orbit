import { Skeleton } from "@/components/ui/skeleton";

export function MovieDetailSkeleton() {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:gap-10">
      <Skeleton className="h-52 w-full rounded-xl bg-cinema-700 sm:w-80" />
      <div className="flex flex-1 flex-col gap-4">
        <Skeleton className="h-9 w-2/3 bg-cinema-700" />
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16 rounded-full bg-cinema-700" />
          <Skeleton className="h-5 w-16 rounded-full bg-cinema-700" />
        </div>
        <Skeleton className="h-4 w-48 bg-cinema-700" />
        <Skeleton className="h-4 w-24 bg-cinema-700" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-full bg-cinema-700" />
          <Skeleton className="h-4 w-full bg-cinema-700" />
          <Skeleton className="h-4 w-3/4 bg-cinema-700" />
        </div>
        <Skeleton className="h-9 w-44 rounded-md bg-cinema-700" />
      </div>
    </div>
  );
}
