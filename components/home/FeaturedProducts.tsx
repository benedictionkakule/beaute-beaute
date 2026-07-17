"use client";
import SectionTitle from "../ui/SectionTitle";
import { useCartStore } from "@/store/cartStore";
import { products } from "@/data/products";

const featuredProducts = products.filter(
  (product) => product.featured
);

export default function FeaturedProducts() {
  const addToCart = useCartStore(
  (state) => state.addToCart
);
  return (
    <section className="bg-[#FFF8F5] py-20">
      <div className="mx-auto max-w-7xl px-6">

        {/* Title */}
        <SectionTitle
  title="Featured Products"
  subtitle="Soft beauty essentials for your daily glow."
/>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition group"
            >
              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-56 w-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-800">
                  {product.name}
                </h3>

                <p className="text-[#D98CA8] font-semibold mt-1">
                  ${product.price.toFixed(2)}
                </p>

                <button
  onClick={() =>
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
  }
  className="mt-3 w-full rounded-full bg-[#F7C6D0] py-2 text-[#2B2B2B] transition hover:bg-[#f3b6c4]"
>
  Add to Cart
</button>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}