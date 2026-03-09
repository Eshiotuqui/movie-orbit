import { createApi } from "@reduxjs/toolkit/query/react";
import type {
  GetPopularMoviesParams,
  GetPopularMoviesResponse,
  GetMovieByIdParams,
  SearchMoviesParams,
  SearchMoviesResponse,
} from "./type";
import type { Movie } from "./type";
import { tmdbBaseQuery } from "@/store/config/base-query";

export const MovieService = createApi({
  reducerPath: "movie-service",
  baseQuery: tmdbBaseQuery,
  tagTypes: ["Movies"],
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
  }),
});

export const { useGetPopularMoviesQuery, useGetMovieByIdQuery } = MovieService;
