import { useCallback, useEffect, useRef, useState } from "react";
import type { SolutionProps } from ".";
import PokemonDetailModal from "./lib/components/PokemonDetailModal";
import PokemonGrid from "./lib/components/PokemonGrid";
import TeamAnalysis from "./lib/components/TeamAnalysis";
import TeamBar from "./lib/components/TeamBar";
import { usePokemonDetail, usePokemonList } from "./lib/hooks/usePokemon";
import { TeamProvider } from "./lib/hooks/useTeamContext";

// Challenge 10: Pokemon Team Builder (Capstone)
//
// This combines everything from challenges 01-09:
//   - useReducer + createContext for team state (useTeamContext.tsx)
//   - Custom hooks for data fetching (usePokemon.ts)
//   - React.memo + useCallback for optimization (PokemonMiniCard is already memo'd)
//   - useRef for auto-focus
//   - useMemo for team analysis (TeamAnalysis component)
//
// Your tasks:
//   1. Implement teamReducer in ./lib/hooks/useTeamContext.tsx
//   2. Implement usePokemonList and usePokemonDetail in ./lib/hooks/usePokemon.ts
//
// The UI components are all provided. Focus on making the hooks work.

function PokemonTeamBuilderInner() {
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const { pokemon, loading, totalCount } = usePokemonList(page);
  const { pokemon: detail, loading: detailLoading } =
    usePokemonDetail(selectedId);

  const totalPages = Math.ceil(totalCount / 20);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  const handleSelect = useCallback((id: number) => {
    setSelectedId(id);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedId(null);
  }, []);

  const handlePageChange = useCallback((p: number) => {
    setPage(p);
  }, []);

  return (
    <div className="flex flex-col gap-6 pb-24">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1">
          <input
            ref={searchRef}
            type="text"
            placeholder="Browse Pokemon below..."
            readOnly
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:placeholder-gray-500"
          />
        </div>
        <div className="w-full sm:w-72">
          <TeamAnalysis />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-12 text-gray-500 dark:text-gray-400">
          <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
          <span>Loading Pokemon...</span>
        </div>
      ) : (
        <PokemonGrid
          pokemon={pokemon}
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onSelect={handleSelect}
        />
      )}

      <TeamBar onSelect={handleSelect} />

      {selectedId && detail && (
        <PokemonDetailModal
          pokemon={detail}
          loading={detailLoading}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export function Solution({}: SolutionProps) {
  return (
    <TeamProvider>
      <PokemonTeamBuilderInner />
    </TeamProvider>
  );
}
