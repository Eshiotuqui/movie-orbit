import { useContext } from "react";
import { FiltersContext } from "../context/filters-contex";

export function useFiltersContext() {
  const ctx = useContext(FiltersContext);
  if (!ctx) throw new Error("useFiltersContext must be used within FiltersProvider");
  return ctx;
}
