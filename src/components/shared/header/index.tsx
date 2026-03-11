import { Search, Menu } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MovieOrbitIcon } from "../icons";

import { useGetGenresQuery } from "@/store/service/movie";
import { ChevronDown } from "lucide-react";
import { useFiltersContext } from "@/features/movies/hooks/use-filter-context";

export function Header() {
  const { search, setSearch, genreId, setGenreId } = useFiltersContext();
  const { data: genresData } = useGetGenresQuery({ language: "pt-BR" });
  const genres = genresData?.genres ?? [];
  const activeGenre = genres.find((g) => g.id === genreId);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-surface">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4 sm:gap-6 sm:px-6">
        <NavLink to="/" className="flex shrink-0 items-center gap-2 no-underline">
          <MovieOrbitIcon size={26} />
          <span className="hidden text-base font-bold tracking-tight text-primary sm:inline">
            MovieOrbit
          </span>
        </NavLink>

        {/* Filtros — visíveis em todas as telas */}
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1">
            <Search
              size={14}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar filmes..."
              className="h-9 w-full border-border bg-surface-raised pl-8 text-[13px] text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 shrink-0 gap-1 border border-border bg-surface-raised px-3 text-[13px] text-foreground hover:bg-cinema-600"
              >
                {activeGenre ? activeGenre.name : "Gênero"}
                <ChevronDown size={13} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="max-h-72 overflow-y-auto border-border bg-surface"
            >
              <DropdownMenuItem
                onClick={() => setGenreId(null)}
                className={`cursor-pointer text-sm ${!genreId ? "text-primary" : "text-foreground"}`}
              >
                Todos
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border" />
              {genres.map((g) => (
                <DropdownMenuItem
                  key={g.id}
                  onClick={() => setGenreId(g.id)}
                  className={`cursor-pointer text-sm ${genreId === g.id ? "text-primary" : "text-foreground"}`}
                >
                  {g.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Nav desktop */}
        <nav className="hidden shrink-0 items-center gap-1 sm:flex">
          <NavLink to="/" end className="no-underline">
            {({ isActive }) => (
              <Button
                size="sm"
                className={`h-8 border-none px-4 text-[13px] font-medium ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-transparent text-foreground hover:bg-surface-raised"
                }`}
              >
                Home
              </Button>
            )}
          </NavLink>

          <NavLink to="/favorites" className="no-underline">
            {({ isActive }) => (
              <Button
                size="sm"
                className={`h-8 border-none px-4 text-[13px] font-medium ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-transparent text-foreground hover:bg-surface-raised"
                }`}
              >
                Favoritos
              </Button>
            )}
          </NavLink>
        </nav>

        {/* Hamburguer mobile */}
        <div className="shrink-0 sm:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 border border-border bg-surface-raised hover:bg-cinema-600"
                aria-label="Menu de navegação"
              >
                <Menu size={18} className="text-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 border-border bg-surface">
              <DropdownMenuItem asChild className="cursor-pointer p-0">
                <NavLink to="/" end className="w-full px-2 py-1.5 text-sm no-underline">
                  {({ isActive }) => (
                    <span className={isActive ? "text-primary" : "text-foreground"}>Home</span>
                  )}
                </NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer p-0">
                <NavLink to="/favorites" className="w-full px-2 py-1.5 text-sm no-underline">
                  {({ isActive }) => (
                    <span className={isActive ? "text-primary" : "text-foreground"}>Favoritos</span>
                  )}
                </NavLink>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}