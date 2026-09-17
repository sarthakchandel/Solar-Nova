"use client";

import { BOOKING_STEPS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {BOOKING_STEPS.map((label, i) => (
        <div key={label} className="flex items-center gap-2 flex-1">
          <div className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-all duration-300 shrink-0",
            i < currentStep ? "bg-accent text-accent-foreground" :
            i === currentStep ? "bg-primary text-primary-foreground ring-2 ring-accent/30" :
            "bg-muted text-muted-foreground"
          )}>
            {i < currentStep ? <Check className="h-4 w-4" /> : i + 1}
          </div>
          <span className={cn("text-xs font-medium hidden sm:block", i === currentStep ? "text-foreground" : "text-muted-foreground")}>{label}</span>
          {i < BOOKING_STEPS.length - 1 && (
            <div className={cn("h-0.5 flex-1 rounded-full mx-1", i < currentStep ? "bg-accent" : "bg-muted")} />
          )}
        </div>
      ))}
    </div>
  );
}
