"use client";
import { useAuth } from "@/context/AuthContext";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { products } from "@/data/products";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { useWishlist } from "@/context/WishlistContext";
import {
  Search,
  Heart,
  User,
  ShoppingBag,
  Menu,
} from "lucide-react";

export default function Header() {
  const cart = useCartStore((state) => state.cart);
  const [query, setQuery] = useState("");
const [selectedIndex, setSelectedIndex] = useState(-1);
const searchRef = useRef<HTMLDivElement>(null);
const accountRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
const { user, fetchUser, logout } = useAuth();
const { wishlist } = useWishlist();

const wishlistCount = wishlist.length;
const [accountOpen, setAccountOpen] = useState(false);

async function handleLogout() {
  try {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    logout();
    setAccountOpen(false);

    router.push("/");
    router.refresh();

  } catch (error) {
    console.error(error);
  }
}

  useEffect(() => {
  function handleClickOutside(event: MouseEvent) {
    const target = event.target as Node;

    // Close search
    if (
      searchRef.current &&
      !searchRef.current.contains(target)
    ) {
      setQuery("");
      setSelectedIndex(-1);
    }

    // Close account menu
    if (
      accountRef.current &&
      !accountRef.current.contains(target)
    ) {
      setAccountOpen(false);
    }
  }

  document.addEventListener(
    "mousedown",
    handleClickOutside
  );

  return () => {
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );
  };
}, []);

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

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="sticky top-0 z-50 border-b border-pink-200 bg-[#FFF8F5]/95 backdrop-blur-md">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link href="/" className="transition">
          <img
            src="/images/logo.png"
            alt="Beauté-Beauté logo"
            width={80}
            height={80}
            className="object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">

          <Link
            href="/"
            className="font-medium text-[#5A3D46] transition hover:text-[#C85A8C]"
          >
            Home
          </Link>

          {/* Shop Dropdown */}
          <div className="group relative">

            <button className="font-medium text-[#5A3D46] transition hover:text-[#C85A8C]">
              Shop
            </button>

            <div className="invisible absolute left-0 top-full mt-4 w-56 rounded-2xl border border-pink-100 bg-white p-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100">

              <Link href="/shop?category=Skincare" className="block rounded-lg px-4 py-3 hover:bg-pink-50">
                Skincare
              </Link>

              <Link href="/shop?category=Makeup" className="block rounded-lg px-4 py-3 hover:bg-pink-50">
                Makeup
              </Link> 

              <Link href="/shop?category=Fragrance" className="block rounded-lg px-4 py-3 hover:bg-pink-50">
                Fragrance
              </Link>

              <Link href="/shop?category=Haircare" className="block rounded-lg px-4 py-3 hover:bg-pink-50">
                Haircare
              </Link>

              <Link href="/shop?category=Body Care" className="block rounded-lg px-4 py-3 hover:bg-pink-50">
                Body Care
              </Link>

              <Link href="/shop?category=Beauty Tools" className="block rounded-lg px-4 py-3 hover:bg-pink-50">
                Beauty Tools
              </Link>

            </div>
          </div>

          <Link
            href="/categories"
            className="font-medium text-[#5A3D46] transition hover:text-[#C85A8C]"
          >
            Categories
          </Link>

          <Link
            href="/about"
            className="font-medium text-[#5A3D46] transition hover:text-[#C85A8C]"
          >
            About
          </Link>

          <Link
            href="/contact"
            className="font-medium text-[#5A3D46] transition hover:text-[#C85A8C]"
          >
            Contact
          </Link>

        </nav>

        {/* Icons */}
        <div className="flex items-center gap-2">

          

          <Link
  href={user ? "/wishlist" : "/login?redirect=/wishlist"}
  className="relative rounded-full p-2 transition hover:bg-pink-100"
>
  <Heart
    size={22}
    fill={wishlistCount > 0 ? "currentColor" : "none"}
    className={
      wishlistCount > 0
        ? "text-pink-500"
        : "text-[#8B3A62]"
    }
  />

  {wishlistCount > 0 && (
    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-xs text-white">
      {wishlistCount}
    </span>
  )}
</Link>

          {user ? (
  <div ref={accountRef} className="relative">

    <button
      onClick={() => setAccountOpen(!accountOpen)}
      className="rounded-full px-3 py-2 text-sm font-medium text-[#8B3A62] transition hover:bg-pink-100"
    >
      Hi, {user.name} ▼
    </button>


    {accountOpen && (
      <div className="absolute right-0 top-12 w-48 rounded-2xl border border-pink-100 bg-white p-2 shadow-xl">

        <Link
          href="/profile"
          className="block rounded-lg px-4 py-3 hover:bg-pink-50"
        >
          👤 My Profile
        </Link>


        <Link
          href="/orders"
          className="block rounded-lg px-4 py-3 hover:bg-pink-50"
        >
          📦 My Orders
        </Link>


        <Link
          href="/wishlist"
          className="block rounded-lg px-4 py-3 hover:bg-pink-50"
        >
          ❤️ Wishlist
        </Link>


        <button
  onClick={handleLogout}
  className="block w-full rounded-lg px-4 py-3 text-left hover:bg-pink-50"
>
  🚪 Logout
</button>

      </div>
    )}

  </div>
) : (

  <div ref={accountRef} className="relative">

    <button
      onClick={() => setAccountOpen(!accountOpen)}
      className="rounded-full p-2 text-[#8B3A62] transition hover:bg-pink-100 hover:text-[#C85A8C]"
      aria-label="Account"
    >
      <User size={22} strokeWidth={2.2} />
    </button>


    {accountOpen && (
      <div className="absolute right-0 top-12 w-52 rounded-2xl border border-pink-100 bg-white p-2 shadow-xl">

        <Link
          href="/login"
          onClick={() => setAccountOpen(false)}
          className="block rounded-lg px-4 py-3 hover:bg-pink-50"
        >
          👤 Login
        </Link>


        <Link
          href="/register"
          onClick={() => setAccountOpen(false)}
          className="block rounded-lg px-4 py-3 hover:bg-pink-50"
        >
          ✨ Create Account
        </Link>

      </div>
    )}

  </div>

)}

          {/* Shopping Cart */}
          <Link
            href="/cart"
            className="relative rounded-full p-2 text-[#8B3A62] transition hover:bg-pink-100 hover:text-[#C85A8C]"
            aria-label="Shopping Bag"
          >
            <ShoppingBag size={22} strokeWidth={2.2} />

            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#C85A8C] text-xs text-white">
              {cartCount}
            </span>
          </Link>

          <div
  ref={searchRef}
  className="relative"
>

  <Search
    size={18}
    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
  />

  <input
  type="text"
  placeholder="Search products..."
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  onKeyDown={(e) => {
  if (e.key === "ArrowDown") {
    e.preventDefault();

    setSelectedIndex((prev) =>
      prev < filteredProducts.length - 1 ? prev + 1 : prev
    );
  }

  if (e.key === "ArrowUp") {
    e.preventDefault();

    setSelectedIndex((prev) =>
      prev > 0 ? prev - 1 : 0
    );
  }

  if (e.key === "Enter") {
    e.preventDefault();

    if (
      selectedIndex >= 0 &&
      filteredProducts[selectedIndex]
    ) {
      router.push(`/shop/${filteredProducts[selectedIndex].id}`);
      setQuery("");
      setSelectedIndex(-1);
    } else if (filteredProducts.length > 0) {
      router.push(`/shop/${filteredProducts[0].id}`);
      setQuery("");
      setSelectedIndex(-1);
    }
  }
}}
  className="w-64 rounded-full border border-pink-200 bg-white py-2 pl-10 pr-4 text-sm outline-none focus:border-[#C85A8C]"
/>

  {/* Search Results */}
  {query.trim() !== "" && (
    <div className="absolute left-0 top-12 z-50 w-72 overflow-hidden rounded-2xl border border-pink-100 bg-white shadow-xl">

      {filteredProducts.length > 0 ? (

        filteredProducts.slice(0, 5).map((product, index) => (

          <Link
            key={product.id}
            href={`/shop/${product.id}`}
            onClick={() => setQuery("")}
            className={`flex items-center gap-3 px-4 py-3 transition
${
  selectedIndex === index
    ? "bg-pink-100"
    : "hover:bg-pink-50"
}`}
          >
            <Image
              src={product.image}
              alt={product.name}
              width={45}
              height={45}
              className="h-10 w-10 rounded-lg object-cover"
            />

            <div>
              <p className="text-sm font-medium text-gray-800">
                {product.name}
              </p>

              <p className="text-xs text-gray-500">
                {product.category}
              </p>
            </div>

          </Link>

        ))

      ) : (

        <div className="px-5 py-6 text-center">

          <p className="text-sm font-medium text-gray-700">
            No products found
          </p>

          <p className="mt-1 text-xs text-gray-500">
            Try searching:
          </p>

          <div className="mt-3 flex flex-wrap justify-center gap-2">

            <button
              onClick={() => setQuery("skincare")}
              className="rounded-full bg-pink-50 px-3 py-1 text-xs text-pink-700 hover:bg-pink-100"
            >
              Skincare
            </button>

            <button
              onClick={() => setQuery("serum")}
              className="rounded-full bg-pink-50 px-3 py-1 text-xs text-pink-700 hover:bg-pink-100"
            >
              Serum
            </button>

            <button
              onClick={() => setQuery("perfume")}
              className="rounded-full bg-pink-50 px-3 py-1 text-xs text-pink-700 hover:bg-pink-100"
            >
              Perfume
            </button>

          </div>

        </div>

      )}

    </div>
  )}

</div>

        </div>

      </div>
    </header>
  );
}