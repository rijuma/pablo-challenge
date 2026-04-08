import { useState } from "react";
// useEffect will be needed for the TODO below — uncomment when implementing:
// import { useEffect } from "react";

// TODO: Implement the useFetch<T> custom hook
// It should:
// 1. Accept a URL (string | null) — when null, don't fetch
// 2. Use useEffect to fetch data when URL changes
// 3. Use AbortController for cleanup
// 4. Track loading, error, and data states
// 5. Return { data: T | null, loading: boolean, error: string | null }

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useFetch<T>(_url: string | null): UseFetchResult<T> {
  const [data] = useState<T | null>(null);
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  // TODO: Add useEffect with fetch + AbortController here

  return { data, loading, error };
}
