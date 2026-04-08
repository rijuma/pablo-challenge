import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import ChallengeShell from "../../../components/ChallengeShell";

interface Props {
  children: ReactNode;
}

export default function ChallengeInstructions({ children }: Props) {
  return (
    <ChallengeShell
      title="Stopwatch"
      difficulty="intermediate"
      concepts={["useRef"]}
      prompt={
        <>
          <h3 className="font-bold text-lg mb-2">Goal</h3>
          <p>
            Build a stopwatch with <strong>start</strong>,{" "}
            <strong>pause</strong>, <strong>reset</strong>, and{" "}
            <strong>lap</strong> buttons. Display time in{" "}
            <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">
              mm:ss.ms
            </code>{" "}
            format. Record laps in a scrollable list that auto-scrolls to the
            latest entry. Highlight the{" "}
            <span className="text-green-500">fastest lap in green</span> and{" "}
            <span className="text-red-500">slowest lap in red</span>. Show the
            split time (delta) between consecutive laps.
          </p>

          <h3 className="font-bold text-lg mt-4 mb-2">Step-by-Step</h3>
          <ol className="list-decimal list-inside space-y-1">
            <li>
              Create a{" "}
              <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">
                useStopwatch
              </code>{" "}
              hook that manages elapsed time, running state, and lap list.
            </li>
            <li>
              Use{" "}
              <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">
                setInterval
              </code>{" "}
              (every 10ms) to increment time while running. Store the interval
              ID in a{" "}
              <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">
                useRef
              </code>
              .
            </li>
            <li>
              Build a display component that formats milliseconds into mm:ss.ms.
            </li>
            <li>
              Build controls: Start/Pause toggles the timer, Reset clears
              everything, Lap records the current time.
            </li>
            <li>
              Build a lap table showing lap number, lap time (delta from
              previous), and total time.
            </li>
            <li>
              Use{" "}
              <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">
                Math.min
              </code>{" "}
              /{" "}
              <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">
                Math.max
              </code>{" "}
              on lap durations to find the fastest/slowest and highlight them.
            </li>
            <li>
              Auto-scroll the lap list container to the bottom when a new lap is
              added.
            </li>
          </ol>

          <h3 className="font-bold text-lg mt-4 mb-2">
            Suggested File Structure
          </h3>
          <ul className="list-disc list-inside space-y-1 font-mono text-sm">
            <li>./lib/hooks/useStopwatch.ts</li>
            <li>./lib/components/StopwatchDisplay.tsx</li>
            <li>./lib/components/LapTable.tsx</li>
            <li>./lib/components/Controls.tsx</li>
          </ul>

          <h3 className="font-bold text-lg mt-4 mb-2">
            Key Concept:{" "}
            <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">
              useRef
            </code>
          </h3>
          <p>
            <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">
              useRef
            </code>{" "}
            has two distinct uses:
          </p>
          <ol className="list-decimal list-inside space-y-1 mt-1">
            <li>
              <strong>Storing mutable values</strong> that persist across
              renders without causing re-renders. If you stored the interval ID
              in{" "}
              <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">
                useState
              </code>
              , changing it would trigger unnecessary re-renders.{" "}
              <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">
                useRef
              </code>{" "}
              is for mutable values that don't affect the UI.
            </li>
            <li>
              <strong>Accessing DOM elements</strong> directly. Use a{" "}
              <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">
                useRef&lt;HTMLDivElement&gt;
              </code>{" "}
              on the lap list container and call{" "}
              <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">
                ref.current.scrollTop = ref.current.scrollHeight
              </code>{" "}
              after adding a lap to auto-scroll.
            </li>
          </ol>

          <h3 className="font-bold text-lg mt-4 mb-2">Hints</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>
              Track time in milliseconds internally — only format for display.
            </li>
            <li>
              For lap deltas, subtract the previous lap's total time from the
              current total time.
            </li>
            <li>
              Only highlight fastest/slowest when there are 2+ laps (with 1 lap,
              it's both fastest and slowest).
            </li>
            <li>
              Remember to clear the interval on pause and on unmount (cleanup in{" "}
              <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">
                useEffect
              </code>
              ).
            </li>
          </ul>

          <p className="mt-4">
            <Link
              to="/challenges/06/example"
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
