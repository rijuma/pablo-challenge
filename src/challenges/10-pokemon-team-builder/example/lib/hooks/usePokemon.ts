import { useEffect, useState } from "react";

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

interface RawPokemon {
  id: number;
  name: string;
  sprites: { front_default: string };
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  height: number;
  weight: number;
}

export type { PokemonListItem, PokemonDetail };

export function usePokemonList(page: number) {
  const [pokemon, setPokemon] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    const offset = (page - 1) * 20;

    fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then(async (data: { count: number; results: { url: string }[] }) => {
        setTotalCount(data.count);

        const details = await Promise.all(
          data.results.map((entry) =>
            fetch(entry.url, { signal: controller.signal })
              .then((r) => r.json())
              .then((d: RawPokemon) => ({
                id: d.id,
                name: d.name,
                sprite: d.sprites.front_default,
                types: d.types.map((t) => t.type.name),
              })),
          ),
        );

        setPokemon(details);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setLoading(false);
      });

    return () => controller.abort();
  }, [page]);

  return { pokemon, loading, totalCount };
}

export function usePokemonDetail(id: number | null) {
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) {
      setPokemon(null);
      return;
    }

    const controller = new AbortController();
    setLoading(true);

    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data: RawPokemon) => {
        setPokemon({
          id: data.id,
          name: data.name,
          sprite: data.sprites.front_default,
          types: data.types.map((t) => t.type.name),
          stats: data.stats.map((s) => ({
            name: s.stat.name,
            value: s.base_stat,
          })),
          height: data.height,
          weight: data.weight,
        });
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setLoading(false);
      });

    return () => controller.abort();
  }, [id]);

  return { pokemon, loading };
}
