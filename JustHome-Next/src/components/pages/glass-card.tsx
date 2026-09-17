"use client";

import { motion } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hoverEffect?: boolean;
}

export function GlassCard({ children, className = "", delay = 0, hoverEffect = false }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={`glass-strong rounded-3xl p-8 md:p-12 text-muted-foreground leading-relaxed ${
        hoverEffect ? "hover:shadow-glow hover:border-accent/30 transition-all duration-300" : ""
      } ${className}`}
    >
      {children}
    </motion.div>
  );
}
