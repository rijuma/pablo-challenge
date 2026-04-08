import type { SolutionProps } from ".";
import SearchInput from "./lib/components/SearchInput";
// These components/types are ready for you to use — uncomment when needed:
// import PokemonCard from "./lib/components/PokemonCard";
// import type { PokemonData } from "./lib/components/PokemonCard";

// Challenge 04: Pokedex Search — useEffect with fetch + AbortController
//
// Your task: fetch Pokemon data from the PokeAPI when the user types a name.
// The SearchInput, PokemonCard, and StatBar components are already built for you!
//
// TODO Steps:
// 1. Create state for: query (string), pokemon (PokemonData | null), loading, error
// 2. Write a useEffect that:
//    a. Skips the fetch when query is empty
//    b. Creates an AbortController
//    c. Fetches from `${POKEAPI_URL}/${query}`
//    d. Sets pokemon data on success, error message on failure
//    e. Catches AbortError separately (don't show it as an error)
//    f. Returns a cleanup function that calls controller.abort()
// 3. Wire up SearchInput's onSearch to update the query state
// 4. Show loading spinner, error message, or PokemonCard based on state

export const POKEAPI_URL = "https://pokeapi.co/api/v2/pokemon";

export function Solution({}: SolutionProps) {
  // TODO: Create state variables
  // const [query, setQuery] = useState('');
  // const [pokemon, setPokemon] = useState<PokemonData | null>(null);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);

  // TODO: Add useEffect for fetching
  // useEffect(() => {
  //   if (!query) { setPokemon(null); return; }
  //   const controller = new AbortController();
  //   setLoading(true);
  //   setError(null);
  //   fetch(`${POKEAPI_URL}/${query}`, { signal: controller.signal })
  //     .then(res => { if (!res.ok) throw new Error('Not found'); return res.json(); })
  //     .then(data => { setPokemon(data); setLoading(false); })
  //     .catch(err => {
  //       if (err.name !== 'AbortError') { setError(err.message); setLoading(false); }
  //     });
  //   return () => controller.abort();
  // }, [query]);

  function handleSearch(_value: string) {
    // TODO: Update query state
    // setQuery(value);
  }

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-6">
      <SearchInput onSearch={handleSearch} />

      {/* TODO: Add conditional rendering */}
      {/* {loading && <p className="text-center text-gray-500">Searching...</p>} */}
      {/* {error && <p className="text-center text-red-500">{error}</p>} */}
      {/* {pokemon && <PokemonCard pokemon={pokemon} />} */}

      <p className="text-center text-gray-400">
        Search for a Pokemon to see it here
      </p>
    </div>
  );
}
