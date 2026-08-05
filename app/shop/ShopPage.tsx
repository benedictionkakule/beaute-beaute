"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag } from "lucide-react";

import { products } from "@/data/products";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";

export default function ShopPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const addToCart = useCartStore(
  (state) => state.addToCart
);
  const searchQuery = searchParams.get("search") ?? "";
  const categoryQuery = searchParams.get("category") ?? "";
  const [search, setSearch] = useState("");
  const { user } = useAuth();
  const {
    wishlist,
    addWishlistItem,
    removeWishlistItem,
  } = useWishlist();

  useEffect(() => {
    if (searchQuery) {
      setSearch(searchQuery);
    } else if (categoryQuery) {
      setSearch(categoryQuery);
    } else {
      setSearch("");
    }
  }, [searchQuery, categoryQuery]);

  const filteredProducts = products.filter((product) => {
    const term = search.toLowerCase();

    return (
      product.name.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term)
    );
  });

  async function handleWishlist(productId: number) {
    if (!user) {
      router.push(`/login?redirect=/shop`);
      return;
    }

    const isWishlisted = wishlist.some(
      (item) => item.productId === productId
    );

    try {
      if (isWishlisted) {
        await removeWishlistItem(productId);
      } else {
        await addWishlistItem(productId);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-gray-900">
        {categoryQuery
          ? `${categoryQuery} Products`
          : "Shop"}
      </h1>

      <p className="mt-2 text-gray-600">
        {categoryQuery
          ? `Showing products in ${categoryQuery}.`
          : "Discover all of our beauty products."}
      </p>

      {/* Search */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mt-8 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-pink-500"
      />

      {/* Show All Button */}
      {categoryQuery && (
        <div className="mt-4">
          <Link
            href="/shop"
            className="rounded-full bg-pink-500 px-5 py-2 text-white transition hover:bg-pink-600"
          >
            Show All Products
          </Link>
        </div>
      )}

      {/* Results */}
      <p className="mt-4 text-sm text-gray-500">
        {filteredProducts.length}{" "}
        {filteredProducts.length === 1
          ? "product"
          : "products"}{" "}
        found
      </p>

      {filteredProducts.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-pink-100 bg-pink-50 p-10 text-center">
          <h2 className="text-xl font-semibold text-gray-800">
            No products found
          </h2>

          <p className="mt-2 text-gray-500">
            Try another search or browse a different category.
          </p>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => {
            const isWishlisted = wishlist.some(
              (item) => item.productId === product.id
            );

            return (
              <div
                key={product.id}
                className="overflow-hidden rounded-2xl border border-pink-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Product Image */}
                <div className="relative">
                  {/* Wishlist */}
                  <button
                    type="button"
                    onClick={() =>
                      handleWishlist(product.id)
                    }
                    className="absolute right-3 top-3 z-10 rounded-full bg-white p-2 shadow-md transition hover:bg-pink-50"
                    aria-label={
                      isWishlisted
                        ? "Remove from wishlist"
                        : "Add to wishlist"
                    }
                  >
                    <Heart
                      size={20}
                      fill={
                        isWishlisted
                          ? "currentColor"
                          : "none"
                      }
                      className={
                        isWishlisted
                          ? "text-pink-500"
                          : "text-gray-700"
                      }
                    />
                  </button>

                  <Link href={`/shop/${product.id}`}>
                    <div className="relative h-64">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </Link>
                </div>

{/* Product Details */}
<div className="p-5">
  <Link href={`/shop/${product.id}`}>
    <h2 className="text-lg font-semibold text-gray-900">
      {product.name}
    </h2>

    <p className="mt-1 text-sm text-gray-500">
      {product.category}
    </p>
  </Link>

  <div className="mt-4 flex items-center justify-between">
    <p className="text-lg font-bold text-pink-500">
      ${product.price.toFixed(2)}
    </p>

    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();

        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        });
      }}
      className="rounded-full bg-pink-500 p-3 text-white transition hover:bg-pink-600"
      aria-label="Add to cart"
    >
      <ShoppingBag size={20} />
    </button>
  </div>
</div>

              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}