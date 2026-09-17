"use client";

import { useMemo } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { filterServices } from "@/lib/data";
import { useServicesStore } from "@/store";

export function useServiceFilters() {
  const { category, search, location, minRating, maxPrice, sort, setCategory, setSearch, setLocation, setMinRating, setMaxPrice, setSort, resetFilters } = useServicesStore();
  const debouncedSearch = useDebounce(search);

  const results = useMemo(
    () => filterServices({ category, search: debouncedSearch, location, minRating, maxPrice, sort }),
    [category, debouncedSearch, location, minRating, maxPrice, sort]
  );

  return { results, category, search, location, minRating, maxPrice, sort, setCategory, setSearch, setLocation, setMinRating, setMaxPrice, setSort, resetFilters };
}
