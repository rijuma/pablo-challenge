import { createContext, useContext, useState, type ReactNode } from "react";

// TODO: Implement the FontSize Context pattern
//
// This follows the same pattern as useThemeContext:
//   1. createContext() for the FontSize context
//   2. FontSizeProvider component with useState
//   3. useFontSize hook that calls useContext and throws if outside provider
//
// Steps:
//   1. Create FontSizeContext with createContext<FontSizeContextValue | null>(null)
//   2. In FontSizeProvider, use useState<FontSize>("medium")
//   3. Look up fontClass from fontSizeMap based on current fontSize
//   4. Pass { fontSize, setFontSize, fontClass } through Provider value
//   5. In useFontSize, call useContext and throw if null

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

// TODO: Replace this hardcoded context with a real one using createContext
const FontSizeContext = createContext<FontSizeContextValue | null>(null);

// TODO: Implement FontSizeProvider — use useState for fontSize,
// look up fontClass from fontSizeMap, pass everything through Provider value
export function FontSizeProvider({ children }: { children: ReactNode }) {
  // Hardcoded defaults so the app compiles — replace with real state
  const [fontSize] = useState<FontSize>("medium");

  return (
    <FontSizeContext.Provider
      value={{ fontSize, setFontSize: () => {}, fontClass: fontSizeMap[fontSize] }}
    >
      {children}
    </FontSizeContext.Provider>
  );
}

// TODO: Implement useFontSize — call useContext(FontSizeContext),
// throw an error if the value is null (used outside provider)
export function useFontSize(): FontSizeContextValue {
  const ctx = useContext(FontSizeContext);
  if (!ctx)
    throw new Error("useFontSize must be used within a FontSizeProvider");
  return ctx;
}
