"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-20 selection:bg-accent/30">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold tracking-wide uppercase mb-6 inline-block">
            Trusted by Thousands
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
            Rapid Help <span className="text-accent-gradient">Reviews</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Read what our satisfied customers have to say about their premium home service experiences.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            { name: "Sarah Jenkins", service: "Deep Home Cleaning", review: "Absolutely phenomenal service. The team was punctual, extremely professional, and left my house looking like a brand new luxury hotel. Highly recommend!", rating: 5 },
            { name: "Rahul Sharma", service: "AC Repair", review: "The technician diagnosed the issue within 5 minutes and had the parts ready in his van. My AC was blowing ice-cold air in under an hour. Unmatched efficiency.", rating: 5 },
            { name: "Priya Desai", service: "Plumbing Installation", review: "I've used Urban Company before, but the level of premium care and cleanliness Rapid Help provides is on another level. Worth every penny.", rating: 5 },
            { name: "Michael T.", service: "Electrical Wiring", review: "Safe, secure, and very transparent pricing. They explained exactly what was wrong and fixed it without any hidden charges.", rating: 4 },
          ].map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className="glass p-8 rounded-3xl"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className={`w-4 h-4 ${idx < review.rating ? "text-accent fill-accent" : "text-muted-foreground/30"}`} />
                ))}
              </div>
              <p className="text-foreground leading-relaxed mb-6 font-medium">"{review.review}"</p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                <span className="font-bold text-foreground">{review.name}</span>
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">{review.service}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
