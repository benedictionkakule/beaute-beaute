"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { useAuth } from "@/context/AuthContext";

type WishlistItem = {
  _id: string;
  productId: number;
};

type WishlistContextType = {
  wishlist: WishlistItem[];
  refreshWishlist: () => Promise<void>;
  addWishlistItem: (productId: number) => Promise<boolean>;
  removeWishlistItem: (productId: number) => Promise<boolean>;
};

const WishlistContext =
  createContext<WishlistContextType | null>(null);

export function WishlistProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();

  const [wishlist, setWishlist] = useState<
    WishlistItem[]
  >([]);

  async function refreshWishlist() {
    if (!user) {
      setWishlist([]);
      return;
    }

    const res = await fetch("/api/wishlist");

    if (!res.ok) return;

    const data = await res.json();

    setWishlist(data);
  }

  async function addWishlistItem(
    productId: number
  ) {
    const res = await fetch("/api/wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
      }),
    });

    if (!res.ok) return false;

    await refreshWishlist();

    return true;
  }

  async function removeWishlistItem(
    productId: number
  ) {
    const res = await fetch("/api/wishlist", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
      }),
    });

    if (!res.ok) return false;

    await refreshWishlist();

    return true;
  }

  useEffect(() => {
    refreshWishlist();
  }, [user]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        refreshWishlist,
        addWishlistItem,
        removeWishlistItem,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used inside WishlistProvider"
    );
  }

  return context;
}