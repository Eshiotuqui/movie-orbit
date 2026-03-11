import { Clapperboard } from "lucide-react";

export function MovieDetailError() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cinema-700">
        <Clapperboard size={36} className="text-cinema-400" />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-foreground">Filme não encontrado</h3>
        <p className="text-sm text-muted-foreground">
          Não foi possível carregar os detalhes do filme. Tente novamente.
        </p>
      </div>
    </div>
  );
}
