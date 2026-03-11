import { MovieOrbitIcon } from "../icons";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-6 py-6 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2">
          <MovieOrbitIcon size={20} />
          <span className="text-sm font-semibold text-primary">MovieOrbit</span>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          Dados fornecidos por{" "}
          <a
            href="https://www.themoviedb.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            TMDB
          </a>
          . Este produto não é endossado ou certificado pelo TMDB.
        </p>

        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} MovieOrbit</p>
      </div>
    </footer>
  );
}
