interface CompletionRingProps {
  percentage: number;
  size?: number;
}

export default function CompletionRing({
  percentage,
  size = 80,
}: CompletionRingProps) {
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const color =
    percentage === 100
      ? "text-green-500"
      : percentage >= 50
        ? "text-blue-500"
        : "text-amber-500";

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-gray-200 dark:text-gray-700"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={`transition-all duration-500 ${color}`}
        />
      </svg>
      <span className="absolute text-sm font-bold text-gray-700 dark:text-gray-300">
        {Math.round(percentage)}%
      </span>
    </div>
  );
}
