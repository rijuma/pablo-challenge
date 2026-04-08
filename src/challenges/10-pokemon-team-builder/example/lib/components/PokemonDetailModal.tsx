import type { PokemonDetail } from "../hooks/usePokemon";
import { useTeam } from "../hooks/useTeamContext";

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

interface PokemonDetailModalProps {
  pokemon: PokemonDetail;
  loading: boolean;
  onClose: () => void;
}

export default function PokemonDetailModal({
  pokemon,
  loading,
  onClose,
}: PokemonDetailModalProps) {
  const { state, dispatch } = useTeam();
  const isInTeam = state.team.some((p) => p.id === pokemon.id);

  const handleToggle = () => {
    if (isInTeam) {
      dispatch({ type: "REMOVE_POKEMON", payload: pokemon.id });
    } else {
      dispatch({
        type: "ADD_POKEMON",
        payload: {
          id: pokemon.id,
          name: pokemon.name,
          sprite: pokemon.sprite,
          types: pokemon.types,
        },
      });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <svg className="h-8 w-8 animate-spin text-blue-500" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center">
              <img
                src={pokemon.sprite}
                alt={pokemon.name}
                className="h-32 w-32"
              />
              <h2 className="text-xl font-bold capitalize text-gray-900 dark:text-gray-100">
                {pokemon.name}
              </h2>

              <div className="mt-2 flex gap-2">
                {pokemon.types.map((t) => (
                  <span
                    key={t}
                    className={`rounded-full px-3 py-1 text-xs font-medium text-white ${typeColors[t] ?? "bg-gray-500"}`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 flex justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
              <span>Height: {pokemon.height / 10}m</span>
              <span>Weight: {pokemon.weight / 10}kg</span>
            </div>

            <div className="mt-4 space-y-2">
              {pokemon.stats.map((stat) => (
                <div key={stat.name} className="flex items-center gap-2">
                  <span className="w-28 text-right text-xs capitalize text-gray-600 dark:text-gray-400">
                    {stat.name.replace("-", " ")}
                  </span>
                  <div className="flex-1 rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className="h-2 rounded-full bg-blue-500 transition-all"
                      style={{ width: `${Math.min(100, (stat.value / 255) * 100)}%` }}
                    />
                  </div>
                  <span className="w-8 text-xs text-gray-500 dark:text-gray-400">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={handleToggle}
              disabled={!isInTeam && state.team.length >= 6}
              className={`mt-5 w-full rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors ${
                isInTeam
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              }`}
            >
              {isInTeam ? "Remove from Team" : state.team.length >= 6 ? "Team Full" : "Add to Team"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
