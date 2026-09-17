"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  BriefcaseBusiness,
  Leaf,
  ShieldCheck,
  Sun,
  Users,
} from "lucide-react";

const directors = [
  {
    number: "01",
    name: "Rajiv Malhotra",
    designation: "Chairman & Managing Director",
    image: "/about/board/rajiv-malhotra.jpg",
    experience:
      "A senior business leader with extensive experience in renewable energy, infrastructure and long-term business development.",
  },
  {
    number: "02",
    name: "Arvind Mehra",
    designation: "Vice Chairman & Whole-Time Director",
    image: "/about/board/arvind-mehra.jpg",
    experience:
      "Brings decades of experience in strategy, operations, administration and organisational leadership across large-scale businesses.",
  },
  {
    number: "03",
    name: "Vikram Sethi",
    designation: "Chief Executive Officer & Director",
    image: "/about/board/vikram-sethi.jpg",
    experience:
      "Experienced corporate executive focused on business growth, operations, technology and strategic expansion.",
  },
  {
    number: "04",
    name: "Rakesh Kapoor",
    designation: "Non-Executive Independent Director",
    image: "/about/board/rakesh-kapoor.jpg",
    experience:
      "Provides independent oversight with experience across finance, consulting, corporate strategy and business transformation.",
  },
  {
    number: "05",
    name: "Meera Sharma",
    designation: "Non-Executive Independent Director",
    image: "/about/board/meera-sharma.jpg",
    experience:
      "Experienced leadership professional with a strong background in people strategy, organisational development and governance.",
  },
  {
    number: "06",
    name: "Sanjay Verma",
    designation: "Non-Executive Independent Director",
    image: "/about/board/sanjay-verma.jpg",
    experience:
      "Senior corporate and legal professional bringing expertise in governance, regulatory matters and responsible business practices.",
  },
];

export default function BoardOfDirectorsPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#03100b] text-white">

      {/* ========================================================= */}
      {/* BACKGROUND */}
      {/* ========================================================= */}

      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="solar-background absolute inset-0 opacity-70" />
        <div className="solar-grid absolute inset-0 opacity-10" />

        <div className="absolute left-[-15%] top-[10%] h-[400px] w-[400px] rounded-full bg-lime-400/10 blur-[120px]" />

        <div className="absolute right-[-15%] top-[45%] h-[400px] w-[400px] rounded-full bg-emerald-400/10 blur-[120px]" />
      </div>

      {/* ========================================================= */}
      {/* NAVBAR */}
      {/* ========================================================= */}

      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#03100b]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 lg:px-8">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-lime-300/30 bg-lime-300/10">
              <Sun className="h-4 w-4 text-lime-300" />
            </div>

            <div>
              <div className="text-base font-bold tracking-wide">
                Solar<span className="text-lime-300">Nova</span>
              </div>

              <div className="text-[8px] uppercase tracking-[0.22em] text-white/35">
                Clean Energy
              </div>
            </div>

          </Link>

          {/* NAVIGATION */}
          <div className="hidden items-center gap-7 md:flex">

            <Link
              href="/solutions"
              className="text-sm text-white/65 transition hover:text-lime-300"
            >
              Solutions
            </Link>

            {/* ABOUT DROPDOWN */}
            <div className="group relative py-6">

              <Link
                href="/about"
                className="flex items-center gap-1.5 text-sm text-lime-300"
              >
                About

                <span className="text-[9px] transition-transform duration-200 group-hover:rotate-180">
                  ▼
                </span>
              </Link>

              <div className="pointer-events-none invisible absolute left-1/2 top-[62px] w-[235px] -translate-x-1/2 translate-y-2 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">

                <div className="rounded-2xl border border-white/10 bg-[#071810]/95 p-2 shadow-2xl backdrop-blur-xl">

                  <Link
                    href="/about/board-of-directors"
                    className="block rounded-xl bg-lime-300/10 px-4 py-3 transition hover:bg-lime-300/15"
                  >

                    <div className="flex items-center gap-3">

                      <Users className="h-4 w-4 text-lime-300" />

                      <div>
                        <div className="text-sm font-medium text-white">
                          Board of Directors
                        </div>

                        <div className="mt-0.5 text-[11px] text-white/40">
                          Our leadership
                        </div>
                      </div>

                    </div>

                  </Link>

                  <Link
                    href="/about/awards"
                    className="block rounded-xl px-4 py-3 transition hover:bg-lime-300/10"
                  >

                    <div className="flex items-center gap-3">

                      <Award className="h-4 w-4 text-lime-300" />

                      <div>
                        <div className="text-sm font-medium text-white">
                          Awards & Certification
                        </div>

                        <div className="mt-0.5 text-[11px] text-white/40">
                          Recognition
                        </div>
                      </div>

                    </div>

                  </Link>

                </div>

              </div>

            </div>

            <Link
              href="/blog"
              className="text-sm text-white/65 transition hover:text-lime-300"
            >
              Blog
            </Link>

            <Link
              href="/contact"
              className="rounded-full border border-lime-100/40 bg-lime-100/90 px-5 py-2.5 text-sm font-semibold text-[#18301f] shadow-lg shadow-lime-300/10 transition-all duration-300 hover:bg-white hover:shadow-lime-200/20"
            >
              Get Started
            </Link>

          </div>

        </div>
      </nav>

      {/* ========================================================= */}
      {/* HERO WITH VIDEO */}
      {/* ========================================================= */}

      <section className="relative min-h-[650px] overflow-hidden px-6 pb-20 pt-36 lg:min-h-[700px] lg:px-8 lg:pb-24 lg:pt-44">

        {/* VIDEO BACKGROUND */}

        <div className="absolute inset-0 z-0 overflow-hidden">

          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover object-center"
          >
            <source
              src="/Vidoes/solar-bg.mp4"
              type="video/mp4"
            />
          </video>

          {/* Main dark overlay */}
          <div className="absolute inset-0 bg-[#03100b]/45" />

          {/* Text readability gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#03100b]/90 via-[#03100b]/55 to-[#03100b]/20" />

          {/* Top fade */}
          <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#03100b]/90 to-transparent" />

          {/* Bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#03100b] to-transparent" />

          {/* Green glow */}
          <div className="absolute left-[-10%] top-[15%] h-[400px] w-[400px] rounded-full bg-lime-400/10 blur-[120px]" />

        </div>

        {/* HERO CONTENT */}

        <div className="relative z-10 mx-auto max-w-7xl">

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >

            {/* BREADCRUMB */}

            <div className="mb-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/40">

              <Link
                href="/about"
                className="transition hover:text-lime-300"
              >
                About
              </Link>

              <span>/</span>

              <span className="text-lime-300/90">
                Leadership
              </span>

            </div>

            {/* BADGE */}

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-lime-200/30 bg-black/25 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-lime-200 backdrop-blur-md">

              <Users className="h-3 w-3" />

              Our Leadership

            </div>

            {/* HEADING */}

            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">

              Board of{" "}

              <span className="text-lime-200">
                Directors.
              </span>

            </h1>

            {/* DESCRIPTION */}

            <p className="mt-5 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
              Meet the leadership team guiding SolarNova with experience,
              strategic vision and a commitment to building a cleaner
              energy future.
            </p>

          </motion.div>

          {/* HERO STATS */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.15,
            }}
            className="mt-12 grid grid-cols-2 overflow-hidden rounded-2xl border border-white/15 bg-black/25 backdrop-blur-lg md:grid-cols-4"
          >

            {[
              ["01", "Leadership"],
              ["02", "Experience"],
              ["03", "Governance"],
              ["04", "Vision"],
            ].map(([number, label], index) => (

              <div
                key={number}
                className={`px-5 py-5 ${
                  index !== 3
                    ? "border-b border-white/10 md:border-b-0 md:border-r"
                    : ""
                }`}
              >

                <div className="text-[10px] tracking-[0.18em] text-lime-200/75">
                  {number}
                </div>

                <div className="mt-2 text-sm font-medium text-white/90">
                  {label}
                </div>

              </div>

            ))}

          </motion.div>

        </div>

      </section>

      {/* ========================================================= */}
      {/* INTRO + DIRECTORS */}
      {/* ========================================================= */}

      <section className="px-6 py-14 lg:px-8 lg:py-20">

        <div className="mx-auto max-w-7xl">

          {/* INTRO */}

          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">

            <div>

              <div className="mb-3 text-[11px] uppercase tracking-[0.22em] text-lime-300">
                Leadership
              </div>

              <h2 className="text-3xl font-semibold sm:text-4xl">
                Experience that{" "}
                <span className="text-lime-300">
                  moves us forward.
                </span>
              </h2>

            </div>

            <p className="max-w-2xl text-sm leading-7 text-white/45">
              Our Board brings together professionals with experience across
              renewable energy, infrastructure, finance, administration,
              strategy, law and corporate governance. Together, they provide
              the direction and oversight that supports SolarNova&apos;s
              long-term vision.
            </p>

          </div>

          {/* DIRECTORS */}

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            {directors.map((director, index) => (

              <motion.article
                key={director.name}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.05,
                }}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] transition-all duration-300 hover:-translate-y-1 hover:border-lime-300/20 hover:bg-lime-300/[0.025]"
              >

                {/* IMAGE */}

                <div className="relative h-[360px] overflow-hidden bg-[#081b12]">

                  <Image
                    src={director.image}
                    alt={`${director.name} - SolarNova Board of Directors`}
                    fill
                    priority={index < 3}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top transition duration-700 group-hover:scale-[1.035]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#03100b] via-transparent to-transparent opacity-90" />

                  {/* NUMBER */}

                  <div className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/30 px-3 py-1.5 text-[10px] tracking-[0.18em] text-lime-200 backdrop-blur-md">
                    {director.number}
                  </div>

                  {/* NAME */}

                  <div className="absolute bottom-5 left-5 right-5">

                    <div className="text-[10px] uppercase tracking-[0.18em] text-lime-300">
                      SolarNova Leadership
                    </div>

                    <h3 className="mt-2 text-xl font-semibold leading-tight text-white">
                      {director.name}
                    </h3>

                  </div>

                </div>

                {/* CARD CONTENT */}

                <div className="p-6">

                  <div className="flex items-start gap-3">

                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-lime-300/10 text-lime-300">
                      <BriefcaseBusiness className="h-4 w-4" />
                    </div>

                    <div>

                      <div className="text-[10px] uppercase tracking-[0.15em] text-white/30">
                        Position
                      </div>

                      <p className="mt-1 text-sm font-medium leading-6 text-lime-200/90">
                        {director.designation}
                      </p>

                    </div>

                  </div>

                  <div className="my-5 h-px bg-white/10" />

                  <p className="text-sm leading-7 text-white/45">
                    {director.experience}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-[11px] text-white/30">

                    <ShieldCheck className="h-3.5 w-3.5 text-lime-300/70" />

                    Leadership & Governance

                  </div>

                </div>

              </motion.article>

            ))}

          </div>

        </div>

      </section>

      {/* ========================================================= */}
      {/* GOVERNANCE */}
      {/* ========================================================= */}

      <section className="border-y border-white/10 bg-white/[0.02] px-6 py-16 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">

            <div>

              <div className="mb-3 text-[11px] uppercase tracking-[0.22em] text-lime-300">
                Our Approach
              </div>

              <h2 className="text-3xl font-semibold sm:text-4xl">

                Strong leadership.

                <br />

                <span className="text-lime-300">
                  Responsible growth.
                </span>

              </h2>

            </div>

            <div className="grid gap-3 sm:grid-cols-2">

              {[
                {
                  icon: ShieldCheck,
                  title: "Responsible Governance",
                  text: "Strong oversight and transparent decision-making.",
                },
                {
                  icon: Leaf,
                  title: "Sustainable Vision",
                  text: "Focused on long-term clean energy development.",
                },
                {
                  icon: Users,
                  title: "Experienced Leadership",
                  text: "Diverse expertise across multiple industries.",
                },
                {
                  icon: Sun,
                  title: "Future Focused",
                  text: "Building solutions for tomorrow's energy needs.",
                },
              ].map((item) => {

                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/10 bg-white/[0.025] p-5"
                  >

                    <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl bg-lime-300/10 text-lime-300">
                      <Icon className="h-4 w-4" />
                    </div>

                    <h3 className="text-sm font-semibold">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-xs leading-6 text-white/40">
                      {item.text}
                    </p>

                  </div>
                );

              })}

            </div>

          </div>

        </div>

      </section>

      {/* ========================================================= */}
      {/* CTA */}
      {/* ========================================================= */}

      <section className="px-6 py-16 lg:px-8 lg:py-20">

        <div className="mx-auto max-w-7xl">

          <div className="rounded-3xl border border-lime-300/15 bg-lime-300/[0.05] px-6 py-12 text-center sm:px-10">

            <Sun className="mx-auto mb-4 h-7 w-7 text-lime-300" />

            <h2 className="text-3xl font-semibold sm:text-4xl">
              Building the future of clean energy.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/45">
              Explore our solutions and discover how SolarNova is working
              towards a smarter and more sustainable energy future.
            </p>

            <Link
              href="/solutions"
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-lime-100/40 bg-lime-100/90 px-6 py-3 text-sm font-semibold text-[#18301f] shadow-lg shadow-lime-300/10 transition-all duration-300 hover:bg-white hover:shadow-lime-200/20"
            >

              Explore Solutions

              <ArrowRight className="h-4 w-4" />

            </Link>

          </div>

        </div>

      </section>

      {/* ========================================================= */}
      {/* FOOTER */}
      {/* ========================================================= */}

      <footer className="border-t border-white/10 bg-[#020d0a]">

        <div className="mx-auto w-full max-w-7xl px-6 py-12 lg:px-8">

          <div className="grid gap-10 md:grid-cols-3">

            {/* BRAND */}

            <div>

              <Link href="/" className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-lime-300/30 bg-lime-300/10">
                  <Sun className="h-4 w-4 text-lime-300" />
                </div>

                <div>
                  <div className="text-base font-bold tracking-wide">
                    Solar<span className="text-lime-300">Nova</span>
                  </div>

                  <div className="text-[8px] uppercase tracking-[0.22em] text-white/35">
                    Clean Energy
                  </div>
                </div>

              </Link>

              <p className="mt-4 max-w-sm text-sm leading-6 text-white/35">
                Building a smarter and more sustainable energy future through
                clean solar solutions.
              </p>

            </div>

            {/* EXPLORE */}

            <div>

              <h3 className="text-sm font-semibold text-white">
                Explore
              </h3>

              <div className="mt-4 grid gap-3">

                <Link
                  href="/"
                  className="text-sm text-white/45 transition hover:text-lime-300"
                >
                  Home
                </Link>

                <Link
                  href="/solutions"
                  className="text-sm text-white/45 transition hover:text-lime-300"
                >
                  Solutions
                </Link>

                <Link
                  href="/about"
                  className="text-sm text-white/45 transition hover:text-lime-300"
                >
                  About
                </Link>

                <Link
                  href="/blog"
                  className="text-sm text-white/45 transition hover:text-lime-300"
                >
                  Blog
                </Link>

                <Link
                  href="/contact"
                  className="text-sm text-white/45 transition hover:text-lime-300"
                >
                  Contact
                </Link>

              </div>

            </div>

            {/* COMPANY */}

            <div>

              <h3 className="text-sm font-semibold text-white">
                Company
              </h3>

              <div className="mt-4 grid gap-3">

                <Link
                  href="/about/board-of-directors"
                  className="text-sm text-white/45 transition hover:text-lime-300"
                >
                  Board of Directors
                </Link>

                <Link
                  href="/about/awards"
                  className="text-sm text-white/45 transition hover:text-lime-300"
                >
                  Awards & Certification
                </Link>

                <Link
                  href="/about"
                  className="text-sm text-white/45 transition hover:text-lime-300"
                >
                  About SolarNova
                </Link>

                <Link
                  href="/solutions"
                  className="text-sm text-white/45 transition hover:text-lime-300"
                >
                  Our Solutions
                </Link>

                <Link
                  href="/contact"
                  className="text-sm text-white/45 transition hover:text-lime-300"
                >
                  Get Started
                </Link>

              </div>

            </div>

          </div>

          {/* BOTTOM FOOTER */}

          <div className="mt-10 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center">

            <div className="text-[11px] text-white/25">
              © {new Date().getFullYear()} SolarNova. Clean energy for a
              brighter tomorrow.
            </div>

            <div className="flex flex-wrap gap-5">

              <Link
                href="/solutions"
                className="text-[11px] text-white/30 transition hover:text-lime-300"
              >
                Solutions
              </Link>

              <Link
                href="/about"
                className="text-[11px] text-white/30 transition hover:text-lime-300"
              >
                About
              </Link>

              <Link
                href="/blog"
                className="text-[11px] text-white/30 transition hover:text-lime-300"
              >
                Blog
              </Link>

              <Link
                href="/contact"
                className="text-[11px] text-white/30 transition hover:text-lime-300"
              >
                Contact
              </Link>

            </div>

          </div>

        </div>

      </footer>

    </main>
  );
}