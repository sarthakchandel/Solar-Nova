"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Twitter,
  Apple,
  Play,
  Mail,
} from "lucide-react";

const footerLinks = {
  Company: [
    { name: "About us", href: "/about-us" },
    { name: "Terms & conditions", href: "/terms-and-conditions" },
    { name: "Privacy policy", href: "/privacy-policy" },
    { name: "Anti-discrimination policy", href: "/anti-discrimination-policy" },
    { name: "Careers", href: "/careers" }
  ],
  "For customers": [
    { name: "Rapid Home reviews", href: "/reviews" },
    { name: "Categories near you", href: "/categories-near-you" },
    { name: "Contact us", href: "/contact" }
  ],
  Support: [
    { name: "Help Center", href: "/help-center" },
    { name: "Safety", href: "/safety" },
    { name: "Terms", href: "/terms-and-conditions" },
    { name: "Privacy", href: "/privacy-policy" }
  ],
};


export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      
      // Reset after 3 seconds
      setTimeout(() => {
        setStatus("idle");
      }, 3000);
    }, 1000);
  };

  return (
    <footer className="relative bg-primary text-slate-300 pt-24 pb-8 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#C9A96E]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* 3. Main Footer Grid - Brand */}
          <div className="col-span-1 md:col-span-12 lg:col-span-4">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="bg-white rounded-full p-1 shadow-[0_0_15px_rgba(201,169,110,0.4)]">
                <Image src="/logo.png" alt="Rapid Help" width={48} height={48} className="object-contain drop-shadow-md" />
              </div>
              <span className="font-display text-3xl font-semibold text-white mt-1">Rapid Help</span>
            </Link>
            <p className="text-slate-400 mb-8 max-w-sm leading-relaxed">
              Premium home services at your doorstep. We connect you with verified, trusted professionals for a luxury service experience.
            </p>
            
            {/* 5. App Download Section */}
            <div className="flex flex-wrap gap-4">
              <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-black/50 border border-white/10 rounded-xl px-4 py-2 hover:bg-black hover:border-white/20 transition-all hover:scale-105 group">
                <Apple className="h-7 w-7 text-white" />
                <div className="flex flex-col items-start">
                  <span className="text-[10px] text-slate-400 leading-none group-hover:text-white transition-colors">Download on the</span>
                  <span className="text-sm font-semibold text-white leading-tight">App Store</span>
                </div>
              </a>
              <a href="https://play.google.com/store/apps" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-black/50 border border-white/10 rounded-xl px-4 py-2 hover:bg-black hover:border-white/20 transition-all hover:scale-105 group">
                <Play className="h-6 w-6 text-[#C9A96E] fill-[#C9A96E]" />
                <div className="flex flex-col items-start">
                  <span className="text-[10px] text-slate-400 leading-none group-hover:text-white transition-colors">GET IT ON</span>
                  <span className="text-sm font-semibold text-white leading-tight">Google Play</span>
                </div>
              </a>
            </div>
          </div>

          {/* 3. Main Footer Grid - Links */}
          <div className="col-span-1 md:col-span-7 lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {Object.entries(footerLinks).map(([title, items], idx) => (
              <div key={title}>
                <h4 className="font-semibold text-white mb-6 tracking-wide">{title}</h4>
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm text-slate-400 hover:text-[#C9A96E] transition-colors relative group inline-block">
                        <span>{item.name}</span>
                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#C9A96E] transition-all group-hover:w-full"></span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* 4. Newsletter Section */}
          <div className="col-span-1 md:col-span-5 lg:col-span-3">
            <h4 className="font-semibold text-white mb-6 tracking-wide">Stay Updated</h4>
            <p className="text-sm text-slate-400 mb-4">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            <form onSubmit={handleSubscribe} className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-[#C9A96E] transition-colors" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading" || status === "success"}
                required
                placeholder="Enter your email" 
                className="w-full h-12 pl-10 pr-32 rounded-xl bg-white/5 border border-white/10 focus:border-[#C9A96E]/50 focus:bg-white/10 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:ring-1 focus:ring-[#C9A96E]/50 transition-all disabled:opacity-50"
              />
              <button 
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="absolute right-1 top-1 bottom-1 px-4 bg-[#C9A96E] hover:bg-[#b5955a] disabled:bg-[#C9A96E]/50 disabled:hover:bg-[#C9A96E]/50 text-slate-900 text-sm font-semibold rounded-lg transition-colors flex items-center justify-center min-w-[90px]"
              >
                {status === "loading" ? (
                  <svg className="animate-spin h-4 w-4 text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                ) : status === "success" ? (
                  "Subscribed!"
                ) : (
                  "Subscribe"
                )}
              </button>
            </form>
          </div>
          
        </div>

        {/* 6. Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-slate-500">
            © {new Date().getFullYear()} Rapid Help. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            {[
              { Icon: Twitter, href: "https://twitter.com" },
              { Icon: Instagram, href: "https://instagram.com" },
              { Icon: Facebook, href: "https://facebook.com" },
            ].map(({ Icon, href }, i) => (
              <a 
                key={i} 
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-[#C9A96E] hover:border-[#C9A96E]/50 hover:bg-[#C9A96E]/10 hover:shadow-[0_0_15px_rgba(201,169,110,0.2)] transition-all"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
