
"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const carouselImages = [
  "/solar/Solar Rooftop.jpg",
  "/solar/Solar Home.jpg",
  "/solar/Solar Farm.jpg",
];

export default function ContactPage() {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % carouselImages.length);
  };

  const previousImage = () => {
    setCurrentImage(
      (prev) => (prev - 1 + carouselImages.length) % carouselImages.length
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-[#06110d] text-[#f5f3eb]">
      {/* Navbar */}
      <nav className="border-b border-white/10 bg-[#06110d]/95">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 md:px-8">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d9ff43] text-xl text-[#06110d]">
              ☀
            </div>

            <div>
              <div className="text-xl font-semibold">SolarNova</div>
              <div className="mt-1 text-[9px] uppercase tracking-[0.25em] text-emerald-300">
                Clean Energy
              </div>
            </div>
          </a>

          <a
            href="/"
            className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white/70 transition hover:border-[#d9ff43] hover:text-[#d9ff43]"
          >
            Back To Home
          </a>
        </div>
      </nav>

      {/* Top Image */}
      <section className="w-full">
        <div className="h-[280px] w-full overflow-hidden md:h-[420px]">
          <img
            src="/solar/Solar Contact.jpg"
            alt="Solar panels"
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      {/* Contact Section */}
      <section className="mx-auto w-full max-w-7xl px-5 py-20 md:px-8">
        <div className="grid w-full gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          {/* Left Content */}
          <div className="flex max-w-2xl flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#d9ff43]">
              Get In Touch
            </p>

            <h2 className="mt-4 text-4xl font-bold leading-[1.1] md:text-5xl lg:text-6xl">
              Start your journey towards clean energy.
            </h2>

            <p className="mt-7 text-base leading-8 text-white/60 md:text-lg">
              Have questions about solar panels, installation, savings or
              energy solutions? Our team is ready to help you find the right
              solar solution for your home or business.
            </p>

            <div className="mt-12 grid gap-8 sm:grid-cols-3">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-white/35">
                  Email
                </p>

                <p className="mt-2 text-sm text-white/70">
                  hello@solarnova.com
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-white/35">
                  Phone
                </p>

                <p className="mt-2 text-sm text-white/70">
                  +91 98765 43210
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-white/35">
                  Location
                </p>

                <p className="mt-2 text-sm text-white/70">
                  Dehradun, India
                </p>
              </div>
            </div>

            <div className="mt-14 border-t border-white/10 pt-8">
              <p className="text-sm leading-6 text-white/35">
                From residential rooftops to large-scale solar projects,
                SolarNova helps turn sunlight into reliable and sustainable
                energy.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-3xl border border-white/10 bg-[#102d2a] p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#d9ff43]">
              Contact Us
            </p>

            <h3 className="mt-3 text-2xl font-semibold">
              Tell us about your project.
            </h3>

            <form
              action="mailto:hello@solarnova.com"
              method="POST"
              encType="text/plain"
              className="mt-8 space-y-5"
            >
              {/* Name */}
              <div>
                <label className="mb-2 block text-sm text-white/60">
                  Full Name
                </label>

                <input
                  type="text"
                  name="Name"
                  required
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-white/10 bg-[#06110d] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#d9ff43]"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm text-white/60">
                  Email Address
                </label>

                <input
                  type="email"
                  name="Email"
                  required
                  placeholder="Enter your email address"
                  className="w-full rounded-xl border border-white/10 bg-[#06110d] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#d9ff43]"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="mb-2 block text-sm text-white/60">
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="Phone"
                  required
                  placeholder="Enter your phone number"
                  className="w-full rounded-xl border border-white/10 bg-[#06110d] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#d9ff43]"
                />
              </div>

              {/* Location */}
              <div>
                <label className="mb-2 block text-sm text-white/60">
                  Location
                </label>

                <input
                  type="text"
                  name="Location"
                  required
                  placeholder="Enter your city / location"
                  className="w-full rounded-xl border border-white/10 bg-[#06110d] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#d9ff43]"
                />
              </div>

              {/* Solar Requirement */}
              <div>
                <label className="mb-2 block text-sm text-white/60">
                  Solar Requirement
                </label>

                <select
                  name="Solar Requirement"
                  required
                  defaultValue=""
                  className="w-full rounded-xl border border-white/10 bg-[#06110d] px-4 py-3.5 text-sm text-white outline-none transition focus:border-[#d9ff43]"
                >
                  <option value="" disabled>
                    Select your requirement
                  </option>

                  <option value="Residential Solar">
                    Residential Solar
                  </option>

                  <option value="Commercial Solar">
                    Commercial Solar
                  </option>

                  <option value="Industrial Solar">
                    Industrial Solar
                  </option>

                  <option value="Solar Installation">
                    Solar Installation
                  </option>

                  <option value="Solar Consultation">
                    Solar Consultation
                  </option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="mb-2 block text-sm text-white/60">
                  Message
                </label>

                <textarea
                  name="Message"
                  required
                  rows={4}
                  placeholder="Tell us about your solar requirement..."
                  className="w-full resize-none rounded-xl border border-white/10 bg-[#06110d] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#d9ff43]"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full rounded-full bg-[#d9ff43] px-6 py-4 font-semibold text-[#06110d] transition hover:-translate-y-0.5 hover:bg-[#e4ff70]"
              >
                Submit Enquiry
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* CTA + Carousel */}
      <section className="border-t border-white/10 bg-[#102d2a] px-5 py-20 md:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* CTA Text */}
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#d9ff43]">
              SolarNova
            </p>

            <h2 className="mt-4 text-4xl font-bold leading-[1.05] md:text-5xl lg:text-6xl">
              Ready to make the switch to solar?
            </h2>

            <p className="mt-6 leading-7 text-white/60">
              Build a cleaner, smarter and more sustainable energy future with
              SolarNova.
            </p>

            <a
              href="/"
              className="mt-8 inline-flex rounded-full bg-[#d9ff43] px-7 py-3.5 font-semibold text-[#06110d] transition hover:scale-105 hover:bg-[#e4ff70]"
            >
              Explore SolarNova →
            </a>
          </div>

          {/* Carousel */}
          <div className="w-full min-w-0">
            <div className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-[#06110d]">
              <div className="relative aspect-[16/10] w-full sm:aspect-[16/9]">
                <div
                  className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
                  style={{
                    transform: `translateX(-${currentImage * 100}%)`,
                  }}
                >
                  {carouselImages.map((image, index) => (
                    <div
                      key={image}
                      className="relative h-full w-full flex-[0_0_100%]"
                    >
                      <img
                        src={image}
                        alt={`Solar energy solution ${index + 1}`}
                        className="absolute inset-0 h-full w-full object-cover"
                        draggable="false"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-[#06110d]/70 via-transparent to-transparent" />
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={previousImage}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#06110d]/75 text-white backdrop-blur-md transition hover:scale-110 hover:border-[#d9ff43] hover:text-[#d9ff43] sm:left-4 sm:h-11 sm:w-11"
                >
                  <ChevronLeft size={20} />
                </button>

                <button
                  type="button"
                  onClick={nextImage}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#06110d]/75 text-white backdrop-blur-md transition hover:scale-110 hover:border-[#d9ff43] hover:text-[#d9ff43] sm:right-4 sm:h-11 sm:w-11"
                >
                  <ChevronRight size={20} />
                </button>

                <div className="absolute bottom-4 left-4 z-10 rounded-full bg-[#06110d]/75 px-3 py-1.5 text-xs font-semibold backdrop-blur-md sm:bottom-5 sm:left-5 sm:px-4 sm:py-2">
                  {currentImage + 1} / {carouselImages.length}
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-center gap-2">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Go to image ${index + 1}`}
                  onClick={() => setCurrentImage(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentImage === index
                      ? "w-8 bg-[#d9ff43]"
                      : "w-2 bg-white/25 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#06110d]">
        <div className="mx-auto w-full max-w-7xl px-5 py-10 md:px-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d9ff43] text-xl text-[#06110d]">
                ☀
              </div>

              <div>
                <div className="text-xl font-semibold">SolarNova</div>

                <div className="mt-1 text-[9px] uppercase tracking-[0.25em] text-emerald-300">
                  Clean Energy
                </div>
              </div>
            </div>

            <p className="text-center text-sm text-white/40 md:text-left">
              Powering a cleaner, smarter and more sustainable future.
            </p>

            <a
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/70 transition hover:border-[#d9ff43] hover:text-[#d9ff43]"
            >
              Back To Home
            </a>
          </div>

          <div className="mt-8 border-t border-white/10 pt-6 text-center md:flex md:items-center md:justify-between md:text-left">
            <p className="text-xs text-white/30">
              © 2026 SolarNova. All rights reserved.
            </p>

            <p className="mt-2 text-xs text-white/30 md:mt-0">
              Clean energy for a brighter future.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
