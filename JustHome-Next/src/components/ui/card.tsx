"use client";

import { cn } from "@/lib/utils";
import { motion, type HTMLMotionProps } from "framer-motion";

interface CardProps extends HTMLMotionProps<"div"> {
  glass?: boolean;
  hover?: boolean;
}

export function Card({ glass = true, hover = true, className, children, ...props }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "rounded-xl overflow-hidden transition-shadow duration-300",
        glass ? "glass shadow-soft hover:shadow-card" : "bg-card border border-border shadow-soft",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
