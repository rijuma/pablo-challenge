import { useState } from "react";
import { useTheme } from "../hooks/useThemeContext";
import { useFontSize } from "../hooks/useFontSizeContext";

interface NoteEditorProps {
  onAdd: (text: string) => void;
}

export default function NoteEditor({ onAdd }: NoteEditorProps) {
  const [text, setText] = useState("");
  const { colors } = useTheme();
  const { fontClass } = useFontSize();

  const handleSubmit = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setText("");
  };

  return (
    <div className="flex flex-col gap-3">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a note..."
        rows={3}
        className={`w-full resize-none rounded-lg border p-3 outline-none transition-colors focus:ring-2 focus:ring-blue-400 ${colors.cardBg} ${colors.cardBorder} ${colors.text} ${fontClass}`}
      />
      <button
        onClick={handleSubmit}
        disabled={!text.trim()}
        className="self-end rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Add Note
      </button>
    </div>
  );
}
