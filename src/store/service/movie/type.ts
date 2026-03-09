export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  original_title: string;
  video: boolean;
}

export interface GetPopularMoviesParams {
  language?: string;
  page?: number;
  region?: string;
}

export interface GetPopularMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface GetMovieByIdParams {
  id: number;
  language?: string;
}

export interface SearchMoviesParams {
  query: string;
  language?: string;
  page?: number;
  include_adult?: boolean;
  region?: string;
  year?: number;
}

export interface SearchMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
