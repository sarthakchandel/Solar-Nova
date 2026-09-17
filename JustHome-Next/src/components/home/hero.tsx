"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useCategories } from "@/hooks/use-service-hierarchy";
import { useCurrentServiceZone } from "@/hooks/use-current-service-zone";
import { resolveImageUrl } from "@/services/api.client";

const images = [
  "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1000",
  "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1000",
  "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000",
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1000",
];

export function Hero() {
  const { currentZone } = useCurrentServiceZone();
  const { data: categories, isLoading } = useCategories();

  const serviceZoneSlug = currentZone?.slug || "delhi";
  const quickCategories = categories?.slice(0, 4) || [];

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

  const getCategoryTime = (slug: string) => {
    const s = slug.toLowerCase();
    if (s.includes("insta")) return "14 mins";
    if (s.includes("ac")) return "44 mins";
    if (s.includes("electric") || s.includes("plumb")) return "19 mins";
    return null;
  };

  return (
    <section className="relative pt-28 pb-16 lg:pt-32 lg:pb-16 overflow-hidden bg-primary text-white selection:bg-[#C9A96E]/30 min-h-[calc(100vh-80px)] flex items-center">
      {/* Background Glows */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[#C9A96E]/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 xl:gap-24 items-center">
          
          {/* Left Side: Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6">
              Expert care for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A96E] to-[#E3CBA3]">your home</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-300/80 leading-relaxed font-light max-w-xl mb-10">
              Insta help, precise repairs, and premium maids — booked in seconds, delivered to your door with uncompromising quality.
            </p>

            {/* Quick Services Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl max-w-[540px]"
            >
              <div className="grid grid-cols-4 gap-x-4 gap-y-6">
                {isLoading ? (
                  Array.from({ length: 4 }).map((_, idx) => (
                    <div key={idx} className="flex flex-col items-center space-y-3">
                      <div className="w-16 h-16 rounded-2xl bg-white/10 animate-pulse" />
                      <div className="w-12 h-3 bg-white/10 animate-pulse rounded" />
                    </div>
                  ))
                ) : (
                  quickCategories.map((cat) => {
                    const isPath = cat.iconUrl && (cat.iconUrl.startsWith("/") || cat.iconUrl.startsWith("http"));
                    const icon = isPath ? null : (cat.iconUrl || getCategoryEmoji(cat.slug, cat.name));
                    const time = getCategoryTime(cat.slug);

                    return (
                      <Link
                        href={`/${serviceZoneSlug}/${cat.slug}`}
                        key={cat.id}
                        className="flex flex-col items-center text-center group cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]/50 rounded-2xl p-1"
                      >
                        <div className="relative mb-3 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105">
                          <div className="w-16 h-16 sm:w-16 sm:h-16 rounded-2xl bg-white/10 border border-white/5 flex items-center justify-center overflow-hidden text-3xl shadow-inner group-hover:bg-white/20 transition-colors duration-300">
                            {icon ? (
                              icon
                            ) : (
                              <img src={resolveImageUrl(cat.iconUrl)} alt={cat.name} className="w-10 h-10 object-contain" />
                            )}
                          </div>
                          {time && (
                            <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold whitespace-nowrap backdrop-blur-md shadow-sm">
                              {time}
                            </div>
                          )}
                        </div>
                        <span className="text-[10px] sm:text-[11px] leading-tight text-slate-300 font-medium px-1 group-hover:text-white transition-colors duration-300 line-clamp-1">
                          {cat.name}
                        </span>
                      </Link>
                    );
                  })
                )}
              </div>
            </motion.div>

          </motion.div>

          {/* Right Side: Asymmetric Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative hidden lg:block h-[500px] xl:h-[550px] w-full"
          >
            {/* Main large image */}
            <motion.div 
              whileHover={{ y: -10, rotate: -1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="absolute top-0 left-[10%] w-[55%] h-[60%] rounded-3xl overflow-hidden border border-white/10 shadow-2xl z-20"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
              <Image src={images[0]} alt="Cleaning Service" fill className="object-cover" />
            </motion.div>

            {/* Top right smaller image */}
            <motion.div 
              whileHover={{ y: -10, rotate: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="absolute top-[10%] right-[5%] w-[35%] h-[35%] rounded-3xl overflow-hidden border border-white/10 shadow-2xl z-10"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
              <Image src={images[1]} alt="Electrician" fill className="object-cover" />
            </motion.div>

            {/* Bottom left medium image */}
            <motion.div 
              whileHover={{ y: -10, rotate: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="absolute bottom-[5%] left-[5%] w-[40%] h-[40%] rounded-3xl overflow-hidden border border-white/10 shadow-2xl z-30"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
              <Image src={images[2]} alt="Plumbing" fill className="object-cover" />
            </motion.div>

            {/* Bottom right tall image */}
            <motion.div 
              whileHover={{ y: -10, rotate: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="absolute bottom-[10%] right-[10%] w-[45%] h-[45%] rounded-3xl overflow-hidden border border-white/10 shadow-2xl z-20"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
              <Image src={images[3]} alt="Interior Design" fill className="object-cover" />
            </motion.div>
            


          </motion.div>
        </div>
      </div>
    </section>
  );
}
