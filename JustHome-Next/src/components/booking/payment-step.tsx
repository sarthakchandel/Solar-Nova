"use client";

import { CreditCard, Smartphone, Wallet } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import type { Service } from "@/types";

const methods = [
  { id: "upi" as const, label: "UPI", icon: Smartphone, desc: "Google Pay, PhonePe" },
  { id: "card" as const, label: "Card", icon: CreditCard, desc: "Visa, Mastercard" },
  { id: "cod" as const, label: "Cash", icon: Wallet, desc: "Pay after service" },
];

interface PaymentStepProps {
  service: Service | undefined;
  date: string;
  time: string;
  paymentMethod: "card" | "upi" | "cod";
  onMethodChange: (m: "card" | "upi" | "cod") => void;
}

export function PaymentStep({ service, date, time, paymentMethod, onMethodChange }: PaymentStepProps) {
  return (
    <div className="space-y-5">
      <h2 className="font-semibold">Payment</h2>

      {service && (
        <div className="rounded-xl bg-muted p-4 space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">Service</span><span className="font-medium">{service.title}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span>{date}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Time</span><span>{time}</span></div>
          <div className="flex justify-between pt-2 border-t border-border"><span className="font-semibold">Total</span><span className="font-bold text-accent-gradient">{formatPrice(service.price)}</span></div>
        </div>
      )}

      <div className="space-y-2">
        {methods.map((m) => (
          <button
            key={m.id}
            onClick={() => onMethodChange(m.id)}
            className={cn(
              "w-full flex items-center gap-4 rounded-xl border p-4 text-left transition-all duration-300",
              paymentMethod === m.id ? "border-accent/50 bg-accent/10" : "border-border hover:bg-muted"
            )}
          >
            <m.icon className="h-5 w-5 text-accent" />
            <div>
              <p className="text-sm font-medium">{m.label}</p>
              <p className="text-xs text-muted-foreground">{m.desc}</p>
            </div>
          </button>
        ))}
      </div>

      <p className="text-xs text-muted-foreground text-center">This is a demo payment UI. No real charges will be made.</p>
    </div>
  );
}
