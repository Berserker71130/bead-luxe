import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/lib/data/products";

interface wishlistState {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
}

export const useWishlistStore = create<wishlistState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product) =>
        set((state) => ({
          items: state.items.some((i) => i.id === product.id)
            ? state.items
            : [...state.items, product],
        })),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),
    }),
    {
      name: "bead-luxe-wishlist-storage",
    },
  ),
);
