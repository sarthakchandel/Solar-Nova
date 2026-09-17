"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { compareSlugs } from "@/lib/utils";
import { resolveImageUrl } from "@/services/api.client";
import {
  ChevronRight,
  Home,
  Star,
  Clock,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  HelpCircle,
  MessageSquare,
  Sparkles,
  ArrowRight,
  ShoppingCart,
} from "lucide-react";
import {
  useCategories,
  useSubCategories,
  useServiceTypes,
  useServices,
  useServiceContent,
  useServiceFaq,
  useServiceProcess,
  useServiceReview,
  useServiceVariant,
  useVariantPricing,
} from "@/hooks/use-service-hierarchy";
import { useCurrentServiceZone } from "@/hooks/use-current-service-zone";
import { useCartStore } from "@/store/use-cart-store";
import { ServiceDetailSkeleton } from "./hierarchy-skeletons";
import { ServiceVariant, ServiceItem } from "@/types/service-hierarchy";
import { motion, AnimatePresence } from "framer-motion";

interface ServiceDetailPageViewProps {
  serviceZoneSlug: string;
  categorySlug: string;
  subCategorySlug: string;
  serviceTypeSlug: string;
  serviceSlug: string;
}

// Subcomponent to handle individual Variant Pricing and Add to Cart
function VariantCard({
  variant,
  cityId,
  service,
  cartItem,
  onAdd,
}: {
  variant: ServiceVariant;
  cityId?: string;
  service: ServiceItem;
  cartItem?: any;
  onAdd: (item: any) => void;
}) {
  const { data: pricing } = useVariantPricing(variant.id, cityId);

  const price = pricing ? pricing.price : variant.sellingPrice;
  const discountPercent = pricing ? pricing.discountPercent : (variant.basePrice > variant.sellingPrice ? Math.round(((variant.basePrice - variant.sellingPrice) / variant.basePrice) * 100) : 0);
  const finalPrice = pricing ? (discountPercent > 0 ? price - (price * discountPercent) / 100 : price) : price;
  const tax = finalPrice * 0.18; // 18% GST estimate
  const finalWithTax = finalPrice + tax;
  const displayOriginalPrice = pricing ? (discountPercent > 0 ? price : null) : (variant.basePrice > variant.sellingPrice ? variant.basePrice : null);

  const handleAdd = () => {
    onAdd({
      serviceId: variant.id,
      parentServiceId: service.id,
      title: `${service.name} - ${variant.name}`,
      price: Math.round(finalWithTax),
      image: resolveImageUrl(variant.imageUrl) || resolveImageUrl(service.imageUrl) || "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=400",
    });
  };

  return (
    <div className="glass rounded-[2rem] border border-border/50 p-6 flex flex-col justify-between hover:border-primary/30 transition-all duration-300">
      <div>
        <div className="flex justify-between items-start gap-4 mb-2">
          <h3 className="text-xl font-bold text-foreground leading-tight">{variant.name}</h3>
          <span className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full shrink-0">
            <Clock className="w-3.5 h-3.5" /> {variant.durationMinutes} mins
          </span>
        </div>
        <p className="text-sm text-muted-foreground mb-6 line-clamp-3">{variant.description}</p>
      </div>

      <div className="border-t border-border/50 pt-4 mt-auto">
        <div className="flex justify-between items-end mb-4">
          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-foreground">₹{Math.round(finalWithTax)}</span>
              {displayOriginalPrice && (
                <span className="text-sm text-muted-foreground line-through">₹{Math.round(displayOriginalPrice * 1.18)}</span>
              )}
            </div>
            <div className="text-[10px] text-muted-foreground">
              Includes 18% GST (₹{Math.round(tax)})
            </div>
          </div>
          {discountPercent > 0 && (
            <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/20">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {cartItem ? (
          <div className="flex items-center bg-card border border-primary rounded-xl overflow-hidden h-12 shadow-sm">
            <button
              onClick={() => onAdd({ ...cartItem, quantity: cartItem.quantity - 1 })}
              className="flex-1 h-full flex items-center justify-center text-primary font-bold text-xl hover:bg-primary/10 transition-colors"
            >
              -
            </button>
            <span className="w-8 text-center text-foreground font-bold">{cartItem.quantity}</span>
            <button
              onClick={handleAdd}
              className="flex-1 h-full flex items-center justify-center text-primary font-bold text-xl hover:bg-primary/10 transition-colors"
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={handleAdd}
            className="w-full h-12 rounded-xl bg-primary text-white font-bold shadow-soft hover:bg-primary/95 hover:shadow-card transition-all duration-300"
          >
            Add Package
          </button>
        )}
      </div>
    </div>
  );
}

export function ServiceDetailPageView({
  serviceZoneSlug,
  categorySlug,
  subCategorySlug,
  serviceTypeSlug,
  serviceSlug,
}: ServiceDetailPageViewProps) {
  const router = useRouter();
  const { currentZone } = useCurrentServiceZone();
  const cityId = currentZone?.id;

  const { items: cartItems, addItem } = useCartStore();

  // 1. Fetch categories -> Category matching slug
  const { data: categories, isLoading: isCategoriesLoading } = useCategories();
  const category = categories?.find((c) => compareSlugs(c.slug, categorySlug));
  const categoryId = category?.id;

  // 2. Fetch subcategories -> SubCategory matching slug
  const { data: subCategories, isLoading: isSubCategoriesLoading } = useSubCategories(categoryId);
  const subCategory = subCategories?.find((s) => compareSlugs(s.slug, subCategorySlug));
  const subCategoryId = subCategory?.id;

  // 3. Fetch service types -> ServiceType matching slug
  const { data: serviceTypes, isLoading: isServiceTypesLoading } = useServiceTypes(subCategoryId);
  const serviceType = serviceTypes?.find((t) => compareSlugs(t.slug, serviceTypeSlug));
  const serviceTypeId = serviceType?.id;

  // 4. Fetch services under service type -> find service
  const { data: services, isLoading: isServicesLoading } = useServices(serviceTypeId);
  const service = services?.find((s) => compareSlugs(s.slug, serviceSlug));
  const serviceId = service?.id;

  // 5. Parallel queries for service contents once serviceId is resolved
  const { data: contents, isLoading: isContentsLoading } = useServiceContent(serviceId);
  const { data: faqs, isLoading: isFaqsLoading } = useServiceFaq(serviceId);
  const { data: processes, isLoading: isProcessesLoading } = useServiceProcess(serviceId);
  const { data: reviews, isLoading: isReviewsLoading } = useServiceReview(serviceId);
  const { data: variants, isLoading: isVariantsLoading } = useServiceVariant(serviceId);

  // Pagination for reviews
  const [reviewsPage, setReviewsPage] = useState(1);
  const REVIEWS_PER_PAGE = 3;

  const paginatedReviews = useMemo(() => {
    if (!reviews) return [];
    const startIndex = (reviewsPage - 1) * REVIEWS_PER_PAGE;
    return reviews.slice(startIndex, startIndex + REVIEWS_PER_PAGE);
  }, [reviews, reviewsPage]);

  const totalReviewsPages = useMemo(() => {
    if (!reviews) return 0;
    return Math.ceil(reviews.length / REVIEWS_PER_PAGE);
  }, [reviews]);

  // Content type groups
  const aboutContent = contents?.find((c) => c.contentType === 1);
  const highlights = contents?.filter((c) => c.contentType === 2) || [];
  const inclusions = contents?.filter((c) => c.contentType === 3) || [];
  const exclusions = contents?.filter((c) => c.contentType === 4) || [];
  const terms = contents?.filter((c) => c.contentType === 5) || [];

  const handleAddToCart = (item: any) => {
    addItem(item);
  };


  // Cart values
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const isLoading =
    isCategoriesLoading ||
    isSubCategoriesLoading ||
    isServiceTypesLoading ||
    isServicesLoading ||
    isContentsLoading ||
    isFaqsLoading ||
    isProcessesLoading ||
    isReviewsLoading ||
    isVariantsLoading;

  if (isLoading) {
    return <ServiceDetailSkeleton />;
  }

  if (!category || !subCategory || !serviceType || !service) {
    return (
      <div className="pt-32 pb-24 max-w-5xl mx-auto px-6 text-center space-y-4 min-h-[50vh] flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold text-foreground">Service Details Not Found</h2>
        <p className="text-muted-foreground">The service details you are looking for do not exist or are currently inactive.</p>
        <Link href={`/${serviceZoneSlug}`} className="mt-4 px-6 py-2 bg-primary text-white rounded-xl hover:bg-primary/95 transition-colors">
          Go Back Home
        </Link>
      </div>
    );
  }

  // Calculate average rating
  const avgRating = reviews && reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : "4.8";

  // Filter related services (excluding current service)
  const relatedServices = services?.filter((s) => s.id !== serviceId).slice(0, 3) || [];

  return (
    <div className="min-h-screen bg-background pt-24 pb-32 relative">
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs text-muted-foreground mb-6">
          <Link href={`/${serviceZoneSlug}`} className="hover:text-foreground flex items-center gap-1">
            <Home className="w-3 h-3" /> Home
          </Link>
          <Link href={`/${serviceZoneSlug}/${category.slug}`} className="hover:text-foreground">
            {category.name}
          </Link>
          <ChevronRight className="w-3 h-3 mx-1" />
          <Link href={`/${serviceZoneSlug}/${category.slug}/${subCategory.slug}`} className="hover:text-foreground">
            {subCategory.name}
          </Link>
          <ChevronRight className="w-3 h-3 mx-1" />
          <Link href={`/${serviceZoneSlug}/${category.slug}/${subCategory.slug}/${serviceType.slug}`} className="hover:text-foreground">
            {serviceType.name}
          </Link>
          <ChevronRight className="w-3 h-3 mx-1" />
          <span className="text-foreground font-semibold">{service.name}</span>
        </nav>

        {/* Dynamic Service Main Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start relative mt-4">
          
          {/* Sticky Left Column: Service Core Details */}
          <div className="w-full lg:w-64 xl:w-72 shrink-0 lg:sticky lg:top-24 self-start space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-3xl xl:text-4xl font-display font-bold text-foreground leading-tight">
                  {service.name}
                </h1>
                {service.isInstantBookable && (
                  <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1 shrink-0 mt-1.5 border border-emerald-500/20">
                    <Clock className="w-3 h-3" />
                    Instant
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 text-sm font-medium mt-3">
                <div className="flex items-center gap-1 text-foreground">
                  <Star className="w-4 h-4 fill-foreground" />
                  <span className="text-base">{avgRating}</span>
                </div>
                <span className="text-muted-foreground text-xs">
                  ({reviews?.length || 0} customer reviews)
                </span>
              </div>
            </div>

            <div className="glass rounded-2xl border border-border p-6 space-y-4">
              <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" /> Service Guarantee
              </h3>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{service.warrantyDays} Days Warranty</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Background Verified Experts</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>No hidden visit fees</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Fluid Column */}
          <div className="flex-1 w-full space-y-10">
            {/* Image Gallery / Hero banner */}
            <div className="relative aspect-[21/9] w-full rounded-3xl overflow-hidden bg-muted border border-border shadow-lg">
              {service.imageUrl ? (
                <img
                  src={resolveImageUrl(service.imageUrl)}
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl">🛠️</div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
            </div>

            {/* Description / About */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">About the Service</h2>
              <p className="text-muted-foreground leading-relaxed">
                {aboutContent?.description || service.description}
              </p>

              {/* Highlights rendered dynamically if present */}
              {highlights.length > 0 && (
                <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10 mt-4 space-y-3">
                  <h4 className="font-bold text-sm text-primary uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" /> Service Highlights
                  </h4>
                  <ul className="grid sm:grid-cols-2 gap-2 text-sm text-foreground/80 pl-1">
                    {highlights.map((hl) => (
                      <li key={hl.id} className="flex items-center gap-2">
                        <span className="h-1.5 h-1.5 bg-primary rounded-full shrink-0" />
                        <span>{hl.title}: {hl.description}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Service Packages / Variants */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-foreground">Select Package</h2>
                {currentZone && (
                  <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full border border-border">
                    📍 Pricing for <strong className="text-foreground">{currentZone.name}</strong>
                  </span>
                )}
              </div>
              
              {variants?.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground border border-dashed rounded-3xl p-6">
                  No packages available at the moment.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {variants?.map((v) => (
                    <VariantCard
                      key={v.id}
                      variant={v}
                      cityId={cityId}
                      service={service}
                      cartItem={cartItems.find((c) => c.serviceId === v.id)}
                      onAdd={handleAddToCart}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* What's Included & Excluded Grid */}
            {(inclusions.length > 0 || exclusions.length > 0) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-border/50 pt-8">
                {inclusions.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" /> What's Included
                    </h3>
                    <ul className="space-y-3">
                      {inclusions.map((inc) => (
                        <li key={inc.id} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-foreground block">{inc.title}</span>
                            <span>{inc.description}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {exclusions.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-destructive" /> Excluded / Add-ons Extra
                    </h3>
                    <ul className="space-y-3">
                      {exclusions.map((exc) => (
                        <li key={exc.id} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <XCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-foreground block">{exc.title}</span>
                            <span>{exc.description}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Stepper Timeline: How it Works */}
            {processes && processes.length > 0 && (
              <div className="border-t border-border/50 pt-8 space-y-6">
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" /> How Service Works
                </h2>
                <div className="relative border-l border-border/70 ml-4 pl-8 space-y-8">
                  {processes
                    .sort((a, b) => a.stepNumber - b.stepNumber)
                    .map((step) => (
                      <div key={step.id} className="relative">
                        {/* Bullet step bubble */}
                        <span className="absolute -left-[45px] top-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-xs font-bold shadow-md">
                          {step.stepNumber}
                        </span>
                        <div>
                          <h4 className="font-bold text-foreground text-base leading-snug">{step.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1 max-w-lg">{step.description}</p>
                          {step.imageUrl && (
                            <img
                              src={step.imageUrl}
                              alt={step.title}
                              className="mt-3 rounded-lg max-h-36 object-cover border border-border"
                            />
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Accordion FAQ section */}
            {faqs && faqs.length > 0 && (
              <div className="border-t border-border/50 pt-8 space-y-6">
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary" /> Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {faqs.map((faq) => (
                    <details
                      key={faq.id}
                      className="group border border-border/50 rounded-2xl glass p-5 transition-all duration-300 [&_summary::-webkit-details-marker]:hidden"
                    >
                      <summary className="flex items-center justify-between cursor-pointer outline-none">
                        <span className="font-bold text-foreground text-sm pr-4">{faq.question}</span>
                        <span className="transition-transform duration-300 group-open:rotate-180 shrink-0 text-muted-foreground">
                          ▼
                        </span>
                      </summary>
                      <p className="text-sm text-muted-foreground mt-3 leading-relaxed border-t border-border/30 pt-3">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            )}

            {/* Customer reviews section */}
            {reviews && reviews.length > 0 && (
              <div className="border-t border-border/50 pt-8 space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-primary" /> Customer Reviews
                  </h2>
                  <div className="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-primary" /> {avgRating} rating
                  </div>
                </div>

                <div className="space-y-4">
                  {paginatedReviews.map((rev) => (
                    <div key={rev.id} className="glass p-5 rounded-2xl border border-border/50 space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center">
                            {(rev.customerName || "U").charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-foreground leading-tight">
                              {rev.customerName || "Verified User"}
                            </h4>
                            {rev.isVerified && (
                              <span className="text-[10px] text-emerald-500 font-semibold flex items-center gap-0.5 mt-0.5">
                                ✓ Verified Booking
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < rev.rating
                                  ? "text-primary fill-primary"
                                  : "text-muted"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed pl-1">
                        {rev.reviewText}
                      </p>
                    </div>
                  ))}

                  {/* Review Pagination */}
                  {totalReviewsPages > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-6">
                      <button
                        onClick={() => setReviewsPage((p) => Math.max(1, p - 1))}
                        disabled={reviewsPage === 1}
                        className="px-4 py-2 border border-border rounded-xl text-xs font-semibold hover:bg-muted disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                      >
                        Previous
                      </button>
                      <span className="text-xs text-muted-foreground font-semibold">
                        Page {reviewsPage} of {totalReviewsPages}
                      </span>
                      <button
                        onClick={() => setReviewsPage((p) => Math.min(totalReviewsPages, p + 1))}
                        disabled={reviewsPage === totalReviewsPages}
                        className="px-4 py-2 border border-border rounded-xl text-xs font-semibold hover:bg-muted disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Terms and conditions footnote if present */}
            {terms.length > 0 && (
              <div className="bg-muted/30 rounded-2xl p-5 border border-border/50 border-t pt-6 space-y-2">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                  Terms & Conditions
                </h4>
                <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1 pl-1">
                  {terms.map((t) => (
                    <li key={t.id}>
                      <strong className="text-foreground/80">{t.title}:</strong> {t.description}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Related Services */}
            {relatedServices.length > 0 && (
              <div className="border-t border-border/50 pt-8 space-y-6">
                <h2 className="text-2xl font-bold text-foreground">Related Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedServices.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/${serviceZoneSlug}/${category.slug}/${subCategory.slug}/${serviceType.slug}/${rel.slug}`}
                      className="group block"
                    >
                      <div className="glass rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300 h-full flex flex-col justify-between">
                        <div className="relative aspect-[16/10] bg-muted/40 w-full overflow-hidden">
                          {rel.imageUrl ? (
                            <img
                              src={resolveImageUrl(rel.imageUrl)}
                              alt={rel.name}
                              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-3xl">🛠️</div>
                          )}
                        </div>
                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <h4 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1 leading-snug">
                            {rel.name}
                          </h4>
                          <div className="flex items-center justify-between mt-3">
                            <span className="text-xs text-muted-foreground">⏱️ {rel.durationMinutes}m</span>
                            <span className="text-xs font-bold text-foreground">From ₹{rel.basePrice}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <AnimatePresence>
        {totalCartCount > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 pointer-events-none"
          >
            <div className="max-w-4xl mx-auto pointer-events-auto">
              <div className="w-full bg-card border border-primary/30 rounded-[2rem] p-4 md:p-5 shadow-[0_10px_40px_rgba(201,169,110,0.15)] backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 w-full sm:w-auto px-2">
                  <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-sm shrink-0">
                    <ShoppingCart className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">
                      Cart Summary
                    </p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-2xl font-bold text-foreground">₹{Math.round(totalCartPrice)}</p>
                      <p className="text-sm text-muted-foreground font-medium">
                        ({totalCartCount} item{totalCartCount > 1 ? "s" : ""})
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => router.push("/cart")}
                  className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-primary text-white text-lg font-bold shadow-soft hover:shadow-card hover:bg-primary/95 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  Go to Cart <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
