import type { ReactNode } from "react"

interface FoldablePromptProps {
  children: ReactNode
}

export default function FoldablePrompt({ children }: FoldablePromptProps) {
  return (
    <details
      className="mb-6 rounded-lg border border-gray-200 px-4 dark:border-gray-700"
      open
    >
      <summary className="cursor-pointer py-3 font-semibold">
        Challenge Instructions
      </summary>
      <div className="p-4 leading-relaxed">{children}</div>
    </details>
  )
}
