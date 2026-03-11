import { UserRound } from "lucide-react";
import { TmdbImage } from "@/components/shared/tmdb-image";
import type { CastMember } from "@/store/service/movie/type";

interface MovieCastProps {
  cast: CastMember[];
}

export function MovieCast({ cast }: MovieCastProps) {
  if (!cast.length) return null;

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-base font-semibold text-foreground">Elenco Principal</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {cast.map((member) => (
          <div key={member.id} className="flex flex-col items-center gap-2 text-center">
            <div className="h-16 w-16 overflow-hidden rounded-full bg-cinema-700">
              {member.profile_path ? (
                <TmdbImage
                  path={member.profile_path}
                  size="w185"
                  alt={member.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <UserRound size={28} className="text-cinema-400" />
                </div>
              )}
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-semibold leading-tight text-foreground">
                {member.name}
              </span>
              <span className="line-clamp-1 text-xs leading-tight text-muted-foreground">
                {member.character}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
