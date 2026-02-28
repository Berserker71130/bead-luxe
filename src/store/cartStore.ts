import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/lib/data/products";

// Define what a cart item looks like (Product + Quantity)
interface CartItem extends Product {
  quantity: number;
}

// Define the actions our store can do
interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

// Create the store with persist
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (item) => item.id === product.id,
        );

        if (existingItem) {
          set({
            items: currentItems.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            ),
          });
        } else {
          // If it is new, add with quantity 1
          set({
            items: [...currentItems, { ...product, quantity: 1 }],
          });
        }
      },

      removeItem: (productId) =>
        set({
          items: get().items.filter((item) => item.id !== productId),
        }),

      updateQty: (productId, quantity) =>
        set({
          items: get().items.map((item) =>
            item.id === productId
              ? { ...item, quantity: Math.max(1, quantity) }
              : item,
          ),
        }),

      clearCart: () => set({ items: [] }),

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
      },
    }),
    {
      name: "bead-luxe-cart-storage",
    },
  ),
);
