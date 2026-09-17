"use client";

import { useState } from "react";
import { MapPinOff, Globe, ArrowRight } from "lucide-react";
import { useCurrentServiceZone } from "@/hooks/use-current-service-zone";
import { ChangeLocationModal } from "@/components/layout/ChangeLocationModal";
import { Button } from "@/components/ui/button";

export default function NotAvailablePage() {
  const { detectLocation, setManualZone } = useCurrentServiceZone();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center px-4 bg-gradient-to-b from-background via-muted/30 to-background overflow-hidden">
      
      {/* Decorative Blur Spheres */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-accent/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="relative max-w-xl w-full text-center px-6 py-12 sm:px-12 bg-card/60 border border-border/80 rounded-3xl shadow-2xl backdrop-blur-md">
        
        {/* Unserviceable Icon */}
        <div className="inline-flex p-5 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 mb-6 animate-pulse">
          <MapPinOff className="w-10 h-10" />
        </div>

        {/* Title & Desc */}
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground tracking-tight">
          We're not here yet!
        </h1>
        <p className="text-muted-foreground mt-4 text-sm sm:text-base leading-relaxed">
          Rapid Help is currently active only in select service zones (Delhi, Noida, Gurgaon, Hisar, Bhiwani, and more). We hope to expand to your area soon!
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            onClick={() => setModalOpen(true)}
            className="h-12 px-6 rounded-xl flex items-center justify-center gap-2"
          >
            Select City Manually
            <ArrowRight className="w-4 h-4" />
          </Button>

          <Button 
            onClick={detectLocation}
            variant="outline"
            className="h-12 px-6 rounded-xl flex items-center justify-center gap-2 border-border hover:bg-muted"
          >
            <Globe className="w-4 h-4 text-accent" />
            Try Detecting Location Again
          </Button>
        </div>
      </div>

      {/* Manual Selection Modal */}
      <ChangeLocationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSelectZone={setManualZone}
        onLocateMe={detectLocation}
      />
    </div>
  );
}
