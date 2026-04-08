import { createContext, useContext, useState, type ReactNode } from "react";

export type FontSize = "small" | "medium" | "large";

const fontSizeMap: Record<FontSize, string> = {
  small: "text-sm",
  medium: "text-base",
  large: "text-lg",
};

interface FontSizeContextValue {
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  fontClass: string;
}

const FontSizeContext = createContext<FontSizeContextValue | null>(null);

export function FontSizeProvider({ children }: { children: ReactNode }) {
  const [fontSize, setFontSize] = useState<FontSize>("medium");

  return (
    <FontSizeContext.Provider
      value={{ fontSize, setFontSize, fontClass: fontSizeMap[fontSize] }}
    >
      {children}
    </FontSizeContext.Provider>
  );
}

export function useFontSize(): FontSizeContextValue {
  const ctx = useContext(FontSizeContext);
  if (!ctx)
    throw new Error("useFontSize must be used within a FontSizeProvider");
  return ctx;
}
