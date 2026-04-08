interface ControlsProps {
  isRunning: boolean;
  hasTime: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onLap: () => void;
}

export default function Controls({
  isRunning,
  hasTime,
  onStart,
  onPause,
  onReset,
  onLap,
}: ControlsProps) {
  return (
    <div className="flex justify-center gap-3">
      {isRunning ? (
        <button
          onClick={onPause}
          className="rounded-lg bg-amber-500 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-amber-600"
        >
          Pause
        </button>
      ) : (
        <button
          onClick={onStart}
          className="rounded-lg bg-green-500 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-green-600"
        >
          {hasTime ? "Resume" : "Start"}
        </button>
      )}

      {isRunning && (
        <button
          onClick={onLap}
          className="rounded-lg bg-blue-500 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-blue-600"
        >
          Lap
        </button>
      )}

      {hasTime && !isRunning && (
        <button
          onClick={onReset}
          className="rounded-lg bg-red-500 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-red-600"
        >
          Reset
        </button>
      )}
    </div>
  );
}
