import type { CartItem as CartItemType, CartAction } from "../hooks/useCart";

interface CartItemProps {
  item: CartItemType;
  dispatch: React.Dispatch<CartAction>;
}

export default function CartItem({ item, dispatch }: CartItemProps) {
  const lineTotal = item.price * item.quantity;

  return (
    <div className="flex items-center gap-3 border-b border-gray-200 py-3 last:border-b-0 dark:border-gray-700">
      <span className="text-2xl">{item.image}</span>
      <div className="flex-1 min-w-0">
        <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
          {item.name}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          ${item.price.toFixed(2)} each
        </p>
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={() => dispatch({ type: "DECREMENT", id: item.id })}
          className="flex h-7 w-7 items-center justify-center rounded bg-gray-200 text-sm font-bold transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          -
        </button>
        <span className="w-8 text-center text-sm font-semibold">
          {item.quantity}
        </span>
        <button
          onClick={() => dispatch({ type: "INCREMENT", id: item.id })}
          className="flex h-7 w-7 items-center justify-center rounded bg-gray-200 text-sm font-bold transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          +
        </button>
      </div>
      <p className="w-16 text-right text-sm font-semibold text-gray-900 dark:text-gray-100">
        ${lineTotal.toFixed(2)}
      </p>
      <button
        onClick={() => dispatch({ type: "REMOVE_ITEM", id: item.id })}
        className="ml-1 rounded p-1 text-sm text-red-500 transition-colors hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/30"
        title="Remove item"
      >
        ✕
      </button>
    </div>
  );
}
