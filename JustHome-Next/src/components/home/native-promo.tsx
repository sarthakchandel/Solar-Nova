"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function NativePromo() {
  return (
    <section className="py-12 bg-background border-t border-border/50">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative w-full rounded-2xl overflow-hidden bg-[#dcd7d2] flex flex-col md:flex-row shadow-sm border border-border/50"
        >
          {/* Left Content Area */}
          <div className="p-8 md:p-12 flex-1 flex flex-col justify-center relative z-10">
            {/* Green Tag */}
            <div className="absolute top-0 left-0 bg-[#008a4f] text-white text-xs font-bold px-4 py-1.5 rounded-br-lg">
              Up to ₹3,100 off
            </div>

            {/* Logo */}
            <div className="mt-4 mb-4 tracking-[0.3em] font-bold text-gray-800 text-sm">
              N A T I V E
            </div>

            {/* Typography */}
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
              RO water purifier
            </h2>
            <p className="text-lg md:text-xl text-gray-700 font-medium mb-8">
              Needs no service for 2 years
            </p>

            {/* CTA Button */}
            <Link href="/services/ro-water-purifier">
              <button className="bg-white text-gray-900 font-bold px-8 py-3 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all w-fit">
                Buy now
              </button>
            </Link>
          </div>

          {/* Right Image Area (Hidden on very small mobile screens, split on tablet/desktop) */}
          <div className="hidden sm:flex flex-1 relative min-h-[300px]">
            {/* Left half of image area (RO Purifier) */}
            <div className="w-1/2 relative bg-[#dcd7d2] border-r-2 border-white/20">
               <img 
                 src="https://images.unsplash.com/photo-1542013936693-884638332954?q=80&w=600" 
                 alt="RO Purifier" 
                 className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-multiply" 
               />
               {/* Note: In a real app we'd use the exact product cut-out image here, using an abstract water/kitchen image as a placeholder */}
            </div>
            {/* Right half of image area (Woman drinking water) */}
            <div className="w-1/2 relative bg-[#1a1a1a]">
               <img 
                 src="https://images.unsplash.com/photo-1544365558-35aa4afcf11f?q=80&w=600" 
                 alt="Drinking pure water" 
                 className="absolute inset-0 w-full h-full object-cover" 
               />
            </div>
          </div>
          
          {/* Mobile Image Fallback */}
          <div className="sm:hidden h-48 relative bg-[#1a1a1a]">
            <img 
              src="https://images.unsplash.com/photo-1544365558-35aa4afcf11f?q=80&w=600" 
              alt="Drinking pure water" 
              className="absolute inset-0 w-full h-full object-cover" 
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
