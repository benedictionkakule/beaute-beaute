"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

type ProductCardProps = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

export default function ProductCard({
  id,
  name,
  description,
  price,
  image,
}: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <Link href={`/shop/${id}`}>
      <div className="group overflow-hidden rounded-3xl border border-pink-100 bg-white shadow-sm transition hover:-translate-y-2 hover:shadow-xl">

        <div className="relative h-64 bg-pink-100">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
          />

          <span className="absolute left-4 top-4 rounded-full bg-pink-500 px-3 py-1 text-xs font-medium text-white">
            New
          </span>

          <button
            type="button"
            className="absolute right-4 top-4 rounded-full bg-white p-2 shadow"
          >
            <Heart size={18} />
          </button>
        </div>

        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900">
            {name}
          </h3>

          <p className="mt-2 text-sm text-gray-600">
            {description}
          </p>

          <div className="mt-4 flex items-center gap-1 text-yellow-500">
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <span className="ml-2 text-sm text-gray-500">(24)</span>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <span className="text-2xl font-bold text-pink-500">
              ${price.toFixed(2)}
            </span>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                addToCart({
                  id,
                  name,
                  price,
                  image,
                  quantity: 1,
                });
              }}
              className="rounded-full bg-pink-500 p-3 text-white transition hover:bg-pink-600"
            >
              <ShoppingBag size={20} />
            </button>
          </div>
        </div>

      </div>
    </Link>
  );
}