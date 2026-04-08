import StatBar from "./StatBar";

interface PokemonStat {
  base_stat: number;
  stat: { name: string };
}

interface PokemonType {
  type: { name: string };
}

export interface PokemonData {
  name: string;
  sprites: { front_default: string | null };
  types: PokemonType[];
  stats: PokemonStat[];
  height: number;
  weight: number;
}

const typeColors: Record<string, string> = {
  normal: "bg-gray-400",
  fire: "bg-red-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400",
  grass: "bg-green-500",
  ice: "bg-cyan-400",
  fighting: "bg-orange-700",
  poison: "bg-purple-500",
  ground: "bg-amber-600",
  flying: "bg-indigo-400",
  psychic: "bg-pink-500",
  bug: "bg-lime-500",
  rock: "bg-stone-500",
  ghost: "bg-violet-600",
  dragon: "bg-indigo-600",
  dark: "bg-gray-700",
  steel: "bg-slate-400",
  fairy: "bg-pink-300",
};

export default function PokemonCard({ pokemon }: { pokemon: PokemonData }) {
  const displayName =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-col items-center gap-2">
        {pokemon.sprites.front_default && (
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="h-32 w-32 object-contain"
          />
        )}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {displayName}
        </h2>

        <div className="flex gap-2">
          {pokemon.types.map(({ type }) => (
            <span
              key={type.name}
              className={`rounded-full px-3 py-0.5 text-xs font-semibold text-white ${typeColors[type.name] ?? "bg-gray-500"}`}
            >
              {type.name}
            </span>
          ))}
        </div>

        <div className="mt-2 flex gap-6 text-sm text-gray-600 dark:text-gray-400">
          <span>Height: {pokemon.height / 10} m</span>
          <span>Weight: {pokemon.weight / 10} kg</span>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-1.5">
        {pokemon.stats.map(({ base_stat, stat }) => (
          <StatBar key={stat.name} label={stat.name} value={base_stat} />
        ))}
      </div>
    </div>
  );
}
