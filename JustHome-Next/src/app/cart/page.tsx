"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/use-cart-store";
import { useAuth } from "@/features/auth/use-auth";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const [isMounted, setIsMounted] = useState(false);
  const { isAuthenticated } = useAuth();
  const { items, updateQuantity, removeItem, getSubtotal, getTotalItems } = useCartStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="min-h-screen pt-32 pb-24" />;
  }

  const subtotal = getSubtotal();
  const totalItems = getTotalItems();
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center text-center max-w-md px-6"
        >
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
          </div>
          <h1 className="font-display text-3xl font-semibold text-primary dark:text-foreground mb-3">
            Your cart is empty
          </h1>
          <p className="text-muted-foreground mb-8">
            Looks like you haven&apos;t added any services to your cart yet. Let&apos;s find something you need!
          </p>
          <Link href="/services">
            <Button size="lg" className="rounded-full px-8">
              Explore Services
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-primary dark:text-foreground">
            Your Cart
          </h1>
          <p className="mt-2 text-muted-foreground">
            Review your selected services and proceed to checkout.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex-1 space-y-4"
          >
            {items.map((item) => (
              <div
                key={item.serviceId}
                className="flex items-center gap-4 glass-strong p-4 rounded-2xl"
              >
                <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg truncate pr-4">{item.title}</h3>
                  <div className="text-accent font-medium mt-1">
                    {formatPrice(item.price)}
                  </div>
                  
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center bg-muted rounded-full">
                      <button
                        onClick={() => updateQuantity(item.serviceId, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.serviceId, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => removeItem(item.serviceId)}
                      className="text-muted-foreground hover:text-destructive transition-colors p-2"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="hidden sm:block text-right self-start font-semibold text-lg">
                  {formatPrice(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full lg:w-96 shrink-0"
          >
            <div className="glass-strong rounded-2xl p-6 sticky top-32">
              <h2 className="font-display text-2xl font-semibold mb-6">Order Summary</h2>
              
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Items ({totalItems})</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Taxes & Fees</span>
                  <span className="font-medium">{formatPrice(tax)}</span>
                </div>
                
                <div className="pt-4 border-t border-border flex justify-between items-center">
                  <span className="text-base font-semibold">Total</span>
                  <span className="text-2xl font-bold text-accent-gradient">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              <Link href={isAuthenticated ? "/checkout/address" : "/auth?redirect=/checkout/address"} className="block mt-8">
                <Button className="w-full rounded-full h-12 text-base" size="lg">
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
