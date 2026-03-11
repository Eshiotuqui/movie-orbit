/* ─────────────────────────────────────────
   Shared
   ───────────────────────────────────────── */
export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  iso_639_1: string;
  name: string;
  english_name: string;
}

/* ─────────────────────────────────────────
     Movie
     ───────────────────────────────────────── */
export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  tagline?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  release_date: string;
  genre_ids: number[];
  genres?: Genre[];
  popularity: number;
  adult: boolean;
  original_language: string;
  video: boolean;
  status?: string;
  runtime?: number;
  budget?: number;
  revenue?: number;
  homepage?: string;
  imdb_id?: string;
  production_companies?: ProductionCompany[];
  production_countries?: ProductionCountry[];
  spoken_languages?: SpokenLanguage[];
}

/* ─────────────────────────────────────────
     Credits
     ───────────────────────────────────────── */
export interface CastMember {
  id: number;
  name: string;
  original_name: string;
  character: string;
  profile_path: string | null;
  order: number;
  known_for_department: string;
  popularity: number;
  cast_id: number;
  credit_id: string;
  adult: boolean;
  gender: number | null;
}

export interface CrewMember {
  id: number;
  name: string;
  original_name: string;
  job: string;
  department: string;
  profile_path: string | null;
  credit_id: string;
  adult: boolean;
  gender: number | null;
  known_for_department: string;
  popularity: number;
}

export interface MovieCredits {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

/* ─────────────────────────────────────────
     Endpoints params & responses
     ───────────────────────────────────────── */
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

export interface GetGenresResponse {
  genres: Genre[];
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
