import type { Movie } from "../movie/type";

export interface GetFavoritesParams {
  accountId: number;
  sessionId: string;
  language?: string;
  page?: number;
  sort_by?: "created_at.asc" | "created_at.desc";
}

export interface GetFavoritesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface ToggleFavoriteParams {
  accountId: number;
  sessionId: string;
  media_type: "movie" | "tv";
  media_id: number;
  favorite: boolean;
}

export interface ToggleFavoriteResponse {
  success: boolean;
  status_code: number;
  status_message: string;
}
