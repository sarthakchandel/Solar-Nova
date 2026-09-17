"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  ShoppingCart, 
  Search, 
  MapPin, 
  Bell, 
  Flame, 
  Mic, 
  User, 
  ChevronDown,
  Clock,
  TrendingUp,
  Settings,
  LogOut,
  Map
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/use-cart-store";
import { useAuth } from "@/features/auth/use-auth";
import { useCurrentServiceZone } from "@/hooks/use-current-service-zone";
import { ChangeLocationModal } from "./ChangeLocationModal";

export function Navbar() {
  const scrolled = useScroll();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const cartItemsCount = useCartStore((state) => state.getTotalItems());
  const { isAuthenticated, user, signOut } = useAuth();
  const router = useRouter();
  const { currentZone, detectLocation, setManualZone, showLocationModal, setShowLocationModal, isNotServiceable } = useCurrentServiceZone();

  // Header specific states
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  
  // Mock data for search dropdown
  const recentSearches = ["AC Repair", "Home Cleaning", "Plumber"];
  const trendingServices = ["Sofa Cleaning", "RO Repair", "Electrician", "Pest Control"];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Close dropdowns when clicking outside
  const headerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setSearchFocused(false);
        setNotificationsOpen(false);
        setProfileOpen(false);
        setLocationOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header 
      ref={headerRef}
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "bg-card/90 backdrop-blur-2xl border-b border-border shadow-soft" : "bg-transparent border-b border-transparent"
      )}
    >
      <motion.nav
        initial={false}
        animate={{ paddingTop: scrolled ? 12 : 20, paddingBottom: scrolled ? 12 : 20 }}
        className="mx-auto max-w-7xl px-4 sm:px-6 flex items-center justify-between gap-4 lg:gap-8"
      >
        {/* Left: Logo & Brand */}
        <Link href="/" className="flex items-center gap-2 lg:gap-3 shrink-0 group">
          <div className="relative w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-full p-1 shadow-[0_0_15px_rgba(201,169,110,0.3)] group-hover:scale-105 transition-transform duration-300">
            <Image src="/logo.png" alt="Rapid Help" fill className="object-contain p-1" />
          </div>
          <span className="font-display text-xl lg:text-2xl font-bold text-foreground hidden sm:block">
            Rapid Help
          </span>
        </Link>

        {/* Center: Search & Location (Desktop) */}
        <div className="hidden md:flex flex-1 max-w-2xl relative">
          <div className={cn(
            "flex w-full items-center bg-muted/50 border border-border rounded-full p-1 transition-all duration-300",
            searchFocused ? "bg-card shadow-glow border-accent/50" : "hover:border-border/80"
          )}>
            
            {/* Location Pill */}
            <div className="relative shrink-0">
              <button 
                onClick={() => setShowLocationModal(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full hover:bg-muted transition-colors text-sm font-semibold text-foreground group"
              >
                <MapPin className="w-4 h-4 text-accent" />
                <span className="truncate max-w-[120px]">{currentZone?.name ?? "Select Location"}</span>
                <ChevronDown className="w-3 h-3 text-muted-foreground group-hover:text-foreground transition-colors" />
              </button>
            </div>

            <div className="h-6 w-px bg-border mx-2"></div>

            {/* Search Input */}
            <div className="flex-1 flex items-center px-2 relative">
              <Search className={cn("w-4 h-4 mr-2 transition-colors", searchFocused ? "text-accent" : "text-muted-foreground")} />
              <input
                type="text"
                placeholder="Search for 'AC Repair'"
                className="w-full bg-transparent text-sm font-medium text-foreground placeholder:text-muted-foreground outline-none py-2.5"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => { setSearchFocused(true); setLocationOpen(false); }}
              />
              <div className="flex items-center gap-1 shrink-0">
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="p-1.5 hover:bg-muted rounded-full transition-colors">
                    <X className="w-3 h-3 text-muted-foreground" />
                  </button>
                )}
                <div className="w-px h-4 bg-border mx-1"></div>
                <button className="p-1.5 hover:bg-muted rounded-full transition-colors group">
                  <Mic className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
                </button>
              </div>
            </div>
          </div>

          {/* Search Dropdown */}
          <AnimatePresence>
            {searchFocused && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-card border border-border shadow-card rounded-3xl p-6 z-50 overflow-hidden"
              >
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Clock className="w-3 h-3" /> Recent Searches
                    </h4>
                    <ul className="space-y-2">
                      {recentSearches.map(term => (
                        <li key={term} className="text-sm font-medium text-foreground hover:text-accent cursor-pointer transition-colors py-1">
                          {term}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                      <TrendingUp className="w-3 h-3 text-accent" /> Trending
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {trendingServices.map(term => (
                        <span key={term} className="px-3 py-1.5 bg-muted rounded-xl text-xs font-semibold text-foreground hover:bg-accent/10 hover:text-accent cursor-pointer transition-colors border border-transparent hover:border-accent/20">
                          {term}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Icons & Actions */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          
          {/* Offers Button */}
          <Link href="/offers" className="hidden lg:flex items-center gap-1.5 px-4 py-2 rounded-full bg-accent hover:bg-[#b5955a] text-slate-900 hover:scale-105 transition-all duration-300 mr-2 shadow-[0_0_15px_rgba(201,169,110,0.3)]">
            <Flame className="w-4 h-4" fill="currentColor" />
            <span className="text-sm font-bold">Offers</span>
          </Link>

          {/* Notifications */}
          <div className="relative hidden sm:block">
            <button 
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-card"></span>
            </button>
            <AnimatePresence>
              {notificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-80 bg-card border border-border shadow-card rounded-3xl p-4 z-50 origin-top-right"
                >
                  <h3 className="font-bold text-foreground mb-4 px-2">Notifications</h3>
                  <div className="space-y-1">
                    <div className="p-3 rounded-2xl bg-muted/50 hover:bg-muted cursor-pointer transition-colors">
                      <p className="text-sm font-semibold text-foreground mb-1">Booking Confirmed! 🎉</p>
                      <p className="text-xs text-muted-foreground line-clamp-2">Your AC Repair professional has been assigned and will arrive at 4:00 PM.</p>
                      <span className="text-[10px] text-accent font-medium mt-2 block">2 mins ago</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Cart */}
          <Link
            href="/cart"
            className="relative p-2.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            {isMounted && cartItemsCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground border border-card shadow-sm">
                {cartItemsCount}
              </span>
            )}
          </Link>
          
          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="p-1 rounded-full hover:bg-muted transition-colors outline-none focus:ring-2 focus:ring-accent/50 ml-1 sm:ml-2"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-700 via-accent to-[#e8c96a] flex items-center justify-center border border-border/50 text-white shadow-inner">
                <User className="w-4 h-4" />
              </div>
            </button>
            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-56 bg-card border border-border shadow-card rounded-3xl p-2 z-50 origin-top-right"
                >
                  {isAuthenticated ? (
                    <>
                      <div className="px-4 py-3 mb-2 border-b border-border">
                        <p className="text-sm font-bold text-foreground">My Account</p>
                        <p className="text-xs text-muted-foreground truncate">{user?.email || user?.phone || "Account"}</p>
                      </div>
                      <Link href="/profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-muted text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        <Settings className="w-4 h-4 text-accent" /> My Profile
                      </Link>
                      <Link href="/dashboard" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-muted text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        <Clock className="w-4 h-4 text-accent" /> My Bookings
                      </Link>
                      <Link href="/saved" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-muted text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        <Map className="w-4 h-4 text-accent" /> Saved Addresses
                      </Link>
                      <div className="h-px bg-border my-2 mx-2"></div>
                      <button onClick={signOut} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-red-500/10 text-sm font-medium text-red-500 transition-colors">
                        <LogOut className="w-4 h-4" /> Log out
                      </button>
                    </>
                  ) : (
                    <div className="p-2">
                      <Link href="/auth" className="flex items-center justify-center w-full py-2.5 rounded-xl bg-accent text-slate-900 font-bold text-sm hover:bg-[#b5955a] transition-colors">
                        Login / Sign Up
                      </Link>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2 rounded-full hover:bg-muted ml-1" onClick={() => setOpen(!open)}>
            {open ? <X className="w-5 h-5 text-foreground" /> : <Menu className="w-5 h-5 text-foreground" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Expansion */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-card/95 backdrop-blur-3xl overflow-hidden"
          >
            <div className="p-4 space-y-4">
              {/* Mobile Location Pill */}
              <button 
                onClick={() => { setShowLocationModal(true); setOpen(false); }}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-border bg-muted/30"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span className="text-sm font-semibold text-foreground">{currentZone?.name ?? "Select Location"}</span>
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </button>

              {/* Mobile Search */}
              <div className="flex w-full items-center bg-muted/50 border border-border rounded-xl p-3">
                <Search className="w-4 h-4 mr-3 text-muted-foreground" />
                <input type="text" placeholder="Search for services..." className="w-full bg-transparent text-sm font-medium outline-none" />
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <Link href="/offers" className="flex items-center justify-center gap-2 p-3 rounded-xl bg-orange-500/10 text-orange-500 text-sm font-bold border border-orange-500/20">
                  <Flame className="w-4 h-4" /> Offers
                </Link>
                <Link href="/notifications" className="flex items-center justify-center gap-2 p-3 rounded-xl bg-muted text-foreground text-sm font-bold border border-border">
                  <Bell className="w-4 h-4" /> Updates
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isNotServiceable && (
        <div className="w-full bg-red-500/10 border-t border-b border-red-500/20 text-red-500 text-center py-2.5 px-4 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2">
          <span>📍 We are not available at your place currently.</span>
          <button 
            onClick={() => setShowLocationModal(true)} 
            className="underline hover:text-red-600 transition-colors font-bold"
          >
            Change Location
          </button>
        </div>
      )}

      <ChangeLocationModal
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        onSelectZone={setManualZone}
        onLocateMe={detectLocation}
      />
    </header>
  );
}
