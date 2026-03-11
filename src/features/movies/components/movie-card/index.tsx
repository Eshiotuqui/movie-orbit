import { Heart, Star, ImageOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { Movie } from "@/store/service/movie/type";
import { TmdbImage } from "@/components/shared/tmdb-image";

interface MovieCardProps {
  movie: Movie;
  isFavorite: boolean;
  onToggleFavorite: (movie: Movie) => void;
}

export function MovieCard({ movie, isFavorite, onToggleFavorite }: MovieCardProps) {
  const navigate = useNavigate();

  return (
    <div className="movie-card group cursor-pointer" onClick={() => navigate(`/movie/${movie.id}`)}>
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-cinema-700">
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

        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(movie);
          }}
          className="absolute right-2 top-2 h-8 w-8 rounded-full bg-cinema-900/70 backdrop-blur-sm hover:scale-110 hover:bg-cinema-900/70"
          aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
          <Heart
            size={15}
            className={isFavorite ? "fill-favorite text-favorite" : "text-cinema-200"}
          />
        </Button>
      </div>

      <div className="flex flex-col gap-1 p-3">
        <span className="line-clamp-1 text-sm font-semibold text-foreground">{movie.title}</span>

        <div className="flex items-center gap-1">
          <Star size={12} className="fill-rating text-rating" />
          <span className="text-xs font-bold text-rating">{movie.vote_average.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
}
