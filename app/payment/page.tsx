"use client";
import { useCheckoutStore } from "@/store/checkoutStore";
import { useOrderStore } from "@/store/orderStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";

export default function PaymentPage() {
  const cart = useCartStore((state) => state.cart);
const router = useRouter(); 
const createOrder = useOrderStore(
  (state) => state.createOrder
);
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const checkoutData = useCheckoutStore(
  (state) => state.checkoutData
);

  const shipping = subtotal >= 100 ? 0 : 15;

  const total = subtotal + shipping;

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">

      <h1 className="text-4xl font-bold text-gray-900">
        Payment
      </h1>

      <p className="mt-3 text-gray-600">
        Choose your payment method and complete your order.
      </p>


      <div className="mt-10 grid gap-10 lg:grid-cols-2">


        {/* Payment Methods */}
        <section className="rounded-3xl border border-pink-100 bg-white p-8 shadow-sm">

          <h2 className="mb-6 text-2xl font-semibold">
            Payment Method
          </h2>


          <div className="space-y-5">

            <label className="flex items-center rounded-2xl border border-pink-200 p-5">
              <input
                type="radio"
                name="payment"
                defaultChecked
              />

              <span className="ml-3 font-medium">
                Credit / Debit Card
              </span>
            </label>


            <label className="flex items-center rounded-2xl border border-pink-200 p-5">
              <input
                type="radio"
                name="payment"
              />

              <span className="ml-3 font-medium">
                PayPal
              </span>
            </label>


            <label className="flex items-center rounded-2xl border border-pink-200 p-5">
              <input
                type="radio"
                name="payment"
              />

              <span className="ml-3 font-medium">
                Cash on Delivery
              </span>
            </label>

          </div>


          {/* Card Details */}
          <div className="mt-8 space-y-4">

            <input
              placeholder="Card Number"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-pink-500"
            />

            <input
              placeholder="Card Holder Name"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-pink-500"
            />

            <div className="grid gap-4 md:grid-cols-2">

              <input
                placeholder="Expiry Date"
                className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-pink-500"
              />

              <input
                placeholder="CVV"
                className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-pink-500"
              />

            </div>

          </div>


          <button
  onClick={() => {
    console.log(checkoutData);
    createOrder({
      items: cart,
      total,
      orderNumber: `BB-${Math.floor(
        Math.random() * 90000 + 10000
      )}`,
      customer: checkoutData,
    });

    router.push("/order-confirmation");
  }}
  className="mt-8 w-full rounded-full bg-[#B14A79] py-4 font-semibold text-white shadow-md transition hover:bg-[#9E3E69]"
>
  Place Order
</button>

        </section>



        {/* Order Summary */}
        <section className="rounded-3xl border border-pink-100 bg-[#FFF8F5] p-8 shadow-sm">

          <h2 className="mb-6 text-2xl font-semibold">
            Order Summary
          </h2>


          <div className="space-y-5">

            {cart.map((item) => (

              <div
                key={item.id}
                className="flex items-center gap-4"
              >

                <div className="relative h-16 w-16 overflow-hidden rounded-xl">

                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />

                </div>


                <div className="flex-1">

                  <h3 className="font-semibold">
                    {item.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>

                </div>


                <p className="font-semibold text-pink-500">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>


              </div>

            ))}

          </div>


          <div className="mt-8 space-y-3 border-t border-pink-200 pt-6">

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>


            <div className="flex justify-between">
              <span>Shipping</span>
              <span>
                {shipping === 0 ? "Free" : `$${shipping}`}
              </span>
            </div>


            <div className="flex justify-between text-xl font-bold">

              <span>Total</span>

              <span className="text-pink-500">
                ${total.toFixed(2)}
              </span>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}