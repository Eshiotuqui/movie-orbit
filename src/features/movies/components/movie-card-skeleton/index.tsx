import { Skeleton } from "@/components/ui/skeleton";

export function MovieCardSkeleton() {
  return (
    <div className="movie-card overflow-hidden">
      <Skeleton className="bg-cinema-700 aspect-[2/3] w-full" />
      <div className="flex flex-col gap-2 p-3">
        <Skeleton className="bg-cinema-700 h-4 w-3/4" />
        <Skeleton className="bg-cinema-700 h-3 w-12" />
      </div>
    </div>
  );
}

export function MovieGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <MovieCardSkeleton key={i} />
      ))}
    </>
  );
}
