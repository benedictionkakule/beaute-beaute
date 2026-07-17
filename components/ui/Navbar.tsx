"use client";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { useState } from "react";
import { products } from "@/data/products";

export default function Navbar() {
    const [query, setQuery] = useState("");

const filteredProducts =
  query.trim() === ""
    ? []
    : products.filter((product) => {
        const search = query.toLowerCase();

        return (
          product.name.toLowerCase().includes(search) ||
          product.category.toLowerCase().includes(search) ||
          product.description.toLowerCase().includes(search) ||
          product.details.toLowerCase().includes(search)
        );
      });
  return (
    <nav className="border-b border-pink-100 bg-red-500">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link href="/">
          <Image
            src="/images/logo.jpg"
            alt="Beauté-Beauté logo"
            width={150}
            height={50}
            className="object-contain"
          />
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">

  <div className="flex gap-8 text-sm font-medium text-gray-700">
    <Link href="/">Home</Link>
    <Link href="/shop">Shop</Link>
    <Link href="/about">About</Link>
    <Link href="/contact">Contact</Link>
  </div>

  <div className="relative">

    <Search
      size={18}
      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
    />

    <input
      type="text"
      placeholder="Search products..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="w-72 rounded-full border border-gray-300 py-2 pl-10 pr-4 outline-none focus:border-pink-500"
    />

  </div>

</div>

      </div>
    </nav>
  );
}