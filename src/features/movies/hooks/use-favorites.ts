import { useGetFavoritesQuery, useToggleFavoriteMutation } from "@/store/service/favorite";
import type { Movie } from "@/store/service/movie/type";
import { useMemo, useCallback } from "react";

const ACCOUNT_ID = Number(import.meta.env.VITE_TMDB_ACCOUNT_ID);
const SESSION_ID = import.meta.env.VITE_TMDB_SESSION_ID as string;

export function useFavorites() {
  const { data } = useGetFavoritesQuery({
    accountId: ACCOUNT_ID,
    sessionId: SESSION_ID,
    language: "pt-BR",
  });

  const [toggleFavoriteMutation] = useToggleFavoriteMutation();

  const favoriteIds = useMemo(
    () => new Set(data?.results.map((m) => m.id) ?? []),
    [data],
  );

  const isFavorite = useCallback((id: number) => favoriteIds.has(id), [favoriteIds]);

  const toggle = useCallback(
    (movie: Movie) => {
      toggleFavoriteMutation({
        accountId: ACCOUNT_ID,
        sessionId: SESSION_ID,
        media_type: "movie",
        media_id: movie.id,
        favorite: !favoriteIds.has(movie.id),
      });
    },
    [toggleFavoriteMutation, favoriteIds],
  );

  return { favorites: data?.results ?? [], isFavorite, toggle };
}