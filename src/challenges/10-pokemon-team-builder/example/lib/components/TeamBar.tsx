import { useTeam } from "../hooks/useTeamContext";

interface TeamBarProps {
  onSelect: (id: number) => void;
}

export default function TeamBar({ onSelect }: TeamBarProps) {
  const { state } = useTeam();
  const slots = Array.from({ length: 6 }, (_, i) => state.team[i] ?? null);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white/90 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/90">
      <div className="mx-auto flex max-w-3xl items-center justify-center gap-3 px-4 py-3">
        {slots.map((pokemon, i) => (
          <div
            key={pokemon?.id ?? `empty-${i}`}
            className={`flex h-16 w-16 items-center justify-center rounded-xl border-2 transition-colors ${
              pokemon
                ? "cursor-pointer border-blue-400 bg-blue-50 hover:border-blue-500 dark:border-blue-600 dark:bg-blue-900/30"
                : "border-dashed border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-800"
            }`}
            onClick={() => pokemon && onSelect(pokemon.id)}
          >
            {pokemon ? (
              <img
                src={pokemon.sprite}
                alt={pokemon.name}
                className="h-12 w-12"
                title={pokemon.name}
              />
            ) : (
              <span className="text-lg text-gray-300 dark:text-gray-600">?</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
