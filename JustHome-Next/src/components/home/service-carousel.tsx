"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Star } from "lucide-react";

export interface CarouselItem {
  id: string;
  title: string;
  rating: number;
  reviews: string;
  price: number;
  originalPrice: number | null;
  href: string;
  image: string;
}

interface ServiceCarouselProps {
  title: string;
  subtitle?: string;
  items: CarouselItem[];
}

export function ServiceCarousel({ title, subtitle, items }: ServiceCarouselProps) {
  return (
    <section className="py-12 bg-background overflow-hidden border-t border-border/50">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="font-display text-3xl font-bold text-foreground">{title}</h2>
            {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
          </div>
          <button className="hidden sm:block text-accent font-medium text-sm hover:underline">
            See all
          </button>
        </div>
        
        <div className="relative">
          <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 pb-4 -mx-4 px-4 md:mx-0 md:px-0">
            {items.map((item, i) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="snap-start shrink-0 w-[160px] md:w-[220px] group cursor-pointer"
              >
                <Link href={item.href} className="block">
                  {/* Image Container */}
                  <div className="w-full aspect-square rounded-2xl overflow-hidden mb-3 bg-muted/30 border border-border/50">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                  </div>
                  
                  {/* Text Content */}
                  <h3 className="font-bold text-sm md:text-base text-foreground leading-tight mb-1 group-hover:text-accent transition-colors line-clamp-2 min-h-[40px]">
                    {item.title}
                  </h3>
                  
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                    <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                    <span className="font-medium text-foreground">{item.rating}</span>
                    <span>({item.reviews})</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-bold text-foreground">₹{item.price}</span>
                    {item.originalPrice && (
                      <span className="text-muted-foreground line-through text-xs">₹{item.originalPrice}</span>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          {/* Fading Edge for Desktop */}
          <div className="hidden md:block absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
