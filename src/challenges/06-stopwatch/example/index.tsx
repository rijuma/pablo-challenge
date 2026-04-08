import { Link } from "react-router-dom";
import Controls from "./lib/components/Controls";
import LapTable from "./lib/components/LapTable";
import StopwatchDisplay from "./lib/components/StopwatchDisplay";
import useStopwatch from "./lib/hooks/useStopwatch";

export default function Example06() {
  const { time, laps, isRunning, start, pause, reset, lap } = useStopwatch();

  return (
    <div className="p-10">
      <Link
        to="/challenges/06"
        className="text-sm text-blue-500 hover:underline"
      >
        ← Back to Challenge
      </Link>
      <h1 className="mb-6 mt-2 text-3xl font-bold">Stopwatch — Example</h1>
      <div className="min-h-[200px] rounded-lg border-2 border-dashed border-gray-200 p-6 dark:border-gray-700">
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
      </div>
    </div>
  );
}
