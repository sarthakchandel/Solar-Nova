"use client";

import { useEffect, useState } from "react";
import { Search, MapPin, X, Navigation } from "lucide-react";
import { locationService, ServiceZoneDto } from "@/services/location.service";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface ChangeLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectZone: (zone: { id: string; name: string; slug: string }) => void;
  onLocateMe: () => void;
}

export function ChangeLocationModal({ isOpen, onClose, onSelectZone, onLocateMe }: ChangeLocationModalProps) {
  const [zones, setZones] = useState<ServiceZoneDto[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    async function fetchZones() {
      setIsLoading(true);
      try {
        const res = await locationService.getActiveServiceZones();
        if (res.success && res.data) {
          // Check if data is array or wrapped
          const items = Array.isArray(res.data) ? res.data : (res.data as any).data || [];
          setZones(items);
        }
      } catch (err) {
        console.error("Failed to load active service zones", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchZones();
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredZones = zones.filter((zone) =>
    zone.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg bg-card/90 dark:bg-zinc-900/90 border border-border/80 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-md">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/50">
          <div>
            <h2 className="text-xl font-bold text-foreground">Select Location</h2>
            <p className="text-sm text-muted-foreground mt-1">Select your service zone to view available services</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & GPS Trigger */}
        <div className="p-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search city or service zone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 text-sm transition-all"
            />
          </div>

          <Button
            onClick={() => {
              onLocateMe();
              onClose();
            }}
            variant="outline"
            className="w-full h-12 flex items-center justify-center gap-2 border-accent/30 hover:bg-accent/10 rounded-xl"
          >
            <Navigation className="w-4 h-4 text-accent" />
            Detect My Location (GPS)
          </Button>
        </div>

        {/* Zones List */}
        <div className="px-6 pb-8 max-h-[300px] overflow-y-auto space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Popular Serviceable Cities</p>
          {isLoading ? (
            <div className="py-8 text-center text-muted-foreground text-sm">Loading service zones...</div>
          ) : filteredZones.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {filteredZones.map((zone) => (
                <button
                  key={zone.id}
                  onClick={() => {
                    onSelectZone(zone);
                    onClose();
                  }}
                  className="flex items-center gap-3 p-4 rounded-2xl border border-border/50 bg-muted/10 hover:bg-accent/10 hover:border-accent/40 hover:scale-[1.02] active:scale-[0.98] transition-all text-left"
                >
                  <MapPin className="w-5 h-5 text-accent shrink-0" />
                  <span className="font-semibold text-sm text-foreground">{zone.name}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-muted-foreground text-sm">No service zones matching your search.</div>
          )}
        </div>
      </div>
    </div>
  );
}
