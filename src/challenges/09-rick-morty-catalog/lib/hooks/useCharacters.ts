import { useEffect, useState } from "react";

interface Character {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  gender: string;
  image: string;
  location: { name: string };
}

interface Info {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

interface ApiResponse {
  info: Info;
  results: Character[];
}

interface Filters {
  page: number;
  name: string;
  status: string;
  gender: string;
}

interface UseCharactersReturn {
  characters: Character[];
  info: { pages: number } | null;
  loading: boolean;
  error: string | null;
}

export type { Character };

export function useCharacters(filters: Filters): UseCharactersReturn {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [info, setInfo] = useState<{ pages: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    const params = new URLSearchParams();
    params.set("page", String(filters.page));
    if (filters.name) params.set("name", filters.name);
    if (filters.status) params.set("status", filters.status);
    if (filters.gender) params.set("gender", filters.gender);

    fetch(`https://rickandmortyapi.com/api/character?${params.toString()}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error("not-found");
        return res.json() as Promise<ApiResponse>;
      })
      .then((data) => {
        setCharacters(data.results);
        setInfo({ pages: data.info.pages });
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setCharacters([]);
        setInfo(null);
        setError(
          err.message === "not-found"
            ? "No characters found matching your filters."
            : "Something went wrong. Please try again.",
        );
        setLoading(false);
      });

    return () => controller.abort();
  }, [filters.page, filters.name, filters.status, filters.gender]);

  return { characters, info, loading, error };
}
