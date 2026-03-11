import { sortMovies } from "@/features/movies/utils/sort-movies";
import type { Movie } from "@/store/service/movie/type";

const makeMovie = (id: number, title: string, vote_average: number): Movie => ({
  id,
  title,
  original_title: title,
  overview: "",
  poster_path: null,
  backdrop_path: null,
  vote_average,
  vote_count: 0,
  release_date: "2024-01-01",
  genre_ids: [],
  popularity: 0,
  adult: false,
  original_language: "en",
  video: false,
});

const movies = [
  makeMovie(1, "Zorro", 6.5),
  makeMovie(2, "Avatar", 8.0),
  makeMovie(3, "Batman", 7.2),
  makeMovie(4, "Matrix", 9.0),
];

describe("sortMovies", () => {
  it("sorts by title A-Z (title_asc)", () => {
    const result = sortMovies(movies, "title_asc");
    expect(result.map((m) => m.title)).toEqual(["Avatar", "Batman", "Matrix", "Zorro"]);
  });

  it("sorts by title Z-A (title_desc)", () => {
    const result = sortMovies(movies, "title_desc");
    expect(result.map((m) => m.title)).toEqual(["Zorro", "Matrix", "Batman", "Avatar"]);
  });

  it("sorts by highest rating first (rating_desc)", () => {
    const result = sortMovies(movies, "rating_desc");
    expect(result.map((m) => m.vote_average)).toEqual([9.0, 8.0, 7.2, 6.5]);
  });

  it("sorts by lowest rating first (rating_asc)", () => {
    const result = sortMovies(movies, "rating_asc");
    expect(result.map((m) => m.vote_average)).toEqual([6.5, 7.2, 8.0, 9.0]);
  });

  it("does not mutate the original array", () => {
    const original = [...movies];
    sortMovies(movies, "title_asc");
    expect(movies).toEqual(original);
  });

  it("handles an empty array", () => {
    expect(sortMovies([], "title_asc")).toEqual([]);
  });

  it("handles a single-element array", () => {
    const single = [makeMovie(1, "Solo", 7.5)];
    expect(sortMovies(single, "rating_desc")).toEqual(single);
  });
});