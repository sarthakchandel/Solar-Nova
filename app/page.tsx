"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BatteryCharging,
  CheckCircle2,
  Leaf,
  Menu,
  ShieldCheck,
  Sun,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const images = {
  rooftop: "/solar/Solar Rooftop.jpg",
  home: "/solar/Solar Home.jpg",
  farm: "/solar/Solar Farm.jpg",
  installation: "/solar/Solar Installation.jpg",
};

const features: Feature[] = [
  {
    icon: Sun,
    title: "Clean Solar Energy",
    description:
      "Generate clean, renewable electricity directly from sunlight and reduce your dependence on conventional power.",
  },
  {
    icon: BatteryCharging,
    title: "Smart Energy Storage",
    description:
      "Store excess solar energy and use it when you need it, even when the sun goes down.",
  },
  {
    icon: ShieldCheck,
    title: "Built For Reliability",
    description:
      "Modern solar solutions designed for dependable performance, long-term savings and easy monitoring.",
  },
];

const stats = [
  { value: "25+", label: "Years Panel Life" },
  { value: "70%", label: "Potential Savings" },
  { value: "100%", label: "Clean Energy" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });

    setMenuOpen(false);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#06110d] text-white">
      {/* ================= NAVBAR ================= */}
      <header className="fixed left-0 right-0 top-0 z-50">
        <div className="mx-auto max-w-7xl px-5 py-5 md:px-8">
          <nav className="glass-card flex items-center justify-between rounded-2xl px-5 py-4">
            {/* Logo */}
            <button
              onClick={() => scrollTo("home")}
              className="flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d9ff43] text-[#06110d]">
                <Sun size={23} strokeWidth={2.5} />
              </div>

              <div>
                <div className="font-display text-xl font-semibold tracking-tight">
                  SolarNova
                </div>
                <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-emerald-300">
                  Clean Energy
                </div>
              </div>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-8 md:flex">
              <button
                onClick={() => scrollTo("solutions")}
                className="text-sm text-white/70 transition hover:text-[#d9ff43]"
              >
                Solutions
              </button>

              <button
                onClick={() => scrollTo("technology")}
                className="text-sm text-white/70 transition hover:text-[#d9ff43]"
              >
                Technology
              </button>

              <button
                onClick={() => scrollTo("impact")}
                className="text-sm text-white/70 transition hover:text-[#d9ff43]"
              >
                Impact
              </button>

              <button
                onClick={() => scrollTo("contact")}
                className="rounded-full bg-[#d9ff43] px-5 py-2.5 text-sm font-semibold text-[#06110d] transition hover:-translate-y-0.5"
              >
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 md:hidden"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </nav>

          {/* Mobile Menu */}
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card mt-2 rounded-2xl p-4 md:hidden"
            >
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => scrollTo("solutions")}
                  className="rounded-xl px-4 py-3 text-left text-white/80 hover:bg-white/5"
                >
                  Solutions
                </button>

                <button
                  onClick={() => scrollTo("technology")}
                  className="rounded-xl px-4 py-3 text-left text-white/80 hover:bg-white/5"
                >
                  Technology
                </button>

                <button
                  onClick={() => scrollTo("impact")}
                  className="rounded-xl px-4 py-3 text-left text-white/80 hover:bg-white/5"
                >
                  Impact
                </button>

                <button
                  onClick={() => scrollTo("contact")}
                  className="mt-2 rounded-xl bg-[#d9ff43] px-4 py-3 font-semibold text-[#06110d]"
                >
                  Get Started
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section
        id="home"
        className="solar-background solar-grid relative flex min-h-screen items-center pt-32"
      >
        {/* Background Glow */}
        <div className="pointer-events-none absolute left-1/2 top-20 h-96 w-96 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 md:px-8 lg:grid-cols-2">
          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative z-10"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-4 py-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-300">
                Powering a cleaner tomorrow
              </span>
            </div>

            <h1 className="max-w-3xl font-display text-5xl leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
              Turn sunlight
              <br />
              into{" "}
              <span className="italic text-[#d9ff43]">possibility.</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-white/60 md:text-lg">
              Smart solar solutions for homes, businesses and large-scale
              projects. Generate clean energy while building a more
              sustainable future.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => scrollTo("solutions")}
                className="solar-button inline-flex items-center justify-center gap-2 rounded-full bg-[#d9ff43] px-6 py-3.5 font-semibold text-[#06110d]"
              >
                Explore Solutions
                <ArrowRight size={18} />
              </button>

              <button
                onClick={() => scrollTo("technology")}
                className="solar-button inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 font-semibold backdrop-blur"
              >
                Our Technology
              </button>
            </div>

            {/* Stats */}
            <div className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-white/10 pt-6">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-2xl text-[#d9ff43] md:text-3xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-[10px] uppercase tracking-wider text-white/40">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative"
          >
            <div className="solar-orbit absolute -inset-8 hidden md:block" />
            <div className="solar-orbit-dashed absolute -inset-16 hidden md:block" />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-2 shadow-2xl">
              <div className="relative overflow-hidden rounded-[1.5rem]">
                <img
                  src={images.rooftop}
                  alt="Solar rooftop"
                  className="h-[430px] w-full object-cover transition duration-700 hover:scale-105 md:h-[540px]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#06110d]/80 via-transparent to-transparent" />

                {/* Floating Energy Card */}
                <div className="glass-card absolute bottom-5 left-5 right-5 rounded-2xl p-4 md:left-6 md:right-auto md:w-72">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-mono text-[9px] uppercase tracking-widest text-emerald-300">
                        Energy generated
                      </div>

                      <div className="mt-1 font-display text-2xl">
                        8.42{" "}
                        <span className="font-mono text-xs text-white/50">
                          kWh
                        </span>
                      </div>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#d9ff43] text-[#06110d]">
                      <Zap size={20} fill="currentColor" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sun */}
            <div className="animate-sun-pulse absolute -right-5 -top-5 hidden h-16 w-16 items-center justify-center rounded-full bg-[#ffbd18] text-[#06110d] md:flex">
              <Sun size={30} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= SOLUTIONS ================= */}
      <section id="solutions" className="relative bg-[#f5f3eb] py-24 text-[#102d2a]">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-14 max-w-2xl">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-700">
              01 / Solar Solutions
            </div>

            <h2 className="mt-4 font-display text-4xl leading-tight md:text-6xl">
              Energy solutions
              <br />
              <span className="italic">for every scale.</span>
            </h2>

            <p className="mt-5 max-w-xl leading-7 text-[#102d2a]/60">
              From individual homes to massive solar farms, our systems are
              designed to make clean energy practical and accessible.
            </p>
          </div>

          {/* Solution Cards */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Solar Home */}
            <motion.article
              whileHover={{ y: -8 }}
              className="group overflow-hidden rounded-[2rem] bg-[#113e36] text-white"
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={images.home}
                  alt="Solar Home"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#113e36] via-transparent to-transparent" />

                <div className="absolute left-5 top-5 rounded-full bg-[#d9ff43] px-3 py-1.5 font-mono text-[9px] uppercase tracking-widest text-[#06110d]">
                  Residential
                </div>
              </div>

              <div className="p-7">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-display text-3xl">Solar Home</h3>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10">
                    <ArrowRight size={18} />
                  </div>
                </div>

                <p className="leading-7 text-white/60">
                  Make your home energy independent with rooftop solar,
                  intelligent monitoring and efficient energy storage.
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm text-[#d9ff43]">
                  <CheckCircle2 size={16} />
                  Reduce electricity costs
                </div>
              </div>
            </motion.article>

            {/* Solar Farm */}
            <motion.article
              whileHover={{ y: -8 }}
              className="group overflow-hidden rounded-[2rem] bg-[#102d2a] text-white"
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={images.farm}
                  alt="Solar Farm"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#102d2a] via-transparent to-transparent" />

                <div className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1.5 font-mono text-[9px] uppercase tracking-widest text-[#102d2a]">
                  Large Scale
                </div>
              </div>

              <div className="p-7">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-display text-3xl">Solar Farm</h3>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10">
                    <ArrowRight size={18} />
                  </div>
                </div>

                <p className="leading-7 text-white/60">
                  Large-scale solar infrastructure engineered for efficient
                  energy generation and long-term performance.
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm text-emerald-300">
                  <CheckCircle2 size={16} />
                  High-capacity generation
                </div>
              </div>
            </motion.article>
          </div>
        </div>
      </section>

      {/* ================= TECHNOLOGY ================= */}
      <section id="technology" className="solar-background bg-[#06110d] py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-4 rounded-[2rem] bg-emerald-400/10 blur-2xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-white/10">
                <img
                  src={images.installation}
                  alt="Solar Installation"
                  className="h-[500px] w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#06110d]/70 to-transparent" />

                <div className="glass-card absolute bottom-5 left-5 right-5 rounded-2xl p-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#d9ff43] text-[#06110d]">
                      <Zap size={23} fill="currentColor" />
                    </div>

                    <div>
                      <div className="font-semibold">Smart Solar System</div>
                      <div className="mt-1 text-xs text-white/50">
                        Efficient. Intelligent. Sustainable.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-300">
                02 / Technology
              </div>

              <h2 className="mt-4 font-display text-4xl leading-tight md:text-6xl">
                Built around
                <br />
                <span className="italic text-[#d9ff43]">your energy.</span>
              </h2>

              <p className="mt-6 leading-7 text-white/55">
                SolarNova combines modern photovoltaic technology, smart
                monitoring and energy storage to create a connected energy
                system.
              </p>

              <div className="mt-10 space-y-7">
                {features.map((feature, index) => {
                  const Icon = feature.icon;

                  return (
                    <div
                      key={feature.title}
                      className="flex gap-5 border-b border-white/10 pb-7 last:border-0"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/5 text-emerald-300">
                        <Icon size={21} />
                      </div>

                      <div>
                        <div className="mb-1 flex items-center gap-3">
                          <span className="font-mono text-[9px] text-white/25">
                            0{index + 1}
                          </span>

                          <h3 className="font-semibold">
                            {feature.title}
                          </h3>
                        </div>

                        <p className="text-sm leading-6 text-white/45">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= IMPACT ================= */}
      <section
        id="impact"
        className="bg-[#d9ff43] py-24 text-[#06110d]"
      >
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#102d2a]/60">
                03 / Our Impact
              </div>

              <h2 className="mt-4 max-w-2xl font-display text-5xl leading-none md:text-7xl">
                The future is
                <br />
                <span className="italic">already shining.</span>
              </h2>

              <p className="mt-7 max-w-xl text-lg leading-8 text-[#102d2a]/70">
                Every solar panel installed is another step toward cleaner
                energy, lower emissions and a more resilient energy future.
              </p>

              <div className="mt-9 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#102d2a] text-[#d9ff43]">
                  <Leaf size={21} />
                </div>

                <span className="font-semibold">
                  Better energy. Better planet.
                </span>
              </div>
            </div>

            {/* Impact Image */}
            <div className="relative">
              <div className="overflow-hidden rounded-[2rem] border border-[#102d2a]/10">
                <img
                  src={images.farm}
                  alt="Large scale solar farm"
                  className="h-[420px] w-full object-cover"
                />
              </div>

              <div className="absolute -bottom-5 -left-5 rounded-2xl bg-[#102d2a] px-6 py-5 text-white shadow-2xl">
                <div className="font-display text-3xl text-[#d9ff43]">
                  24/7
                </div>
                <div className="mt-1 text-xs text-white/50">
                  Energy monitoring
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section id="contact" className="relative bg-[#06110d] py-28">
        <div className="mx-auto max-w-5xl px-5 text-center md:px-8">
          <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-full bg-[#ffbd18] text-[#06110d] shadow-[0_0_60px_rgba(255,189,24,0.25)]">
            <Sun size={30} />
          </div>

          <h2 className="font-display text-5xl leading-none md:text-7xl">
            Ready to make the
            <br />
            <span className="italic text-[#d9ff43]">switch?</span>
          </h2>

          <p className="mx-auto mt-7 max-w-xl leading-7 text-white/50">
            Start your journey toward cleaner, smarter and more independent
            energy.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="mailto:hello@solarnova.com"
              className="solar-button inline-flex items-center gap-2 rounded-full bg-[#d9ff43] px-7 py-4 font-semibold text-[#06110d]"
            >
              Talk To Us
              <ArrowRight size={18} />
            </a>

            <button
              onClick={() => scrollTo("home")}
              className="solar-button rounded-full border border-white/10 px-7 py-4 font-semibold text-white/80"
            >
              Back To Top
            </button>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 bg-[#06110d]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 md:flex-row md:items-center md:justify-between md:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#d9ff43] text-[#06110d]">
              <Sun size={19} />
            </div>

            <span className="font-display text-lg">SolarNova</span>
          </div>

          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} SolarNova. Clean energy for a brighter
            future.
          </p>

          <div className="flex items-center gap-2 text-xs text-emerald-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Solar powered future
          </div>
        </div>
      </footer>
    </main>
  );
}