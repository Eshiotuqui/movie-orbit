import { createContext } from "react";

export interface FiltersContextValue {
  page: number;
  search: string;
  debouncedSearch: string;
  genreId: number | null;
  setPage: (page: number) => void;
  setSearch: (search: string) => void;
  setGenreId: (id: number | null) => void;
}

export const FiltersContext = createContext<FiltersContextValue | null>(null);
