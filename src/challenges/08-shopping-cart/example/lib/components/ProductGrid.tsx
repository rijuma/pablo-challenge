import type { Product } from "../hooks/useCart";
import ProductCard from "./ProductCard";

const products: Product[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 59.99,
    image: "🎧",
    category: "Electronics",
  },
  { id: 2, name: "Coffee Mug", price: 12.99, image: "☕", category: "Kitchen" },
  {
    id: 3,
    name: "Running Shoes",
    price: 89.99,
    image: "👟",
    category: "Sports",
  },
  { id: 4, name: "Notebook", price: 8.49, image: "📓", category: "Stationery" },
  {
    id: 5,
    name: "Sunglasses",
    price: 24.99,
    image: "🕶️",
    category: "Accessories",
  },
  { id: 6, name: "Plant Pot", price: 15.99, image: "🪴", category: "Home" },
  {
    id: 7,
    name: "Backpack",
    price: 49.99,
    image: "🎒",
    category: "Accessories",
  },
  { id: 8, name: "Desk Lamp", price: 34.99, image: "💡", category: "Home" },
  {
    id: 9,
    name: "Water Bottle",
    price: 18.99,
    image: "🧴",
    category: "Sports",
  },
  {
    id: 10,
    name: "Mechanical Keyboard",
    price: 74.99,
    image: "⌨️",
    category: "Electronics",
  },
];

interface ProductGridProps {
  onAddToCart: (product: Product) => void;
}

export default function ProductGrid({ onAddToCart }: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAdd={onAddToCart} />
      ))}
    </div>
  );
}
