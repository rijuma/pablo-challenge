interface FormFieldProps {
  label: string;
  type?: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}

export default function FormField({
  label,
  type = "text",
  value,
  error,
  onChange,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`rounded-lg border-2 bg-white px-4 py-2 text-gray-900 outline-none transition-colors dark:bg-gray-900 dark:text-gray-100 ${
          error
            ? "border-red-400 focus:border-red-500"
            : "border-gray-200 focus:border-indigo-400 dark:border-gray-700 dark:focus:border-indigo-500"
        }`}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
