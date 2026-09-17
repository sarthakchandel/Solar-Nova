"use client";

import { motion } from "framer-motion";
import { MapPin, Search } from "lucide-react";
import Link from "next/link";
import { categories } from "@/lib/data";
import * as Icons from "lucide-react";

export default function CategoriesNearYouPage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-20 selection:bg-accent/30">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold tracking-wide uppercase flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Detected Location: Mumbai
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
            Categories <span className="text-accent-gradient">Near You</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Browse our comprehensive list of premium services instantly available in your neighborhood.
          </p>
          
          <div className="max-w-md mx-auto relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-accent transition-colors" />
            <input 
              type="text" 
              placeholder="Search for a category..." 
              className="w-full h-14 pl-12 pr-4 rounded-2xl bg-card border border-border focus:border-accent/50 focus:ring-1 focus:ring-accent/50 outline-none transition-all shadow-sm"
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => {
            const Icon = Icons[cat.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
            return (
              <motion.div 
                key={cat.id} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: i * 0.05 }}
              >
                <Link href={`/services?category=${cat.id}`} className="group block h-full">
                  <div className="glass h-full rounded-2xl p-6 text-center shadow-soft hover:shadow-card transition-all duration-300 group-hover:-translate-y-1 hover:border-accent/30 flex flex-col items-center justify-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/5 mb-4 group-hover:bg-accent/10 group-hover:scale-110 transition-all duration-300">
                      {Icon && <Icon className="h-7 w-7 text-primary group-hover:text-accent transition-colors" />}
                    </div>
                    <h3 className="font-semibold text-foreground mb-1 group-hover:text-accent transition-colors">{cat.name}</h3>
                    <p className="text-xs text-muted-foreground font-medium bg-muted px-2 py-0.5 rounded-full mt-2">Available Now</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
