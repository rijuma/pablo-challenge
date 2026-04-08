interface GreetingProps {
  hour: number;
}

function getGreeting(hour: number): string {
  if (hour >= 5 && hour < 12) return "Good morning";
  if (hour >= 12 && hour < 17) return "Good afternoon";
  if (hour >= 17 && hour < 21) return "Good evening";
  return "Good night";
}

function getEmoji(hour: number): string {
  if (hour >= 5 && hour < 12) return "☀️";
  if (hour >= 12 && hour < 17) return "🌤️";
  if (hour >= 17 && hour < 21) return "🌅";
  return "🌙";
}

export default function Greeting({ hour }: GreetingProps) {
  return (
    <p className="text-center text-2xl font-medium text-white/90">
      {getEmoji(hour)} {getGreeting(hour)}
    </p>
  );
}
