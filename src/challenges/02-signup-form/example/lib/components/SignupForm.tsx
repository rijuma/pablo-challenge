import { useState } from "react";
import FormField from "./FormField";
import PasswordStrength from "./PasswordStrength";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = "Name is required";
  }

  if (!data.email.includes("@")) {
    errors.email = "Email must contain @";
  }

  if (data.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
}

export default function SignupForm() {
  const [data, setData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const errors = validate(data);
  const isValid = Object.keys(errors).length === 0;
  const touched = data.name || data.email || data.password || data.confirmPassword;

  const updateField = (field: keyof FormData) => (value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 py-8">
        <div className="text-5xl">✓</div>
        <h2 className="text-2xl font-bold text-green-600 dark:text-green-400">
          Account Created!
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Welcome, {data.name}!
        </p>
        <button
          onClick={() => {
            setData({ name: "", email: "", password: "", confirmPassword: "" });
            setSubmitted(false);
          }}
          className="rounded-lg bg-indigo-500 px-6 py-2 font-semibold text-white hover:bg-indigo-600"
        >
          Start Over
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-4">
      <FormField
        label="Name"
        value={data.name}
        error={touched ? errors.name : undefined}
        onChange={updateField("name")}
      />
      <FormField
        label="Email"
        type="email"
        value={data.email}
        error={touched ? errors.email : undefined}
        onChange={updateField("email")}
      />
      <FormField
        label="Password"
        type="password"
        value={data.password}
        error={touched ? errors.password : undefined}
        onChange={updateField("password")}
      />
      <PasswordStrength password={data.password} />
      <FormField
        label="Confirm Password"
        type="password"
        value={data.confirmPassword}
        error={touched ? errors.confirmPassword : undefined}
        onChange={updateField("confirmPassword")}
      />
      <button
        type="submit"
        disabled={!isValid}
        className="mt-2 rounded-lg bg-indigo-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Create Account
      </button>
    </form>
  );
}
