import {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from "react";

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

function teamReducer(state: TeamState, action: TeamAction): TeamState {
  switch (action.type) {
    case "ADD_POKEMON": {
      if (state.team.length >= 6) return state;
      if (state.team.some((p) => p.id === action.payload.id)) return state;
      return { ...state, team: [...state.team, action.payload] };
    }
    case "REMOVE_POKEMON":
      return {
        ...state,
        team: state.team.filter((p) => p.id !== action.payload),
      };
    case "SET_TEAM_NAME":
      return { ...state, teamName: action.payload };
  }
}

interface TeamContextValue {
  state: TeamState;
  dispatch: React.Dispatch<TeamAction>;
}

const TeamContext = createContext<TeamContextValue | null>(null);

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

export function useTeam(): TeamContextValue {
  const ctx = useContext(TeamContext);
  if (!ctx) throw new Error("useTeam must be used within a TeamProvider");
  return ctx;
}

export type { Pokemon, TeamState, TeamAction };
