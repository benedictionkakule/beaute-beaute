"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";

import { products } from "@/data/products";
import { useWishlistStore } from "@/store/wishlistStore";

export default function ShopPage() {
  const searchParams = useSearchParams();

  const searchQuery = searchParams.get("search") ?? "";
  const categoryQuery = searchParams.get("category") ?? "";

  const [search, setSearch] = useState("");

  const addToWishlist = useWishlistStore(
    (state) => state.addToWishlist
  );

  const isInWishlist = useWishlistStore(
    (state) => state.isInWishlist
  );

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

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-gray-900">
        {categoryQuery ? `${categoryQuery} Products` : "Shop"}
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
        {filteredProducts.length === 1 ? "product" : "products"} found
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
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="overflow-hidden rounded-2xl border border-pink-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Product Image */}
              <div className="relative">
                {/* Wishlist */}
                <button
                  onClick={() =>
                    addToWishlist({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                    })
                  }
                  className="absolute right-3 top-3 z-10 rounded-full bg-white p-2 shadow-md transition hover:bg-pink-50"
                >
                  <Heart
                    size={20}
                    fill={isInWishlist(product.id) ? "#ec4899" : "none"}
                    className="text-pink-500"
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
              <Link href={`/shop/${product.id}`}>
                <div className="p-5">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {product.name}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    {product.category}
                  </p>

                  <p className="mt-3 text-lg font-bold text-pink-500">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}