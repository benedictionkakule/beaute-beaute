"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

type Props = {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
};

export default function AddToCartButton({ product }: Props) {
  const [quantity, setQuantity] = useState(1);

  const addToCart = useCartStore(
    (state) => state.addToCart
  );

  return (
    <div className="flex items-center gap-4">

      {/* Quantity Selector */}
      <div className="flex items-center rounded-full border border-pink-200">

        <button
          onClick={() =>
            setQuantity((q) => Math.max(1, q - 1))
          }
          className="p-3 transition hover:bg-pink-50"
        >
          <Minus size={18} />
        </button>


        <span className="w-12 text-center font-semibold">
          {quantity}
        </span>


        <button
          onClick={() =>
            setQuantity((q) => q + 1)
          }
          className="p-3 transition hover:bg-pink-50"
        >
          <Plus size={18} />
        </button>

      </div>


      {/* Add Button */}
      <button
        onClick={() =>
          addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity,
          })
        }
        className="flex items-center gap-2 rounded-full bg-pink-500 px-8 py-4 font-semibold text-white transition hover:bg-pink-600"
      >
        <ShoppingBag size={20} />
        Add to Cart
      </button>

    </div>
  );
}