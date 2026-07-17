import { create } from "zustand";

type WishlistItem = {
  id: number;
  name: string;
  price: number;
  image: string;
};

type WishlistStore = {
  wishlist: WishlistItem[];

  addToWishlist: (item: WishlistItem) => void;

  removeFromWishlist: (id: number) => void;

  isInWishlist: (id: number) => boolean;
};

export const useWishlistStore = create<WishlistStore>((set, get) => ({

  wishlist: [],

  addToWishlist: (item) =>
    set((state) => {
      if (state.wishlist.some((p) => p.id === item.id)) {
        return state;
      }

      return {
        wishlist: [...state.wishlist, item],
      };
    }),

  removeFromWishlist: (id) =>
    set((state) => ({
      wishlist: state.wishlist.filter(
        (item) => item.id !== id
      ),
    })),

  isInWishlist: (id) =>
    get().wishlist.some((item) => item.id === id),

}));