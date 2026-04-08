import { useMemo } from "react";
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

export default function TeamAnalysis() {
  const { state, dispatch } = useTeam();

  const typeCoverage = useMemo(() => {
    const types = new Set<string>();
    state.team.forEach((p) => p.types.forEach((t) => types.add(t)));
    return Array.from(types).sort();
  }, [state.team]);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
      <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
        Team Analysis
      </h3>

      <div className="mb-3">
        <label className="mb-1 block text-xs text-gray-500 dark:text-gray-400">
          Team Name
        </label>
        <input
          type="text"
          placeholder="Name your team..."
          value={state.teamName}
          onChange={(e) =>
            dispatch({ type: "SET_TEAM_NAME", payload: e.target.value })
          }
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
        />
      </div>

      <div className="mb-2 text-xs text-gray-500 dark:text-gray-400">
        Members: {state.team.length}/6
      </div>

      {typeCoverage.length > 0 ? (
        <div>
          <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">
            Type Coverage
          </p>
          <div className="flex flex-wrap gap-1">
            {typeCoverage.map((t) => (
              <span
                key={t}
                className={`rounded-full px-2 py-0.5 text-[10px] font-medium text-white ${typeColors[t] ?? "bg-gray-500"}`}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-xs text-gray-400 dark:text-gray-500">
          Add Pokemon to see type coverage.
        </p>
      )}
    </div>
  );
}
