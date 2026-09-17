"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BadgeCheck, Star } from "lucide-react";
import { professionals } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function FeaturedPros() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-primary dark:text-foreground">Featured Professionals</h2>
          <p className="mt-3 text-muted-foreground">Hand-picked experts with top ratings</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {professionals.map((pro, i) => (
            <motion.div key={pro.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <Link href={`/services?pro=${pro.slug}`}>
                <Card className="p-6 text-center">
                  <div className="relative h-20 w-20 mx-auto mb-4">
                    <Image src={pro.avatar} alt={pro.name} fill className="rounded-xl object-cover ring-2 ring-accent/30" />
                  </div>
                  <div className="flex items-center justify-center gap-1.5">
                    <h3 className="font-semibold">{pro.name}</h3>
                    {pro.verified && <BadgeCheck className="h-4 w-4 text-accent" />}
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">{pro.title}</p>
                  <div className="flex items-center justify-center gap-1 mt-3">
                    <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                    <span className="text-sm font-semibold">{pro.rating}</span>
                    <span className="text-xs text-muted-foreground">({pro.reviewCount})</span>
                  </div>
                  <div className="mt-3 flex flex-wrap justify-center gap-1">
                    {pro.specialties.slice(0, 2).map((s) => <Badge key={s} variant="primary">{s}</Badge>)}
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
