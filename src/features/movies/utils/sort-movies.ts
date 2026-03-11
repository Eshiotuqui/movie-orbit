import type { Movie } from "@/store/service/movie/type";

export type FavoritesSortOption = "title_asc" | "title_desc" | "rating_desc" | "rating_asc";

export function sortMovies(movies: Movie[], sortBy: FavoritesSortOption): Movie[] {
  const sorted = [...movies];
  switch (sortBy) {
    case "title_asc":
      return sorted.sort((a, b) => a.title.localeCompare(b.title, "pt-BR"));
    case "title_desc":
      return sorted.sort((a, b) => b.title.localeCompare(a.title, "pt-BR"));
    case "rating_desc":
      return sorted.sort((a, b) => b.vote_average - a.vote_average);
    case "rating_asc":
      return sorted.sort((a, b) => a.vote_average - b.vote_average);
  }
}