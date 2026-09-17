"use client";

import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
}

export function PageHeader({ title, subtitle, badge }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16 mx-auto max-w-4xl px-6"
    >
      {badge && (
        <span className="px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold tracking-wide uppercase mb-6 inline-block">
          {badge}
        </span>
      )}
      <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
        {title.split(" ").map((word, i, arr) => (
          <span key={i} className={i === arr.length - 1 ? "text-accent-gradient" : ""}>
            {word}{" "}
          </span>
        ))}
      </h1>
      {subtitle && (
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
