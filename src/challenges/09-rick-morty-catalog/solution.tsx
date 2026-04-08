import { useCallback, useMemo, useState } from "react";
import type { SolutionProps } from ".";
import CharacterGrid from "./lib/components/CharacterGrid";
import FilterBar from "./lib/components/FilterBar";
import Pagination from "./lib/components/Pagination";
import { useCharacters } from "./lib/hooks/useCharacters";

// Challenge 09: Rick & Morty Catalog
//
// Your tasks:
//   1. Wrap CharacterCard in React.memo (./lib/components/CharacterCard.tsx)
//   2. Use useCallback for the handler functions below so they have stable references
//   3. Use useMemo for the filters object so useCharacters doesn't re-fetch unnecessarily
//
// Key concept: React.memo prevents a component from re-rendering when its props
// haven't changed. But it only works if the props are actually stable —
// if you pass a new function reference every render, memo can't help.
// That's why useCallback (for functions) and useMemo (for objects) matter.
//
// Watch the render count badge (R:N) on each card to verify your optimizations work.

export function Solution({}: SolutionProps) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [gender, setGender] = useState("");
  const [page, setPage] = useState(1);

  // TODO: Wrap this object in useMemo so it only changes when its values change
  const filters = useMemo(
    () => ({ page, name, status, gender }),
    [page, name, status, gender],
  );

  const { characters, info, loading, error } = useCharacters(filters);

  // TODO: Wrap these handlers in useCallback so they have stable references.
  // This is necessary for React.memo on child components to work properly.
  const handleNameChange = useCallback((value: string) => {
    setName(value);
    setPage(1);
  }, []);

  const handleStatusChange = useCallback((value: string) => {
    setStatus(value);
    setPage(1);
  }, []);

  const handleGenderChange = useCallback((value: string) => {
    setGender(value);
    setPage(1);
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <FilterBar
        name={name}
        status={status}
        gender={gender}
        onNameChange={handleNameChange}
        onStatusChange={handleStatusChange}
        onGenderChange={handleGenderChange}
      />

      {loading && (
        <div className="flex items-center justify-center gap-2 py-12 text-gray-500 dark:text-gray-400">
          <svg
            className="h-5 w-5 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
          >
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
          <span>Loading characters...</span>
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-center text-red-700 dark:border-red-800 dark:bg-red-900/30 dark:text-red-400">
          {error}
        </div>
      )}

      {!loading && !error && characters.length > 0 && (
        <>
          <CharacterGrid characters={characters} />
          {info && (
            <Pagination
              page={page}
              totalPages={info.pages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}

      {!loading &&
        !error &&
        characters.length === 0 &&
        !name &&
        !status &&
        !gender && (
          <p className="py-12 text-center text-gray-400 dark:text-gray-500">
            Characters will appear here once loaded.
          </p>
        )}
    </div>
  );
}
