import type { SolutionProps } from ".";
import ClockDisplay from "./lib/components/ClockDisplay";
import Greeting from "./lib/components/Greeting";
import { useClock } from "./lib/hooks/useClock";

// Challenge 03: Digital Clock — useEffect + Cleanup
//
// Your task: implement the useClock hook in ./lib/hooks/useClock.ts
// The ClockDisplay and Greeting components are already built for you!
//
// TODO Steps:
// 1. Open ./lib/hooks/useClock.ts and implement the hook:
//    - Use useState to store the current Date
//    - Use useEffect with setInterval to update every 1000ms
//    - Return a cleanup function that calls clearInterval
// 2. Add a useState for the 12h/24h toggle below
// 3. Wire up the toggle button

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

export function Solution({}: SolutionProps) {
  const now = useClock();
  const hour = now.getHours();

  // TODO: Add a useState for the 12h/24h toggle
  // const [use24h, setUse24h] = useState(false);

  return (
    <div
      className={`flex flex-col items-center gap-8 rounded-2xl bg-gradient-to-br ${getGradient(hour)} px-8 py-12 transition-all duration-1000`}
    >
      {/* The clock will be frozen until you implement useClock! */}
      <ClockDisplay date={now} use24h={false} />
      <Greeting hour={hour} />

      {/* TODO: Add a toggle button for 12h/24h format */}
      {/* <button
        onClick={() => setUse24h(prev => !prev)}
        className="rounded-full bg-white/20 px-5 py-2 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/30"
      >
        {use24h ? 'Switch to 12h' : 'Switch to 24h'}
      </button> */}
    </div>
  );
}
