import ChallengeInstructions from "./example/instructions";
import { Solution } from "./solution";

export interface SolutionProps {}

export default function Challenge01() {
  return (
    <ChallengeInstructions>
      <Solution />
    </ChallengeInstructions>
  );
}
