import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import ChallengeShell from "../../../components/ChallengeShell";

interface Props {
  children: ReactNode;
}

export default function ChallengeInstructions({ children }: Props) {
  return (
    <ChallengeShell
      title="Digital Clock"
      difficulty="beginner"
      concepts={["useEffect", "cleanup"]}
      prompt={
        <>
          <h3 className="font-bold text-lg mb-2">Goal</h3>
          <p>
            Build a <strong>live digital clock</strong> that updates every
            second. Include a <strong>12h/24h format toggle</strong>, a{" "}
            <strong>time-of-day greeting</strong> below the clock, and a{" "}
            <strong>background gradient</strong> that shifts based on the
            current hour.
          </p>

          <h3 className="font-bold text-lg mt-4 mb-2">Step-by-step</h3>
          <ol className="list-decimal list-inside space-y-1">
            <li>
              Create a <code>useClock</code> custom hook that stores the current{" "}
              <code>Date</code> in state and updates it every second using{" "}
              <code>setInterval</code> inside <code>useEffect</code>.
            </li>
            <li>
              <strong>Return a cleanup function</strong> from the effect that
              calls <code>clearInterval</code> — this prevents memory leaks when
              the component unmounts.
            </li>
            <li>
              Store a <code>is24h</code> boolean in state. Use it to format the
              time display (e.g., <code>14:30</code> vs <code>2:30 PM</code>).
            </li>
            <li>
              Determine the greeting based on the hour:
              <ul className="list-disc list-inside ml-4 mt-1">
                <li>5–11 → Good morning</li>
                <li>12–16 → Good afternoon</li>
                <li>17–20 → Good evening</li>
                <li>21–4 → Good night</li>
              </ul>
            </li>
            <li>
              Pick a background gradient for each time-of-day range (warm
              yellows for morning, blues for night, etc.).
            </li>
          </ol>

          <h3 className="font-bold text-lg mt-4 mb-2">
            Suggested file structure
          </h3>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <code>./lib/hooks/useClock.ts</code> — custom hook returning the
              current <code>Date</code>, updated every second
            </li>
            <li>
              <code>./lib/components/ClockDisplay.tsx</code> — renders formatted
              time and the 12h/24h toggle
            </li>
            <li>
              <code>./lib/components/Greeting.tsx</code> — renders the greeting
              message
            </li>
          </ul>

          <h3 className="font-bold text-lg mt-4 mb-2">
            Key concept: useEffect cleanup
          </h3>
          <p>
            When you start an interval or subscription inside{" "}
            <code>useEffect</code>, React needs a way to tear it down. You do
            this by <strong>returning a cleanup function</strong>:
          </p>
          <pre className="bg-gray-800 text-gray-100 rounded p-2 mt-2 text-sm overflow-x-auto">
            {`useEffect(() => {
  const id = setInterval(() => {
    setNow(new Date());
  }, 1000);
  return () => clearInterval(id); // cleanup!
}, []);`}
          </pre>
          <p className="mt-2">
            React calls the cleanup when the component unmounts or before
            re-running the effect if dependencies change. Without it, intervals
            stack up and cause memory leaks.
          </p>

          <h3 className="font-bold text-lg mt-4 mb-2">Hints</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>
              Use <code>date.toLocaleTimeString()</code> or manual formatting
              with <code>getHours()</code>, <code>getMinutes()</code>,{" "}
              <code>getSeconds()</code>.
            </li>
            <li>
              Pad single-digit values with{" "}
              <code>String(n).padStart(2, "0")</code>.
            </li>
            <li>
              For 12h format: <code>hours % 12 || 12</code> gives the 12-hour
              value, and <code>hours &gt;= 12 ? "PM" : "AM"</code> gives the
              suffix.
            </li>
          </ul>

          <p className="mt-4">
            <Link
              to="/challenges/03/example"
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
