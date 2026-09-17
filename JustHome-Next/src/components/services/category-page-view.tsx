"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { useCategories, useSubCategories } from "@/hooks/use-service-hierarchy";
import { CategorySkeleton } from "./hierarchy-skeletons";
import { resolveImageUrl } from "@/services/api.client";
import { motion } from "framer-motion";
import { compareSlugs } from "@/lib/utils";

interface CategoryPageViewProps {
  serviceZoneSlug: string;
  categorySlug: string;
}

export function CategoryPageView({ serviceZoneSlug, categorySlug }: CategoryPageViewProps) {
  const { data: categories, isLoading: isCategoriesLoading, error: categoriesError } = useCategories();

  // Find category matching categorySlug
  const category = categories?.find((c) => compareSlugs(c.slug, categorySlug));
  const categoryId = category?.id;

  const {
    data: subCategories,
    isLoading: isSubCategoriesLoading,
    error: subCategoriesError,
  } = useSubCategories(categoryId);

  if (isCategoriesLoading || (categoryId && isSubCategoriesLoading)) {
    return <CategorySkeleton />;
  }

  if (categoriesError || subCategoriesError || !category) {
    return (
      <div className="pt-32 pb-24 max-w-5xl mx-auto px-6 text-center space-y-4 min-h-[50vh] flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold text-foreground">Category Not Found</h2>
        <p className="text-muted-foreground">The service category you are looking for does not exist or is currently inactive.</p>
        <Link href={`/${serviceZoneSlug}`} className="mt-4 px-6 py-2 bg-primary text-white rounded-xl hover:bg-primary/95 transition-colors">
          Go Back Home
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-5xl px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs text-muted-foreground mb-8">
          <Link href={`/${serviceZoneSlug}`} className="hover:text-foreground flex items-center gap-1">
            <Home className="w-3 h-3" /> Home
          </Link>
          <ChevronRight className="w-3 h-3 mx-1" />
          <span className="text-foreground font-semibold">{category.name}</span>
        </nav>

        {/* Page Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-primary dark:text-foreground">
            {category.name}
          </h1>
          <p className="mt-3 text-muted-foreground max-w-xl">{category.description}</p>
        </motion.div>

        {/* Subcategories Grid */}
        {subCategories?.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground border border-dashed rounded-3xl p-12">
            No subcategories available in this category at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {subCategories?.map((sub, i) => (
              <motion.div
                key={sub.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={`/${serviceZoneSlug}/${category.slug}/${sub.slug}`}
                  className="group block h-full"
                >
                  <div className="glass rounded-2xl p-6 text-center border border-border/50 hover:border-primary/30 hover:shadow-card transition-all duration-300 group-hover:-translate-y-1 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                        {sub.iconUrl && (sub.iconUrl.startsWith("/") || sub.iconUrl.startsWith("http")) ? (
                          <img src={resolveImageUrl(sub.iconUrl)} alt={sub.name} className="h-10 w-10 object-contain" />
                        ) : (
                          <span className="text-3xl">{sub.iconUrl || "🛠️"}</span>
                        )}
                      </div>
                      <h3 className="font-bold text-sm leading-snug text-foreground mb-1 group-hover:text-primary transition-colors">
                        {sub.name}
                      </h3>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                      {sub.description || "Browse available services"}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
