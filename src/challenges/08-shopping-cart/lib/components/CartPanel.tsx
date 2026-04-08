import { useState } from "react";
import type { CartState, CartAction } from "../hooks/useCart";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";

interface CartPanelProps {
  open: boolean;
  onClose: () => void;
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  subtotal: number;
  discountAmount: number;
  total: number;
}

export default function CartPanel({
  open,
  onClose,
  state,
  dispatch,
  subtotal,
  discountAmount,
  total,
}: CartPanelProps) {
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState(false);

  const handleApplyCoupon = () => {
    const prevCoupon = state.coupon;
    dispatch({ type: "APPLY_COUPON", code: couponInput });
    if (
      !prevCoupon &&
      !["SAVE10", "SAVE20"].includes(couponInput.toUpperCase())
    ) {
      setCouponError(true);
      setTimeout(() => setCouponError(false), 2000);
    } else {
      setCouponInput("");
      setCouponError(false);
    }
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 transition-opacity"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 dark:bg-gray-900 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
            Shopping Cart
          </h2>
          <button
            onClick={onClose}
            className="rounded p-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {state.items.length === 0 ? (
            <p className="mt-12 text-center text-gray-400">
              Your cart is empty
            </p>
          ) : (
            state.items.map((item) => (
              <CartItem key={item.id} item={item} dispatch={dispatch} />
            ))
          )}
        </div>

        {state.items.length > 0 && (
          <div className="border-t border-gray-200 p-4 dark:border-gray-700">
            <div className="mb-4 flex gap-2">
              <input
                type="text"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                placeholder="Coupon code"
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
              />
              <button
                onClick={handleApplyCoupon}
                disabled={!couponInput.trim()}
                className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Apply
              </button>
            </div>
            {couponError && (
              <p className="mb-2 text-xs text-red-500">Invalid coupon code</p>
            )}
            {state.coupon && (
              <p className="mb-2 text-xs text-green-600 dark:text-green-400">
                Coupon {state.coupon} applied!
              </p>
            )}

            <OrderSummary
              subtotal={subtotal}
              discountAmount={discountAmount}
              total={total}
              coupon={state.coupon}
            />

            <button
              onClick={() => dispatch({ type: "CLEAR_CART" })}
              className="mt-4 w-full rounded-lg bg-red-500 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-600"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
