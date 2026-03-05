import { create } from "zustand";

export type ToastVariant = "success" | "error" | "info";
interface Toast {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
}

interface ToastState {
  toasts: Toast[];
  addToast: (
    title: string,
    variant: ToastVariant,
    description?: string,
  ) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (title, variant, description) => {
    const id = Math.random().toString(36).substring(2, 9);
    set((state) => ({
      // Keep only the last three toasts as per criteria
      toasts: [...state.toasts, { id, title, description, variant }].slice(-3),
    }));

    // Auto dismiss after 3 seconds
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, 3000);
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));
