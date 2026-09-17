"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import { useCategoryModalStore } from "@/store/use-category-modal-store";

export function CategoryModal() {
  const { isOpen, selectedCategory, closeModal } = useCategoryModalStore();
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // Prevent background scroll
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, closeModal]);

  // Close on backdrop click
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) {
      closeModal();
    }
  };

  if (!selectedCategory) return null;

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring",
        damping: 25,
        stiffness: 300,
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    },
    exit: { opacity: 0, y: 50, scale: 0.95, transition: { duration: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          onClick={handleOverlayClick}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 z-[150] flex items-end md:items-center justify-center bg-black/40 backdrop-blur-md p-0 md:p-4"
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-2xl bg-card md:rounded-3xl rounded-t-3xl shadow-card border border-border overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-xl md:text-2xl font-bold text-card-foreground tracking-tight">
                {selectedCategory.title}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 rounded-full bg-muted hover:bg-muted-foreground/10 text-card-foreground transition-colors border border-border"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 overflow-y-auto scrollbar-hide space-y-10">
              {selectedCategory.sections.map((section, idx) => (
                <div key={idx}>
                  <h3 className="text-xl font-bold text-card-foreground mb-6">
                    {section.title}
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-x-4 gap-y-8">
                    {section.items.map((item) => (
                      <motion.div key={item.id} variants={itemVariants} className="h-full">
                        <Link
                          href={item.href}
                          onClick={closeModal}
                          className="group flex flex-col items-center cursor-pointer h-full"
                        >
                          {/* Image Box */}
                          <div className="relative w-full aspect-[4/3] rounded-2xl bg-muted/40 border border-border/50 flex items-center justify-center mb-3 group-hover:bg-muted/60 transition-colors">
                            <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
                              {item.icon}
                            </div>
                            
                            {/* Overlapping Time Badge */}
                            {item.time && (
                              <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-card border border-border shadow-sm whitespace-nowrap z-10">
                                <span className="text-[10px] font-bold text-emerald-500">{item.time}</span>
                              </div>
                            )}
                          </div>
                          
                          {/* External Text Label */}
                          <span className="text-sm font-medium text-muted-foreground group-hover:text-card-foreground transition-colors text-center leading-tight px-1">
                            {item.name}
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Bottom Safe Area for Mobile */}
            <div className="h-6 md:hidden"></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
