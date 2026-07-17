"use client";

import Link from "next/link";
import { useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { useOrderStore } from "@/store/orderStore";
import { useCartStore } from "@/store/cartStore";

export default function OrderConfirmationPage() {

  const order = useOrderStore(
    (state) => state.order
  );

  const clearCart = useCartStore(
    (state) => state.clearCart
  );

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <main className="mx-auto max-w-5xl px-6 py-20">

      <div className="text-center">

        <CheckCircle
          size={80}
          className="mx-auto text-green-500"
        />

        <h1 className="mt-6 text-4xl font-bold text-gray-900">
          Order Confirmed!
        </h1>

        <p className="mt-4 text-gray-600">
          Thank you for your purchase. Your order has been placed successfully.
        </p>

        <p className="mt-2 text-sm text-gray-500">
          Order number: {order?.orderNumber}
        </p>

      </div>


      <section className="mt-12 rounded-3xl border border-pink-100 bg-[#FFF8F5] p-8">

        <h2 className="text-2xl font-semibold">
          Order Summary
        </h2>


        <div className="mt-6 space-y-4">

          {order?.items.map((item) => (

            <div
              key={item.id}
              className="flex justify-between border-b border-pink-100 pb-4"
            >

              <div>
                <h3 className="font-medium">
                  {item.name}
                </h3>

                <p className="text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>
              </div>


              <p className="font-semibold text-pink-500">
                ${(item.price * item.quantity).toFixed(2)}
              </p>

            </div>

          ))}

        </div>


        <div className="mt-8 flex justify-between text-xl font-bold">

          <span>
            Total
          </span>

          <span className="text-pink-500">
            ${order?.total.toFixed(2)}
          </span>

        </div>

      </section>

      <section className="mt-8 rounded-3xl border border-pink-100 bg-white p-8 shadow-sm">
  <h2 className="mb-6 text-2xl font-semibold">
    Customer Information
  </h2>

  <div className="grid gap-4 md:grid-cols-2">
    <div>
      <p className="text-sm text-gray-500">Full Name</p>
      <p className="font-medium">
        {order?.customer.fullName}
      </p>
    </div>

    <div>
      <p className="text-sm text-gray-500">Email</p>
      <p className="font-medium">
        {order?.customer.email}
      </p>
    </div>

    <div>
      <p className="text-sm text-gray-500">Phone</p>
      <p className="font-medium">
        {order?.customer.phone}
      </p>
    </div>

    <div>
      <p className="text-sm text-gray-500">Country</p>
      <p className="font-medium">
        {order?.customer.country}
      </p>
    </div>

    <div className="md:col-span-2">
      <p className="text-sm text-gray-500">Address</p>
      <p className="font-medium">
        {order?.customer.address}
      </p>
    </div>

    <div>
      <p className="text-sm text-gray-500">City</p>
      <p className="font-medium">
        {order?.customer.city}
      </p>
    </div>
  </div>
</section>

      <div className="mt-10 text-center">

        <Link
          href="/"
          className="inline-block rounded-full bg-[#B14A79] px-10 py-4 font-semibold text-white transition hover:bg-[#9E3E69]"
        >
          Continue Shopping
        </Link>

      </div>

    </main>
  );
}