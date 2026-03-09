import { fetchBaseQuery } from "@reduxjs/toolkit/query";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const tmdbBaseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    headers.set("accept", "application/json");
    return headers;
  },
  paramsSerializer: (params) => {
    const search = new URLSearchParams({
      api_key: API_KEY,
      ...params,
    });
    return search.toString();
  },
});
