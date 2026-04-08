import type { SolutionProps } from ".";
// These components are ready for you to use — uncomment when needed:
// import FormField from "./lib/components/FormField";
// import PasswordStrength from "./lib/components/PasswordStrength";

// Challenge 02: Signup Form — Controlled Inputs
//
// Your task: manage form state, validation, and event handlers.
// The FormField and PasswordStrength components are already built for you!
//
// TODO Steps:
// 1. Uncomment the imports above
// 2. Create a useState with an object for form data:
//    { name: '', email: '', password: '', confirmPassword: '' }
// 3. Write an updateField helper that returns an onChange handler:
//    const updateField = (field: keyof FormData) => (value: string) => { ... }
// 4. Write a validate function that derives errors from the current form data:
//    - Name: required (non-empty after trim)
//    - Email: must contain "@"
//    - Password: at least 8 characters
//    - Confirm password: must match password
// 5. Track whether the form has been touched (so errors only show after interaction)
// 6. Wire up the form submission with a submitted state

export interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export function Solution({}: SolutionProps) {
  // TODO: Create form state
  // const [data, setData] = useState<FormData>({ name: '', email: '', password: '', confirmPassword: '' });
  // const [submitted, setSubmitted] = useState(false);

  // TODO: Write a validate function that takes FormData and returns FormErrors
  // function validate(data: FormData): FormErrors { ... }

  // TODO: Derive errors and isValid from current state
  // const errors = validate(data);
  // const isValid = Object.keys(errors).length === 0;

  // TODO: Create updateField helper
  // const updateField = (field: keyof FormData) => (value: string) => {
  //   setData(prev => ({ ...prev, [field]: value }));
  // };

  // TODO: Handle form submission
  // const handleSubmit = (e: React.FormEvent) => { ... };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="mx-auto flex max-w-md flex-col gap-4"
    >
      {/* TODO: Add FormField components for each field */}
      {/* <FormField label="Name" value={data.name} error={errors.name} onChange={updateField('name')} /> */}
      {/* <FormField label="Email" type="email" value={data.email} error={errors.email} onChange={updateField('email')} /> */}
      {/* <FormField label="Password" type="password" value={data.password} error={errors.password} onChange={updateField('password')} /> */}
      {/* <PasswordStrength password={data.password} /> */}
      {/* <FormField label="Confirm Password" type="password" value={data.confirmPassword} error={errors.confirmPassword} onChange={updateField('confirmPassword')} /> */}

      <p className="text-center text-gray-400">
        Wire up your form fields here
      </p>

      <button
        type="submit"
        disabled
        className="mt-2 rounded-lg bg-indigo-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Create Account
      </button>
    </form>
  );
}
