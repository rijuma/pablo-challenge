import { useState } from "react";
import { Link } from "react-router-dom";
import { ThemeProvider, useTheme } from "./lib/hooks/useThemeContext";
import { FontSizeProvider } from "./lib/hooks/useFontSizeContext";
import ThemePalette from "./lib/components/ThemePalette";
import NoteEditor from "./lib/components/NoteEditor";
import NoteCard from "./lib/components/NoteCard";

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

export default function Example07() {
  return (
    <ThemeProvider>
      <FontSizeProvider>
        <div className="p-10">
          <Link
            to="/challenges/07"
            className="text-sm text-blue-500 hover:underline"
          >
            ← Back to Challenge
          </Link>
          <h1 className="mb-6 mt-2 text-3xl font-bold">
            Theme Switcher — Example
          </h1>
          <div className="min-h-[200px] rounded-lg border-2 border-dashed border-gray-200 p-6 dark:border-gray-700">
            <NotesApp />
          </div>
        </div>
      </FontSizeProvider>
    </ThemeProvider>
  );
}
