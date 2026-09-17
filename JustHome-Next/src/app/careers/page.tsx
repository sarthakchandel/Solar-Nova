"use client";

import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Users, Zap } from "lucide-react";
import Link from "next/link";

export default function CareersPage() {
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
            We're Hiring
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
            Join the <span className="text-accent-gradient">Rapid Help</span> Team
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Help us build the future of home services. We are looking for passionate, driven individuals to join our growing team.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: <Zap className="w-6 h-6 text-accent" />, title: "Fast-Paced Impact", desc: "See your work directly impact thousands of homes every single day." },
            { icon: <Users className="w-6 h-6 text-accent" />, title: "Incredible Culture", desc: "Work alongside some of the brightest minds in the tech and service industry." },
            { icon: <Briefcase className="w-6 h-6 text-accent" />, title: "Remote Friendly", desc: "We support flexible working environments and remote opportunities." },
          ].map((perk, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className="glass p-6 rounded-2xl text-center"
            >
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                {perk.icon}
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{perk.title}</h3>
              <p className="text-sm text-muted-foreground">{perk.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="glass-strong rounded-3xl p-8 md:p-12 text-center"
        >
          <h2 className="text-3xl font-bold text-foreground mb-4">Open Positions</h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            We don't have any open positions listed at this exact moment, but we are always on the lookout for top talent. 
          </p>
          <Link href="mailto:careers@rapidhelp.com" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-accent hover:bg-[#b5955a] text-slate-900 font-semibold transition-all hover:scale-105">
            Send us your Resume <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
