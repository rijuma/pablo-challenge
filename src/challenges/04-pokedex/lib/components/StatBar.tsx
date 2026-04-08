interface StatBarProps {
  label: string;
  value: number;
  max?: number;
}

const statColors: Record<string, string> = {
  hp: "bg-red-500",
  attack: "bg-orange-500",
  defense: "bg-yellow-500",
  "special-attack": "bg-blue-500",
  "special-defense": "bg-green-500",
  speed: "bg-pink-500",
};

export default function StatBar({ label, value, max = 255 }: StatBarProps) {
  const percentage = Math.min((value / max) * 100, 100);
  const barColor = statColors[label] ?? "bg-gray-500";
  const displayLabel = label
    .replace("-", " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="flex items-center gap-2">
      <span className="w-28 shrink-0 text-right text-xs font-medium text-gray-600 dark:text-gray-400">
        {displayLabel}
      </span>
      <span className="w-8 text-right text-xs font-bold text-gray-800 dark:text-gray-200">
        {value}
      </span>
      <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColor}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
