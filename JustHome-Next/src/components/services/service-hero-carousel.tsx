"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const CAROUSEL_DATA: Record<string, { title: string; subtitle: string; images: string[] }> = {
  "maid-help": {
    title: "Premium Maid Services",
    subtitle: "Spotless homes, zero hassle.",
    images: [
      "/images/insta-help-maids.png",
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200", // cleaning 
      "https://images.unsplash.com/photo-1527515637462-8ff46b9ec9d5?q=80&w=1200", // cleaning woman
    ],
  },
  "insta-help": {
    title: "InstaHelp by Rapid Help",
    subtitle: "Trained professionals at your doorstep in 10 minutes.",
    images: [
      "https://images.unsplash.com/photo-1581141849291-1125c7b692b5?q=80&w=1200",
      "https://images.unsplash.com/photo-1556910103-1c02745a8288?q=80&w=1200",
    ],
  },
  "ac": {
    title: "Expert AC Services",
    subtitle: "Stay cool with our power-jet deep cleaning.",
    images: [
      "/images/ac-cleaning.png",
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=1200",
    ],
  },
  "electrician": {
    title: "Master Electricians",
    subtitle: "Safe & reliable electrical work for your luxury home.",
    images: [
      "/images/electrician-expert.png",
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200",
    ],
  },
  "plumber": {
    title: "Professional Plumbing",
    subtitle: "Fixing leaks with precision and care.",
    images: [
      "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=1200",
      "https://images.unsplash.com/photo-1607472586893-edb57cb5b364?q=80&w=1200",
    ],
  },
  "default": {
    title: "Rapid Help Premium",
    subtitle: "The gold standard of home services.",
    images: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
    ],
  }
};

export function ServiceHeroCarousel({ serviceId }: { serviceId: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const data = CAROUSEL_DATA[serviceId] || CAROUSEL_DATA["default"];
  const images = data.images;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Auto-play interval
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative w-full h-[250px] md:h-[350px] lg:h-[400px] rounded-3xl overflow-hidden mb-12 shadow-2xl group">
      {/* Images with crossfade animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={images[currentIndex]}
            alt="Service hero"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button 
        onClick={(e) => { e.stopPropagation(); prevSlide(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-900 shadow-lg hover:bg-slate-100 transition-all duration-300 z-20 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button 
        onClick={(e) => { e.stopPropagation(); nextSlide(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-900 shadow-lg hover:bg-slate-100 transition-all duration-300 z-20 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />

      {/* Text Content overlay */}
      <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
        <motion.h2 
          key={`title-${currentIndex}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl md:text-5xl font-display font-bold text-white mb-3"
        >
          {data.title}
        </motion.h2>
        <motion.p
          key={`subtitle-${currentIndex}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-white/80 text-lg md:text-xl font-medium max-w-2xl"
        >
          {data.subtitle}
        </motion.p>
      </div>

      {/* Navigation Indicators */}
      <div className="absolute bottom-8 right-8 flex gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`transition-all duration-300 rounded-full ${
              idx === currentIndex 
                ? "w-8 h-2 bg-accent shadow-[0_0_10px_rgba(201,169,110,0.8)]" 
                : "w-2 h-2 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
