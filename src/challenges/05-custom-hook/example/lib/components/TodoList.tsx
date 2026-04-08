import CompletionRing from "./CompletionRing";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

export default function TodoList({ todos, loading, error }: TodoListProps) {
  if (loading) {
    return <p className="text-sm text-gray-500">Loading todos...</p>;
  }

  if (error) {
    return <p className="text-sm text-red-500">{error}</p>;
  }

  if (todos.length === 0) return null;

  const completed = todos.filter((t) => t.completed).length;
  const percentage = (completed / todos.length) * 100;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Todos ({completed}/{todos.length})
        </h3>
        <CompletionRing percentage={percentage} />
      </div>
      <ul className="max-h-64 space-y-1 overflow-y-auto">
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center gap-2 text-sm">
            <span
              className={`h-4 w-4 shrink-0 rounded border ${
                todo.completed
                  ? "border-green-500 bg-green-500 text-white"
                  : "border-gray-300 dark:border-gray-600"
              } flex items-center justify-center text-xs`}
            >
              {todo.completed && "✓"}
            </span>
            <span
              className={
                todo.completed
                  ? "text-gray-400 line-through dark:text-gray-500"
                  : "text-gray-700 dark:text-gray-300"
              }
            >
              {todo.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
