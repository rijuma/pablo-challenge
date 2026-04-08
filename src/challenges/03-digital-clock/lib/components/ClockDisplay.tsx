interface ClockDisplayProps {
  date: Date;
  use24h: boolean;
}

export default function ClockDisplay({ date, use24h }: ClockDisplayProps) {
  const timeString = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: !use24h,
  });

  return (
    <div className="text-center">
      <span className="text-7xl font-bold tabular-nums tracking-tight text-white drop-shadow-lg sm:text-8xl">
        {timeString}
      </span>
      <p className="mt-2 text-lg text-white/70">
        {date.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
    </div>
  );
}
