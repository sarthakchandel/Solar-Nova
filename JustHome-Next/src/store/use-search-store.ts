import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Service } from "@/types";

interface SearchState {
  location: string;
  searchQuery: string;
  suggestions: Service[];
  recentSearches: string[];
  isLoading: boolean;
  isDropdownOpen: boolean;
  setLocation: (location: string) => void;
  setSearchQuery: (query: string) => void;
  setSuggestions: (suggestions: Service[]) => void;
  addRecentSearch: (query: string) => void;
  setLoading: (loading: boolean) => void;
  setDropdownOpen: (isOpen: boolean) => void;
  clearRecentSearches: () => void;
}

export const useSearchStore = create<SearchState>()(
  persist(
    (set) => ({
      location: "",
      searchQuery: "",
      suggestions: [],
      recentSearches: [],
      isLoading: false,
      isDropdownOpen: false,
      setLocation: (location) => set({ location }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setSuggestions: (suggestions) => set({ suggestions }),
      addRecentSearch: (query) =>
        set((state) => {
          if (!query.trim()) return state;
          const newRecent = [query, ...state.recentSearches.filter((q) => q !== query)].slice(0, 5);
          return { recentSearches: newRecent };
        }),
      setLoading: (isLoading) => set({ isLoading }),
      setDropdownOpen: (isDropdownOpen) => set({ isDropdownOpen }),
      clearRecentSearches: () => set({ recentSearches: [] }),
    }),
    {
      name: "urban-search-storage",
      partialize: (state) => ({ location: state.location, recentSearches: state.recentSearches }),
    }
  )
);
