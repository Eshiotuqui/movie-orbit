import { renderHook, act } from "@testing-library/react";
import { useFavorites } from "@/features/movies/hooks/use-favorites";
import { useGetFavoritesQuery, useToggleFavoriteMutation } from "@/store/service/favorite";
import type { Movie } from "@/store/service/movie/type";

jest.mock("@/store/service/favorite");

const mockUseGetFavoritesQuery = useGetFavoritesQuery as jest.Mock;
const mockUseToggleFavoriteMutation = useToggleFavoriteMutation as jest.Mock;

const makeMovie = (id: number, title = "Movie"): Movie => ({
  id,
  title,
  original_title: title,
  overview: "",
  poster_path: null,
  backdrop_path: null,
  vote_average: 7.0,
  vote_count: 0,
  release_date: "2024-01-01",
  genre_ids: [],
  popularity: 0,
  adult: false,
  original_language: "en",
  video: false,
});

const movie1 = makeMovie(1, "Inception");
const movie2 = makeMovie(2, "Interstellar");

describe("useFavorites", () => {
  const mockMutation = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseToggleFavoriteMutation.mockReturnValue([mockMutation, {}]);
  });

  it("returns isFavorite true for a movie present in the favorites list", () => {
    mockUseGetFavoritesQuery.mockReturnValue({ data: { results: [movie1] } });

    const { result } = renderHook(() => useFavorites());

    expect(result.current.isFavorite(movie1.id)).toBe(true);
  });

  it("returns isFavorite false for a movie not in the favorites list", () => {
    mockUseGetFavoritesQuery.mockReturnValue({ data: { results: [movie1] } });

    const { result } = renderHook(() => useFavorites());

    expect(result.current.isFavorite(movie2.id)).toBe(false);
  });

  it("returns isFavorite false when favorites list is empty", () => {
    mockUseGetFavoritesQuery.mockReturnValue({ data: { results: [] } });

    const { result } = renderHook(() => useFavorites());

    expect(result.current.isFavorite(movie1.id)).toBe(false);
  });

  it("calls mutation with favorite: false when toggling a favorited movie", () => {
    mockUseGetFavoritesQuery.mockReturnValue({ data: { results: [movie1] } });

    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.toggle(movie1);
    });

    expect(mockMutation).toHaveBeenCalledWith(
      expect.objectContaining({ media_id: movie1.id, favorite: false }),
    );
  });

  it("calls mutation with favorite: true when toggling a non-favorited movie", () => {
    mockUseGetFavoritesQuery.mockReturnValue({ data: { results: [] } });

    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.toggle(movie2);
    });

    expect(mockMutation).toHaveBeenCalledWith(
      expect.objectContaining({ media_id: movie2.id, favorite: true }),
    );
  });

  it("passes correct accountId and sessionId to the mutation", () => {
    mockUseGetFavoritesQuery.mockReturnValue({ data: { results: [] } });

    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.toggle(movie1);
    });

    expect(mockMutation).toHaveBeenCalledWith(
      expect.objectContaining({
        accountId: 123456,
        sessionId: "test-session-id",
        media_type: "movie",
      }),
    );
  });

  it("exposes the favorites array from the query result", () => {
    mockUseGetFavoritesQuery.mockReturnValue({ data: { results: [movie1, movie2] } });

    const { result } = renderHook(() => useFavorites());

    expect(result.current.favorites).toHaveLength(2);
    expect(result.current.favorites[0].id).toBe(movie1.id);
  });

  it("returns empty favorites array when data is undefined", () => {
    mockUseGetFavoritesQuery.mockReturnValue({ data: undefined });

    const { result } = renderHook(() => useFavorites());

    expect(result.current.favorites).toEqual([]);
  });
});