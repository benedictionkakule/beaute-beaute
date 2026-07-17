"use client";
import { useCheckoutStore } from "@/store/checkoutStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
export default function CheckoutPage() {

    const cart = useCartStore((state) => state.cart);
    const router = useRouter();
    const setCheckoutData = useCheckoutStore(
  (state) => state.setCheckoutData
);

const subtotal = cart.reduce(
  (total, item) => total + item.price * item.quantity,
  0
);

const shipping = subtotal >= 100 ? 0 : 15;

const total = subtotal + shipping;
const [formData, setFormData] = useState({
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  country: "",
});

const [errors, setErrors] = useState({
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  country: "",
});
const handleChange = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));

  setErrors((prev) => ({
    ...prev,
    [name]: "",
  }));
};
const handleCheckout = () => {
  const newErrors = {
    fullName: formData.fullName ? "" : "Full name is required",
    email: formData.email ? "" : "Email is required",
    phone: formData.phone ? "" : "Phone number is required",
    address: formData.address ? "" : "Address is required",
    city: formData.city ? "" : "City is required",
    country: formData.country ? "" : "Country is required",
  };

  setErrors(newErrors);

  const hasErrors = Object.values(newErrors).some(
    (error) => error !== ""
  );

  if (hasErrors) return;

  setCheckoutData(formData);
  router.push("/payment");
};

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="text-4xl font-bold text-gray-900">
        Checkout
      </h1>

      <p className="mt-3 text-gray-600">
        Complete your order by filling in your shipping information.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">

        {/* Shipping Form */}
        <section className="rounded-3xl border border-pink-100 bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-2xl font-semibold">
            Shipping Information
          </h2>

          <form className="space-y-5">

          <input
  type="text"
  name="fullName"
  value={formData.fullName}
  onChange={handleChange}
  placeholder="Full Name"
  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-pink-500"
/>
{errors.fullName && (
  <p className="mt-1 text-sm text-red-500">
    {errors.fullName}
  </p>
)}

<input
  type="email"
  name="email"
  value={formData.email}
  onChange={handleChange}
  placeholder="Email Address"
  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-pink-500"
/>
{errors.email && (
  <p className="mt-1 text-sm text-red-500">
    {errors.email}
  </p>
)}

<input
  type="tel"
  name="phone"
  value={formData.phone}
  onChange={handleChange}
  placeholder="Phone Number"
  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-pink-500"
/>
{errors.phone && (
  <p className="mt-1 text-sm text-red-500">
    {errors.phone}
  </p>
)}

<input
  type="text"
  name="address"
  value={formData.address}
  onChange={handleChange}
  placeholder="Street Address"
  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-pink-500"
/>
{errors.address && (
  <p className="mt-1 text-sm text-red-500">
    {errors.address}
  </p>
)}

<div className="grid gap-5 md:grid-cols-2">
  <input
    type="text"
    name="city"
    value={formData.city}
    onChange={handleChange}
    placeholder="City"
    className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-pink-500"
  />
{errors.city && (
  <p className="mt-1 text-sm text-red-500">
    {errors.city}
  </p>
)}

  <input
    type="text"
    name="country"
    value={formData.country}
    onChange={handleChange}
    placeholder="Country"
    className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-pink-500"
  />
  {errors.country && (
  <p className="mt-1 text-sm text-red-500">
    {errors.country}
  </p>
)}
</div>
          </form>
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
      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
    </span>
  </div>

  <div className="flex justify-between text-xl font-bold">
    <span>Total</span>

    <span className="text-pink-500">
      ${total.toFixed(2)}
    </span>
  </div>

</div>

          <button
  onClick={handleCheckout}
  className="mt-8 w-full rounded-full bg-[#B14A79] py-4 font-semibold text-white shadow-md transition hover:bg-[#9E3E69]"
>
  Continue to Payment
</button>
        </section>

      </div>
    </main>
  );
}