import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PokemonCard, { type PokemonData } from "./lib/components/PokemonCard";
import SearchInput from "./lib/components/SearchInput";

export default function PokedexSearch() {
  const [query, setQuery] = useState("");
  const [pokemon, setPokemon] = useState<PokemonData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback((q: string) => {
    setQuery(q);
  }, []);

  useEffect(() => {
    if (!query) {
      setPokemon(null);
      setError(null);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch(`https://pokeapi.co/api/v2/pokemon/${query}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error("not-found");
        return res.json();
      })
      .then((data: PokemonData) => {
        setPokemon(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setPokemon(null);
        setError(
          err.message === "not-found"
            ? `No Pokémon found for "${query}". Check the spelling!`
            : "Something went wrong. Please try again.",
        );
        setLoading(false);
      });

    return () => controller.abort();
  }, [query]);

  return (
    <div className="p-10">
      <Link
        to="/challenges/04"
        className="text-sm text-blue-500 hover:underline"
      >
        &larr; Back to Challenge
      </Link>
      <h1 className="mb-6 mt-2 text-3xl font-bold">
        Pok&eacute;dex Search &mdash; Example
      </h1>
      <div className="min-h-[200px] rounded-lg border-2 border-dashed border-gray-200 p-6 dark:border-gray-700">
        <div className="flex flex-col items-center gap-6">
          <div className="w-full max-w-md">
            <SearchInput onSearch={handleSearch} />
          </div>

          {loading && (
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
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
              <span>Searching...</span>
            </div>
          )}

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700 dark:border-red-800 dark:bg-red-900/30 dark:text-red-400">
              {error}
            </div>
          )}

          {!loading && !error && pokemon && <PokemonCard pokemon={pokemon} />}

          {!loading && !error && !pokemon && !query && (
            <p className="text-gray-400 dark:text-gray-500">
              Type a Pokémon name above to get started.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
