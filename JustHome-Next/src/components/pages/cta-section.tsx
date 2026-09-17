"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CTASectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
}

export function CTASection({ title, description, buttonText, buttonHref }: CTASectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mt-20 text-center glass-strong rounded-3xl p-10 md:p-14 max-w-4xl mx-auto border border-accent/20 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/5 to-primary/20" />
      <div className="relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{title}</h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-lg">
          {description}
        </p>
        <Link 
          href={buttonHref} 
          className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-accent hover:bg-[#b5955a] text-slate-900 font-bold transition-all hover:scale-105 shadow-[0_0_20px_rgba(201,169,110,0.3)]"
        >
          {buttonText} <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </motion.div>
  );
}
