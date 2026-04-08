export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface ChallengeInfo {
  id: string;
  title: string;
  path: string;
  difficulty: Difficulty;
  concepts: string[];
}

export const challenges: ChallengeInfo[] = [
  {
    id: "01",
    title: "Counter Deluxe",
    path: "/challenges/01",
    difficulty: "beginner",
    concepts: ["useState"],
  },
  {
    id: "02",
    title: "Signup Form",
    path: "/challenges/02",
    difficulty: "beginner",
    concepts: ["useState", "controlled inputs"],
  },
  {
    id: "03",
    title: "Digital Clock",
    path: "/challenges/03",
    difficulty: "beginner",
    concepts: ["useEffect", "cleanup"],
  },
  {
    id: "04",
    title: "Pokedex Search",
    path: "/challenges/04",
    difficulty: "intermediate",
    concepts: ["useEffect", "fetch", "AbortController"],
  },
  {
    id: "05",
    title: "User Dashboard",
    path: "/challenges/05",
    difficulty: "intermediate",
    concepts: ["custom hooks", "generics"],
  },
  {
    id: "06",
    title: "Stopwatch",
    path: "/challenges/06",
    difficulty: "intermediate",
    concepts: ["useRef"],
  },
  {
    id: "07",
    title: "Theme Switcher",
    path: "/challenges/07",
    difficulty: "intermediate",
    concepts: ["createContext", "useContext"],
  },
  {
    id: "08",
    title: "Shopping Cart",
    path: "/challenges/08",
    difficulty: "advanced",
    concepts: ["useReducer"],
  },
  {
    id: "09",
    title: "Rick & Morty Catalog",
    path: "/challenges/09",
    difficulty: "advanced",
    concepts: ["useMemo", "useCallback", "React.memo"],
  },
  {
    id: "10",
    title: "Pokemon Team Builder",
    path: "/challenges/10",
    difficulty: "advanced",
    concepts: ["capstone"],
  },
];
