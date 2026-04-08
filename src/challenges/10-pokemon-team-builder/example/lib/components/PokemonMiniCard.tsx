import { memo } from "react";
import type { PokemonListItem } from "../hooks/usePokemon";

const typeColors: Record<string, string> = {
  normal: "bg-gray-400",
  fire: "bg-orange-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400",
  grass: "bg-green-500",
  ice: "bg-cyan-300",
  fighting: "bg-red-700",
  poison: "bg-purple-500",
  ground: "bg-amber-600",
  flying: "bg-indigo-300",
  psychic: "bg-pink-500",
  bug: "bg-lime-500",
  rock: "bg-amber-700",
  ghost: "bg-purple-700",
  dragon: "bg-violet-700",
  dark: "bg-gray-700",
  steel: "bg-gray-400",
  fairy: "bg-pink-300",
};

interface PokemonMiniCardProps {
  pokemon: PokemonListItem;
  onSelect: (id: number) => void;
  onAdd: (pokemon: PokemonListItem) => void;
  isInTeam: boolean;
}

export default memo(function PokemonMiniCard({
  pokemon,
  onSelect,
  onAdd,
  isInTeam,
}: PokemonMiniCardProps) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <button
        onClick={() => onSelect(pokemon.id)}
        className="flex flex-col items-center bg-transparent border-none cursor-pointer p-0"
      >
        <img
          src={pokemon.sprite}
          alt={pokemon.name}
          className="h-20 w-20"
          loading="lazy"
        />
        <span className="text-sm font-semibold capitalize text-gray-900 dark:text-gray-100">
          {pokemon.name}
        </span>
      </button>

      <div className="mt-1 flex gap-1">
        {pokemon.types.map((t) => (
          <span
            key={t}
            className={`rounded-full px-2 py-0.5 text-[10px] font-medium text-white ${typeColors[t] ?? "bg-gray-500"}`}
          >
            {t}
          </span>
        ))}
      </div>

      <button
        onClick={() => onAdd(pokemon)}
        disabled={isInTeam}
        className="mt-2 w-full rounded-lg bg-blue-600 px-2 py-1 text-xs font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        {isInTeam ? "In Team" : "+ Add"}
      </button>
    </div>
  );
});
