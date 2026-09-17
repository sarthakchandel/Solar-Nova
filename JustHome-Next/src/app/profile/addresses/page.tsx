"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/features/auth/use-auth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { profileService } from "@/services/profile.service";
import { AddressStep } from "@/components/booking/address-step";
import { MapPin, Plus, Trash2, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import type { Address } from "@/types";

export default function CustomerAddressesPage() {
  const { token, role, isAuthenticated } = useAuth();
  const [addresses, setAddresses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
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

  const loadAddresses = async () => {
    setIsLoading(true);
    setErrorMsg("");
    try {
      const res = await profileService.getMyAddresses();
      if (res.success && res.data) {
        setAddresses(res.data);
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
    if (isAuthenticated && token && role === "Customer") {
      loadAddresses();
    }
  }, [isAuthenticated, token, role]);

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

      // If coordinates are missing (e.g. user typed address manually), try to geocode it first!
      if ((!lat || !lng) && typeof window !== "undefined" && window.google?.maps) {
        const geocoder = new window.google.maps.Geocoder();
        let geocodeSuccess = false;

        // Try 1: Precise address query
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

        // Try 2: Fallback query (City & Pincode)
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
            console.warn("City & Pincode geocoding failed, trying last resort (Pincode)...", err);
          }
        }

        // Try 3: Last resort query (Pincode only)
        if (!geocodeSuccess) {
          try {
            const query = newAddr.pincode.trim();
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
            console.error("All geocoding fallbacks failed:", err);
          }
        }
      }

      // Map to request body
      const payload = {
        label: newAddr.line2 || "Home",
        line1: newAddr.line1,
        city: newAddr.city,
        state: newAddr.state ?? "",
        pincode: newAddr.pincode,
        latitude: lat,
        longitude: lng,
      };

      console.log("Saving address payload:", payload);

      const res = await profileService.createAddress(payload);
      if (res.success) {
        setSuccessMsg("Address saved successfully!");
        setShowAddModal(false);
        setNewAddr({
          line1: "",
          line2: "",
          city: "",
          state: "",
          pincode: "",
          latitude: undefined,
          longitude: undefined,
        });
        loadAddresses();
      } else {
        setErrorMsg(res.error ?? "Failed to save address.");
      }
    } catch (err: any) {
      setErrorMsg(err.message ?? "Failed to save address.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAddress = async (id: string) => {
    if (!confirm("Are you sure you want to delete this address?")) return;
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const res = await profileService.deleteAddress(id);
      if (res.success) {
        setSuccessMsg("Address deleted successfully.");
        loadAddresses();
      } else {
        setErrorMsg(res.error ?? "Failed to delete address.");
      }
    } catch (err: any) {
      setErrorMsg("Failed to delete address.");
    }
  };

  if (!isAuthenticated || role !== "Customer") {
    return (
      <div className="pt-32 pb-24 text-center px-6">
        <h1 className="font-display text-2xl font-semibold">Please sign in as a Customer</h1>
        <Link href="/auth" className="inline-block mt-4">
          <Button>Sign In</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-3xl px-6">
        {/* Navigation back */}
        <Link href="/profile" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Profile
        </Link>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6 mb-8">
          <div>
            <h1 className="font-display text-4xl font-semibold text-primary dark:text-foreground">
              Saved Addresses
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your saved addresses for service execution
            </p>
          </div>
          <Button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 rounded-full px-5">
            <Plus className="h-4.5 w-4.5" />
            Add Address
          </Button>
        </div>

        {/* Messaging */}
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

        {/* Content list */}
        {isLoading ? (
          <div className="text-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-accent mx-auto" />
            <p className="text-sm text-muted-foreground mt-4">Loading saved addresses…</p>
          </div>
        ) : addresses.length === 0 ? (
          <Card hover={false} className="p-12 text-center flex flex-col items-center justify-center border border-dashed">
            <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mb-4 text-muted-foreground">
              <MapPin className="h-8 w-8" />
            </div>
            <h3 className="font-semibold text-lg text-primary dark:text-foreground">No saved addresses</h3>
            <p className="text-muted-foreground text-sm max-w-sm mt-1 mb-6">
              You haven&apos;t saved any addresses yet. Add one now to speed up checkout when booking.
            </p>
            <Button onClick={() => setShowAddModal(true)} variant="outline" className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> Add Address
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {addresses.map((addr) => (
              <Card key={addr.id} hover={false} className="p-6 relative group overflow-hidden">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent/10 border border-accent/20 rounded-xl flex items-center justify-center shrink-0 text-accent">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0 pr-12">
                    <h3 className="font-semibold text-primary dark:text-foreground">
                      {addr.line1}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {addr.line2 && `${addr.line2}, `}{addr.city} - {addr.pincode}
                    </p>
                    {addr.latitude !== undefined && addr.longitude !== undefined && (addr.latitude !== 0 || addr.longitude !== 0) && (
                      <div className="mt-2 text-[10px] font-mono text-muted-foreground flex gap-3">
                        <span>Lat: {addr.latitude.toFixed(5)}</span>
                        <span>Lng: {addr.longitude.toFixed(5)}</span>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteAddress(addr.id)}
                  className="absolute right-4 top-4 p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/5 rounded-xl transition-all duration-200"
                  aria-label="Delete Address"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Add Address Modal Overlay */}
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
              className="bg-background border border-border w-full max-w-lg rounded-2xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-display text-xl font-bold text-primary dark:text-foreground">
                  Add New Address
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-muted-foreground hover:text-foreground text-sm font-semibold"
                >
                  Close
                </button>
              </div>

              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1 pb-12">
                <AddressStep
                  address={newAddr}
                  onChange={(data) => setNewAddr((prev) => ({ ...prev, ...data }))}
                />
              </div>

              <div className="flex justify-end gap-3 mt-6 border-t border-border pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowAddModal(false)}
                  disabled={isSaving}
                  className="rounded-full"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveAddress}
                  disabled={isSaving}
                  className="rounded-full px-6"
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
