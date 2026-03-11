import { Heart, Star, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Movie } from "@/store/service/movie/type";
import type { Genre } from "@/store/service/movie/type";

interface MovieDetailInfoProps {
  movie: Movie;
  genres: Genre[];
  favorited: boolean;
  onToggleFavorite: (movie: Movie) => void;
}

export function MovieDetailInfo({
  movie,
  genres,
  favorited,
  onToggleFavorite,
}: MovieDetailInfoProps) {
  const releaseDate = new Date(movie.release_date).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex flex-1 flex-col gap-4">
      <h1 className="text-3xl font-bold text-foreground">{movie.title}</h1>

      {genres.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {genres.map((g) => (
            <Badge
              key={g.id}
              className="border-0 bg-primary/15 text-xs text-primary hover:bg-primary/25"
            >
              {g.name}
            </Badge>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-sm text-foreground">
          <Calendar size={14} className="text-muted-foreground" />
          <span>
            <span className="text-muted-foreground">Data de lançamento: </span>
            {releaseDate}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Nota TMDB:</span>
          <span className="rating-badge">
            <Star size={11} className="fill-rating text-rating" />
            {movie.vote_average.toFixed(1)}
          </span>
        </div>
      </div>

      {movie.overview && (
        <div className="flex flex-col gap-1">
          <h2 className="text-base font-semibold text-foreground">Sinopse</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">{movie.overview}</p>
        </div>
      )}

      <Button
        onClick={() => onToggleFavorite(movie)}
        className={`mt-2 w-fit gap-2 ${
          favorited
            ? "border border-favorite/30 bg-favorite/15 text-favorite hover:bg-favorite/25"
            : "bg-primary text-primary-foreground hover:bg-primary/90"
        }`}
      >
        <Heart size={15} className={favorited ? "fill-favorite" : ""} />
        {favorited ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
      </Button>
    </div>
  );
}
