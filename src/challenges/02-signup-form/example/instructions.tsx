import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import ChallengeShell from "../../../components/ChallengeShell";

interface Props {
  children: ReactNode;
}

export default function ChallengeInstructions({ children }: Props) {
  return (
    <ChallengeShell
      title="Signup Form"
      difficulty="beginner"
      concepts={["useState", "controlled inputs"]}
      prompt={
        <>
          <h3 className="font-bold text-lg mb-2">Goal</h3>
          <p>
            Build a multi-field signup form with{" "}
            <strong>real-time validation</strong> and a{" "}
            <strong>password strength meter</strong>. The submit button should
            be disabled until every field passes validation.
          </p>

          <h3 className="font-bold text-lg mt-4 mb-2">
            Fields &amp; validation rules
          </h3>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>Name</strong> — required, non-empty
            </li>
            <li>
              <strong>Email</strong> — must contain <code>@</code> and{" "}
              <code>.</code>
            </li>
            <li>
              <strong>Password</strong> — minimum 8 characters
            </li>
            <li>
              <strong>Confirm password</strong> — must exactly match the
              password field
            </li>
          </ul>

          <h3 className="font-bold text-lg mt-4 mb-2">
            Password strength meter
          </h3>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>Weak</strong> — fewer than 8 characters
            </li>
            <li>
              <strong>Medium</strong> — 8 to 12 characters
            </li>
            <li>
              <strong>Strong</strong> — more than 12 characters (bonus: award
              extra credit for including numbers or special characters)
            </li>
          </ul>

          <h3 className="font-bold text-lg mt-4 mb-2">Step-by-step</h3>
          <ol className="list-decimal list-inside space-y-1">
            <li>
              Store form data as a single object in state:{" "}
              <code>
                {"useState({ name: '', email: '', password: '', confirm: '' })"}
              </code>
            </li>
            <li>
              Create a reusable <code>FormField</code> component that renders a
              label, input, and error message.
            </li>
            <li>
              Derive validation errors from the current state — do not store
              errors in separate state. For example:{" "}
              <code>
                const emailError = !form.email.includes("@") ? "Invalid email" :
                ""
              </code>
            </li>
            <li>
              Build a <code>PasswordStrength</code> component that takes the
              password string and renders a colored bar (red/yellow/green).
            </li>
            <li>
              Disable the submit button unless all errors are empty and all
              fields are filled.
            </li>
          </ol>

          <h3 className="font-bold text-lg mt-4 mb-2">
            Suggested file structure
          </h3>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <code>./lib/components/FormField.tsx</code> — reusable label +
              input + error display
            </li>
            <li>
              <code>./lib/components/PasswordStrength.tsx</code> — strength
              meter bar
            </li>
            <li>
              <code>./lib/components/SignupForm.tsx</code> — form layout and
              state management
            </li>
          </ul>

          <h3 className="font-bold text-lg mt-4 mb-2">
            Key concept: Controlled components
          </h3>
          <p>
            A <strong>controlled input</strong> means the input's{" "}
            <code>value</code> prop comes from React state, and{" "}
            <code>onChange</code> updates that state. React state is the single
            source of truth — the DOM input never "owns" its own value. This
            makes validation and form submission predictable.
          </p>

          <h3 className="font-bold text-lg mt-4 mb-2">Hints</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>
              You can update one field immutably with:{" "}
              <code>{"setForm(prev => ({ ...prev, [field]: value }))"}</code>
            </li>
            <li>
              Show validation errors only after the user has touched a field
              (track a <code>touched</code> set or show errors on blur).
            </li>
            <li>
              Use regex like <code>/[0-9]/</code> and{" "}
              <code>/[^a-zA-Z0-9]/</code> to detect numbers and special
              characters for the strength bonus.
            </li>
          </ul>

          <p className="mt-4">
            <Link
              to="/challenges/02/example"
              className="text-blue-500 hover:underline"
            >
              View Example →
            </Link>
          </p>
        </>
      }
    >
      {children}
    </ChallengeShell>
  );
}
