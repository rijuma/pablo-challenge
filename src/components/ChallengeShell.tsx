import type { ReactNode } from "react"
import type { Difficulty } from "../challenges"
import FoldablePrompt from "./FoldablePrompt"

interface ChallengeShellProps {
  title: string
  difficulty: Difficulty
  concepts: string[]
  prompt: ReactNode
  children: ReactNode
}

const difficultyColors: Record<Difficulty, string> = {
  beginner: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  intermediate:
    "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
  advanced: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
}

export default function ChallengeShell({
  title,
  difficulty,
  concepts,
  prompt,
  children,
}: ChallengeShellProps) {
  return (
    <div className="p-10">
      <h1 className="mb-1 text-3xl font-bold">{title}</h1>
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span
          className={`rounded px-2 py-0.5 text-xs font-semibold uppercase ${difficultyColors[difficulty]}`}
        >
          {difficulty}
        </span>
        {concepts.map((c) => (
          <span
            key={c}
            className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400"
          >
            {c}
          </span>
        ))}
      </div>
      <FoldablePrompt>{prompt}</FoldablePrompt>
      <div className="min-h-50 rounded-lg border-2 border-dashed border-gray-200 p-6 dark:border-gray-700">
        {children}
      </div>
    </div>
  )
}
