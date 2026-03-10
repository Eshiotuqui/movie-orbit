import { Search } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MovieOrbitIcon } from "../icons";

export function Header() {
  return (
    <header className="border-border bg-surface sticky top-0 z-50 w-full border-b">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-6 px-6">
        <NavLink to="/" className="flex shrink-0 items-center gap-2 no-underline">
          <MovieOrbitIcon size={26} />
          <span className="text-primary text-base font-bold tracking-tight">MovieOrbit</span>
        </NavLink>

        <div className="flex flex-1 justify-center">
          <div className="relative w-full max-w-sm">
            <Search
              size={14}
              className="text-muted-foreground pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
            />
            <Input
              placeholder="Buscar filmes..."
              className="bg-surface-raised border-border text-foreground placeholder:text-muted-foreground h-9 w-full pl-8 text-[13px]"
            />
          </div>
        </div>

        <nav className="flex shrink-0 items-center gap-1">
          <NavLink to="/" end className="no-underline">
            {({ isActive }) => (
              <Button
                size="sm"
                className={`h-8 border-none px-4 text-[13px] font-medium ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-surface-raised bg-transparent"
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
                    : "text-foreground hover:bg-surface-raised bg-transparent"
                }`}
              >
                Favoritos
              </Button>
            )}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
