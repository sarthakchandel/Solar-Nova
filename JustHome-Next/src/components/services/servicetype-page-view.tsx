"use client";

import Link from "next/link";
import { ChevronRight, Home, Clock } from "lucide-react";
import {
  useCategories,
  useSubCategories,
  useServiceTypes,
  useServices,
} from "@/hooks/use-service-hierarchy";
import { ServiceTypeSkeleton } from "./hierarchy-skeletons";
import { resolveImageUrl } from "@/services/api.client";
import { motion } from "framer-motion";
import { compareSlugs } from "@/lib/utils";

interface ServiceTypePageViewProps {
  serviceZoneSlug: string;
  categorySlug: string;
  subCategorySlug: string;
  serviceTypeSlug: string;
}

export function ServiceTypePageView({
  serviceZoneSlug,
  categorySlug,
  subCategorySlug,
  serviceTypeSlug,
}: ServiceTypePageViewProps) {
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
  const serviceType = serviceTypes?.find((t) => compareSlugs(t.slug, serviceTypeSlug));
  const serviceTypeId = serviceType?.id;

  // Fetch services
  const {
    data: services,
    isLoading: isServicesLoading,
    error: servicesError,
  } = useServices(serviceTypeId);

  if (isCategoriesLoading || isSubCategoriesLoading || isServiceTypesLoading || isServicesLoading) {
    return <ServiceTypeSkeleton />;
  }

  if (
    categoriesError ||
    subCategoriesError ||
    serviceTypesError ||
    servicesError ||
    !category ||
    !subCategory ||
    !serviceType
  ) {
    return (
      <div className="pt-32 pb-24 max-w-5xl mx-auto px-6 text-center space-y-4 min-h-[50vh] flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold text-foreground">Service Option Not Found</h2>
        <p className="text-muted-foreground">The service type you are looking for does not exist or is currently inactive.</p>
        <Link href={`/${serviceZoneSlug}/${categorySlug}/${subCategorySlug}`} className="mt-4 px-6 py-2 bg-primary text-white rounded-xl hover:bg-primary/95 transition-colors">
          Back to {subCategory?.name || "Subcategory"}
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
          <Link
            href={`/${serviceZoneSlug}/${category.slug}/${subCategory.slug}`}
            className="hover:text-foreground"
          >
            {subCategory.name}
          </Link>
          <ChevronRight className="w-3 h-3 mx-1" />
          <span className="text-foreground font-semibold">{serviceType.name}</span>
        </nav>

        {/* Page Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-primary dark:text-foreground">
            {serviceType.name}
          </h1>
          <p className="mt-3 text-muted-foreground max-w-xl">{serviceType.description}</p>
        </motion.div>

        {/* Services List */}
        {services?.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground border border-dashed rounded-3xl p-12">
            No specific services available under this category at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services?.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={`/${serviceZoneSlug}/${category.slug}/${subCategory.slug}/${serviceType.slug}/${service.slug}`}
                  className="group block h-full"
                >
                  <div className="glass rounded-[2rem] p-6 border border-border/50 hover:border-primary/30 hover:shadow-card transition-all duration-300 group-hover:-translate-y-1 h-full flex gap-5">
                    <div className="relative h-24 w-24 rounded-2xl bg-muted/40 border border-border/50 overflow-hidden shrink-0 flex items-center justify-center">
                      {service.imageUrl ? (
                        <img
                          src={resolveImageUrl(service.imageUrl)}
                          alt={service.name}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <span className="text-4xl">🛠️</span>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors leading-snug">
                            {service.name}
                          </h3>
                          {service.isInstantBookable && (
                            <span className="flex items-center gap-0.5 text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full shrink-0 border border-emerald-500/20">
                              <Clock className="w-2.5 h-2.5" /> Instant
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                          {service.description}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                          <span>⏱️ {service.durationMinutes} mins</span>
                          <span>•</span>
                          <span>🛡️ {service.warrantyDays} days warranty</span>
                        </div>
                        <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                          From ₹{service.basePrice}
                        </span>
                      </div>
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
