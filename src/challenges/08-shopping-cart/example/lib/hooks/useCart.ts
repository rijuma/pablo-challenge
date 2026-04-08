import { useReducer } from "react";

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

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.id === action.product.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.product.id ? { ...i, quantity: i.quantity + 1 } : i,
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.product, quantity: 1 }],
      };
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.id),
      };

    case "INCREMENT":
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, quantity: i.quantity + 1 } : i,
        ),
      };

    case "DECREMENT":
      return {
        ...state,
        items: state.items
          .map((i) =>
            i.id === action.id ? { ...i, quantity: i.quantity - 1 } : i,
          )
          .filter((i) => i.quantity > 0),
      };

    case "CLEAR_CART":
      return { items: [], coupon: null, discount: 0 };

    case "APPLY_COUPON": {
      const code = action.code.toUpperCase();
      const discount = COUPONS[code];
      if (discount !== undefined) {
        return { ...state, coupon: code, discount };
      }
      return state;
    }
  }
}

const initialState: CartState = {
  items: [],
  coupon: null,
  discount: 0,
};

export function useCart() {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const subtotal = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const discountAmount = subtotal * state.discount;
  const total = subtotal - discountAmount;
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return { state, dispatch, subtotal, discountAmount, total, itemCount };
}
