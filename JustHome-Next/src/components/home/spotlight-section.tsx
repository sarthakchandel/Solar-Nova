"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const SPOTLIGHT_ITEMS: Array<{
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  buttonText: string;
  href: string;
  image: string;
  theme: string;
  bgColor?: string;
}> = [
  {
    id: "electrician",
    tag: "30 Mins Arrival",
    title: "Expert Electrician & Plumber Services",
    subtitle: "Safe, reliable repairs when you need them most",
    buttonText: "Book now",
    href: "/services/electrician",
    image: "/images/electrician-expert.png", // Perfect unique electrician image
    theme: "dark"
  },
  {
    id: "ac-service",
    tag: "",
    title: "Deep clean with foam-jet AC service",
    subtitle: "AC service & repair",
    buttonText: "Book now",
    href: "/services/ac",
    image: "/images/ac-cleaning.png", // Perfect local AC cleaning image
    theme: "light"
  },
  {
    id: "insta-help",
    tag: "10 mins",
    title: "Trained house help when your maid is on leave",
    subtitle: "Insta Help By Rapid Help",
    buttonText: "Book now",
    href: "/services/insta-help",
    image: "/images/insta-help-maids.png", // Perfect local maid cleaning image
    theme: "dark"
  }
];

export function SpotlightSection() {
  return (
    <section className="py-12 bg-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <h2 className="font-display text-3xl font-bold text-foreground mb-6">In the spotlight</h2>
        
        <div className="relative">
          <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 pb-4 -mx-4 px-4 md:mx-0 md:px-0">
            {SPOTLIGHT_ITEMS.map((item, i) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="snap-start shrink-0 w-[300px] md:w-[450px] relative rounded-2xl overflow-hidden group shadow-lg"
              >
                <Link href={item.href} className="block w-full h-[220px] md:h-[260px] relative">
                  {/* Background Image/Color */}
                  {item.bgColor ? (
                    <div className={`absolute inset-0 ${item.bgColor}`}>
                       <img src={item.image} alt={item.title} className="absolute right-0 bottom-0 h-[90%] object-contain object-right-bottom z-0" />
                    </div>
                  ) : (
                    <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  )}
                  
                  {/* Gradient Overlay for Text Readability */}
                  {!item.bgColor && (
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none" />
                  )}

                  {/* Content */}
                  <div className={`absolute inset-0 p-6 flex flex-col justify-between z-10 ${item.theme === 'light' && !item.bgColor ? 'text-slate-900' : 'text-white'}`}>
                    <div>
                      {item.tag && (
                        <span className={`inline-block px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded mb-3 backdrop-blur-md ${item.theme === 'light' ? 'bg-black/10' : 'bg-white/20'}`}>
                          {item.tag}
                        </span>
                      )}
                      
                      {item.id === 'insta-help' && (
                        <div className="text-xl font-bold italic mb-2 tracking-tight">Insta Help</div>
                      )}
                      
                      <h3 className={`text-xl md:text-2xl font-bold leading-tight mb-2 max-w-[70%] ${item.id === 'ac-service' ? 'text-white drop-shadow-md' : ''}`}>
                        {item.title}
                      </h3>
                      
                      {item.id !== 'insta-help' && (
                        <p className={`text-sm opacity-90 max-w-[70%] ${item.id === 'ac-service' ? 'text-white/90 drop-shadow-md' : ''}`}>
                          {item.subtitle}
                        </p>
                      )}
                    </div>

                    <button className={`w-fit px-5 py-2 rounded-lg font-bold text-sm transition-transform group-hover:scale-105 ${item.id === 'ac-service' ? 'bg-black text-white' : 'bg-white text-black'}`}>
                      {item.buttonText}
                    </button>
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
