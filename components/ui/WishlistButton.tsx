"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";

type WishlistButtonProps = {
  productId: number;
};

export default function WishlistButton({
  productId,
}: WishlistButtonProps) {
  const router = useRouter();
  const { user } = useAuth();

  const {
    wishlist,
    addWishlistItem,
    removeWishlistItem,
  } = useWishlist();

  const [saving, setSaving] = useState(false);

  const isWishlisted = wishlist.some(
    (item) => item.productId === productId
  );

  async function handleWishlist() {
    if (!user) {
      router.push(`/login?redirect=/shop/${productId}`);
      return;
    }

    try {
      setSaving(true);

      if (isWishlisted) {
        await removeWishlistItem(productId);
      } else {
        await addWishlistItem(productId);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleWishlist}
      disabled={saving}
      className="flex items-center justify-center gap-2 rounded-xl border border-pink-200 px-6 py-3 text-pink-500 transition hover:bg-pink-50 disabled:opacity-50"
    >
      <Heart
        size={20}
        fill={isWishlisted ? "currentColor" : "none"}
      />

      {isWishlisted
        ? "Remove from Wishlist"
        : "Add to Wishlist"}
    </button>
  );
}