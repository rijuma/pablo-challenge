// TODO: Wrap this component in React.memo to prevent unnecessary re-renders
//
// React.memo is a higher-order component that memoizes the rendered output.
// It only re-renders when its props change (shallow comparison).
//
// Without memo, this card re-renders every time the parent re-renders
// (e.g., when filters change), even if its own props haven't changed.
// The render count badge (R:N) lets you observe this behavior.
//
// To fix it: wrap the function with memo() from React.
// Example: export default memo(function MyComponent(props) { ... });

import type { Character } from "../hooks/useCharacters";
import { useRenderCount } from "../hooks/useRenderCount";

const statusColor: Record<string, string> = {
  Alive: "bg-green-500",
  Dead: "bg-red-500",
  unknown: "bg-gray-400",
};

interface CharacterCardProps {
  character: Character;
}

export default function CharacterCard({ character }: CharacterCardProps) {
  const renderCount = useRenderCount();

  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <span className="absolute right-2 top-2 z-10 rounded-full bg-blue-600 px-2 py-0.5 text-[10px] font-bold text-white shadow">
        R:{renderCount}
      </span>

      <img
        src={character.image}
        alt={character.name}
        className="h-48 w-full object-cover"
        loading="lazy"
      />

      <div className="p-3">
        <h3 className="truncate text-sm font-semibold text-gray-900 dark:text-gray-100">
          {character.name}
        </h3>

        <div className="mt-1 flex items-center gap-1.5">
          <span
            className={`inline-block h-2.5 w-2.5 rounded-full ${statusColor[character.status] ?? "bg-gray-400"}`}
          />
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {character.status} &middot; {character.species}
          </span>
        </div>

        <p className="mt-1.5 truncate text-xs text-gray-400 dark:text-gray-500">
          {character.location.name}
        </p>
      </div>
    </div>
  );
}
