"use client";

import { products } from "@/data/products";
import { ShoppingBag, Trash2, Heart, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useWishlist } from "@/context/WishlistContext";
import Link from "next/link";
import Image from "next/image";

export default function WishlistPage() {
  const addToCart = useCartStore((state) => state.addToCart);

  const {
    wishlist,
    removeWishlistItem,
  } = useWishlist();

  const wishlistProducts = wishlist
    .map((item) =>
      products.find(
        (product) => product.id === item.productId
      )
    )
    .filter(Boolean);

  return (
    <main className="min-h-screen bg-[#FFF8F5]">
      {/* Page Header */}
      <section className="border-b border-pink-100 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-50">
              <Heart
                size={24}
                className="text-pink-500"
                fill="currentColor"
              />
            </div>

            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-pink-500">
                Your favorites
              </p>

              <h1 className="mt-1 text-4xl font-bold text-[#5A3D46]">
                My Wishlist
              </h1>
            </div>
          </div>

          <p className="mt-5 max-w-2xl text-gray-600">
            Keep the beauty products you love in one place and
            come back whenever you're ready to shop.
          </p>

          {wishlistProducts.length > 0 && (
            <div className="mt-6 inline-flex items-center rounded-full bg-pink-50 px-4 py-2 text-sm font-medium text-pink-700">
              {wishlistProducts.length}{" "}
              {wishlistProducts.length === 1
                ? "item"
                : "items"}{" "}
              saved
            </div>
          )}
        </div>
      </section>

      {/* Wishlist Content */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        {wishlistProducts.length === 0 ? (
          /* Empty Wishlist */
          <div className="mx-auto max-w-2xl rounded-3xl border border-pink-100 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-pink-50">
              <Heart
                size={36}
                className="text-pink-400"
              />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-[#5A3D46]">
              Your wishlist is waiting
            </h2>

            <p className="mx-auto mt-3 max-w-md leading-7 text-gray-600">
              You haven't saved any beauty products yet.
              Explore our collection and add the things you
              love to your wishlist.
            </p>

            <Link
              href="/shop"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-pink-500 px-7 py-3 font-medium text-white transition hover:bg-pink-600"
            >
              Explore Products
              <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <>
            {/* Section Header */}
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#5A3D46]">
                  Saved for later
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Your favorite beauty picks
                </p>
              </div>

              <Link
                href="/shop"
                className="hidden items-center gap-2 rounded-full border border-pink-200 bg-white px-5 py-2.5 text-sm font-medium text-[#8B3A62] transition hover:bg-pink-50 sm:flex"
              >
                Continue Shopping
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Products */}
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {wishlistProducts.map((product) => {
                if (!product) return null;

                return (
                  <div
                    key={product.id}
                    className="group overflow-hidden rounded-3xl border border-pink-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    {/* Product Image */}
                    <div className="relative h-72 overflow-hidden bg-pink-50">
                      <Link href={`/shop/${product.id}`}>
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover transition duration-500 group-hover:scale-105"
                        />
                      </Link>

                      {/* Wishlist Badge */}
                      <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow-md">
                        <Heart
                          size={18}
                          className="text-pink-500"
                          fill="currentColor"
                        />
                      </div>

                      {/* Category */}
                      <span className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-medium text-[#8B3A62] shadow-sm">
                        {product.category}
                      </span>
                    </div>

                    {/* Product Details */}
                    <div className="p-5">
                      <Link href={`/shop/${product.id}`}>
                        <h3 className="line-clamp-2 min-h-[3.5rem] text-lg font-semibold text-[#5A3D46] transition hover:text-pink-500">
                          {product.name}
                        </h3>
                      </Link>

                      <p className="mt-3 text-2xl font-bold text-pink-500">
                        ${product.price.toFixed(2)}
                      </p>

                      {/* Actions */}
                      <div className="mt-5 flex gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            addToCart({
                              id: product.id,
                              name: product.name,
                              price: product.price,
                              image: product.image,
                              quantity: 1,
                            })
                          }
                          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-pink-500 py-3 text-sm font-medium text-white transition hover:bg-pink-600"
                        >
                          <ShoppingBag size={17} />
                          Add to Cart
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            removeWishlistItem(product.id)
                          }
                          className="flex h-12 w-12 items-center justify-center rounded-xl border border-pink-200 text-gray-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                          aria-label={`Remove ${product.name} from wishlist`}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Shopping CTA */}
            <div className="mt-12 rounded-3xl border border-pink-100 bg-white p-8 text-center shadow-sm">
              <h3 className="text-xl font-semibold text-[#5A3D46]">
                Looking for something else?
              </h3>

              <p className="mt-2 text-gray-600">
                Discover more products from our beauty collection.
              </p>

              <Link
                href="/shop"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#5A3D46] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#6D4854]"
              >
                Browse the Shop
                <ArrowRight size={17} />
              </Link>
            </div>
          </>
        )}
      </section>
    </main>
  );
}