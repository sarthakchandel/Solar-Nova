"use client";

import { Search } from "lucide-react";
import { SORT_OPTIONS } from "@/lib/constants";
import type { ServiceFilters } from "@/types";

interface SortBarProps {
  search: string;
  sort: ServiceFilters["sort"];
  count: number;
  onSearchChange: (v: string) => void;
  onSortChange: (v: ServiceFilters["sort"]) => void;
}

export function SortBar({ search, sort, count, onSearchChange, onSortChange }: SortBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search services..."
          className="w-full h-11 pl-10 pr-4 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
        />
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">{count} results</span>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as ServiceFilters["sort"])}
          className="h-11 rounded-xl border border-border bg-card px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
