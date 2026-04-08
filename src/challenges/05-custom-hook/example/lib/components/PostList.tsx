import { useState } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface PostListProps {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

export default function PostList({ posts, loading, error }: PostListProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  if (loading) {
    return <p className="text-sm text-gray-500">Loading posts...</p>;
  }

  if (error) {
    return <p className="text-sm text-red-500">{error}</p>;
  }

  if (posts.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
        Posts ({posts.length})
      </h3>
      {posts.map((post) => {
        const isExpanded = expandedId === post.id;
        return (
          <button
            key={post.id}
            onClick={() => setExpandedId(isExpanded ? null : post.id)}
            className="w-full cursor-pointer rounded-lg border border-gray-200 bg-white p-3 text-left transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-750"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200">
                {post.title}
              </h4>
              <span className="ml-2 shrink-0 text-gray-400">
                {isExpanded ? "▲" : "▼"}
              </span>
            </div>
            {isExpanded && (
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {post.body}
              </p>
            )}
          </button>
        );
      })}
    </div>
  );
}
