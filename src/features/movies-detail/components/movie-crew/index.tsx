import type { CrewMember, ProductionCompany } from "@/store/service/movie/type";
import { TmdbImage } from "@/components/shared/tmdb-image";

interface MovieCrewProps {
  director?: CrewMember;
  producers: CrewMember[];
  studios: ProductionCompany[];
}

export function MovieCrew({ director, producers, studios }: MovieCrewProps) {
  if (!director && !producers.length && !studios.length) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {director && (
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Direção
          </span>
          <span className="text-sm text-foreground">{director.name}</span>
        </div>
      )}

      {producers.length > 0 && (
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Produção
          </span>
          {producers.map((p) => (
            <span key={p.id} className="text-sm text-foreground">
              {p.name}
            </span>
          ))}
        </div>
      )}

      {studios.length > 0 && (
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Estúdios
          </span>
          <div className="flex flex-wrap items-center gap-3">
            {studios.map((s) =>
              s.logo_path ? (
                <TmdbImage
                  key={s.id}
                  path={s.logo_path}
                  size="w92"
                  alt={s.name}
                  className="h-6 w-auto object-contain opacity-70 brightness-0 invert"
                />
              ) : (
                <span key={s.id} className="text-sm text-foreground">
                  {s.name}
                </span>
              ),
            )}
          </div>
        </div>
      )}
    </div>
  );
}
