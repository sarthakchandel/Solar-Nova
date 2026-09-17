import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function compareSlugs(slug1: string, slug2: string): boolean {
  if (!slug1 || !slug2) return false;
  const clean = (s: string) =>
    decodeURIComponent(s)
      .toLowerCase()
      .replace(/[\s-_]+/g, "-")
      .trim();
  return clean(slug1) === clean(slug2);
}
