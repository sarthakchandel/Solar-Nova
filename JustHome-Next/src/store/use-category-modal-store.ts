import { create } from "zustand";
import { CategoryData } from "@/lib/category-data";

interface CategoryModalState {
  isOpen: boolean;
  selectedCategory: CategoryData | null;
  openModal: (category: CategoryData) => void;
  closeModal: () => void;
}

export const useCategoryModalStore = create<CategoryModalState>((set) => ({
  isOpen: false,
  selectedCategory: null,
  openModal: (category) => set({ isOpen: true, selectedCategory: category }),
  closeModal: () => set({ isOpen: false, selectedCategory: null }),
}));
