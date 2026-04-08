import { useState } from "react";
import { Link } from "react-router-dom";
import PostList from "./lib/components/PostList";
import TodoList from "./lib/components/TodoList";
import UserSelector from "./lib/components/UserSelector";
import useFetch from "./lib/hooks/useFetch";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Post {
  id: number;
  title: string;
  body: string;
}

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

export default function UserDashboard() {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const { data: users, loading: usersLoading } = useFetch<User[]>(USERS_URL);

  const postsUrl = selectedUserId
    ? `https://jsonplaceholder.typicode.com/posts?userId=${selectedUserId}`
    : null;
  const todosUrl = selectedUserId
    ? `https://jsonplaceholder.typicode.com/todos?userId=${selectedUserId}`
    : null;

  const {
    data: posts,
    loading: postsLoading,
    error: postsError,
  } = useFetch<Post[]>(postsUrl);

  const {
    data: todos,
    loading: todosLoading,
    error: todosError,
  } = useFetch<Todo[]>(todosUrl);

  return (
    <div className="p-10">
      <Link
        to="/challenges/05"
        className="text-sm text-blue-500 hover:underline"
      >
        &larr; Back to Challenge
      </Link>
      <h1 className="mb-6 mt-2 text-3xl font-bold">
        User Dashboard &mdash; Example
      </h1>
      <div className="min-h-[200px] rounded-lg border-2 border-dashed border-gray-200 p-6 dark:border-gray-700">
        <div className="flex flex-col gap-6">
          <UserSelector
            users={users ?? []}
            selectedId={selectedUserId}
            onSelect={setSelectedUserId}
            loading={usersLoading}
          />

          {selectedUserId && (
            <div className="grid gap-6 lg:grid-cols-2">
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
          )}

          {!selectedUserId && (
            <p className="text-gray-400 dark:text-gray-500">
              Select a user to view their posts and todos.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
