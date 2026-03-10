import { SearchX, Clapperboard } from "lucide-react";

interface MovieEmptyProps {
  search?: string;
}

export function MovieEmpty({ search }: MovieEmptyProps) {
  const isSearch = Boolean(search);

  return (
    <div className="col-span-full flex flex-col items-center justify-center gap-4 py-24 text-center">
      <div className="bg-cinema-700 flex h-20 w-20 items-center justify-center rounded-full">
        {isSearch ? (
          <SearchX size={36} className="text-cinema-400" />
        ) : (
          <Clapperboard size={36} className="text-cinema-400" />
        )}
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-foreground text-lg font-semibold">
          {isSearch ? "Nenhum resultado encontrado" : "Nenhum filme disponível"}
        </h3>
        <p className="text-muted-foreground text-sm">
          {isSearch
            ? `Não encontramos filmes para "${search}". Tente outro termo.`
            : "Não foi possível carregar os filmes. Tente novamente."}
        </p>
      </div>
    </div>
  );
}
