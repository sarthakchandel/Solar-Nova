"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useServiceFilters } from "@/features/services/use-service-filters";
import { FilterSidebar } from "@/components/services/filter-sidebar";
import { SortBar } from "@/components/services/sort-bar";
import { ServiceCard } from "@/components/services/service-card";

function ServicesContent() {
  const params = useSearchParams();
  const { results, category, search, location, setLocation, minRating, maxPrice, sort, setCategory, setSearch, setMinRating, setMaxPrice, setSort, resetFilters } = useServiceFilters();

  useEffect(() => {
    const q = params.get("q");
    const cat = params.get("category");
    const loc = params.get("loc");
    if (q) setSearch(q);
    if (cat) setCategory(cat);
    if (loc) setLocation(loc);
  }, [params, setSearch, setCategory, setLocation]);

  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-primary dark:text-foreground">
            Services {location ? `in ${location}` : ""}
          </h1>
          <p className="mt-2 text-muted-foreground">Discover premium home services near you</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="hidden lg:block w-72 shrink-0">
            <FilterSidebar
              category={category}
              minRating={minRating}
              maxPrice={maxPrice}
              onCategoryChange={setCategory}
              onMinRatingChange={setMinRating}
              onMaxPriceChange={setMaxPrice}
              onReset={resetFilters}
            />
          </div>

          <div className="flex-1">
            <SortBar search={search} sort={sort} count={results.length} onSearchChange={setSearch} onSortChange={setSort} />

            {results.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">No services match your filters.</div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {results.map((s, i) => (
                  <motion.div key={s.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                    <ServiceCard service={s} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <Suspense fallback={<div className="pt-32 min-h-screen" />}>
      <ServicesContent />
    </Suspense>
  );
}
