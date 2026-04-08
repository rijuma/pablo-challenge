import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CharacterGrid from "./lib/components/CharacterGrid";
import FilterBar from "./lib/components/FilterBar";
import Pagination from "./lib/components/Pagination";
import { useCharacters } from "./lib/hooks/useCharacters";

export default function Example09() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [gender, setGender] = useState("");
  const [page, setPage] = useState(1);

  const filters = useMemo(
    () => ({ page, name, status, gender }),
    [page, name, status, gender],
  );

  const { characters, info, loading, error } = useCharacters(filters);

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
    <div className="p-10">
      <Link
        to="/challenges/09"
        className="text-sm text-blue-500 hover:underline"
      >
        ← Back to Challenge
      </Link>
      <h1 className="mb-6 mt-2 text-3xl font-bold">
        Rick & Morty Catalog — Example
      </h1>
      <div className="min-h-[200px] rounded-lg border-2 border-dashed border-gray-200 p-6 dark:border-gray-700">
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
      </div>
    </div>
  );
}
