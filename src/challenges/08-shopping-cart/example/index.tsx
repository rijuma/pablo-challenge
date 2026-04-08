import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "./lib/hooks/useCart";
import ProductGrid from "./lib/components/ProductGrid";
import CartPanel from "./lib/components/CartPanel";

export default function Example08() {
  const { state, dispatch, subtotal, discountAmount, total, itemCount } =
    useCart();
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="p-10">
      <Link
        to="/challenges/08"
        className="text-sm text-blue-500 hover:underline"
      >
        ← Back to Challenge
      </Link>
      <h1 className="mb-6 mt-2 text-3xl font-bold">
        Shopping Cart — Example
      </h1>
      <div className="min-h-[200px] rounded-lg border-2 border-dashed border-gray-200 p-6 dark:border-gray-700">
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
      </div>
    </div>
  );
}
