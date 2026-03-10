import { useState, useCallback, useDeferredValue } from "react";

interface UseFiltersReturn {
  page: number;
  search: string;
  debouncedSearch: string;
  setPage: (page: number) => void;
  setSearch: (search: string) => void;
  resetPage: () => void;
}

export function useFilters(): UseFiltersReturn {
  const [page, setPageState] = useState(1);
  const [search, setSearchState] = useState("");

  const debouncedSearch = useDeferredValue(search);

  const setPage = useCallback((p: number) => {
    setPageState(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const setSearch = useCallback((s: string) => {
    setSearchState(s);
    setPageState(1);
  }, []);

  const resetPage = useCallback(() => setPageState(1), []);

  return { page, search, debouncedSearch, setPage, setSearch, resetPage };
}
