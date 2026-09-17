import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types";

interface UserStore {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  role: "Customer" | "Worker" | null;
  login: (token: string, user: User, role: "Customer" | "Worker") => void;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: null,
      user: null,
      role: null,
      login: (token, user, role) => set({ isAuthenticated: true, token, user, role }),
      logout: () => set({ isAuthenticated: false, token: null, user: null, role: null }),
      updateProfile: (data) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        })),
    }),
    { name: "rapid-help-user" }
  )
);
