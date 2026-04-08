import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import ChallengeShell from "../../../components/ChallengeShell";

const API_BASE = "https://jsonplaceholder.typicode.com";

interface Props {
  children: ReactNode;
}

export default function ChallengeInstructions({ children }: Props) {
  return (
    <ChallengeShell
      title="User Dashboard"
      difficulty="intermediate"
      concepts={["custom hooks", "generics"]}
      prompt={
        <>
          <h3 className="font-bold text-lg mb-2">Goal</h3>
          <p>
            Build a user dashboard powered by a reusable{" "}
            <code>{"useFetch<T>"}</code> custom hook. On mount, fetch the list
            of users. When a user is selected, fetch their{" "}
            <strong>posts</strong> and <strong>todos</strong> in parallel. Posts
            render as expandable cards. Todos render as a checklist with a
            circular completion ring.
          </p>

          <h3 className="font-bold text-lg mt-4 mb-2">API details</h3>
          <p>
            <strong>Base URL:</strong> <code>{API_BASE}</code>
          </p>
          <ul className="list-disc list-inside space-y-1 mt-1">
            <li>
              <strong>Users:</strong> <code>{API_BASE}/users</code>
            </li>
            <li>
              <strong>Posts:</strong>{" "}
              <code>
                {API_BASE}/posts?userId={"{id}"}
              </code>
            </li>
            <li>
              <strong>Todos:</strong>{" "}
              <code>
                {API_BASE}/todos?userId={"{id}"}
              </code>
            </li>
          </ul>

          <p className="mt-3">
            <strong>Response types</strong> to define in TypeScript:
          </p>
          <pre className="bg-gray-800 text-gray-100 rounded p-2 mt-1 text-sm overflow-x-auto">
            {`type User = { id: number; name: string; email: string; username: string };
type Post = { id: number; title: string; body: string };
type Todo = { id: number; title: string; completed: boolean };`}
          </pre>

          <h3 className="font-bold text-lg mt-4 mb-2">Step-by-step</h3>
          <ol className="list-decimal list-inside space-y-1">
            <li>
              Build the <code>{"useFetch<T>(url: string | null)"}</code> hook.
              It accepts <code>null</code> to skip fetching (useful when no user
              is selected). It returns{" "}
              <code>
                {"{ data: T | null, loading: boolean, error: string | null }"}
              </code>
              .
            </li>
            <li>
              Inside the hook, use <code>useEffect</code> with{" "}
              <code>AbortController</code> for cleanup, just like Challenge 04.
              If <code>url</code> is <code>null</code>, reset state and return
              early.
            </li>
            <li>
              In the main component, call <code>{"useFetch<User[]>"}</code> for
              the user list (always fetched).
            </li>
            <li>
              Store the selected user ID in state. Build the posts and todos
              URLs conditionally — pass <code>null</code> when no user is
              selected.
            </li>
            <li>
              Call <code>{"useFetch<Post[]>"}</code> and{" "}
              <code>{"useFetch<Todo[]>"}</code> with those conditional URLs.
              Both fetches happen in parallel automatically.
            </li>
            <li>
              Build a <code>CompletionRing</code> (SVG circle) showing the
              percentage of completed todos.
            </li>
          </ol>

          <h3 className="font-bold text-lg mt-4 mb-2">
            Suggested file structure
          </h3>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <code>./lib/hooks/useFetch.ts</code> — generic{" "}
              <code>{"useFetch<T>"}</code> hook
            </li>
            <li>
              <code>./lib/components/UserSelector.tsx</code> — dropdown or list
              to pick a user
            </li>
            <li>
              <code>./lib/components/PostList.tsx</code> — expandable post cards
            </li>
            <li>
              <code>./lib/components/TodoList.tsx</code> — checklist with
              checkboxes
            </li>
            <li>
              <code>./lib/components/CompletionRing.tsx</code> — SVG circular
              progress indicator
            </li>
          </ul>

          <h3 className="font-bold text-lg mt-4 mb-2">
            Key concept: Custom hooks &amp; generics
          </h3>
          <p>
            A <strong>custom hook</strong> is just a function whose name starts
            with <code>use</code>. It can call other hooks (
            <code>useState</code>, <code>useEffect</code>, etc.) and return
            whatever you want. By using a <strong>TypeScript generic</strong>{" "}
            <code>{"useFetch<T>"}</code>, the same hook works for{" "}
            <code>User[]</code>, <code>Post[]</code>, and <code>Todo[]</code> —
            the caller specifies the type.
          </p>
          <pre className="bg-gray-800 text-gray-100 rounded p-2 mt-2 text-sm overflow-x-auto">
            {`function useFetch<T>(url: string | null) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) { setData(null); return; }
    const controller = new AbortController();
    setLoading(true);
    fetch(url, { signal: controller.signal })
      .then(res => res.json())
      .then((json: T) => { setData(json); setError(null); })
      .catch(err => {
        if (err.name !== "AbortError") setError(err.message);
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}`}
          </pre>

          <h3 className="font-bold text-lg mt-4 mb-2">Hints</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>
              Pass <code>null</code> to <code>useFetch</code> to conditionally
              skip fetching:{" "}
              <code>
                {
                  "useFetch<Post[]>(selectedId ? `${API_BASE}/posts?userId=${selectedId}` : null)"
                }
              </code>
            </li>
            <li>
              For the completion ring, use an SVG <code>&lt;circle&gt;</code>{" "}
              with <code>stroke-dasharray</code> and{" "}
              <code>stroke-dashoffset</code> to animate the fill.
            </li>
            <li>
              Make post cards expandable by toggling a <code>expandedId</code>{" "}
              state value on click.
            </li>
            <li>
              You can call <code>useFetch</code> multiple times in the same
              component — hooks are independent.
            </li>
          </ul>

          <p className="mt-4">
            <Link
              to="/challenges/05/example"
              className="text-blue-500 hover:underline"
            >
              View Example →
            </Link>
          </p>
        </>
      }
    >
      {children}
    </ChallengeShell>
  );
}
