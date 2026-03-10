import { createContext } from "react";

export interface FiltersContextValue {
  page: number;
  search: string;
  debouncedSearch: string;
  setPage: (page: number) => void;
  setSearch: (search: string) => void;
}

export const FiltersContext = createContext<FiltersContextValue | null>(null);
