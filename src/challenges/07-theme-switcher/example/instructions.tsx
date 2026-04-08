import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import ChallengeShell from "../../../components/ChallengeShell";

interface Props {
  children: ReactNode;
}

export default function ChallengeInstructions({ children }: Props) {
  return (
    <ChallengeShell
      title="Theme Switcher Notes App"
      difficulty="intermediate"
      concepts={["createContext", "useContext"]}
      prompt={
        <>
          <h3 className="font-bold text-lg mb-2">Goal</h3>
          <p>
            Build a note-taking app with two separate contexts:{" "}
            <strong>theme</strong> and <strong>font size</strong>. No prop
            drilling — deeply nested components consume context directly.
          </p>

          <h3 className="font-bold text-lg mt-4 mb-2">Step-by-Step</h3>
          <ol className="list-decimal list-inside space-y-1">
            <li>
              Create a ThemeContext with a provider that holds theme state and a
              toggle function.
            </li>
            <li>
              Create a FontSizeContext with a provider that holds font size
              state and a setter.
            </li>
            <li>
              Build a floating palette button that opens a panel to switch
              themes and font sizes.
            </li>
            <li>
              Build a NoteEditor component (textarea + "Add" button) that
              creates notes.
            </li>
            <li>
              Build NoteCard components that display each note, styled by the
              current theme and font size.
            </li>
            <li>
              Wrap everything in{" "}
              <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">
                &lt;ThemeProvider&gt;&lt;FontSizeProvider&gt;...&lt;/FontSizeProvider&gt;&lt;/ThemeProvider&gt;
              </code>
            </li>
          </ol>

          <h3 className="font-bold text-lg mt-4 mb-2">Theme Values</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>"light"</strong> — white background, dark text, blue
              accent
            </li>
            <li>
              <strong>"dark"</strong> — gray-900 background, light text, purple
              accent
            </li>
            <li>
              <strong>"solarized"</strong> — #fdf6e3 background, #657b83 text,
              #b58900 accent
            </li>
          </ul>

          <h3 className="font-bold text-lg mt-4 mb-2">Font Size Values</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>"small"</strong> — 14px
            </li>
            <li>
              <strong>"medium"</strong> — 16px
            </li>
            <li>
              <strong>"large"</strong> — 20px
            </li>
          </ul>

          <h3 className="font-bold text-lg mt-4 mb-2">
            Suggested File Structure
          </h3>
          <ul className="list-disc list-inside space-y-1 font-mono text-sm">
            <li>./lib/hooks/useThemeContext.tsx</li>
            <li>./lib/hooks/useFontSizeContext.tsx</li>
            <li>./lib/components/ThemePalette.tsx</li>
            <li>./lib/components/NoteEditor.tsx</li>
            <li>./lib/components/NoteCard.tsx</li>
          </ul>

          <h3 className="font-bold text-lg mt-4 mb-2">
            Key Concept: Context API
          </h3>
          <p>
            Context lets you pass data through the component tree without prop
            drilling. Each context needs a <strong>Provider</strong> (writes)
            and consumers via{" "}
            <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">
              useContext
            </code>{" "}
            (reads).
          </p>

          <h3 className="font-bold text-lg mt-4 mb-2">Pattern to Follow</h3>
          <ol className="list-decimal list-inside space-y-1">
            <li>
              Create the context with{" "}
              <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">
                createContext
              </code>
              .
            </li>
            <li>
              Create a Provider component that holds the state and wraps{" "}
              <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">
                children
              </code>
              .
            </li>
            <li>
              Create a custom{" "}
              <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">
                useTheme()
              </code>{" "}
              hook that calls{" "}
              <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">
                useContext
              </code>{" "}
              internally — throw an error if used outside the provider.
            </li>
            <li>
              Wrap your app in the providers. Deeply nested components
              (NoteCard, NoteEditor) call{" "}
              <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">
                useTheme()
              </code>{" "}
              directly — no need to pass theme as props. That's the whole point
              of context.
            </li>
          </ol>

          <h3 className="font-bold text-lg mt-4 mb-2">Hints</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>
              Store notes in local state (an array of{" "}
              <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">
                {"{ id, text, createdAt }"}
              </code>
              ).
            </li>
            <li>
              Use inline styles or dynamic class names to apply theme colors and
              font sizes.
            </li>
            <li>
              The palette can be a floating button in the corner that toggles a
              settings panel.
            </li>
          </ul>

          <p className="mt-4">
            <Link
              to="/challenges/07/example"
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
