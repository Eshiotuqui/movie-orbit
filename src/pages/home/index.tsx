import { AppPagination } from "@/components/shared/pagination";
import { MovieCard } from "@/features/movies/components/movie-card";
import { MovieEmpty } from "@/features/movies/components/movie-empty";
import { MovieGridSkeleton } from "@/features/movies/components/movie-card-skeleton";
import { useHome } from "@/features/movies/hooks/use-home";

export function Home() {
  const { movies, page, totalPages, isLoading, isError, setPage, isFavorite, toggle } = useHome();

  return (
    <section className="flex flex-col gap-8">
      <h2 className="text-foreground text-2xl font-bold">Filmes Populares</h2>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {isLoading && <MovieGridSkeleton count={20} />}
        {isError && <MovieEmpty />}
        {!isLoading && !isError && movies.length === 0 && <MovieEmpty />}
        {!isLoading &&
          !isError &&
          movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavorite={isFavorite(movie.id)}
              onToggleFavorite={toggle}
            />
          ))}
      </div>

      {!isLoading && !isError && totalPages > 1 && (
        <AppPagination page={page} totalPages={totalPages} onPageChange={setPage} />
      )}
    </section>
  );
}
