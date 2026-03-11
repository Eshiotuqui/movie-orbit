import { Separator } from "@/components/ui/separator";
import { TmdbImage } from "@/components/shared/tmdb-image";
import { useMovieDetail } from "@/features/movies-detail/hooks/use-movie-detail";
import { MovieDetailSkeleton } from "@/features/movies-detail/components/movie-detail-skeleton";
import { MovieDetailError } from "@/features/movies-detail/components/movie-detail-error";
import { MovieDetailInfo } from "@/features/movies-detail/components/movie-detail-info";
import { MovieCrew } from "@/features/movies-detail/components/movie-crew";
import { MovieCast } from "@/features/movies-detail/components/movie-cast";

export function MovieDetail() {
  const {
    movie,
    genres,
    cast,
    director,
    producers,
    studios,
    isLoading,
    isError,
    favorited,
    toggle,
  } = useMovieDetail();

  if (isLoading) return <MovieDetailSkeleton />;
  if (isError || !movie) return <MovieDetailError />;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:gap-10">
        <div className="w-full shrink-0 overflow-hidden rounded-xl sm:w-[450px]">
          <TmdbImage
            path={movie.backdrop_path}
            size="original"
            alt={movie.title}
            className="h-full w-full object-cover"
          />
        </div>

        <MovieDetailInfo
          movie={movie}
          genres={genres}
          favorited={favorited}
          onToggleFavorite={toggle}
        />
      </div>

      <Separator className="bg-border" />

      <MovieCast cast={cast} />

      {(director || producers.length > 0 || studios.length > 0) && (
        <>
          <Separator className="bg-border" />
          <MovieCrew director={director} producers={producers} studios={studios} />
        </>
      )}
    </div>
  );
}
