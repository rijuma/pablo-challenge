import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import ChallengeShell from "../../../components/ChallengeShell";

interface Props {
  children: ReactNode;
}

export default function ChallengeInstructions({ children }: Props) {
  return (
    <ChallengeShell
      title="Counter Deluxe"
      difficulty="beginner"
      concepts={["useState"]}
      prompt={
        <>
          <h3 className="font-bold text-lg mb-2">Goal</h3>
          <p>
            Build a counter dashboard with{" "}
            <strong>three independent counters</strong>. Each counter has{" "}
            <code>+</code>, <code>-</code>, and <code>Reset</code> buttons. A{" "}
            <strong>summary bar</strong> at the top shows the total of all
            counters and visually highlights whichever counter currently holds
            the highest value. Include a <strong>Reset All</strong> button that
            sets every counter back to zero.
          </p>

          <h3 className="font-bold text-lg mt-4 mb-2">Step-by-step</h3>
          <ol className="list-decimal list-inside space-y-1">
            <li>
              Store all three counter values in a single piece of state:{" "}
              <code>const [values, setValues] = useState([0, 0, 0])</code>.
            </li>
            <li>
              Create a <code>Counter</code> component that receives its current
              value, an <code>onChange</code> callback, and an{" "}
              <code>isHighest</code> flag.
            </li>
            <li>
              Derive the total with{" "}
              <code>values.reduce((a, b) =&gt; a + b, 0)</code> and the max with{" "}
              <code>Math.max(...values)</code> — do not store these in separate
              state.
            </li>
            <li>
              Build a <code>SummaryBar</code> that displays the total and
              highlights the counter(s) matching the max value.
            </li>
            <li>
              Wire the Reset All button to <code>setValues([0, 0, 0])</code>.
            </li>
          </ol>

          <h3 className="font-bold text-lg mt-4 mb-2">
            Suggested file structure
          </h3>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <code>./lib/components/Counter.tsx</code> — single counter with
              +/-/reset buttons
            </li>
            <li>
              <code>./lib/components/SummaryBar.tsx</code> — total display and
              max highlight
            </li>
          </ul>

          <h3 className="font-bold text-lg mt-4 mb-2">Key concept: useState</h3>
          <p>
            <code>useState</code> returns a value and a setter function. Calling
            the setter triggers a re-render with the new value. State should be
            the <strong>single source of truth</strong> — anything that can be
            computed from state (like totals and max) should be derived, not
            stored separately.
          </p>

          <h3 className="font-bold text-lg mt-4 mb-2">Hints</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>
              To update one counter immutably:{" "}
              <code>
                setValues(prev =&gt; prev.map((v, i) =&gt; i === index ? v + 1 :
                v))
              </code>
            </li>
            <li>
              Use <code>Math.max(...values)</code> to find the highest value,
              then compare each counter against it for the highlight.
            </li>
            <li>
              When all counters are 0, none (or all) can be highlighted — pick
              whichever feels right.
            </li>
          </ul>

          <p className="mt-4">
            <Link
              to="/challenges/01/example"
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
