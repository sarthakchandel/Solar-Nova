"use client";

import { categories } from "@/lib/data";
import { cn, formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FilterSidebarProps {
  category: string;
  minRating: number;
  maxPrice: number;
  onCategoryChange: (v: string) => void;
  onMinRatingChange: (v: number) => void;
  onMaxPriceChange: (v: number) => void;
  onReset: () => void;
}

export function FilterSidebar({ category, minRating, maxPrice, onCategoryChange, onMinRatingChange, onMaxPriceChange, onReset }: FilterSidebarProps) {
  return (
    <aside className="glass rounded-xl p-6 shadow-soft space-y-6 h-fit sticky top-28">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-primary dark:text-foreground">Filters</h3>
        <button onClick={onReset} className="text-xs text-accent hover:underline">Reset</button>
      </div>

      <div>
        <p className="text-sm font-medium mb-3">Category</p>
        <div className="space-y-1.5">
          <button onClick={() => onCategoryChange("")} className={cn("w-full text-left rounded-lg px-3 py-2 text-sm transition-colors", !category ? "bg-accent/15 text-accent font-medium" : "hover:bg-muted")}>
            All Categories
          </button>
          {categories.map((c) => (
            <button key={c.id} onClick={() => onCategoryChange(c.id)} className={cn("w-full text-left rounded-lg px-3 py-2 text-sm transition-colors", category === c.id ? "bg-accent/15 text-accent font-medium" : "hover:bg-muted")}>
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-medium mb-3">Min Rating: {minRating || "Any"}</p>
        <input type="range" min={0} max={5} step={0.5} value={minRating} onChange={(e) => onMinRatingChange(Number(e.target.value))} className="w-full accent-accent" />
      </div>

      <div>
        <p className="text-sm font-medium mb-3">Max Price: {formatPrice(maxPrice)}</p>
        <input type="range" min={200} max={5000} step={100} value={maxPrice} onChange={(e) => onMaxPriceChange(Number(e.target.value))} className="w-full accent-accent" />
      </div>

      <Button variant="secondary" className="w-full" onClick={onReset}>Clear Filters</Button>
    </aside>
  );
}
