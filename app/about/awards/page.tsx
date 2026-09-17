"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Leaf,
  ShieldCheck,
  Sun,
  Users,
  Zap,
} from "lucide-react";

const awards = [
  {
    year: "2025",
    title: "Excellence in Solar Innovation",
    description:
      "Recognising our continued focus on dependable solar solutions, smart technology and sustainable energy adoption.",
    image: "/about/award/award-excellence.jpg",
  },
  {
    year: "2024",
    title: "Innovation in Clean Energy",
    description:
      "A visual showcase of our commitment to developing practical and future-ready renewable energy solutions.",
    image: "/about/award/award-innovation.jpg",
  },
  {
    year: "2023",
    title: "Sustainability Recognition",
    description:
      "Celebrating our contribution towards cleaner energy and a more sustainable future.",
    image: "/about/award/award-sustainability.jpg",
  },
];

const certificates = [
  {
    year: "2025",
    title: "Solar Excellence Certificate",
    image: "/about/award/certificate-2025.jpg",
  },
  {
    year: "2024",
    title: "Clean Energy Recognition",
    image: "/about/award/certificate-2024.jpg",
  },
  {
    year: "2023",
    title: "Sustainability Certificate",
    image: "/about/award/certificate-2023.jpg",
  },
];

const highlights = [
  {
    icon: Sun,
    title: "Solar First",
    text: "Focused on accelerating reliable and accessible solar energy adoption.",
  },
  {
    icon: Zap,
    title: "Smart Innovation",
    text: "Combining modern technology with practical renewable-energy solutions.",
  },
  {
    icon: Leaf,
    title: "Built for Sustainability",
    text: "Every solution is designed with long-term environmental impact in mind.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Approach",
    text: "Transparent processes and dependable solutions remain central to our work.",
  },
];

export default function AwardsPage() {
  return (
    <main className="min-h-screen bg-[#07130e] text-white">
      {/* NAVBAR */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#07130e]/75 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-300 text-[#07130e]">
              <Sun size={23} strokeWidth={2.5} />
            </div>

            <div>
              <div className="text-lg font-bold tracking-tight">
                SolarNova
              </div>
              <div className="text-[9px] uppercase tracking-[0.28em] text-lime-300/70">
                Clean Energy
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
            <Link
              href="/Solution"
              className="transition hover:text-lime-300"
            >
              Solutions
            </Link>

            <div className="group relative">
              <button className="flex items-center gap-1 transition hover:text-lime-300">
                About
                <span className="text-xs">⌄</span>
              </button>

              <div className="invisible absolute left-1/2 top-full mt-4 w-56 -translate-x-1/2 rounded-2xl border border-white/10 bg-[#0b1b14] p-2 opacity-0 shadow-2xl transition-all group-hover:visible group-hover:opacity-100">
                <Link
                  href="/about/board-of-directors"
                  className="block rounded-xl px-4 py-3 text-sm text-white/70 transition hover:bg-white/5 hover:text-lime-300"
                >
                  Board of Directors
                </Link>

                <Link
                  href="/about/awards"
                  className="block rounded-xl bg-white/5 px-4 py-3 text-sm text-lime-300"
                >
                  Awards & Certifications
                </Link>
              </div>
            </div>

            <Link href="/blog" className="transition hover:text-lime-300">
              Blog
            </Link>

            <Link
              href="/contact"
              className="rounded-full bg-lime-300 px-5 py-2.5 font-semibold text-[#07130e] transition hover:bg-lime-200"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      {/* HERO WITH EXISTING SOLAR VIDEO */}
      <section className="relative flex min-h-[760px] items-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src="/Vidoes/solar-bg.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-[#04100b]/65" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#04100b] via-[#04100b]/70 to-[#04100b]/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07130e] via-transparent to-[#07130e]/20" />
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 px-6 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-lime-300/20 bg-lime-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-lime-300">
              <Award size={15} />
              Awards & Recognition
            </div>

            <h1 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] sm:text-6xl lg:text-8xl">
              Recognition for
              <span className="block text-lime-300">building a cleaner</span>
              future.
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">
              Our journey is shaped by innovation, sustainability and the
              people who believe renewable energy can create a better tomorrow.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="#recognition"
                className="group inline-flex items-center gap-3 rounded-full bg-lime-300 px-6 py-3.5 font-semibold text-[#07130e] transition hover:bg-lime-200"
              >
                Explore recognition
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/about"
                className="rounded-full border border-white/15 bg-white/5 px-6 py-3.5 font-semibold text-white backdrop-blur-md transition hover:bg-white/10"
              >
                About SolarNova
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="hidden lg:block"
          >
            <div className="relative ml-auto max-w-md overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-3 shadow-2xl backdrop-blur-md">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
                <Image
                  src="/about/award/award-excellence.jpg"
                  alt="SolarNova award recognition"
                  fill
                  priority
                  sizes="450px"
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#06120c] via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <div className="mb-2 text-xs uppercase tracking-[0.25em] text-lime-300">
                    Featured Recognition
                  </div>

                  <h2 className="text-3xl font-semibold">
                    Excellence in Solar Innovation
                  </h2>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-white/10 bg-[#091a12]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/10 lg:grid-cols-4">
          {[
            ["10+", "Years of Innovation"],
            ["50+", "Solar Projects"],
            ["25+", "Industry Partners"],
            ["100%", "Commitment to Sustainability"],
          ].map(([number, label]) => (
            <div key={label} className="px-6 py-10 text-center">
              <div className="text-3xl font-semibold text-lime-300 sm:text-4xl">
                {number}
              </div>
              <div className="mt-2 text-xs uppercase tracking-[0.16em] text-white/45">
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INTRO */}
      <section className="mx-auto max-w-7xl px-6 py-28 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-lime-300">
              Why Recognition Matters
            </div>

            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Awards are milestones.
              <span className="block text-white/35">
                The work behind them matters more.
              </span>
            </h2>
          </div>

          <div className="max-w-3xl">
            <p className="text-lg leading-8 text-white/60">
              Every recognition represents a step in our larger mission:
              helping businesses and communities move towards cleaner,
              smarter and more dependable energy.
            </p>

            <p className="mt-6 leading-8 text-white/45">
              From technology and engineering to sustainability and customer
              impact, we continue to build solutions designed for real-world
              renewable energy needs.
            </p>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="bg-[#091a12] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-14 max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-lime-300">
              What We Stand For
            </div>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Recognition starts with
              <span className="text-lime-300"> meaningful work.</span>
            </h2>
          </div>

          <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="bg-[#091a12] p-8"
                >
                  <div className="mb-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-300/10 text-lime-300">
                    <Icon size={22} />
                  </div>

                  <h3 className="text-xl font-semibold">{item.title}</h3>

                  <p className="mt-4 text-sm leading-7 text-white/45">
                    {item.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CERTIFICATES */}
      <section id="recognition" className="mx-auto max-w-7xl px-6 py-28 lg:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-lime-300">
              Certifications
            </div>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Credentials that
              <span className="text-white/35"> support our journey.</span>
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-white/45">
            A visual collection of certificates and recognition milestones
            representing our continued focus on quality and sustainability.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {certificates.map((certificate, index) => (
            <motion.div
              key={certificate.year}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 bg-[#0c1d15]">
                <Image
                  src={certificate.image}
                  alt={certificate.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#06120c] via-transparent to-transparent opacity-80" />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="text-xs uppercase tracking-[0.2em] text-lime-300">
                    {certificate.year}
                  </div>

                  <h3 className="mt-2 text-xl font-semibold">
                    {certificate.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* AWARDS */}
      <section className="bg-[#091a12] py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16">
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-lime-300">
              Recognition Timeline
            </div>

            <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
              Milestones along the
              <span className="text-lime-300"> SolarNova journey.</span>
            </h2>
          </div>

          <div className="space-y-5">
            {awards.map((award, index) => (
              <motion.div
                key={award.year}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="grid overflow-hidden rounded-3xl border border-white/10 bg-[#07130e] md:grid-cols-[260px_1fr]"
              >
                <div className="relative min-h-[240px]">
                  <Image
                    src={award.image}
                    alt={award.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 260px"
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col justify-center p-8 md:p-10">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-semibold text-lime-300">
                      {award.year}
                    </span>

                    <span className="h-px w-12 bg-lime-300/30" />
                  </div>

                  <h3 className="mt-5 text-2xl font-semibold sm:text-3xl">
                    {award.title}
                  </h3>

                  <p className="mt-4 max-w-2xl leading-7 text-white/45">
                    {award.description}
                  </p>

                  <div className="mt-7 flex items-center gap-2 text-sm text-lime-300">
                    <CheckCircle2 size={17} />
                    Recognition milestone
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PEOPLE */}
      <section className="mx-auto max-w-7xl px-6 py-28 lg:px-8">
        <div className="grid gap-12 rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#0c2117] to-[#07130e] p-8 md:p-12 lg:grid-cols-[1fr_auto] lg:p-16">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-300/10 text-lime-300">
              <Users size={23} />
            </div>

            <h2 className="mt-8 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
              Behind every recognition is a team that keeps building.
            </h2>

            <p className="mt-6 max-w-2xl leading-8 text-white/45">
              Engineers, designers, energy experts and partners work together
              to turn ambitious clean-energy ideas into practical solutions.
            </p>
          </div>

          <div className="flex items-end">
            <Link
              href="/about/board-of-directors"
              className="group inline-flex items-center gap-3 rounded-full border border-white/15 px-6 py-3.5 font-semibold transition hover:border-lime-300/40 hover:bg-white/5"
            >
              Meet our leadership
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-white/10 py-28">
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-lime-300/10 blur-[120px]" />

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-lime-300 text-[#07130e]">
            <Sun size={27} />
          </div>

          <h2 className="mt-8 text-4xl font-semibold tracking-tight sm:text-6xl">
            Let&apos;s build what comes next.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl leading-8 text-white/45">
            Explore how SolarNova can help turn your clean-energy goals into
            measurable results.
          </p>

          <Link
            href="/contact"
            className="group mt-9 inline-flex items-center gap-3 rounded-full bg-lime-300 px-7 py-4 font-semibold text-[#07130e] transition hover:bg-lime-200"
          >
            Start a conversation
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#050d09]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-8 text-sm text-white/35 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            © {new Date().getFullYear()} SolarNova. All rights reserved.
          </div>

          <div className="flex gap-6">
            <Link href="/about" className="transition hover:text-lime-300">
              About
            </Link>

            <Link
              href="/contact"
              className="transition hover:text-lime-300"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}