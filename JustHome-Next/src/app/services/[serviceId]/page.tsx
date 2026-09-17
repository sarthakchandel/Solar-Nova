"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Clock, CheckCircle2, ChevronRight, ShoppingCart, ShieldCheck, ThumbsUp, CreditCard, ChevronDown, ChevronUp } from "lucide-react";
import { getServiceDetails, BookingItem } from "@/lib/service-details-data";
import { SectionWrapper } from "@/components/pages/section-wrapper";
import { ServiceHeroCarousel } from "@/components/services/service-hero-carousel";

function ServiceCard({ 
  item, 
  cartItem, 
  onAdd, 
  onRemove 
}: { 
  item: BookingItem, 
  cartItem?: { item: BookingItem, quantity: number }, 
  onAdd: (item: BookingItem) => void, 
  onRemove: (id: string) => void 
}) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="group relative rounded-[2rem] overflow-hidden shadow-lg bg-card border border-border/50 hover:shadow-2xl transition-all duration-500 flex flex-col h-[400px]">
      {/* 70% Image Background */}
      <div className="relative w-full h-[70%] overflow-hidden bg-muted/30">
        {item.image ? (
          <img 
            src={item.image} 
            alt={item.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl bg-muted/20">📦</div>
        )}
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/90 pointer-events-none" />
        
        {/* Bestseller Tag */}
        {item.isBestseller && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-accent text-slate-900 text-xs font-bold uppercase tracking-wider rounded-md shadow-lg z-10">
            Bestseller
          </div>
        )}

        {/* Floating Content Over Image */}
        <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="text-2xl font-display font-bold text-white mb-2 leading-tight drop-shadow-md">{item.title}</h3>
          <div className="flex items-center gap-3 text-white/90 text-sm font-medium">
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 text-accent fill-accent" /> {item.rating}
            </span>
            <span className="w-1 h-1 rounded-full bg-white/50" />
            <span>{item.time}</span>
          </div>
        </div>
      </div>

      {/* 30% Content Area */}
      <div className="relative w-full h-[30%] bg-card p-6 flex items-center justify-between z-20">
        <div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-2xl font-display font-bold text-foreground">₹{item.price}</span>
            {item.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">₹{item.originalPrice}</span>
            )}
          </div>
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className="text-accent text-sm font-bold hover:underline flex items-center gap-1 transition-colors"
          >
            What's included
            {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Add Button */}
        <div className="w-32 shrink-0">
          {cartItem ? (
            <div className="flex items-center bg-card border border-accent rounded-xl overflow-hidden h-12 shadow-sm">
              <button onClick={() => onRemove(item.id)} className="flex-1 h-full flex items-center justify-center text-accent font-bold text-xl hover:bg-accent/10 transition-colors">-</button>
              <span className="w-8 text-center text-foreground font-bold">{cartItem.quantity}</span>
              <button onClick={() => onAdd(item)} className="flex-1 h-full flex items-center justify-center text-accent font-bold text-xl hover:bg-accent/10 transition-colors">+</button>
            </div>
          ) : (
            <button 
              onClick={() => onAdd(item)}
              className="w-full h-12 rounded-xl bg-accent text-slate-900 font-bold shadow-glow hover:shadow-[0_8px_20px_rgba(201,169,110,0.3)] hover:bg-[#b5955a] transition-all duration-300 transform active:scale-95"
            >
              Add
            </button>
          )}
        </div>
      </div>

      {/* Expandable Details Absolute Overlay */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute bottom-[30%] left-0 w-full bg-card/95 backdrop-blur-md z-20 border-t border-border/50"
          >
            <div className="p-6 space-y-3">
              <h4 className="text-sm font-bold text-accent uppercase tracking-wider mb-4">Included in this service</h4>
              {item.inclusions.map((inc, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-foreground font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{inc}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ServiceBookingPage() {
  const params = useParams();
  const serviceId = params.serviceId as string;
  const serviceDetails = getServiceDetails(serviceId);

  const [cart, setCart] = useState<{ item: BookingItem; quantity: number }[]>([]);
  const [activeCategory, setActiveCategory] = useState(serviceDetails.categories[0].id);

  const addToCart = (item: BookingItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.item.id === item.id);
      if (existing) {
        return prev.map((c) => (c.item.id === item.id ? { ...c, quantity: c.quantity + 1 } : c));
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.item.id === itemId);
      if (existing?.quantity === 1) {
        return prev.filter((c) => c.item.id !== itemId);
      }
      return prev.map((c) => (c.item.id === itemId ? { ...c, quantity: c.quantity - 1 } : c));
    });
  };

  const cartTotal = cart.reduce((total, c) => total + c.item.price * c.quantity, 0);
  const cartItemsCount = cart.reduce((count, c) => count + c.quantity, 0);

  const scrollToCategory = (id: string) => {
    setActiveCategory(id);
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-32 selection:bg-accent/30 relative">
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-accent/10 blur-[120px] -z-10 pointer-events-none" />

      <SectionWrapper className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Breadcrumb */}
        <div className="flex items-center text-xs text-muted-foreground mb-6">
          <span>Home</span>
          <ChevronRight className="w-3 h-3 mx-1" />
          <span>Services</span>
          <ChevronRight className="w-3 h-3 mx-1" />
          <span className="text-foreground font-medium capitalize">{serviceId.replace("-", " ")}</span>
        </div>
        {/* NEW UC-STYLE LAYOUT */}
        <div className="flex flex-col lg:flex-row gap-8 relative items-start mt-4">
          
          {/* Left Column (Sticky Top Section) */}
          <div className="hidden lg:flex flex-col w-64 xl:w-72 shrink-0 sticky top-24 self-start gap-6">
            {/* Main Title Section */}
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-3xl xl:text-4xl font-display font-bold text-foreground leading-tight">{serviceDetails.title}</h1>
                {/* Instant Badge */}
                <div className="bg-accent text-slate-900 text-[10px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1 shrink-0 mt-1 shadow-glow">
                  <Clock className="w-3 h-3" />
                  Instant
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm font-medium mt-3">
                <div className="flex items-center gap-1 text-foreground">
                  <Star className="w-4 h-4 fill-foreground" />
                  <span className="text-base">{serviceDetails.rating}</span>
                </div>
                <span className="text-muted-foreground text-xs">{serviceDetails.totalReviews} bookings</span>
              </div>
            </div>

            {/* Categories Grid (Premium Style) */}
            <div className="bg-card rounded-2xl border border-border shadow-sm p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl -z-10" />
              <h3 className="font-display font-bold text-foreground mb-5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Select a service
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {serviceDetails.categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => scrollToCategory(cat.id)}
                    className={`group relative flex flex-col items-center justify-center text-center p-4 rounded-2xl transition-all duration-500 border overflow-hidden ${
                      activeCategory === cat.id
                        ? "bg-gradient-to-br from-accent/10 to-transparent border-accent shadow-[0_4px_20px_rgba(201,169,110,0.15)] scale-[1.02]"
                        : "bg-muted/20 border-border hover:border-accent/30 hover:bg-accent/5 hover:-translate-y-0.5"
                    }`}
                  >
                    {/* Active State Background Glow */}
                    {activeCategory === cat.id && (
                      <div className="absolute inset-0 bg-accent/5 blur-md" />
                    )}
                    
                    {/* Icon/Initial Badge */}
                    <div className={`relative w-12 h-12 rounded-full mb-3 flex items-center justify-center text-xl font-display font-bold transition-all duration-500 ${
                      activeCategory === cat.id
                        ? "bg-accent text-slate-900 shadow-glow"
                        : "bg-background text-muted-foreground group-hover:text-accent group-hover:bg-accent/10 shadow-sm border border-border/50"
                    }`}>
                      {cat.title.charAt(0)}
                    </div>
                    
                    {/* Title */}
                    <span className={`relative text-xs font-bold leading-tight ${
                      activeCategory === cat.id ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                    }`}>
                      {cat.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Section (Fluid) */}
          <div className="flex-1 w-full space-y-8">
            
            {/* Animated Service Hero Carousel (Banner) */}
            <div className="w-full">
              <ServiceHeroCarousel serviceId={serviceId} />
            </div>

            {/* Inner 2-Column Layout */}
            <div className="flex flex-col lg:flex-row gap-8 relative items-start">
              
              {/* Middle Column: Main Feed */}
              <div className="flex-1 space-y-12">
                {serviceDetails.categories.map((category) => (
                  <div key={category.id} id={category.id} className="scroll-mt-24">
                    <h2 className="text-3xl font-display font-bold text-foreground border-b border-border/50 pb-4 mb-6">{category.title}</h2>
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                      {category.items.map((item) => (
                        <ServiceCard 
                          key={item.id}
                          item={item}
                          cartItem={cart.find(c => c.item.id === item.id)}
                          onAdd={addToCart}
                          onRemove={removeFromCart}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Global Sticky Bottom Checkout Bar (Desktop & Mobile) */}
      <AnimatePresence>
        {cartItemsCount > 0 && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 pointer-events-none"
          >
            <div className="max-w-4xl mx-auto pointer-events-auto">
              <div className="w-full bg-card border border-accent/30 rounded-[2rem] p-4 md:p-5 shadow-[0_10px_40px_rgba(201,169,110,0.15)] backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 w-full sm:w-auto px-2">
                  <div className="w-14 h-14 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-accent shadow-sm shrink-0">
                    <ShoppingCart className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">Your Cart</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-2xl font-display font-bold text-foreground">₹{cartTotal}</p>
                      <p className="text-sm text-muted-foreground font-medium">({cartItemsCount} item{cartItemsCount > 1 ? 's' : ''})</p>
                    </div>
                  </div>
                </div>
                <button className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-accent text-slate-900 text-lg font-bold shadow-glow hover:shadow-[0_8px_20px_rgba(201,169,110,0.3)] hover:bg-[#b5955a] transition-all duration-300 transform hover:-translate-y-1">
                  Continue booking
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
