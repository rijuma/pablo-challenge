import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import ChallengeShell from "../../../components/ChallengeShell";

interface Props {
  children: ReactNode;
}

export default function ChallengeInstructions({ children }: Props) {
  return (
    <ChallengeShell
      title="Shopping Cart"
      difficulty="advanced"
      concepts={["useReducer"]}
      prompt={
        <>
          <h3 className="font-bold text-lg mb-2">Goal</h3>
          <p>
            Build a product grid with a slide-out cart panel. Products can be
            added to the cart, quantities adjusted, items removed, and coupon
            codes applied. All cart state is managed with{" "}
            <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">
              useReducer
            </code>
            .
          </p>

          <h3 className="font-bold text-lg mt-4 mb-2">Step-by-Step</h3>
          <ol className="list-decimal list-inside space-y-1">
            <li>
              Create a hardcoded product array (8-10 items with id, name, price,
              and emoji).
            </li>
            <li>Define your cart state shape and action types (see below).</li>
            <li>
              Write the reducer function — a pure function that receives state +
              action and returns new state.
            </li>
            <li>
              Build a product grid that displays all products with an "Add to
              Cart" button.
            </li>
            <li>
              Build a slide-out cart panel with quantity controls (+/-), remove,
              and clear.
            </li>
            <li>
              Build an order summary showing subtotal, discount, and total.
            </li>
            <li>Add a coupon code input field.</li>
          </ol>

          <h3 className="font-bold text-lg mt-4 mb-2">State Shape</h3>
          <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm overflow-x-auto">
            {`{
  items: CartItem[],       // { product, quantity }
  coupon: {
    code: string,
    discount: number       // 0.1 = 10%, 0.2 = 20%
  } | null
}`}
          </pre>

          <h3 className="font-bold text-lg mt-4 mb-2">
            Actions (Discriminated Union)
          </h3>
          <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm overflow-x-auto">
            {`| { type: "ADD_ITEM";     payload: Product }
| { type: "REMOVE_ITEM";  payload: { id: number } }
| { type: "INCREMENT";    payload: { id: number } }
| { type: "DECREMENT";    payload: { id: number } }
| { type: "CLEAR_CART" }
| { type: "APPLY_COUPON"; payload: { code: string } }`}
          </pre>

          <h3 className="font-bold text-lg mt-4 mb-2">Coupon Codes</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>"SAVE10"</strong> — 10% off
            </li>
            <li>
              <strong>"SAVE20"</strong> — 20% off
            </li>
          </ul>

          <h3 className="font-bold text-lg mt-4 mb-2">
            Suggested File Structure
          </h3>
          <ul className="list-disc list-inside space-y-1 font-mono text-sm">
            <li>./lib/hooks/useCart.ts</li>
            <li>./lib/components/ProductGrid.tsx</li>
            <li>./lib/components/ProductCard.tsx</li>
            <li>./lib/components/CartPanel.tsx</li>
            <li>./lib/components/CartItem.tsx</li>
            <li>./lib/components/OrderSummary.tsx</li>
          </ul>

          <h3 className="font-bold text-lg mt-4 mb-2">
            Key Concept:{" "}
            <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">
              useReducer
            </code>
          </h3>
          <p>
            <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">
              useReducer
            </code>{" "}
            is like{" "}
            <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">
              useState
            </code>{" "}
            but for complex state logic. Instead of calling{" "}
            <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">
              setState
            </code>{" "}
            directly, you{" "}
            <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">
              dispatch
            </code>{" "}
            actions — the reducer function decides how state changes. This keeps
            state transitions predictable and testable.
          </p>

          <h3 className="font-bold text-lg mt-4 mb-2">Hints</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>Derive, don't store</strong> — subtotal, discount amount,
              and total should be computed from state, not stored in the
              reducer.
            </li>
            <li>
              When adding an item that already exists in the cart, increment its
              quantity instead of adding a duplicate.
            </li>
            <li>
              When decrementing to 0, remove the item from the cart entirely.
            </li>
            <li>
              The reducer is a pure function — no side effects, no API calls.
              Given the same state and action, it always returns the same
              result.
            </li>
          </ul>

          <p className="mt-4">
            <Link
              to="/challenges/08/example"
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
