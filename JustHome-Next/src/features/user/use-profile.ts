"use client";

import { useUserStore } from "@/store";

export function useProfile() {
  const { user, isAuthenticated, updateProfile } = useUserStore();
  return { user, isAuthenticated, updateProfile };
}
