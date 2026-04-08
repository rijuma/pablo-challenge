import { useState } from "react";
import { Link } from "react-router-dom";
import ClockDisplay from "./lib/components/ClockDisplay";
import Greeting from "./lib/components/Greeting";
import useClock from "./lib/hooks/useClock";

function getGradient(hour: number): string {
  if (hour >= 5 && hour < 8)
    return "from-orange-400 via-pink-400 to-purple-500";
  if (hour >= 8 && hour < 12) return "from-sky-400 via-blue-400 to-indigo-500";
  if (hour >= 12 && hour < 17)
    return "from-cyan-400 via-blue-500 to-indigo-600";
  if (hour >= 17 && hour < 21)
    return "from-orange-500 via-rose-500 to-purple-700";
  return "from-indigo-900 via-purple-900 to-gray-900";
}

export default function DigitalClock() {
  const now = useClock();
  const [use24h, setUse24h] = useState(false);
  const hour = now.getHours();

  return (
    <div className="p-10">
      <Link
        to="/challenges/03"
        className="text-sm text-blue-500 hover:underline"
      >
        &larr; Back to Challenge
      </Link>
      <h1 className="mb-6 mt-2 text-3xl font-bold">
        Digital Clock &mdash; Example
      </h1>
      <div className="min-h-[200px] rounded-lg border-2 border-dashed border-gray-200 p-6 dark:border-gray-700">
        <div
          className={`flex flex-col items-center gap-8 rounded-2xl bg-gradient-to-br ${getGradient(hour)} px-8 py-12 transition-all duration-1000`}
        >
          <ClockDisplay date={now} use24h={use24h} />
          <Greeting hour={hour} />
          <button
            onClick={() => setUse24h((prev) => !prev)}
            className="rounded-full bg-white/20 px-5 py-2 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/30"
          >
            {use24h ? "Switch to 12h" : "Switch to 24h"}
          </button>
        </div>
      </div>
    </div>
  );
}
