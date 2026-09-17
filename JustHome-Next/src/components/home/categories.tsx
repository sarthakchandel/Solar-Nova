"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { useCategories } from "@/hooks/use-service-hierarchy";
import { useCurrentServiceZone } from "@/hooks/use-current-service-zone";
import { resolveImageUrl } from "@/services/api.client";

export function Categories() {
  const { data: categories, isLoading } = useCategories();
  const { currentZone } = useCurrentServiceZone();
  const serviceZoneSlug = currentZone?.slug || "delhi";

  const getCategoryEmoji = (slug: string, name: string) => {
    const s = slug.toLowerCase();
    const n = name.toLowerCase();
    if (s.includes("insta") || n.includes("insta")) return "⚡";
    if (s.includes("ac") || n.includes("ac")) return "❄️";
    if (s.includes("wash") || n.includes("wash") || s.includes("laundry")) return "🧺";
    if (s.includes("refrigerator") || n.includes("fridge") || s.includes("fridge")) return "🧊";
    if (s.includes("geyser") || n.includes("geyser")) return "🌡️";
    if (s.includes("electric") || n.includes("electric")) return "🔌";
    if (s.includes("plumb") || n.includes("plumb")) return "🚰";
    if (s.includes("ro") || n.includes("purifier")) return "💧";
    if (s.includes("paint") || n.includes("paint")) return "🎨";
    if (s.includes("clean") || n.includes("clean")) return "🧹";
    if (s.includes("pest") || n.includes("pest")) return "🐜";
    if (s.includes("salon") || n.includes("salon") || s.includes("hair")) return "💇‍♀️";
    if (s.includes("spa") || n.includes("spa")) return "🧖‍♀️";
    if (s.includes("massage") || n.includes("massage")) return "💆‍♂️";
    if (s.includes("appliance") || n.includes("appliance")) return "🔧";
    return "🛠️";
  };

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-primary dark:text-foreground">
            Browse Categories
          </h2>
          <p className="mt-3 text-muted-foreground">Find the perfect service for your home</p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="glass rounded-xl p-6 text-center animate-pulse space-y-4 border border-border/50"
              >
                <div className="h-12 w-12 rounded-xl bg-muted-foreground/10 mx-auto" />
                <div className="h-4 w-24 bg-muted-foreground/10 mx-auto rounded" />
                <div className="h-3 w-16 bg-muted-foreground/10 mx-auto rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {categories?.map((cat, i) => {
              // Try to find Lucide Icon if iconUrl is a valid icon name
              const Icon = Icons[cat.iconUrl as keyof typeof Icons] as React.ComponentType<{
                className?: string;
              }>;

              const emoji = getCategoryEmoji(cat.slug, cat.name);
              const isPath = cat.iconUrl && (cat.iconUrl.startsWith("/") || cat.iconUrl.startsWith("http"));

              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link href={`/${serviceZoneSlug}/${cat.slug}`} className="group block">
                    <div className="glass rounded-xl p-6 text-center shadow-soft hover:shadow-card transition-all duration-300 group-hover:-translate-y-1 border border-border/50 hover:border-primary/30">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                        {Icon ? (
                          <Icon className="h-6 w-6 text-primary" />
                        ) : isPath ? (
                          <img src={resolveImageUrl(cat.iconUrl)} alt={cat.name} className="h-6 w-6 object-contain" />
                        ) : (
                          <span className="text-2xl">{emoji}</span>
                        )}
                      </div>
                      <h3 className="font-semibold text-xs sm:text-sm leading-snug text-foreground group-hover:text-primary transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                        {cat.description || "Explore services"}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
