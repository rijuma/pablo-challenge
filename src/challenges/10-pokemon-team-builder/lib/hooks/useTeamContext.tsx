import {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from "react";

// TODO: Implement the Team Context (combines Context + useReducer)
//
// This is the capstone — it combines:
//   - createContext / useContext (from challenge 07)
//   - useReducer with a discriminated union of actions (from challenge 08)
//
// Steps:
//   1. Implement teamReducer:
//      - ADD_POKEMON: Add pokemon to team (max 6, no duplicates)
//      - REMOVE_POKEMON: Remove pokemon by id
//      - SET_TEAM_NAME: Update the team name string
//   2. Create TeamContext with createContext
//   3. TeamProvider: use useReducer(teamReducer, initialState), wrap children
//   4. useTeam: call useContext, throw if null

interface Pokemon {
  id: number;
  name: string;
  sprite: string;
  types: string[];
}

interface TeamState {
  team: Pokemon[];
  teamName: string;
}

type TeamAction =
  | { type: "ADD_POKEMON"; payload: Pokemon }
  | { type: "REMOVE_POKEMON"; payload: number }
  | { type: "SET_TEAM_NAME"; payload: string };

// TODO: Implement each case in the reducer
function teamReducer(state: TeamState, action: TeamAction): TeamState {
  switch (action.type) {
    case "ADD_POKEMON":
      // TODO: Check max team size (6) and prevent duplicates
      return state;
    case "REMOVE_POKEMON":
      // TODO: Filter out pokemon by id
      return state;
    case "SET_TEAM_NAME":
      // TODO: Update teamName
      return state;
  }
}

interface TeamContextValue {
  state: TeamState;
  dispatch: React.Dispatch<TeamAction>;
}

const TeamContext = createContext<TeamContextValue | null>(null);

// TODO: Implement the provider — use useReducer with teamReducer
export function TeamProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(teamReducer, {
    team: [],
    teamName: "",
  });

  return (
    <TeamContext.Provider value={{ state, dispatch }}>
      {children}
    </TeamContext.Provider>
  );
}

// TODO: Implement useTeam — call useContext, throw if outside provider
export function useTeam(): TeamContextValue {
  const ctx = useContext(TeamContext);
  if (!ctx) throw new Error("useTeam must be used within a TeamProvider");
  return ctx;
}

export type { Pokemon, TeamState, TeamAction };
