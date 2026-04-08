import { NavLink } from "react-router-dom";
import { challenges } from "../challenges";
import type { Difficulty } from "../challenges";

const badgeColors: Record<Difficulty, string> = {
  beginner: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  intermediate:
    "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
  advanced: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
};

export default function Sidebar() {
  return (
    <aside className="sticky top-0 h-screen w-70 min-w-70 overflow-y-auto border-r border-gray-200 p-4 dark:border-gray-700">
      <h2 className="mb-4 text-lg font-bold">React Challenges</h2>
      <nav>
        <ul className="m-0 list-none space-y-1 p-0">
          {challenges.map((c) => (
            <li key={c.id}>
              <NavLink
                to={c.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-md px-3 py-2 text-sm no-underline transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`
                }
              >
                <span className="min-w-5 font-mono text-xs opacity-60">
                  {c.id}
                </span>
                <span className="flex-1">{c.title}</span>
                <span
                  className={`rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase ${badgeColors[c.difficulty]}`}
                >
                  {c.difficulty.slice(0, 3)}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
