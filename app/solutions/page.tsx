"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BatteryCharging,
  CheckCircle2,
  ChevronDown,
  Leaf,
  Menu,
  ShieldCheck,
  Sun,
  Wind,
  X,
  Zap,
} from "lucide-react";

type Solution = {
  id: string;
  number: string;
  tag: string;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  icon: typeof Sun;
  features: string[];
  applications: string[];
};

const solutions: Solution[] = [
  {
    id: "solar",
    number: "01",
    tag: "SOLAR ENERGY",
    title: "Solar Energy",
    shortDescription:
      "Reliable solar power solutions designed for long-term clean energy generation.",
    description:
      "From large-scale solar installations to distributed rooftop systems, SolarNova develops solutions focused on efficient generation, dependable performance and long-term value.",
    image: "/about/large solar landscape.jpg",
    icon: Sun,
    features: [
      "Utility-scale solar projects",
      "Rooftop solar systems",
      "High-efficiency generation",
      "Long-term asset performance",
    ],
    applications: [
      "Commercial & Industrial",
      "Utility-scale projects",
      "Institutional facilities",
      "Large rooftop installations",
    ],
  },
  {
    id: "wind",
    number: "02",
    tag: "WIND ENERGY",
    title: "Wind Energy",
    shortDescription:
      "Efficient wind power solutions that convert natural resources into dependable clean energy.",
    description:
      "Our wind energy approach combines site assessment, project planning, engineering and long-term operations to build dependable renewable generation assets.",
    image: "/about/solar farm aerial.jpg",
    icon: Wind,
    features: [
      "Wind project development",
      "Site & resource assessment",
      "Engineering coordination",
      "Performance-focused operations",
    ],
    applications: [
      "Utility-scale generation",
      "Hybrid renewable projects",
      "Large energy consumers",
      "Grid-connected projects",
    ],
  },
  {
    id: "hybrid",
    number: "03",
    tag: "HYBRID RENEWABLE",
    title: "Hybrid Renewable Energy",
    shortDescription:
      "Integrated renewable systems combining multiple clean-energy sources for better utilization.",
    description:
      "Hybrid renewable systems bring together complementary energy resources to create a more balanced generation profile and improve overall project utilization.",
    image: "/about/rooftop solar.jpg",
    icon: Leaf,
    features: [
      "Solar + wind integration",
      "Optimized generation profile",
      "Better resource utilization",
      "Integrated project planning",
    ],
    applications: [
      "Round-the-clock power",
      "Large commercial users",
      "Utility-scale projects",
      "Renewable energy parks",
    ],
  },
  {
    id: "storage",
    number: "04",
    tag: "ENERGY STORAGE",
    title: "Battery Energy Storage",
    shortDescription:
      "Flexible energy storage solutions for balancing renewable generation and demand.",
    description:
      "Battery Energy Storage Systems help store electricity when generation is available and deliver it when required, supporting flexibility and renewable integration.",
    image: "/about/technicianinstallation.jpg",
    icon: BatteryCharging,
    features: [
      "Battery energy storage systems",
      "Renewable integration",
      "Peak demand management",
      "Grid flexibility",
    ],
    applications: [
      "Renewable energy projects",
      "Commercial facilities",
      "Grid support",
      "Peak load management",
    ],
  },
  {
    id: "epc",
    number: "05",
    tag: "EPC & DEVELOPMENT",
    title: "EPC & Project Development",
    shortDescription:
      "End-to-end project development and EPC capabilities from concept to commissioning.",
    description:
      "SolarNova brings together project development, engineering, procurement and construction capabilities to move renewable projects from planning to operational assets.",
    image: "/about/rooftop + persontechnology.jpg",
    icon: Zap,
    features: [
      "Project development",
      "Engineering & design",
      "Procurement coordination",
      "Construction & commissioning",
    ],
    applications: [
      "Solar projects",
      "Hybrid projects",
      "Energy infrastructure",
      "Large-scale renewable assets",
    ],
  },
  {
    id: "om",
    number: "06",
    tag: "OPERATIONS & MAINTENANCE",
    title: "Operations & Maintenance",
    shortDescription:
      "Long-term asset management focused on performance, reliability and operational continuity.",
    description:
      "Our operations and maintenance approach focuses on keeping renewable assets productive through monitoring, preventive maintenance and responsive technical support.",
    image: "/about/technicianinstallation.jpg",
    icon: ShieldCheck,
    features: [
      "24/7 performance monitoring",
      "Preventive maintenance",
      "Technical inspections",
      "Asset performance management",
    ],
    applications: [
      "Solar power plants",
      "Renewable energy parks",
      "Commercial installations",
      "Long-term energy assets",
    ],
  },
];

export default function SolutionsPage() {
  const [selectedSolution, setSelectedSolution] = useState<Solution | null>(
    null
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSelectSolution = (solution: Solution) => {
    setSelectedSolution(solution);

    setTimeout(() => {
      document
        .getElementById("solution-detail")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleBackToSolutions = () => {
    setSelectedSolution(null);

    setTimeout(() => {
      document
        .getElementById("solutions-list")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <main className="min-h-screen bg-[#03120e] text-white">
      {/* ================= NAVBAR ================= */}
      <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-[#061812]/85 px-5 py-3 backdrop-blur-xl">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#b9ff68]">
              <Sun className="h-5 w-5 text-[#092016]" />
            </div>

            <span className="text-lg font-semibold tracking-tight">
              Solar<span className="text-[#b9ff68]">Nova</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="/solutions"
              className="text-sm text-[#b9ff68] transition hover:text-white"
            >
              Solutions
            </Link>

            <Link
              href="/about"
              className="text-sm text-white/70 transition hover:text-white"
            >
              About
            </Link>

            <Link
              href="/blog"
              className="text-sm text-white/70 transition hover:text-white"
            >
              Blog
            </Link>

            <Link
              href="/contact"
              className="rounded-full bg-[#b9ff68] px-5 py-2.5 text-sm font-semibold text-[#092016] transition hover:bg-white"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label="Toggle menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 md:hidden"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mt-2 max-w-7xl rounded-3xl border border-white/10 bg-[#061812]/95 p-4 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-2">
              <Link
                href="/solutions"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-2xl bg-[#b9ff68]/10 px-4 py-3 text-sm text-[#b9ff68]"
              >
                Solutions
              </Link>

              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm text-white/75 hover:bg-white/5"
              >
                About
              </Link>

              <Link
                href="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm text-white/75 hover:bg-white/5"
              >
                Blog
              </Link>

              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 rounded-full bg-[#b9ff68] px-5 py-3 text-center text-sm font-semibold text-[#092016]"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </header>

      {/* ================= HERO ================= */}
      <section className="relative flex min-h-[720px] items-end overflow-hidden">
        <Image
          src="/about/large solar landscape.jpg"
          alt="Solar renewable energy landscape"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-[#03120e]/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#03120e] via-[#03120e]/65 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#03120e]/80 via-transparent to-[#03120e]/20" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 pt-40 sm:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-[#b9ff68]" />
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#b9ff68]">
                Our Solutions
              </span>
            </div>

            <h1 className="text-5xl font-medium leading-[0.95] tracking-[-0.04em] sm:text-6xl lg:text-8xl">
              Powering a
              <span className="block text-[#b9ff68]">cleaner future.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
              Renewable energy solutions built around clean generation,
              intelligent infrastructure and long-term performance.
            </p>

            <button
              onClick={() =>
                document
                  .getElementById("solutions-list")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium backdrop-blur-md transition hover:border-[#b9ff68]/40 hover:bg-[#b9ff68] hover:text-[#092016]"
            >
              Explore solutions
              <ArrowRight size={17} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ================= INTRO ================= */}
      <section className="px-5 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#b9ff68]">
              What we do
            </p>

            <h2 className="mt-5 text-4xl font-medium tracking-tight sm:text-5xl">
              Renewable energy,
              <span className="text-white/40"> built for tomorrow.</span>
            </h2>
          </div>

          <div>
            <p className="max-w-3xl text-lg leading-8 text-white/60">
              SolarNova brings together renewable generation, energy storage,
              project development and asset management to create dependable
              clean-energy infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* ================= SOLUTIONS ================= */}
      <section
        id="solutions-list"
        className="scroll-mt-28 px-5 pb-28 sm:px-8 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#b9ff68]">
                Explore
              </p>
              <h2 className="mt-3 text-3xl font-medium sm:text-4xl">
                Our solutions
              </h2>
            </div>

            <p className="hidden max-w-sm text-right text-sm leading-6 text-white/40 sm:block">
              Select a solution to explore its capabilities and applications.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {solutions.map((solution, index) => {
              const Icon = solution.icon;

              return (
                <motion.button
                  key={solution.id}
                  type="button"
                  onClick={() => handleSelectSolution(solution)}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group relative min-h-[410px] overflow-hidden rounded-[28px] border border-white/10 bg-[#071b15] text-left"
                >
                  {/* Image always visible */}
                  <Image
                    src={solution.image}
                    alt={solution.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />

                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#04130f] via-[#071b15]/70 to-[#071b15]/20" />

                  {/* Green hover tint */}
                  <div className="absolute inset-0 bg-[#5dff85]/0 transition duration-500 group-hover:bg-[#5dff85]/10" />

                  <div className="relative z-10 flex min-h-[410px] flex-col justify-between p-6">
                    <div className="flex items-start justify-between">
                      <span className="text-sm font-medium text-white/50">
                        {solution.number}
                      </span>

                      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/20 backdrop-blur-md transition group-hover:border-[#b9ff68]/50 group-hover:bg-[#b9ff68] group-hover:text-[#092016]">
                        <Icon size={20} />
                      </div>
                    </div>

                    <div>
                      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#b9ff68]">
                        {solution.tag}
                      </p>

                      <h3 className="text-2xl font-medium tracking-tight sm:text-3xl">
                        {solution.title}
                      </h3>

                      <p className="mt-3 max-w-md text-sm leading-6 text-white/65">
                        {solution.shortDescription}
                      </p>

                      <div className="mt-6 flex items-center gap-2 text-sm font-medium text-white/80 transition group-hover:text-[#b9ff68]">
                        Explore solution
                        <ArrowRight
                          size={16}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= DETAIL ================= */}
      {selectedSolution && (
        <motion.section
          id="solution-detail"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="scroll-mt-24 border-y border-white/10 bg-[#061812] px-5 py-24 sm:px-8 lg:px-10"
        >
          <div className="mx-auto max-w-7xl">
            <button
              type="button"
              onClick={handleBackToSolutions}
              className="mb-10 inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-[#b9ff68]"
            >
              <ChevronDown className="rotate-90" size={17} />
              Back to all solutions
            </button>

            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              {/* Image */}
              <div className="relative min-h-[420px] overflow-hidden rounded-[30px] border border-white/10">
                <Image
                  src={selectedSolution.image}
                  alt={selectedSolution.title}
                  fill
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#03120e]/80 via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6">
                  <span className="rounded-full border border-white/15 bg-black/30 px-4 py-2 text-xs uppercase tracking-widest text-white/70 backdrop-blur-md">
                    {selectedSolution.number}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#b9ff68] text-[#092016]">
                    {(() => {
                      const Icon = selectedSolution.icon;
                      return <Icon size={24} />;
                    })()}
                  </div>

                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#b9ff68]">
                    {selectedSolution.tag}
                  </span>
                </div>

                <h2 className="mt-7 text-4xl font-medium tracking-tight sm:text-5xl">
                  {selectedSolution.title}
                </h2>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-white/60">
                  {selectedSolution.description}
                </p>

                <div className="mt-10 grid gap-8 sm:grid-cols-2">
                  <div>
                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/40">
                      Capabilities
                    </h3>

                    <div className="space-y-3">
                      {selectedSolution.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-start gap-3 text-sm text-white/75"
                        >
                          <CheckCircle2
                            size={17}
                            className="mt-0.5 shrink-0 text-[#b9ff68]"
                          />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/40">
                      Applications
                    </h3>

                    <div className="space-y-3">
                      {selectedSolution.applications.map((application) => (
                        <div
                          key={application}
                          className="flex items-start gap-3 text-sm text-white/75"
                        >
                          <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b9ff68]" />
                          {application}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* ================= APPROACH ================= */}
      <section className="px-5 py-28 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#b9ff68]">
              Our approach
            </p>

            <h2 className="mt-4 text-4xl font-medium tracking-tight sm:text-5xl">
              From clean energy
              <span className="text-white/40"> to lasting impact.</span>
            </h2>

            <p className="mt-6 text-base leading-7 text-white/55">
              Every project is approached with a focus on engineering,
              reliability, operational efficiency and long-term renewable
              energy performance.
            </p>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-3">
            {[
              {
                number: "01",
                title: "Develop",
                text: "Identify opportunities and create technically sound renewable energy projects.",
              },
              {
                number: "02",
                title: "Build",
                text: "Bring together engineering, procurement and construction capabilities.",
              },
              {
                number: "03",
                title: "Operate",
                text: "Maintain assets for dependable performance throughout their lifecycle.",
              },
            ].map((item) => (
              <div
                key={item.number}
                className="bg-[#071b15] p-7 sm:p-9"
              >
                <span className="text-sm text-[#b9ff68]">
                  {item.number}
                </span>

                <h3 className="mt-8 text-2xl font-medium">{item.title}</h3>

                <p className="mt-4 text-sm leading-6 text-white/50">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="px-5 pb-20 sm:px-8 lg:px-10">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-[#b9ff68]/20 bg-[#0a2419] p-8 sm:p-12 lg:p-16">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#b9ff68]/10 blur-3xl" />

          <div className="relative z-10 flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#b9ff68]">
                Start a conversation
              </p>

              <h2 className="mt-4 text-4xl font-medium tracking-tight sm:text-5xl">
                Have a renewable
                <span className="text-[#b9ff68]"> energy project?</span>
              </h2>

              <p className="mt-5 text-white/55">
                Let&apos;s explore how SolarNova can help turn your clean
                energy vision into a scalable project.
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-[#b9ff68] px-7 py-4 text-sm font-semibold text-[#092016] transition hover:bg-white"
            >
              Get Started
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}