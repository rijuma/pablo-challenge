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
      title="Pokemon Team Builder"
      difficulty="advanced"
      concepts={[
        "useReducer",
        "useContext",
        "useMemo",
        "useCallback",
        "useRef",
        "React.memo",
      ]}
      prompt={
        <>
          <h3 className="font-bold text-lg mb-2">Goal</h3>
          <p>
            This is the <strong>capstone challenge</strong> combining everything
            from challenges 01-09. Build a Pokemon Team Builder where you browse
            Pokemon in a paginated grid, view details in a modal, and build a
            team of up to 6 Pokemon with a team analysis panel.
          </p>

          <h3 className="font-bold text-lg mt-4 mb-2">Step-by-Step</h3>
          <ol className="list-decimal list-inside space-y-1">
            <li>
              Set up team state with{" "}
              <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">
                useReducer
              </code>{" "}
              +{" "}
              <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">
                createContext
              </code>{" "}
              (actions: ADD_POKEMON, REMOVE_POKEMON, SET_TEAM_NAME).
            </li>
            <li>Build a paginated Pokemon grid fetching from the list API.</li>
            <li>
              For each Pokemon in the grid, fetch its detail (sprite, types,
              stats).
            </li>
            <li>
              Click a card to open a detail modal with full stats, types, and an
              "Add to Team" button.
            </li>
            <li>
              Show a team bar at the bottom with 6 slots (filled or empty).
            </li>
            <li>
              Build a team analysis panel that uses useMemo to compute total
              stats and type coverage.
            </li>
            <li>
              Add a team name input. Use useRef to auto-focus the search input
              on mount.
            </li>
            <li>
              Wrap grid cards in React.memo and stabilize handlers with
              useCallback.
            </li>
          </ol>

          <h3 className="font-bold text-lg mt-4 mb-2">APIs</h3>
          <h4 className="font-semibold">List</h4>
          <p className="font-mono text-sm mb-1">
            {POKEAPI_URL}?limit=20&amp;offset=&#123;offset&#125;
          </p>
          <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm overflow-x-auto">
            {`{
  count: number,
  results: [{ name: string, url: string }]
  // The url contains the Pokemon ID, e.g.:
  // "https://pokeapi.co/api/v2/pokemon/25/"
}`}
          </pre>

          <h4 className="font-semibold mt-3">Detail</h4>
          <p className="font-mono text-sm mb-1">{POKEAPI_URL}/&#123;id&#125;</p>
          <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm overflow-x-auto">
            {`{
  id: number,
  name: string,
  sprites: { front_default: string },   // image URL
  types: [{ type: { name: string } }],  // e.g. "fire", "water"
  stats: [{
    base_stat: number,
    stat: { name: string }               // hp, attack, defense, etc.
  }],
  height: number,
  weight: number
}`}
          </pre>

          <h3 className="font-bold text-lg mt-4 mb-2">Architecture</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>useReducer + createContext</strong> for team state
              (ADD_POKEMON, REMOVE_POKEMON, SET_TEAM_NAME)
            </li>
            <li>
              <strong>Custom hooks</strong>:{" "}
              <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">
                usePokemonList(page)
              </code>{" "}
              and{" "}
              <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">
                usePokemonDetail(id)
              </code>
            </li>
            <li>
              <strong>React.memo</strong> on grid cards,{" "}
              <strong>useMemo</strong> for team analysis,{" "}
              <strong>useRef</strong> for auto-focus
            </li>
          </ul>

          <h3 className="font-bold text-lg mt-4 mb-2">
            Suggested File Structure
          </h3>
          <ul className="list-disc list-inside space-y-1 font-mono text-sm">
            <li>./lib/hooks/useTeamContext.tsx</li>
            <li>./lib/hooks/usePokemon.ts</li>
            <li>./lib/components/PokemonGrid.tsx</li>
            <li>./lib/components/PokemonMiniCard.tsx</li>
            <li>./lib/components/PokemonDetailModal.tsx</li>
            <li>./lib/components/TeamBar.tsx</li>
            <li>./lib/components/TeamAnalysis.tsx</li>
          </ul>

          <h3 className="font-bold text-lg mt-4 mb-2">Key Concept</h3>
          <p>
            This is a real mini-app. Think about: What state goes where? What
            should be in context vs local state? Where do you need optimization?
            Plan before you code!
          </p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>
              <strong>Context</strong> — team state (shared across grid, team
              bar, and analysis)
            </li>
            <li>
              <strong>Local state</strong> — search input, current page,
              selected Pokemon for modal
            </li>
            <li>
              <strong>Optimization</strong> — the grid can have 20+ cards; memo
              prevents re-rendering all of them when team state changes
            </li>
          </ul>

          <h3 className="font-bold text-lg mt-4 mb-2">Hints</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>
              Extract the Pokemon ID from the list URL:{" "}
              <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">
                url.split("/").filter(Boolean).pop()
              </code>
            </li>
            <li>
              For team analysis, use{" "}
              <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">
                useMemo
              </code>{" "}
              to compute aggregate stats (average HP, attack, etc.) and type
              coverage (how many unique types your team covers).
            </li>
            <li>
              Prevent adding duplicates or more than 6 Pokemon to the team.
            </li>
            <li>
              The sprite URL follows a pattern:{" "}
              <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">
                https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/&#123;id&#125;.png
              </code>{" "}
              — you can use this to show sprites in the grid without fetching
              each detail.
            </li>
            <li>
              This challenge combines everything. Take it one piece at a time.
            </li>
          </ul>

          <p className="mt-4">
            <Link
              to="/challenges/10/example"
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
