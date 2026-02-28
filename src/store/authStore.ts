import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: { name: string; email: string; role: string } | null;
  isAuthenticated: boolean;
  login: (userData: { name: string; email: string; role: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (userData) => set({ user: userData, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "bead-luxe-auth-storage",
    },
  ),
);
