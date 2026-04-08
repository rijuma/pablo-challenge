interface SummaryBarProps {
  counters: { label: string; value: number }[];
}

export default function SummaryBar({ counters }: SummaryBarProps) {
  const total = counters.reduce((sum, c) => sum + c.value, 0);
  const maxValue = Math.max(...counters.map((c) => c.value));

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-gray-100 px-6 py-4 dark:bg-gray-800">
      <div className="flex items-center gap-6">
        {counters.map((c) => (
          <span
            key={c.label}
            className={`text-sm font-medium ${
              c.value === maxValue && maxValue !== 0
                ? "text-indigo-600 dark:text-indigo-400"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {c.label}:{" "}
            <span className="font-bold tabular-nums">{c.value}</span>
            {c.value === maxValue && maxValue !== 0 && " ★"}
          </span>
        ))}
      </div>
      <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
        Total: <span className="tabular-nums">{total}</span>
      </span>
    </div>
  );
}
