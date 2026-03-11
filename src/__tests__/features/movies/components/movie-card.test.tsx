import { render, screen, fireEvent } from "@testing-library/react";
import { MovieCard } from "@/features/movies/components/movie-card";
import type { Movie } from "@/store/service/movie/type";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

const movie: Movie = {
  id: 42,
  title: "Pulp Fiction",
  original_title: "Pulp Fiction",
  overview: "Two hitmen on an unusual assignment.",
  poster_path: "/pulpfiction.jpg",
  backdrop_path: null,
  vote_average: 8.9,
  vote_count: 25000,
  release_date: "1994-10-14",
  genre_ids: [18, 53],
  popularity: 50,
  adult: false,
  original_language: "en",
  video: false,
};

const genresMap = { 18: "Drama", 53: "Thriller" };

describe("MovieCard", () => {
  const onToggleFavorite = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the movie title", () => {
    render(
      <MovieCard
        movie={movie}
        genresMap={genresMap}
        isFavorite={false}
        onToggleFavorite={onToggleFavorite}
      />,
    );

    expect(screen.getByText("Pulp Fiction")).toBeInTheDocument();
  });

  it("renders the vote average", () => {
    render(
      <MovieCard
        movie={movie}
        genresMap={genresMap}
        isFavorite={false}
        onToggleFavorite={onToggleFavorite}
      />,
    );

    expect(screen.getByText("8.9")).toBeInTheDocument();
  });

  it("renders the primary genre badge", () => {
    render(
      <MovieCard
        movie={movie}
        genresMap={genresMap}
        isFavorite={false}
        onToggleFavorite={onToggleFavorite}
      />,
    );

    expect(screen.getByText("Drama")).toBeInTheDocument();
  });

  it("shows aria-label 'Adicionar aos favoritos' when not favorited", () => {
    render(
      <MovieCard
        movie={movie}
        genresMap={genresMap}
        isFavorite={false}
        onToggleFavorite={onToggleFavorite}
      />,
    );

    expect(
      screen.getByRole("button", { name: "Adicionar aos favoritos" }),
    ).toBeInTheDocument();
  });

  it("shows aria-label 'Remover dos favoritos' when favorited", () => {
    render(
      <MovieCard
        movie={movie}
        genresMap={genresMap}
        isFavorite={true}
        onToggleFavorite={onToggleFavorite}
      />,
    );

    expect(
      screen.getByRole("button", { name: "Remover dos favoritos" }),
    ).toBeInTheDocument();
  });

  it("calls onToggleFavorite when favorite button is clicked", () => {
    render(
      <MovieCard
        movie={movie}
        genresMap={genresMap}
        isFavorite={false}
        onToggleFavorite={onToggleFavorite}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Adicionar aos favoritos" }));

    expect(onToggleFavorite).toHaveBeenCalledTimes(1);
    expect(onToggleFavorite).toHaveBeenCalledWith(movie);
  });

  it("does not call onToggleFavorite when the card body is clicked", () => {
    render(
      <MovieCard
        movie={movie}
        genresMap={genresMap}
        isFavorite={false}
        onToggleFavorite={onToggleFavorite}
      />,
    );

    fireEvent.click(screen.getByText("Pulp Fiction"));

    expect(onToggleFavorite).not.toHaveBeenCalled();
  });

  it("navigates to the movie detail page when the card is clicked", () => {
    render(
      <MovieCard
        movie={movie}
        genresMap={genresMap}
        isFavorite={false}
        onToggleFavorite={onToggleFavorite}
      />,
    );

    fireEvent.click(screen.getByText("Pulp Fiction"));

    expect(mockNavigate).toHaveBeenCalledWith("/movie/42");
  });

  it("does not render genre badge when genresMap has no matching genre", () => {
    render(
      <MovieCard movie={movie} genresMap={{}} isFavorite={false} onToggleFavorite={onToggleFavorite} />,
    );

    expect(screen.queryByText("Drama")).not.toBeInTheDocument();
  });
});
