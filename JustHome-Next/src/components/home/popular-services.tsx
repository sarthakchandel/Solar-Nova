"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getPopularServices } from "@/lib/data";
import { ServiceCard } from "@/components/services/service-card";
import { Button } from "@/components/ui/button";

export function PopularServices() {
  const popular = getPopularServices();

  return (
    <section className="py-20 bg-muted/50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between mb-10">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-primary dark:text-foreground">Popular Services</h2>
            <p className="mt-2 text-muted-foreground">Most booked this week</p>
          </motion.div>
          <Link href="/services" className="hidden sm:block">
            <Button variant="outline" size="sm">View All <ArrowRight className="h-4 w-4" /></Button>
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popular.map((s, i) => (
            <motion.div key={s.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <ServiceCard service={s} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
