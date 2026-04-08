import { useEffect, useState } from "react";

// TODO: Implement the Pokemon data fetching hooks
//
// These hooks fetch data from the PokeAPI (https://pokeapi.co/api/v2/pokemon).
// This is similar to useCharacters from challenge 09 but with two hooks:
//
// usePokemonList(page):
//   1. Fetch paginated list: /pokemon?limit=20&offset={(page-1)*20}
//   2. For each result, fetch the detail URL to get id, name, sprite, types
//   3. Return { pokemon, loading, totalCount }
//
// usePokemonDetail(id):
//   1. Fetch single pokemon: /pokemon/{id}
//   2. Extract stats, height, weight, types, sprite
//   3. Return { pokemon, loading }
//
// Both should use AbortController for cleanup.

interface PokemonListItem {
  id: number;
  name: string;
  sprite: string;
  types: string[];
}

interface PokemonDetail {
  id: number;
  name: string;
  sprite: string;
  types: string[];
  stats: { name: string; value: number }[];
  height: number;
  weight: number;
}

export type { PokemonListItem, PokemonDetail };

export function usePokemonList(page: number) {
  const [pokemon, setPokemon] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  // TODO: Implement fetching logic
  // 1. Create AbortController
  // 2. Fetch https://pokeapi.co/api/v2/pokemon?limit=20&offset={offset}
  // 3. For each result entry, fetch the detail URL
  // 4. Map to PokemonListItem shape
  // 5. Clean up with controller.abort() on unmount
  useEffect(() => {
    void page;
    void setPokemon;
    void setLoading;
    void setTotalCount;
  }, [page]);

  return { pokemon, loading, totalCount };
}

export function usePokemonDetail(id: number | null) {
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(false);

  // TODO: Implement fetching logic
  // 1. If id is null, set pokemon to null and return
  // 2. Fetch https://pokeapi.co/api/v2/pokemon/{id}
  // 3. Map response to PokemonDetail shape
  // 4. Clean up with controller.abort() on unmount
  useEffect(() => {
    void id;
    void setPokemon;
    void setLoading;
  }, [id]);

  return { pokemon, loading };
}
