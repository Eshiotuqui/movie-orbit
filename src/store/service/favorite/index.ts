import { createApi } from "@reduxjs/toolkit/query/react";
import { tmdbBaseQuery } from "../../config/base-query";
import type {
  GetFavoritesParams,
  GetFavoritesResponse,
  ToggleFavoriteParams,
  ToggleFavoriteResponse,
} from "./type";

export const FavoriteService = createApi({
  reducerPath: "favorite-service",
  baseQuery: tmdbBaseQuery,
  tagTypes: ["Favorites"],
  endpoints: (builder) => ({
    getFavorites: builder.query<GetFavoritesResponse, GetFavoritesParams>({
      query: ({ accountId, sessionId, ...params }) => ({
        url: `account/${accountId}/favorite/movies`,
        params: {
          session_id: sessionId,
          ...params,
        },
      }),
      providesTags: ["Favorites"],
    }),

    toggleFavorite: builder.mutation<ToggleFavoriteResponse, ToggleFavoriteParams>({
      query: ({ accountId, sessionId, ...body }) => ({
        url: `account/${accountId}/favorite`,
        method: "POST",
        params: { session_id: sessionId },
        body,
      }),
      invalidatesTags: ["Favorites"],
    }),
  }),
});

export const { useGetFavoritesQuery, useToggleFavoriteMutation } = FavoriteService;
