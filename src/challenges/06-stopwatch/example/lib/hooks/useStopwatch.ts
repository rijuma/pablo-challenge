import { useCallback, useRef, useState } from "react";

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

  const start = useCallback(() => {
    if (intervalRef.current) return;
    setIsRunning(true);
    startTimeRef.current = Date.now();

    intervalRef.current = setInterval(() => {
      setTime(accumulatedRef.current + (Date.now() - startTimeRef.current));
    }, 10);
  }, []);

  const pause = useCallback(() => {
    if (!intervalRef.current) return;
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    accumulatedRef.current += Date.now() - startTimeRef.current;
    setTime(accumulatedRef.current);
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    accumulatedRef.current = 0;
    startTimeRef.current = 0;
    setTime(0);
    setLaps([]);
    setIsRunning(false);
  }, []);

  const lap = useCallback(() => {
    const currentTime =
      accumulatedRef.current +
      (intervalRef.current ? Date.now() - startTimeRef.current : 0);

    setLaps((prev) => {
      const lastLapTime = prev.length > 0 ? prev[prev.length - 1].time : 0;
      return [
        ...prev,
        {
          number: prev.length + 1,
          time: currentTime,
          delta: currentTime - lastLapTime,
        },
      ];
    });
  }, []);

  return { time, laps, isRunning, start, pause, reset, lap };
}
