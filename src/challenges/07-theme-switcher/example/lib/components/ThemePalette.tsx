import { useState } from "react";
import { useTheme, type Theme } from "../hooks/useThemeContext";
import { useFontSize, type FontSize } from "../hooks/useFontSizeContext";

const themes: { value: Theme; label: string; preview: string }[] = [
  { value: "light", label: "Light", preview: "bg-white border-gray-300" },
  { value: "dark", label: "Dark", preview: "bg-gray-900 border-gray-600" },
  {
    value: "solarized",
    label: "Solarized",
    preview: "bg-[#fdf6e3] border-[#b58900]",
  },
];

const fontSizes: { value: FontSize; label: string }[] = [
  { value: "small", label: "A" },
  { value: "medium", label: "A" },
  { value: "large", label: "A" },
];

const fontSizeTextClass: Record<FontSize, string> = {
  small: "text-xs",
  medium: "text-base",
  large: "text-xl",
};

export default function ThemePalette() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme, colors } = useTheme();
  const { fontSize, setFontSize } = useFontSize();

  return (
    <div className="fixed right-6 bottom-6 z-50">
      {open && (
        <div
          className={`mb-3 w-56 rounded-xl border p-4 shadow-xl ${colors.cardBg} ${colors.cardBorder} ${colors.text}`}
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide opacity-60">
            Theme
          </p>
          <div className="mb-4 flex gap-2">
            {themes.map((t) => (
              <button
                key={t.value}
                onClick={() => setTheme(t.value)}
                className={`h-8 w-8 rounded-full border-2 transition-transform ${t.preview} ${
                  theme === t.value ? "scale-125 ring-2 ring-blue-400" : ""
                }`}
                title={t.label}
              />
            ))}
          </div>

          <p className="mb-2 text-xs font-semibold uppercase tracking-wide opacity-60">
            Font Size
          </p>
          <div className="flex gap-2">
            {fontSizes.map((f) => (
              <button
                key={f.value}
                onClick={() => setFontSize(f.value)}
                className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-colors ${fontSizeTextClass[f.value]} ${
                  fontSize === f.value
                    ? "border-blue-400 bg-blue-100 font-bold text-blue-700"
                    : `${colors.cardBorder} hover:opacity-80`
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-xl text-white shadow-lg transition-transform hover:scale-110 hover:bg-blue-700"
        title="Theme settings"
      >
        🎨
      </button>
    </div>
  );
}
