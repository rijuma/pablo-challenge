import { createContext, useContext, useState, type ReactNode } from "react";

// TODO: Implement the Theme Context pattern
//
// Key concept: Context lets you pass data through the component tree
// without prop drilling. The pattern is:
//   1. createContext() — creates the context object
//   2. Provider component — holds state, wraps children with Context.Provider
//   3. Custom hook (useTheme) — calls useContext internally, throws if outside provider
//
// Steps:
//   1. Create ThemeContext with createContext<ThemeContextValue | null>(null)
//   2. In ThemeProvider, use useState to track the current theme
//   3. Look up colors from themeMap based on current theme
//   4. Pass { theme, setTheme, colors } through the Provider's value
//   5. In useTheme, call useContext and throw if null (used outside provider)

export type Theme = "light" | "dark" | "solarized";

interface ThemeColors {
  bg: string;
  text: string;
  accent: string;
  cardBg: string;
  cardBorder: string;
}

const themeMap: Record<Theme, ThemeColors> = {
  light: {
    bg: "bg-white",
    text: "text-gray-900",
    accent: "text-blue-600",
    cardBg: "bg-gray-50",
    cardBorder: "border-gray-200",
  },
  dark: {
    bg: "bg-gray-900",
    text: "text-gray-100",
    accent: "text-purple-400",
    cardBg: "bg-gray-800",
    cardBorder: "border-gray-700",
  },
  solarized: {
    bg: "bg-[#fdf6e3]",
    text: "text-[#657b83]",
    accent: "text-[#b58900]",
    cardBg: "bg-[#eee8d5]",
    cardBorder: "border-[#93a1a1]",
  },
};

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  colors: ThemeColors;
}

// TODO: Replace this hardcoded context with a real one using createContext
const ThemeContext = createContext<ThemeContextValue | null>(null);

// TODO: Implement ThemeProvider — use useState for the theme,
// look up colors from themeMap, pass everything through Provider value
export function ThemeProvider({ children }: { children: ReactNode }) {
  // Hardcoded defaults so the app compiles — replace with real state
  const [theme] = useState<Theme>("light");

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme: () => {}, colors: themeMap[theme] }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// TODO: Implement useTheme — call useContext(ThemeContext),
// throw an error if the value is null (used outside provider)
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
