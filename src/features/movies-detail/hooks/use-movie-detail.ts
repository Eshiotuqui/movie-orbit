import { useParams } from "react-router-dom";
import {
  useGetMovieByIdQuery,
  useGetGenresQuery,
  useGetMovieCreditsQuery,
} from "@/store/service/movie";
import { useFavorites } from "@/features/movies/hooks/use-favorites";

const MAX_CAST = 10;

export function useMovieDetail() {
  const { id } = useParams<{ id: string }>();
  const { isFavorite, toggle } = useFavorites();

  const {
    data: movie,
    isLoading,
    isError,
  } = useGetMovieByIdQuery({ id: Number(id), language: "pt-BR" }, { skip: !id });

  const needsGenres = !!movie && !movie.genres?.length;
  const { data: genresData } = useGetGenresQuery({ language: "pt-BR" }, { skip: !needsGenres });

  const { data: credits } = useGetMovieCreditsQuery(
    { id: Number(id), language: "pt-BR" },
    { skip: !id },
  );

  const genres = movie?.genres?.length
    ? movie.genres
    : (genresData?.genres.filter((g) => movie?.genre_ids?.includes(g.id)) ?? []);

  const cast = credits?.cast.slice(0, MAX_CAST) ?? [];

  const director = credits?.crew.find((c) => c.job === "Director");
  const producers = credits?.crew.filter((c) => c.job === "Producer").slice(0, 3) ?? [];

  const studios = movie?.production_companies ?? [];

  const favorited = movie ? isFavorite(movie.id) : false;

  return {
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
  };
}
