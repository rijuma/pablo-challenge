interface CounterProps {
  label: string;
  value: number;
  isMax: boolean;
  onIncrement: () => void;
  onDecrement: () => void;
  onReset: () => void;
}

export default function Counter({
  label,
  value,
  isMax,
  onIncrement,
  onDecrement,
  onReset,
}: CounterProps) {
  return (
    <div
      className={`flex flex-col items-center gap-3 rounded-xl border-2 p-6 transition-colors ${
        isMax
          ? "border-indigo-400 bg-indigo-50 dark:border-indigo-500 dark:bg-indigo-950"
          : "border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900"
      }`}
    >
      <span className="text-sm font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {label}
      </span>
      <span className="text-5xl font-bold tabular-nums text-gray-900 dark:text-gray-100">
        {value}
      </span>
      <div className="flex gap-2">
        <button
          onClick={onDecrement}
          className="rounded-lg bg-gray-200 px-4 py-2 font-semibold text-gray-700 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
        >
          −
        </button>
        <button
          onClick={onReset}
          className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
        >
          Reset
        </button>
        <button
          onClick={onIncrement}
          className="rounded-lg bg-indigo-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-indigo-600"
        >
          +
        </button>
      </div>
    </div>
  );
}
