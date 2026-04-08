import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import ChallengeShell from "../../../components/ChallengeShell";

const POKEAPI_URL = "https://pokeapi.co/api/v2/pokemon";

interface Props {
  children: ReactNode;
}

export default function ChallengeInstructions({ children }: Props) {
  return (
    <ChallengeShell
      title="Pokédex Search"
      difficulty="intermediate"
      concepts={["useEffect", "fetch", "AbortController"]}
      prompt={
        <>
          <h3 className="font-bold text-lg mb-2">Goal</h3>
          <p>
            Build a Pokemon search tool. As the user types a name,{" "}
            <strong>debounce</strong> the input (wait 500ms after the last
            keystroke), then fetch data from the PokeAPI. Display a card with
            the Pokemon's <strong>sprite, name, types</strong> (as colored
            badges), <strong>base stats</strong> (as horizontal bars), and{" "}
            <strong>height/weight</strong>. Handle loading and error states
            gracefully.
          </p>

          <h3 className="font-bold text-lg mt-4 mb-2">API details</h3>
          <p>
            <strong>URL:</strong>{" "}
            <code>
              {POKEAPI_URL}/{"{name_or_id}"}
            </code>
          </p>
          <p className="mt-1">
            Example: <code>{POKEAPI_URL}/pikachu</code>
          </p>
          <p className="mt-2">
            <strong>Response shape</strong> (relevant fields):
          </p>
          <pre className="bg-gray-800 text-gray-100 rounded p-2 mt-1 text-sm overflow-x-auto">
            {`{
  name: string,
  height: number,
  weight: number,
  sprites: {
    front_default: string // image URL
  },
  types: [
    { type: { name: string } }
  ],
  stats: [
    { base_stat: number, stat: { name: string } }
  ]
}`}
          </pre>

          <h3 className="font-bold text-lg mt-4 mb-2">Step-by-step</h3>
          <ol className="list-decimal list-inside space-y-1">
            <li>
              Create a search input. On each keystroke, clear the previous{" "}
              <code>setTimeout</code> and set a new one for 500ms. When it
              fires, update a <code>debouncedQuery</code> state value.
            </li>
            <li>
              In a <code>useEffect</code> that depends on{" "}
              <code>debouncedQuery</code>, fetch from{" "}
              <code>{`${POKEAPI_URL}/\${query}`}</code>.
            </li>
            <li>
              Create an <code>AbortController</code> at the start of the effect
              and pass <code>{"{ signal: controller.signal }"}</code> to{" "}
              <code>fetch</code>. Return{" "}
              <code>() =&gt; controller.abort()</code> as the cleanup function.
            </li>
            <li>
              Track <code>loading</code>, <code>error</code>, and{" "}
              <code>pokemon</code> state. Show a spinner while loading, a
              friendly message on error (e.g., "Pokemon not found"), and the
              card on success.
            </li>
            <li>
              Build a <code>PokemonCard</code> with the sprite image, name, type
              badges, and stat bars. Each stat bar's width should be
              proportional to the base stat (max is 255).
            </li>
          </ol>

          <h3 className="font-bold text-lg mt-4 mb-2">
            Suggested file structure
          </h3>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <code>./lib/components/SearchInput.tsx</code> — debounced text
              input
            </li>
            <li>
              <code>./lib/components/PokemonCard.tsx</code> — sprite, name,
              types, height/weight
            </li>
            <li>
              <code>./lib/components/StatBar.tsx</code> — horizontal stat bar
              with label and value
            </li>
          </ul>

          <h3 className="font-bold text-lg mt-4 mb-2">
            Key concept: useEffect with fetch &amp; AbortController
          </h3>
          <p>
            When a dependency changes, React runs your effect again — but the
            previous fetch might still be in flight. Without cancellation, the
            old response can arrive <em>after</em> the new one, causing a{" "}
            <strong>race condition</strong>. <code>AbortController</code> solves
            this:
          </p>
          <pre className="bg-gray-800 text-gray-100 rounded p-2 mt-2 text-sm overflow-x-auto">
            {`useEffect(() => {
  const controller = new AbortController();
  fetch(url, { signal: controller.signal })
    .then(res => res.json())
    .then(setData)
    .catch(err => {
      if (err.name !== "AbortError") setError(err.message);
    });
  return () => controller.abort();
}, [url]);`}
          </pre>

          <h3 className="font-bold text-lg mt-4 mb-2">Hints</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>
              Convert the query to lowercase before fetching — the API expects
              lowercase names.
            </li>
            <li>
              When the input is empty, skip the fetch entirely and clear any
              displayed Pokemon.
            </li>
            <li>
              Catch <code>AbortError</code> separately — it's not a real error,
              just a cancelled request. Check{" "}
              <code>err.name !== "AbortError"</code>.
            </li>
            <li>
              For stat bars, a stat of 100 out of 255 is about 39% width — use{" "}
              <code>{`width: \`\${(stat / 255) * 100}%\``}</code>.
            </li>
          </ul>

          <p className="mt-4">
            <Link
              to="/challenges/04/example"
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
