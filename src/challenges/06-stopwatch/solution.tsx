import type { SolutionProps } from ".";
import Controls from "./lib/components/Controls";
import LapTable from "./lib/components/LapTable";
import StopwatchDisplay from "./lib/components/StopwatchDisplay";
import useStopwatch from "./lib/hooks/useStopwatch";

// Challenge 06: Stopwatch
//
// Your task: Implement the useStopwatch hook in ./lib/hooks/useStopwatch.ts
//
// Key concept: useRef stores mutable values that persist across renders
// WITHOUT causing re-renders. Perfect for interval IDs.
//
// The UI components are already built for you. Focus on the hook logic:
//   1. start() — create a setInterval, store its ID in a ref
//   2. pause() — clear the interval using the ref
//   3. reset() — clear interval, reset all state
//   4. lap() — record current time and delta from previous lap

export function Solution({}: SolutionProps) {
  const { time, laps, isRunning, start, pause, reset, lap } = useStopwatch();

  return (
    <div className="flex flex-col items-center gap-6">
      <StopwatchDisplay time={time} />
      <Controls
        isRunning={isRunning}
        hasTime={time > 0}
        onStart={start}
        onPause={pause}
        onReset={reset}
        onLap={lap}
      />
      <LapTable laps={laps} />
    </div>
  );
}
