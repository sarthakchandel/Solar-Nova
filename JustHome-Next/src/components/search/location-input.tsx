"use client";

import { useState, useRef, useEffect } from "react";
import { MapPin, Navigation, Loader2, ChevronDown, ArrowLeft, X, Target } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchStore } from "@/store/use-search-store";

import { useDebounce } from "@/hooks/use-debounce";

interface Prediction {
  placeId: string;
  description: string;
  mainText: string;
  secondaryText: string;
}

export function LocationInput() {
  const { location, setLocation } = useSearchStore();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(location);
  const [isDetecting, setIsDetecting] = useState(false);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const debouncedInput = useDebounce(inputValue, 300);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Sync local input state with global store when modal is closed
  useEffect(() => {
    if (!isOpen) setInputValue(location);
  }, [location, isOpen]);

  // Fetch Autocomplete Predictions
  useEffect(() => {
    async function fetchPredictions() {
      if (!debouncedInput.trim()) {
        setPredictions([]);
        return;
      }
      // Don't fetch if the input matches exactly what is stored (user just selected it)
      if (debouncedInput === location) return;

      setIsLoading(true);
      try {
        const res = await fetch(`/api/location/autocomplete?q=${encodeURIComponent(debouncedInput)}`);
        if (res.ok) {
          const data = await res.json();
          setPredictions(data.predictions || []);
        }
      } catch (err) {
        console.error("Failed to fetch location predictions:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPredictions();
  }, [debouncedInput, location]);

  // No longer close on outside click using wrapperRef, modal has an overlay click
  useEffect(() => {
    // Prevent scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsDetecting(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const res = await fetch(`/api/location/reverse?lat=${latitude}&lng=${longitude}`);
          if (res.ok) {
            const data = await res.json();
            const foundLocation = data.location || "Unknown Location";
            setLocation(foundLocation);
            setInputValue(foundLocation);
            setIsOpen(false);
          }
        } catch (error) {
          console.error("Reverse geocoding failed", error);
        } finally {
          setIsDetecting(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        setIsDetecting(false);
        alert("Unable to retrieve your location. Please check your browser permissions.");
      }
    );
  };

  return (
    <div className="relative flex-1 md:max-w-[280px] bg-card border border-border shadow-sm hover:shadow-md transition-shadow rounded-xl" ref={wrapperRef}>
      <div 
        onClick={() => setIsOpen(true)}
        className="relative flex items-center h-full cursor-pointer"
      >
        <MapPin className="absolute left-4 h-5 w-5 text-muted-foreground pointer-events-none" />
        <div className="w-full h-14 pl-12 pr-10 bg-transparent border-none text-base font-medium flex items-center truncate text-foreground">
          {location || "Your Location"}
        </div>
        <ChevronDown className="absolute right-4 h-4 w-4 text-muted-foreground pointer-events-none" />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <div className="absolute inset-0" onClick={() => setIsOpen(false)} />
            <div className="relative w-full max-w-2xl z-10">
              {/* Floating Close Button */}
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute -top-14 right-0 md:-right-14 bg-white rounded-full p-2 text-black hover:bg-gray-200 transition-colors shadow-lg"
              >
                <X className="h-6 w-6" />
              </button>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="w-full bg-white rounded-[24px] shadow-2xl overflow-hidden flex flex-col"
              >
                {/* Header Input */}
                <div className="p-6 pb-2">
                  <div className="relative flex items-center bg-muted/20 border border-border rounded-full px-5 py-3 focus-within:border-[#C8A96A] focus-within:ring-1 focus-within:ring-[#C8A96A] transition-all">
                    <ArrowLeft 
                      className="h-5 w-5 text-muted-foreground mr-3 cursor-pointer hover:text-foreground transition-colors" 
                      onClick={() => setIsOpen(false)}
                    />
                    <input
                      autoFocus
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Search for your location/society/apartment"
                      className="flex-1 bg-transparent border-none focus:outline-none text-foreground text-base placeholder:text-muted-foreground"
                    />
                  </div>
                </div>

                {/* Body */}
                <div className="px-6 py-5">
                  <button
                    onClick={handleDetectLocation}
                    disabled={isDetecting}
                    className="flex items-center gap-4 w-full text-left group"
                  >
                    {isDetecting ? (
                      <Loader2 className="h-6 w-6 text-[#C8A96A] animate-spin" />
                    ) : (
                      <Target className="h-6 w-6 text-[#C8A96A] group-hover:scale-110 transition-transform" />
                    )}
                    <span className="font-semibold text-[#C8A96A] text-base">Use current location</span>
                  </button>
                </div>

                {/* Suggestions List (only show if typing) */}
                {inputValue && (
                  <div className="px-6 pb-4 max-h-[300px] overflow-y-auto">
                    {isLoading ? (
                      <div className="py-8 flex justify-center items-center">
                        <Loader2 className="h-6 w-6 text-muted-foreground animate-spin" />
                      </div>
                    ) : predictions.length > 0 ? (
                      predictions.map((prediction) => (
                        <button
                          key={prediction.placeId}
                          onClick={() => {
                            setLocation(prediction.mainText);
                            setInputValue(prediction.mainText);
                            setIsOpen(false);
                          }}
                          className="flex items-start gap-4 w-full py-3 border-b border-border last:border-0 text-left hover:bg-muted/50 transition-colors"
                        >
                          <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                          <div className="flex flex-col">
                            <span className="text-base text-foreground font-medium line-clamp-1">{prediction.mainText}</span>
                            {prediction.secondaryText && (
                              <span className="text-sm text-muted-foreground line-clamp-1">{prediction.secondaryText}</span>
                            )}
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="py-4 text-center text-sm text-muted-foreground">
                        No locations found.
                      </div>
                    )}
                  </div>
                )}

                {/* Footer */}
                <div className="bg-muted/10 border-t border-border py-3 text-center flex items-center justify-center">
                  <span className="text-xs text-muted-foreground font-medium mr-1 tracking-wide">powered by</span>
                  <span className="text-sm font-bold tracking-tight">
                    <span className="text-[#4285F4]">G</span>
                    <span className="text-[#EA4335]">o</span>
                    <span className="text-[#FBBC05]">o</span>
                    <span className="text-[#4285F4]">g</span>
                    <span className="text-[#34A853]">l</span>
                    <span className="text-[#EA4335]">e</span>
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
