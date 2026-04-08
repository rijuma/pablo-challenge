import { useState } from "react";
import type { SolutionProps } from ".";
import { ThemeProvider, useTheme } from "./lib/hooks/useThemeContext";
import { FontSizeProvider } from "./lib/hooks/useFontSizeContext";
import ThemePalette from "./lib/components/ThemePalette";
import NoteEditor from "./lib/components/NoteEditor";
import NoteCard from "./lib/components/NoteCard";

// Challenge 07: Theme Switcher Notes App
//
// Your task: Implement the context hooks in:
//   - ./lib/hooks/useThemeContext.tsx
//   - ./lib/hooks/useFontSizeContext.tsx
//
// Key concept: Context API pattern:
//   1. createContext() to create the context
//   2. Provider component that holds state with useState and wraps children
//   3. Custom hooks (useTheme / useFontSize) that call useContext internally
//      and throw an error if used outside the provider
//
// The UI components are already built. Focus on making the contexts work
// so ThemePalette can change themes and font sizes across the entire app.

interface Note {
  id: number;
  text: string;
  createdAt: string;
}

function NotesApp() {
  const [notes, setNotes] = useState<Note[]>([]);
  const { colors } = useTheme();
  let nextId = 0;

  const addNote = (text: string) => {
    setNotes((prev) => [
      {
        id: Date.now() + nextId++,
        text,
        createdAt: new Date().toLocaleString(),
      },
      ...prev,
    ]);
  };

  const deleteNote = (id: number) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div
      className={`min-h-[400px] rounded-xl p-6 transition-colors ${colors.bg} ${colors.text}`}
    >
      <h2 className={`mb-6 text-xl font-bold ${colors.accent}`}>My Notes</h2>

      <NoteEditor onAdd={addNote} />

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            id={note.id}
            text={note.text}
            createdAt={note.createdAt}
            onDelete={deleteNote}
          />
        ))}
      </div>

      {notes.length === 0 && (
        <p className="mt-8 text-center opacity-40">
          No notes yet. Write something above!
        </p>
      )}

      <ThemePalette />
    </div>
  );
}

export function Solution({}: SolutionProps) {
  // TODO: The providers are already wrapping the app below.
  // Your job is to make them actually work by implementing the
  // context pattern inside useThemeContext.tsx and useFontSizeContext.tsx
  return (
    <ThemeProvider>
      <FontSizeProvider>
        <NotesApp />
      </FontSizeProvider>
    </ThemeProvider>
  );
}
