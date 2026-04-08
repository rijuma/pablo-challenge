import { Link } from "react-router-dom";
import SignupForm from "./lib/components/SignupForm";

export default function SignupFormChallenge() {
  return (
    <div className="p-10">
      <Link
        to="/challenges/02"
        className="text-sm text-blue-500 hover:underline"
      >
        &larr; Back to Challenge
      </Link>
      <h1 className="mb-6 mt-2 text-3xl font-bold">
        Signup Form &mdash; Example
      </h1>
      <div className="min-h-[200px] rounded-lg border-2 border-dashed border-gray-200 p-6 dark:border-gray-700">
        <SignupForm />
      </div>
    </div>
  );
}
