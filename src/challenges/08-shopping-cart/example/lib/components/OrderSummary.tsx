interface OrderSummaryProps {
  subtotal: number;
  discountAmount: number;
  total: number;
  coupon: string | null;
}

export default function OrderSummary({
  subtotal,
  discountAmount,
  total,
  coupon,
}: OrderSummaryProps) {
  return (
    <div className="space-y-2 border-t border-gray-200 pt-4 dark:border-gray-700">
      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      {discountAmount > 0 && (
        <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
          <span>Discount ({coupon})</span>
          <span>-${discountAmount.toFixed(2)}</span>
        </div>
      )}
      <div className="flex justify-between border-t border-gray-200 pt-2 text-lg font-bold text-gray-900 dark:border-gray-700 dark:text-gray-100">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  );
}
