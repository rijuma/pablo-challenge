import { useEffect, useRef } from "react";
import type { Lap } from "../hooks/useStopwatch";

function formatTime(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const centiseconds = Math.floor((ms % 1000) / 10);

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(centiseconds).padStart(2, "0")}`;
}

interface LapTableProps {
  laps: Lap[];
}

export default function LapTable({ laps }: LapTableProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [laps]);

  if (laps.length === 0) return null;

  const deltas = laps.map((l) => l.delta);
  const fastestDelta = Math.min(...deltas);
  const slowestDelta = Math.max(...deltas);
  const showHighlight = laps.length >= 2;

  return (
    <div className="mx-auto w-full max-w-md">
      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
        Laps
      </h3>
      <div
        ref={scrollRef}
        className="max-h-52 overflow-y-auto rounded-lg border border-gray-200 dark:border-gray-700"
      >
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-3 py-2 text-left font-medium text-gray-600 dark:text-gray-400">
                #
              </th>
              <th className="px-3 py-2 text-left font-medium text-gray-600 dark:text-gray-400">
                Split
              </th>
              <th className="px-3 py-2 text-left font-medium text-gray-600 dark:text-gray-400">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {laps.map((lap) => {
              let rowClass = "";
              if (showHighlight && lap.delta === fastestDelta) {
                rowClass = "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400";
              } else if (showHighlight && lap.delta === slowestDelta) {
                rowClass = "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400";
              }

              return (
                <tr
                  key={lap.number}
                  className={`border-t border-gray-100 dark:border-gray-700 ${rowClass}`}
                >
                  <td className="px-3 py-1.5 font-mono">{lap.number}</td>
                  <td className="px-3 py-1.5 font-mono">
                    {formatTime(lap.delta)}
                  </td>
                  <td className="px-3 py-1.5 font-mono">
                    {formatTime(lap.time)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
