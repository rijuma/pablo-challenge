import { useCallback } from "react";
import type { PokemonListItem } from "../hooks/usePokemon";
import { useTeam } from "../hooks/useTeamContext";
import PokemonMiniCard from "./PokemonMiniCard";

interface PokemonGridProps {
  pokemon: PokemonListItem[];
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onSelect: (id: number) => void;
}

export default function PokemonGrid({
  pokemon,
  page,
  totalPages,
  onPageChange,
  onSelect,
}: PokemonGridProps) {
  const { state, dispatch } = useTeam();

  const teamIds = new Set(state.team.map((p) => p.id));

  const handleAdd = useCallback(
    (p: PokemonListItem) => {
      dispatch({
        type: "ADD_POKEMON",
        payload: { id: p.id, name: p.name, sprite: p.sprite, types: p.types },
      });
    },
    [dispatch],
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {pokemon.map((p) => (
          <PokemonMiniCard
            key={p.id}
            pokemon={p}
            onSelect={onSelect}
            onAdd={handleAdd}
            isInTeam={teamIds.has(p.id)}
          />
        ))}
      </div>

      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-600 dark:hover:bg-gray-700"
        >
          Previous
        </button>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-600 dark:hover:bg-gray-700"
        >
          Next
        </button>
      </div>
    </div>
  );
}
