import { useGetPopularMoviesQuery, useSearchMoviesQuery } from "@/store/service/movie";

import { useFavorites } from "@/features/movies/hooks/use-favorites";
import { useFiltersContext } from "./use-filter-context";

const MAX_PAGES = 500;

export function useHome() {
  const { page, setPage, debouncedSearch } = useFiltersContext();
  const { isFavorite, toggle } = useFavorites();

  const isSearching = debouncedSearch.trim().length > 0;

  const popular = useGetPopularMoviesQuery({ page, language: "pt-BR" }, { skip: isSearching });

  const search = useSearchMoviesQuery(
    { query: debouncedSearch, page, language: "pt-BR" },
    { skip: !isSearching },
  );

  const active = isSearching ? search : popular;

  const movies = active.data?.results ?? [];
  const totalPages = Math.min(active.data?.total_pages ?? 1, MAX_PAGES);
  const totalResults = active.data?.total_results ?? 0;
  const isLimited = (active.data?.total_pages ?? 0) > MAX_PAGES;
  const isLoading = active.isLoading || active.isFetching;
  const isError = active.isError;

  return {
    movies,
    page,
    totalPages,
    totalResults,
    isLimited,
    isLoading,
    isError,
    isSearching,
    search: debouncedSearch,
    setPage,
    isFavorite,
    toggle,
  };
}
