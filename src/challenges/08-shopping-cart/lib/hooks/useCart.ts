import { useReducer } from "react";

// TODO: Implement the cart reducer using useReducer
//
// Key concept: useReducer manages complex state transitions through
// a pure reducer function. Each action type maps to a specific state change.
//
// Steps:
//   1. Implement each case in cartReducer:
//      - ADD_ITEM: If product exists, increment quantity; otherwise add with quantity 1
//      - REMOVE_ITEM: Filter out the item by id
//      - INCREMENT: Increase quantity by 1
//      - DECREMENT: Decrease quantity by 1, remove if quantity reaches 0
//      - CLEAR_CART: Reset to empty state
//      - APPLY_COUPON: Look up code in COUPONS, set discount if valid
//   2. The useCart hook wraps useReducer and computes derived values
//      (subtotal, discountAmount, total, itemCount)

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  coupon: string | null;
  discount: number;
}

export type CartAction =
  | { type: "ADD_ITEM"; product: Product }
  | { type: "REMOVE_ITEM"; id: number }
  | { type: "INCREMENT"; id: number }
  | { type: "DECREMENT"; id: number }
  | { type: "CLEAR_CART" }
  | { type: "APPLY_COUPON"; code: string };

const COUPONS: Record<string, number> = {
  SAVE10: 0.1,
  SAVE20: 0.2,
};

// TODO: Implement each case in the reducer
// Currently returns state unchanged for all actions
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM":
      // TODO: Check if product already exists in items
      // If yes, increment its quantity
      // If no, add it with quantity: 1
      return state;

    case "REMOVE_ITEM":
      // TODO: Filter out the item with matching id
      return state;

    case "INCREMENT":
      // TODO: Increase quantity of item with matching id
      return state;

    case "DECREMENT":
      // TODO: Decrease quantity, remove item if quantity reaches 0
      return state;

    case "CLEAR_CART":
      // TODO: Reset to empty cart
      return state;

    case "APPLY_COUPON":
      // TODO: Look up action.code in COUPONS (case-insensitive)
      // If found, set coupon and discount on state
      void COUPONS;
      return state;
  }
}

const initialState: CartState = {
  items: [],
  coupon: null,
  discount: 0,
};

export function useCart() {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Derived values — compute from state, don't store them
  const subtotal = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const discountAmount = subtotal * state.discount;
  const total = subtotal - discountAmount;
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return { state, dispatch, subtotal, discountAmount, total, itemCount };
}
