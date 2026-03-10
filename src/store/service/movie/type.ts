export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  release_date: string;
  genre_ids: number[];
  popularity: number;
  adult: boolean;
  original_language: string;
  original_title: string;
  video: boolean;
}

export interface GetPopularMoviesParams {
  page?: number;
  language?: string;
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
  append_to_response?: string;
}

export interface SearchMoviesParams {
  query: string;
  page?: number;
  language?: string;
  include_adult?: boolean;
}

export interface SearchMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
