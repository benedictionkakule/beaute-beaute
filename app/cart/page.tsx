"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

export default function CartPage() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCartStore();

  if (cart.length === 0) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-20 text-center">
        <h1 className="text-4xl font-bold text-gray-900">
          Your Cart
        </h1>

        <p className="mt-6 text-gray-600">
          Your shopping bag is empty.
        </p>

        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-pink-500 px-8 py-4 text-white transition hover:bg-pink-600"
        >
          Continue Shopping
        </Link>
      </main>
    );
  }

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="mb-10 text-4xl font-bold text-gray-900">
        Shopping Cart
      </h1>

      <div className="space-y-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-6 rounded-3xl border border-pink-100 bg-white p-6 shadow-sm md:flex-row md:items-center"
          >
            {/* Product Image */}
            <div className="relative h-28 w-28 overflow-hidden rounded-2xl">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900">
                {item.name}
              </h2>

              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="rounded-full border border-pink-200 p-2 transition hover:bg-pink-50"
                >
                  <Minus size={16} />
                </button>

                <span className="w-8 text-center font-semibold">
                  {item.quantity}
                </span>

                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="rounded-full border border-pink-200 p-2 transition hover:bg-pink-50"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Price & Remove */}
            <div className="flex items-center gap-6">
              <p className="text-2xl font-bold text-pink-500">
                ${(item.price * item.quantity).toFixed(2)}
              </p>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 transition hover:text-red-700"
              >
                <Trash2 size={22} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-12 border-t border-pink-100 pt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Subtotal
          </h2>

          <p className="text-3xl font-bold text-pink-500">
            ${subtotal.toFixed(2)}
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <Link
            href="/"
            className="rounded-full border border-[#B14A79] px-6 py-3 text-center font-medium text-[#B14A79] transition hover:bg-[#F7E7EE]"
          >
            Continue Shopping
          </Link>

          <div className="flex flex-col gap-4 md:flex-row">
  <button
    onClick={clearCart}
    className="rounded-full border border-[#6B7280] px-6 py-3 font-medium text-[#374151] transition hover:bg-gray-100"
  >
    Clear Cart
  </button>

  <Link
    href="/checkout"
    className="rounded-full bg-pink-500 px-8 py-3 text-center font-semibold text-white transition hover:bg-pink-600"
  >
    Proceed to Checkout
  </Link>
</div>
        </div>
      </div>
    </main>
  );
}