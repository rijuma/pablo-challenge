import { useState } from "react";
import { Link } from "react-router-dom";
import Counter from "./lib/components/Counter";
import SummaryBar from "./lib/components/SummaryBar";

const LABELS = ["Counter A", "Counter B", "Counter C"];

export default function CounterDeluxe() {
  const [values, setValues] = useState([0, 0, 0]);

  const update = (index: number, fn: (v: number) => number) => {
    setValues((prev) => prev.map((v, i) => (i === index ? fn(v) : v)));
  };

  const maxValue = Math.max(...values);

  return (
    <div className="p-10">
      <Link
        to="/challenges/01"
        className="text-sm text-blue-500 hover:underline"
      >
        &larr; Back to Challenge
      </Link>
      <h1 className="mb-6 mt-2 text-3xl font-bold">
        Counter Deluxe &mdash; Example
      </h1>
      <div className="min-h-[200px] rounded-lg border-2 border-dashed border-gray-200 p-6 dark:border-gray-700">
        <div className="flex flex-col gap-6">
          <SummaryBar
            counters={LABELS.map((label, i) => ({ label, value: values[i] }))}
          />

          <div className="grid gap-6 sm:grid-cols-3">
            {LABELS.map((label, i) => (
              <Counter
                key={label}
                label={label}
                value={values[i]}
                isMax={values[i] === maxValue && maxValue !== 0}
                onIncrement={() => update(i, (v) => v + 1)}
                onDecrement={() => update(i, (v) => v - 1)}
                onReset={() => update(i, () => 0)}
              />
            ))}
          </div>

          <button
            onClick={() => setValues([0, 0, 0])}
            className="self-center rounded-lg bg-red-500 px-6 py-2 font-semibold text-white transition-colors hover:bg-red-600"
          >
            Reset All
          </button>
        </div>
      </div>
    </div>
  );
}
