import { useState, useRef, useCallback } from "react";

// TODO: Implement the useStopwatch hook using useRef
//
// Key concept: useRef stores mutable values that persist across renders
// WITHOUT causing re-renders. Perfect for interval IDs and accumulated time.
//
// 1. Use useRef to store the interval ID (so you can clear it later)
// 2. Use useRef to store the start timestamp and accumulated time
// 3. Use useState for: time (ms), laps (Lap[]), isRunning (boolean)
// 4. start(): Record Date.now(), set up setInterval that updates time every 10ms
// 5. pause(): Clear the interval, accumulate elapsed time
// 6. reset(): Clear interval, reset all refs and state
// 7. lap(): Record current time and compute delta from previous lap

export interface Lap {
  number: number;
  time: number;
  delta: number;
}

export default function useStopwatch() {
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState<Lap[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef(0);
  const accumulatedRef = useRef(0);

  // TODO: Implement start — store Date.now() in startTimeRef,
  // create setInterval that updates time, store interval ID in intervalRef
  const start = useCallback(() => {
    // TODO: Replace this with real implementation
    void intervalRef;
    void startTimeRef;
    void accumulatedRef;
    void setIsRunning;
    void setTime;
  }, []);

  // TODO: Implement pause — clear interval from intervalRef,
  // add elapsed time to accumulatedRef
  const pause = useCallback(() => {
    // TODO: Replace this with real implementation
  }, []);

  // TODO: Implement reset — clear interval, reset all refs to 0,
  // reset time to 0, clear laps, set isRunning to false
  const reset = useCallback(() => {
    // TODO: Replace this with real implementation
    void setLaps;
  }, []);

  // TODO: Implement lap — compute currentTime from accumulatedRef + elapsed,
  // calculate delta from previous lap, add new Lap to laps array
  const lap = useCallback(() => {
    // TODO: Replace this with real implementation
  }, []);

  return { time, laps, isRunning, start, pause, reset, lap };
}
