"use client";

import { useEffect, useState, startTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/features/auth/use-auth";
import { useCurrentServiceZone } from "@/hooks/use-current-service-zone";
import { profileService } from "@/services/profile.service";
import { locationService } from "@/services/location.service";
import { AddressStep } from "@/components/booking/address-step";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Plus, ArrowLeft, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";
import type { Address } from "@/types";

export default function CheckoutAddressPage() {
  const router = useRouter();
  const { isAuthenticated, token, role } = useAuth();
  const { currentZone } = useCurrentServiceZone();

  const [addresses, setAddresses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [isZoneValid, setIsZoneValid] = useState<boolean>(true);
  const [isValidatingZone, setIsValidatingZone] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [newAddr, setNewAddr] = useState<Address>({
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: "",
    latitude: undefined,
    longitude: undefined,
  });

  const loadAddresses = async (autoSelectNewId?: string) => {
    setIsLoading(true);
    setErrorMsg("");
    try {
      const res = await profileService.getMyAddresses();
      if (res.success && res.data) {
        setAddresses(res.data);
        
        // Empty Address Handling: if empty, automatically open Add Address form
        if (res.data.length === 0) {
          setShowAddModal(true);
        } else {
          // Auto select either the newly created address, the default one, or the first one
          let toSelect = res.data[0];
          if (autoSelectNewId) {
            const found = res.data.find(a => a.id === autoSelectNewId);
            if (found) toSelect = found;
          }
          if (toSelect) {
            handleSelectAddress(toSelect);
          }
        }
      } else {
        setErrorMsg(res.error ?? "Failed to load saved addresses.");
      }
    } catch (err: any) {
      setErrorMsg("Error loading saved addresses.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && token) {
      loadAddresses();
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, token]);

  // Auth check redirect
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth?redirect=/checkout/address");
    }
  }, [isAuthenticated, isLoading, router]);

  const handleSelectAddress = async (addr: any) => {
    setSelectedAddressId(addr.id);
    setValidationError(null);
    setIsZoneValid(true);

    if (!currentZone) return;

    if (addr.latitude !== undefined && addr.longitude !== undefined && addr.latitude !== 0 && addr.longitude !== 0) {
      setIsValidatingZone(true);
      try {
        const detectRes = await locationService.detectServiceZone(addr.latitude, addr.longitude);
        if (detectRes.success && detectRes.data) {
          if (detectRes.data.id === currentZone.id) {
            setIsZoneValid(true);
          } else {
            setIsZoneValid(false);
            setValidationError("This service is currently unavailable at this location.");
          }
        } else {
          setIsZoneValid(false);
          setValidationError(detectRes.error ?? "This service is currently unavailable at this location.");
        }
      } catch (err) {
        setIsZoneValid(false);
        setValidationError("This service is currently unavailable at this location.");
      } finally {
        setIsValidatingZone(false);
      }
    } else {
      // Fallback matching using city name
      const addressCity = addr.city || "";
      const zoneCity = currentZone.name || "";
      if (addressCity.toLowerCase().includes(zoneCity.toLowerCase()) || zoneCity.toLowerCase().includes(addressCity.toLowerCase())) {
        setIsZoneValid(true);
      } else {
        setIsZoneValid(false);
        setValidationError("This service is currently unavailable at this location.");
      }
    }
  };

  const handleSaveAddress = async () => {
    if (!newAddr.line1.trim() || !newAddr.city.trim() || !newAddr.pincode.trim()) {
      setErrorMsg("Please complete all required fields.");
      return;
    }

    setIsSaving(true);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      let lat = newAddr.latitude;
      let lng = newAddr.longitude;

      if ((!lat || !lng) && typeof window !== "undefined" && window.google?.maps) {
        const geocoder = new window.google.maps.Geocoder();
        let geocodeSuccess = false;

        try {
          const query = `${newAddr.line1}, ${newAddr.line2}, ${newAddr.city} - ${newAddr.pincode}`.replace(/,\s*,/g, ",").trim();
          const results = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
            geocoder.geocode({ address: query }, (res, status) => {
              if (status === "OK" && res && res.length > 0) resolve(res);
              else reject(new Error(`Geocoding status: ${status}`));
            });
          });
          if (results && results[0]) {
            lat = results[0].geometry.location.lat();
            lng = results[0].geometry.location.lng();
            geocodeSuccess = true;
          }
        } catch (err) {
          console.warn("Precise geocoding failed, trying fallback...", err);
        }

        if (!geocodeSuccess) {
          try {
            const query = `${newAddr.city} - ${newAddr.pincode}`.trim();
            const results = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
              geocoder.geocode({ address: query }, (res, status) => {
                if (status === "OK" && res && res.length > 0) resolve(res);
                else reject(new Error(`Geocoding status: ${status}`));
              });
            });
            if (results && results[0]) {
              lat = results[0].geometry.location.lat();
              lng = results[0].geometry.location.lng();
              geocodeSuccess = true;
            }
          } catch (err) {
            console.warn("City & Pincode geocoding failed...", err);
          }
        }
      }

      const payload = {
        label: newAddr.line2 || "Home",
        line1: newAddr.line1,
        city: newAddr.city,
        state: newAddr.state ?? "",
        pincode: newAddr.pincode,
        latitude: lat,
        longitude: lng,
        serviceZoneId: currentZone?.id,
      };

      const res = await profileService.createAddress(payload);
      if (res.success && res.data) {
        setSuccessMsg("Address saved successfully!");
        setShowAddModal(false);
        const createdId = res.data;
        
        setNewAddr({
          line1: "",
          line2: "",
          city: "",
          state: "",
          pincode: "",
          latitude: undefined,
          longitude: undefined,
        });

        // Reload addresses and automatically select the newly created address ID
        await loadAddresses(createdId);
      } else {
        setErrorMsg(res.error ?? "Failed to save address.");
      }
    } catch (err: any) {
      setErrorMsg(err.message ?? "Failed to save address.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleContinue = () => {
    if (selectedAddressId && isZoneValid) {
      router.push(`/checkout/review?addressId=${selectedAddressId}`);
    }
  };

  if (!isAuthenticated || role !== "Customer") {
    return (
      <div className="pt-32 pb-24 text-center px-6 min-h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground mt-4">Verifying session details…</p>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-3xl px-6">
        <Link href="/cart" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Cart
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6 mb-8">
          <div>
            <h1 className="font-display text-4xl font-semibold text-primary dark:text-foreground">
              Select Address
            </h1>
            <p className="text-muted-foreground mt-1">
              Select where the service should be executed
            </p>
          </div>
          <Button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 rounded-full px-5">
            <Plus className="h-4.5 w-4.5" />
            Add Address
          </Button>
        </div>

        {successMsg && (
          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-sm px-4 py-3 rounded-xl mb-6">
            <CheckCircle2 className="h-5 w-5" />
            <span>{successMsg}</span>
          </div>
        )}
        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm px-4 py-3 rounded-xl mb-6">
            {errorMsg}
          </div>
        )}

        {validationError && (
          <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 text-red-500 text-sm px-4 py-3 rounded-xl mb-6">
            <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Service Area Mismatch</p>
              <p className="text-xs text-red-500/90 mt-0.5">{validationError}</p>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-accent mx-auto" />
            <p className="text-sm text-muted-foreground mt-4">Loading saved addresses…</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {addresses.map((addr) => {
                const isSelected = selectedAddressId === addr.id;
                return (
                  <div
                    key={addr.id}
                    onClick={() => handleSelectAddress(addr)}
                    className={`cursor-pointer relative overflow-hidden transition-all duration-300 p-6 rounded-[2rem] border ${
                      isSelected
                        ? "bg-card border-primary shadow-[0_4px_20px_rgba(201,169,110,0.15)]"
                        : "glass hover:border-primary/30 border-border/50"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Radio element */}
                      <div className="flex items-center justify-center shrink-0 mt-1">
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-200 ${
                          isSelected ? "border-primary bg-primary" : "border-muted-foreground/50 bg-transparent"
                        }`}>
                          {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-foreground capitalize">
                            🏠 {addr.line2 || "Home"}
                          </span>
                          {addr.isDefault && (
                            <span className="text-[10px] bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-full font-semibold">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-2 font-medium">
                          {addr.line1}
                        </p>
                        <p className="text-xs text-muted-foreground/80 mt-1">
                          {addr.city} - {addr.pincode}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Bar */}
            <div className="border-t border-border/50 pt-6 mt-8 flex justify-end gap-4">
              <Button
                onClick={() => router.push("/cart")}
                variant="outline"
                className="rounded-full px-6"
              >
                Back
              </Button>
              <Button
                onClick={handleContinue}
                disabled={!selectedAddressId || !isZoneValid || isValidatingZone}
                className="rounded-full px-10 gap-2 font-bold"
              >
                {isValidatingZone ? (
                  <>
                    <Loader2 className="h-4.5 w-4.5 animate-spin" />
                    Validating Location...
                  </>
                ) : (
                  "Continue"
                )}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Add Address Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="bg-background border border-border w-full max-w-lg rounded-[2.5rem] p-6 md:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-display text-2xl font-bold text-primary dark:text-foreground">
                  Add New Address
                </h3>
                {addresses.length > 0 && (
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="text-muted-foreground hover:text-foreground text-sm font-semibold"
                  >
                    Close
                  </button>
                )}
              </div>

              <div className="space-y-4 max-h-[55vh] overflow-y-auto pr-1 pb-6">
                <AddressStep
                  address={newAddr}
                  onChange={(data) => setNewAddr((prev) => ({ ...prev, ...data }))}
                />
              </div>

              <div className="flex justify-end gap-3 mt-6 border-t border-border pt-4">
                {addresses.length > 0 && (
                  <Button
                    variant="outline"
                    onClick={() => setShowAddModal(false)}
                    disabled={isSaving}
                    className="rounded-full px-6"
                  >
                    Cancel
                  </Button>
                )}
                <Button
                  onClick={handleSaveAddress}
                  disabled={isSaving}
                  className="rounded-full px-8"
                >
                  {isSaving ? "Saving..." : "Save Address"}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
