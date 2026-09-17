"use client";

import { motion } from "framer-motion";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function SectionWrapper({ children, className = "", delay = 0 }: SectionWrapperProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      className={`mx-auto max-w-5xl px-6 w-full ${className}`}
    >
      {children}
    </motion.section>
  );
}
