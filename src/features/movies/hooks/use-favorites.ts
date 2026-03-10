import type { Movie } from "@/store/service/movie/type";
import { useState, useCallback } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const toggle = useCallback((movie: Movie) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(movie.id)) {
        next.delete(movie.id);
      } else {
        next.add(movie.id);
      }
      return next;
    });
  }, []);

  const isFavorite = useCallback((id: number) => favorites.has(id), [favorites]);

  return { favorites, toggle, isFavorite };
}
