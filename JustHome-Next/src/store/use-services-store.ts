import { create } from "zustand";
import type { ServiceFilters } from "@/types";

interface ServicesStore extends ServiceFilters {
  setCategory: (category: string) => void;
  setSearch: (search: string) => void;
  setLocation: (location: string) => void;
  setMinRating: (rating: number) => void;
  setMaxPrice: (price: number) => void;
  setSort: (sort: ServiceFilters["sort"]) => void;
  resetFilters: () => void;
}

const defaults: ServiceFilters = {
  category: "",
  search: "",
  location: "Mumbai",
  minRating: 0,
  maxPrice: 5000,
  sort: "popular",
};

export const useServicesStore = create<ServicesStore>((set) => ({
  ...defaults,
  setCategory: (category) => set({ category }),
  setSearch: (search) => set({ search }),
  setLocation: (location) => set({ location }),
  setMinRating: (minRating) => set({ minRating }),
  setMaxPrice: (maxPrice) => set({ maxPrice }),
  setSort: (sort) => set({ sort }),
  resetFilters: () => set(defaults),
}));
