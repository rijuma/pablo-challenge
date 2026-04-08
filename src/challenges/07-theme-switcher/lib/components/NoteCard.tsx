import { useTheme } from "../hooks/useThemeContext";
import { useFontSize } from "../hooks/useFontSizeContext";

interface NoteCardProps {
  id: number;
  text: string;
  createdAt: string;
  onDelete: (id: number) => void;
}

export default function NoteCard({
  id,
  text,
  createdAt,
  onDelete,
}: NoteCardProps) {
  const { colors } = useTheme();
  const { fontClass } = useFontSize();

  return (
    <div
      className={`group relative rounded-lg border p-4 transition-shadow hover:shadow-md ${colors.cardBg} ${colors.cardBorder}`}
    >
      <p className={`whitespace-pre-wrap ${colors.text} ${fontClass}`}>
        {text}
      </p>
      <p className="mt-2 text-xs opacity-50">{createdAt}</p>
      <button
        onClick={() => onDelete(id)}
        className="absolute top-2 right-2 rounded p-1 text-sm opacity-0 transition-opacity hover:bg-red-100 hover:text-red-600 group-hover:opacity-100"
        title="Delete note"
      >
        ✕
      </button>
    </div>
  );
}
