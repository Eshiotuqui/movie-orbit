import { Heart } from "lucide-react";
import { AppPagination } from "@/components/shared/pagination";
import { MovieCard } from "@/features/movies/components/movie-card";
import { MovieGridSkeleton } from "@/features/movies/components/movie-card-skeleton";
import {
  useFavoritesPage,
  type FavoritesSortOption,
} from "@/features/movies/hooks/use-favorites-page";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const SORT_LABELS: Record<FavoritesSortOption, string> = {
  title_asc: "Título (A-Z)",
  title_desc: "Título (Z-A)",
  rating_desc: "Maior Nota",
  rating_asc: "Menor Nota",
};

export function Favorites() {
  const {
    movies,
    genresMap,
    page,
    totalPages,
    totalResults,
    isLoading,
    isError,
    sortBy,
    setSortBy,
    setPage,
    removeFavorite,
  } = useFavoritesPage();

  const isEmpty = !isLoading && !isError && movies.length === 0;

  return (
    <section className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold text-foreground">Meus Filmes Favoritos</h2>
          {totalResults > 0 && (
            <span className="text-sm text-muted-foreground">
              {totalResults} {totalResults === 1 ? "filme" : "filmes"}
            </span>
          )}
        </div>

        {!isEmpty && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Ordenar por:</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 gap-1 border border-border bg-surface-raised px-3 text-[13px] text-foreground hover:bg-cinema-600"
                >
                  {SORT_LABELS[sortBy]}
                  <ChevronDown size={13} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="border-border bg-surface">
                {(Object.keys(SORT_LABELS) as FavoritesSortOption[]).map((key) => (
                  <DropdownMenuItem
                    key={key}
                    onClick={() => setSortBy(key)}
                    className={`cursor-pointer text-sm ${sortBy === key ? "text-primary" : "text-foreground"}`}
                  >
                    {SORT_LABELS[key]}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {isLoading && <MovieGridSkeleton count={12} />}

        {!isLoading && isError && (
          <div className="col-span-full flex flex-col items-center justify-center gap-4 py-24 text-center">
            <p className="text-muted-foreground text-sm">
              Erro ao carregar favoritos. Tente novamente.
            </p>
          </div>
        )}

        {isEmpty && (
          <div className="col-span-full flex flex-col items-center justify-center gap-4 py-24 text-center">
            <div className="bg-cinema-700 flex h-20 w-20 items-center justify-center rounded-full">
              <Heart size={36} className="text-cinema-400" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-foreground text-lg font-semibold">
                Nenhum favorito ainda
              </h3>
              <p className="text-muted-foreground text-sm">
                Adicione filmes aos favoritos para vê-los aqui.
              </p>
            </div>
          </div>
        )}

        {!isLoading &&
          !isError &&
          movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              genresMap={genresMap}
              isFavorite={true}
              onToggleFavorite={removeFavorite}
            />
          ))}
      </div>

      {!isLoading && !isError && totalPages > 1 && (
        <AppPagination page={page} totalPages={totalPages} onPageChange={setPage} />
      )}
    </section>
  );
}