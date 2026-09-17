"use client";

import Image from "next/image";
import { services } from "@/lib/data";
import { formatPrice, cn } from "@/lib/utils";

interface ServiceStepProps {
  selectedId: string | null;
  onSelect: (serviceId: string, proId: string) => void;
}

export function ServiceStep({ selectedId, onSelect }: ServiceStepProps) {
  return (
    <div className="space-y-3">
      <h2 className="font-semibold mb-2">Select a service</h2>
      {services.map((s) => (
        <button
          key={s.id}
          onClick={() => onSelect(s.id, s.professionalId)}
          className={cn(
            "w-full flex items-center gap-4 rounded-xl border p-4 text-left transition-all duration-300",
            selectedId === s.id ? "border-accent/50 bg-accent/10" : "border-border hover:bg-muted"
          )}
        >
          <div className="relative h-14 w-14 rounded-lg overflow-hidden shrink-0">
            <Image src={s.image} alt={s.title} fill className="object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{s.title}</p>
            <p className="text-xs text-muted-foreground">{s.duration} · {s.categoryName}</p>
          </div>
          <span className="font-bold text-accent-gradient shrink-0">{formatPrice(s.price)}</span>
        </button>
      ))}
    </div>
  );
}
