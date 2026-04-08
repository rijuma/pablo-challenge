function formatTime(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const centiseconds = Math.floor((ms % 1000) / 10);

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(centiseconds).padStart(2, "0")}`;
}

interface StopwatchDisplayProps {
  time: number;
}

export default function StopwatchDisplay({ time }: StopwatchDisplayProps) {
  return (
    <div className="text-center font-mono text-6xl font-bold tracking-wider text-gray-900 dark:text-white">
      {formatTime(time)}
    </div>
  );
}
