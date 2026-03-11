import { useState, useCallback, useDeferredValue } from "react";
import { FiltersContext } from "./filters-contex";

export function FiltersProvider({ children }: { children: React.ReactNode }) {
  const [page, setPageState] = useState(1);
  const [search, setSearchState] = useState("");
  const [genreId, setGenreIdState] = useState<number | null>(null);

  const debouncedSearch = useDeferredValue(search);

  const setPage = useCallback((p: number) => {
    setPageState(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const setSearch = useCallback((s: string) => {
    setSearchState(s);
    setPageState(1);
  }, []);

  const setGenreId = useCallback((id: number | null) => {
    setGenreIdState(id);
    setPageState(1);
  }, []);

  return (
    <FiltersContext.Provider
      value={{ page, search, debouncedSearch, genreId, setPage, setSearch, setGenreId }}
    >
      {children}
    </FiltersContext.Provider>
  );
}
