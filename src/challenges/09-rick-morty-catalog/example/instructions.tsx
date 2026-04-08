import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import ChallengeShell from "../../../components/ChallengeShell";

const API_URL = "https://rickandmortyapi.com/api/character";

interface Props {
  children: ReactNode;
}

export default function ChallengeInstructions({ children }: Props) {
  return (
    <ChallengeShell
      title="Rick &amp; Morty Catalog"
      difficulty="advanced"
      concepts={["useMemo", "useCallback", "React.memo"]}
      prompt={
        <>
          <h3 className="font-bold text-lg mb-2">Goal</h3>
          <p>
            Build a searchable, filterable, paginated character catalog using
            the Rick &amp; Morty API. Each character card shows a{" "}
            <strong>render count</strong> — use this to visually prove that
            memoization prevents unnecessary re-renders.
          </p>

          <h3 className="font-bold text-lg mt-4 mb-2">Step-by-Step</h3>
          <ol className="list-decimal list-inside space-y-1">
            <li>
              Build a filter bar with a search input, status dropdown, and
              gender dropdown.
            </li>
            <li>
              Fetch characters from the API based on filters and current page.
            </li>
            <li>
              Display results in a grid of character cards (image, name, status,
              species, location).
            </li>
            <li>
              Add pagination controls (previous / next) using the API's
              info.prev and info.next.
            </li>
            <li>
              Wrap{" "}
              <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">
                CharacterCard
              </code>{" "}
              in{" "}
              <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">
                React.memo
              </code>
              .
            </li>
            <li>
              Stabilize handlers with{" "}
              <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">
                useCallback
              </code>{" "}
              so memo actually works.
            </li>
            <li>
              Add a render counter to each card to see memoization in action.
            </li>
          </ol>

          <h3 className="font-bold text-lg mt-4 mb-2">API</h3>
          <p className="font-mono text-sm mb-2">
            {API_URL}
            ?page=&#123;page&#125;&amp;name=&#123;name&#125;&amp;status=&#123;status&#125;&amp;gender=&#123;gender&#125;
          </p>
          <p className="text-sm mb-2">
            All query params are optional. Omit empty ones.
          </p>

          <h4 className="font-semibold mt-2">Response Shape</h4>
          <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm overflow-x-auto">
            {`{
  info: { count, pages, next, prev },
  results: [{
    id, name, status, species, gender,
    image,             // URL to character image
    location: { name } // current location name
  }]
}`}
          </pre>

          <h4 className="font-semibold mt-2">Filter Values</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>Status:</strong> "Alive", "Dead", "unknown"
            </li>
            <li>
              <strong>Gender:</strong> "Female", "Male", "Genderless", "unknown"
            </li>
          </ul>

          <h3 className="font-bold text-lg mt-4 mb-2">
            Suggested File Structure
          </h3>
          <ul className="list-disc list-inside space-y-1 font-mono text-sm">
            <li>./lib/hooks/useCharacters.ts</li>
            <li>./lib/hooks/useRenderCount.ts</li>
            <li>./lib/components/FilterBar.tsx</li>
            <li>./lib/components/CharacterGrid.tsx</li>
            <li>./lib/components/CharacterCard.tsx</li>
            <li>./lib/components/Pagination.tsx</li>
          </ul>

          <h3 className="font-bold text-lg mt-4 mb-2">
            Key Concept: Performance Optimization
          </h3>
          <p>
            <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">
              React.memo
            </code>{" "}
            prevents re-renders when props haven't changed.{" "}
            <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">
              useCallback
            </code>{" "}
            stabilizes function references so they don't break memo.{" "}
            <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">
              useMemo
            </code>{" "}
            caches computed values. These are optimization tools — only use when
            there's a measurable performance issue.
          </p>

          <h3 className="font-bold text-lg mt-4 mb-2">Optimization Strategy</h3>
          <ol className="list-decimal list-inside space-y-1">
            <li>
              Wrap{" "}
              <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">
                CharacterCard
              </code>{" "}
              in{" "}
              <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">
                React.memo
              </code>{" "}
              — it only re-renders when its props actually change.
            </li>
            <li>
              Use{" "}
              <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">
                useCallback
              </code>{" "}
              for handlers passed to child components — without it, a new
              function is created every render, breaking{" "}
              <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">
                React.memo
              </code>
              .
            </li>
            <li>
              Use{" "}
              <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">
                useMemo
              </code>{" "}
              for expensive computations or derived data.
            </li>
            <li>
              Add a render counter (
              <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">
                useRef
              </code>{" "}
              that increments each render) to each card to visually prove
              memoization works.
            </li>
          </ol>

          <h3 className="font-bold text-lg mt-4 mb-2">Hints</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>
              Debounce the search input so you don't fire an API call on every
              keystroke.
            </li>
            <li>
              Handle loading and error states (the API returns 404 when no
              results match).
            </li>
            <li>Reset to page 1 when filters change.</li>
            <li>
              The render count hook is simple:{" "}
              <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">
                {
                  "const count = useRef(0); count.current++; return count.current;"
                }
              </code>
            </li>
          </ul>

          <p className="mt-4">
            <Link
              to="/challenges/09/example"
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
