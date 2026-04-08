import { createContext, useContext, useState, type ReactNode } from "react";

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

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme, colors: themeMap[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
