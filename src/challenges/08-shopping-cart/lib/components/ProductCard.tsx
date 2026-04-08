import type { Product } from "../hooks/useCart";

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
}

export default function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <span className="mb-2 text-4xl">{product.image}</span>
      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
        {product.name}
      </h3>
      <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">
        {product.category}
      </p>
      <p className="mb-3 text-lg font-bold text-blue-600 dark:text-blue-400">
        ${product.price.toFixed(2)}
      </p>
      <button
        onClick={() => onAdd(product)}
        className="w-full rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  );
}
