import { createApi } from "@reduxjs/toolkit/query/react";
import type {
  GetPopularMoviesParams,
  GetPopularMoviesResponse,
  GetMovieByIdParams,
  SearchMoviesParams,
  SearchMoviesResponse,
  GetGenresResponse,
  MovieCredits,
} from "./type";
import type { Movie } from "./type";
import { tmdbBaseQuery } from "@/store/config/base-query";

export const MovieService = createApi({
  reducerPath: "movie-service",
  baseQuery: tmdbBaseQuery,
  tagTypes: ["Movies", "Genres"],
  endpoints: (builder) => ({
    getPopularMovies: builder.query<GetPopularMoviesResponse, GetPopularMoviesParams | void>({
      query: (params) => ({
        url: "movie/popular",
        params: { ...params },
      }),
      providesTags: ["Movies"],
    }),

    getMovieById: builder.query<Movie, GetMovieByIdParams>({
      query: ({ id, ...params }) => ({
        url: `movie/${id}`,
        params: { ...params },
      }),
      providesTags: (_result, _error, { id }) => [{ type: "Movies", id }],
    }),

    searchMovies: builder.query<SearchMoviesResponse, SearchMoviesParams>({
      query: (params) => ({
        url: "search/movie",
        params: { ...params },
      }),
      providesTags: ["Movies"],
    }),

    getMovieCredits: builder.query<MovieCredits, { id: number; language?: string }>({
      query: ({ id, ...params }) => ({
        url: `movie/${id}/credits`,
        params: { ...params },
      }),
      providesTags: (_result, _error, { id }) => [{ type: "Movies", id }],
    }),

    getGenres: builder.query<GetGenresResponse, { language?: string }>({
      query: (params) => ({
        url: "genre/movie/list",
        params: { ...params },
      }),
      providesTags: ["Genres"],
    }),
  }),
});

export const {
  useGetPopularMoviesQuery,
  useGetMovieByIdQuery,
  useSearchMoviesQuery,
  useGetGenresQuery,
  useGetMovieCreditsQuery,
} = MovieService;
