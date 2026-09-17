"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { useCategories, useSubCategories, useServiceTypes } from "@/hooks/use-service-hierarchy";
import { SubCategorySkeleton } from "./hierarchy-skeletons";
import { resolveImageUrl } from "@/services/api.client";
import { motion } from "framer-motion";
import { compareSlugs } from "@/lib/utils";

interface SubCategoryPageViewProps {
  serviceZoneSlug: string;
  categorySlug: string;
  subCategorySlug: string;
}

export function SubCategoryPageView({
  serviceZoneSlug,
  categorySlug,
  subCategorySlug,
}: SubCategoryPageViewProps) {
  // Fetch categories
  const { data: categories, isLoading: isCategoriesLoading, error: categoriesError } = useCategories();
  const category = categories?.find((c) => compareSlugs(c.slug, categorySlug));
  const categoryId = category?.id;

  // Fetch subcategories
  const {
    data: subCategories,
    isLoading: isSubCategoriesLoading,
    error: subCategoriesError,
  } = useSubCategories(categoryId);
  const subCategory = subCategories?.find((s) => compareSlugs(s.slug, subCategorySlug));
  const subCategoryId = subCategory?.id;

  // Fetch service types
  const {
    data: serviceTypes,
    isLoading: isServiceTypesLoading,
    error: serviceTypesError,
  } = useServiceTypes(subCategoryId);

  if (isCategoriesLoading || isSubCategoriesLoading || isServiceTypesLoading) {
    return <SubCategorySkeleton />;
  }

  if (categoriesError || subCategoriesError || serviceTypesError || !category || !subCategory) {
    return (
      <div className="pt-32 pb-24 max-w-5xl mx-auto px-6 text-center space-y-4 min-h-[50vh] flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold text-foreground">Subcategory Not Found</h2>
        <p className="text-muted-foreground">The subcategory you are looking for does not exist or is currently inactive.</p>
        <Link href={`/${serviceZoneSlug}/${categorySlug}`} className="mt-4 px-6 py-2 bg-primary text-white rounded-xl hover:bg-primary/95 transition-colors">
          Back to {category?.name || "Category"}
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
          <Link href={`/${serviceZoneSlug}/${category.slug}`} className="hover:text-foreground">
            {category.name}
          </Link>
          <ChevronRight className="w-3 h-3 mx-1" />
          <span className="text-foreground font-semibold">{subCategory.name}</span>
        </nav>

        {/* Page Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-primary dark:text-foreground">
            {subCategory.name}
          </h1>
          <p className="mt-3 text-muted-foreground max-w-xl">{subCategory.description}</p>
        </motion.div>

        {/* Service Types Grid */}
        {serviceTypes?.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground border border-dashed rounded-3xl p-12">
            No service options available in this subcategory at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {serviceTypes?.map((type, i) => (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={`/${serviceZoneSlug}/${category.slug}/${subCategory.slug}/${type.slug}`}
                  className="group block h-full"
                >
                  <div className="glass rounded-[2rem] overflow-hidden border border-border/50 hover:border-primary/30 hover:shadow-card transition-all duration-300 group-hover:-translate-y-1 h-full flex flex-col justify-between">
                    <div className="relative aspect-[16/10] w-full bg-muted/30 overflow-hidden">
                      {type.imageUrl ? (
                        <img
                          src={resolveImageUrl(type.imageUrl)}
                          alt={type.name}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-4xl bg-primary/5">📦</div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-base text-foreground mb-1 group-hover:text-primary transition-colors">
                        {type.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                        {type.description || "View details and pricing"}
                      </p>
                    </div>
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
