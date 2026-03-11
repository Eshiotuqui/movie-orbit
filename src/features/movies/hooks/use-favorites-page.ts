import { useGetFavoritesQuery, useToggleFavoriteMutation } from "@/store/service/favorite";
import { useGetGenresQuery } from "@/store/service/movie";
import type { Movie } from "@/store/service/movie/type";
import { sortMovies } from "@/features/movies/utils/sort-movies";
import { useState, useMemo, useCallback } from "react";

import type { FavoritesSortOption } from "@/features/movies/utils/sort-movies";

const ACCOUNT_ID = Number(import.meta.env.VITE_TMDB_ACCOUNT_ID);
const SESSION_ID = import.meta.env.VITE_TMDB_SESSION_ID as string;

export function useFavoritesPage() {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<FavoritesSortOption>("title_asc");

  const { data, isLoading, isError } = useGetFavoritesQuery({
    accountId: ACCOUNT_ID,
    sessionId: SESSION_ID,
    language: "pt-BR",
    page,
  });

  const { data: genresData } = useGetGenresQuery({ language: "pt-BR" });

  const [toggleFavoriteMutation] = useToggleFavoriteMutation();

  const genresMap = useMemo(
    () => Object.fromEntries(genresData?.genres.map((g) => [g.id, g.name]) ?? []),
    [genresData],
  );

  const sorted = useMemo(
    () => sortMovies(data?.results ?? [], sortBy),
    [data, sortBy],
  );

  const removeFavorite = useCallback(
    (movie: Movie) => {
      toggleFavoriteMutation({
        accountId: ACCOUNT_ID,
        sessionId: SESSION_ID,
        media_type: "movie",
        media_id: movie.id,
        favorite: false,
      });
    },
    [toggleFavoriteMutation],
  );

  const totalPages = data?.total_pages ?? 1;
  const totalResults = data?.total_results ?? 0;

  return {
    movies: sorted,
    genresMap,
    page,
    totalPages,
    totalResults,
    isLoading,
    isError,
    sortBy,
    setSortBy,
    setPage,
    removeFavorite,
  };
}