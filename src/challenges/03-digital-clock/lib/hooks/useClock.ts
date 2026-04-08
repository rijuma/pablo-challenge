import { useState } from "react";

// TODO: Implement the useClock hook
// It should:
// 1. Create a state variable for the current date: useState(new Date())
// 2. Use useEffect to set up a setInterval that updates the date every 1000ms
// 3. Return a cleanup function that calls clearInterval
// 4. Return the current date
//
// Hint: The cleanup function prevents memory leaks when the component unmounts

export function useClock(): Date {
  const [now] = useState(new Date());
  // TODO: Add useEffect with setInterval here
  return now;
}
