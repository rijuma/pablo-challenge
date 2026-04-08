type Strength = "weak" | "medium" | "strong";

interface PasswordStrengthProps {
  password: string;
}

function getStrength(password: string): Strength {
  if (password.length === 0) return "weak";

  const hasSpecialChar = /[^a-zA-Z0-9]/.test(password);

  if (password.length >= 12 || (password.length >= 8 && hasSpecialChar)) {
    return "strong";
  }
  if (password.length >= 8) {
    return "medium";
  }
  return "weak";
}

const strengthConfig: Record<
  Strength,
  { width: string; color: string; label: string }
> = {
  weak: { width: "w-1/3", color: "bg-red-500", label: "Weak" },
  medium: { width: "w-2/3", color: "bg-amber-500", label: "Medium" },
  strong: { width: "w-full", color: "bg-green-500", label: "Strong" },
};

export default function PasswordStrength({ password }: PasswordStrengthProps) {
  if (!password) return null;

  const strength = getStrength(password);
  const config = strengthConfig[strength];

  return (
    <div className="flex flex-col gap-1">
      <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className={`h-full rounded-full transition-all duration-300 ${config.width} ${config.color}`}
        />
      </div>
      <span className="text-xs text-gray-500 dark:text-gray-400">
        Strength: <span className="font-medium">{config.label}</span>
      </span>
    </div>
  );
}
