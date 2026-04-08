import type { SolutionProps } from ".";
// These components are ready to use — just uncomment the JSX below!
// import Counter from "./lib/components/Counter";
// import SummaryBar from "./lib/components/SummaryBar";

// Challenge 01: Counter Deluxe — useState
//
// Your task: manage state for three counters using useState.
// The Counter and SummaryBar components are already built for you in ./lib/components/
//
// TODO Steps:
// 1. Uncomment the imports above
// 2. Create a useState for the three counter values (e.g., an array [0, 0, 0])
// 3. Write handler functions: increment, decrement, and reset for each counter
// 4. Derive the max value from state to highlight the leading counter
// 5. Wire up the Counter components with the correct props
// 6. Pass counter data to SummaryBar (it calculates total and max internally)

// Uncomment when you're ready to use it:
// const LABELS = ["Alpha", "Beta", "Gamma"];

export function Solution({}: SolutionProps) {
  // TODO: Create state for three counter values
  // const [values, setValues] = useState([0, 0, 0]);

  // TODO: Create handler functions
  // const increment = (idx: number) => setValues(prev => prev.map((v, i) => i === idx ? v + 1 : v));
  // const decrement = (idx: number) => setValues(prev => prev.map((v, i) => i === idx ? v - 1 : v));
  // const reset = (idx: number) => setValues(prev => prev.map((v, i) => i === idx ? 0 : v));

  // TODO: Derive the max value
  // const maxValue = Math.max(...values);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* TODO: Map over LABELS and render a <Counter /> for each one */}
        {/* Example for one counter: */}
        {/* <Counter
          key={label}
          label={label}
          value={values[i]}
          isMax={values[i] === maxValue && maxValue !== 0}
          onIncrement={() => increment(i)}
          onDecrement={() => decrement(i)}
          onReset={() => reset(i)}
        /> */}
        <p className="col-span-full text-center text-gray-400">
          Wire up your Counter components here
        </p>
      </div>

      {/* TODO: Add SummaryBar with counter data */}
      {/* <SummaryBar counters={LABELS.map((label, i) => ({ label, value: values[i] }))} /> */}
    </div>
  );
}
