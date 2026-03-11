import {
  useGetPopularMoviesQuery,
  useSearchMoviesQuery,
  useGetGenresQuery,
} from "@/store/service/movie";

import { useFavorites } from "@/features/movies/hooks/use-favorites";
import { useMemo } from "react";
import { useFiltersContext } from "./use-filter-context";

const MAX_PAGES = 500;

export function useHome() {
  const { page, setPage, debouncedSearch, genreId } = useFiltersContext();
  const { isFavorite, toggle } = useFavorites();

  const isSearching = debouncedSearch.trim().length > 0;

  const popular = useGetPopularMoviesQuery({ page, language: "pt-BR" }, { skip: isSearching });

  const search = useSearchMoviesQuery(
    { query: debouncedSearch, page, language: "pt-BR" },
    { skip: !isSearching },
  );

  const { data: genresData } = useGetGenresQuery({ language: "pt-BR" });

  const genresMap = useMemo(() => {
    return Object.fromEntries(genresData?.genres.map((g) => [g.id, g.name]) ?? []);
  }, [genresData]);

  const genres = genresData?.genres ?? [];

  const active = isSearching ? search : popular;

  const allMovies = active.data?.results ?? [];

  const movies = genreId ? allMovies.filter((m) => m.genre_ids.includes(genreId)) : allMovies;

  const totalPages = Math.min(active.data?.total_pages ?? 1, MAX_PAGES);
  const totalResults = active.data?.total_results ?? 0;
  const isLimited = (active.data?.total_pages ?? 0) > MAX_PAGES;
  const isLoading = active.isLoading || active.isFetching;
  const isError = active.isError;

  return {
    movies,
    genres,
    genresMap,
    page,
    totalPages,
    totalResults,
    isLimited,
    isLoading,
    isError,
    isSearching,
    setPage,
    isFavorite,
    toggle,
  };
}
