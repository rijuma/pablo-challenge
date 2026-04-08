import { useState } from "react";
import type { SolutionProps } from ".";
import UserSelector from "./lib/components/UserSelector";
import PostList from "./lib/components/PostList";
import TodoList from "./lib/components/TodoList";
import { useFetch } from "./lib/hooks/useFetch";

// Challenge 05: User Dashboard — Custom Hooks
//
// Your task: implement the useFetch<T> hook in ./lib/hooks/useFetch.ts
// The UserSelector, PostList, TodoList, and CompletionRing components are already built!
//
// TODO Steps:
// 1. Open ./lib/hooks/useFetch.ts and implement the generic fetch hook:
//    - Accept a URL (string | null) — when null, don't fetch
//    - Use useEffect to fetch when URL changes
//    - Use AbortController for cleanup (cancel stale requests)
//    - Track and return { data, loading, error }
// 2. Use useFetch three times below to load users, posts, and todos
// 3. Wire up the selectedUserId state to conditionally build URLs

export const API_BASE = "https://jsonplaceholder.typicode.com";

export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export function Solution({}: SolutionProps) {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  // TODO: Use useFetch to load data (these will work once you implement the hook!)
  const { data: users, loading: usersLoading } = useFetch<User[]>(
    `${API_BASE}/users`,
  );
  const { data: posts, loading: postsLoading, error: postsError } =
    useFetch<Post[]>(
      selectedUserId ? `${API_BASE}/posts?userId=${selectedUserId}` : null,
    );
  const { data: todos, loading: todosLoading, error: todosError } =
    useFetch<Todo[]>(
      selectedUserId ? `${API_BASE}/todos?userId=${selectedUserId}` : null,
    );

  return (
    <div className="flex flex-col gap-6">
      <UserSelector
        users={users ?? []}
        selectedId={selectedUserId}
        onSelect={setSelectedUserId}
        loading={usersLoading}
      />

      {selectedUserId ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <PostList
            posts={posts ?? []}
            loading={postsLoading}
            error={postsError}
          />
          <TodoList
            todos={todos ?? []}
            loading={todosLoading}
            error={todosError}
          />
        </div>
      ) : (
        <p className="text-center text-gray-400">
          Select a user to see their posts and todos
        </p>
      )}
    </div>
  );
}
