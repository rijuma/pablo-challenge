import { useState } from "react";
import type { SolutionProps } from ".";
import { useCart } from "./lib/hooks/useCart";
import ProductGrid from "./lib/components/ProductGrid";
import CartPanel from "./lib/components/CartPanel";

// Challenge 08: Shopping Cart
//
// Your task: Implement the cart reducer in ./lib/hooks/useCart.ts
//
// Key concept: useReducer manages complex state through a pure reducer function.
// Each action type maps to a specific state change. The reducer must be pure —
// no side effects, no API calls, just state in -> state out.
//
// The UI components and the useCart hook wrapper are already built.
// Focus on implementing the switch cases in cartReducer:
//   - ADD_ITEM: Add new product or increment existing quantity
//   - REMOVE_ITEM: Remove item by id
//   - INCREMENT / DECREMENT: Adjust quantity (remove at 0)
//   - CLEAR_CART: Reset everything
//   - APPLY_COUPON: Validate against COUPONS map

export function Solution({}: SolutionProps) {
  const { state, dispatch, subtotal, discountAmount, total, itemCount } =
    useCart();
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="relative">
      <ProductGrid
        onAddToCart={(product) => dispatch({ type: "ADD_ITEM", product })}
      />

      <button
        onClick={() => setCartOpen(true)}
        className="fixed right-6 bottom-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl text-white shadow-lg transition-transform hover:scale-110 hover:bg-blue-700"
        title="Open cart"
      >
        🛒
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
            {itemCount}
          </span>
        )}
      </button>

      <CartPanel
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        state={state}
        dispatch={dispatch}
        subtotal={subtotal}
        discountAmount={discountAmount}
        total={total}
      />
    </div>
  );
}
