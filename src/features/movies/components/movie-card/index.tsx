import { Heart, Star, ImageOff } from "lucide-react";

import type { Movie } from "@/store/service/movie/type";
import { TmdbImage } from "@/components/shared/tmdb-image";

interface MovieCardProps {
  movie: Movie;
  isFavorite: boolean;
  onToggleFavorite: (movie: Movie) => void;
}

export function MovieCard({ movie, isFavorite, onToggleFavorite }: MovieCardProps) {
  return (
    <div className="movie-card group cursor-pointer">
      <div className="bg-cinema-700 relative aspect-[2/3] w-full overflow-hidden">
        {movie.poster_path ? (
          <TmdbImage
            path={movie.poster_path}
            size="w300"
            alt={movie.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <ImageOff size={40} className="text-cinema-500" />
          </div>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(movie);
          }}
          className="bg-cinema-900/70 absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm transition-transform duration-200 hover:scale-110"
          aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
          <Heart
            size={15}
            className={isFavorite ? "fill-favorite text-favorite" : "text-cinema-200"}
          />
        </button>
      </div>

      <div className="flex flex-col gap-1 p-3">
        <span className="text-foreground line-clamp-1 text-sm font-semibold">{movie.title}</span>

        <div className="flex items-center gap-1">
          <Star size={12} className="fill-rating text-rating" />
          <span className="text-rating text-xs font-bold">{movie.vote_average.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
}
