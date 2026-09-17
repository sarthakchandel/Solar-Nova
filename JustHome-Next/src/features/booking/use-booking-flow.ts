"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { services } from "@/lib/data";
import { useBookingStore } from "@/store";

export function useBookingFlow() {
  const router = useRouter();
  const store = useBookingStore();

  const selectedService = services.find((s) => s.id === store.serviceId);

  const canProceed = useCallback(() => {
    switch (store.step) {
      case 0: return !!store.serviceId;
      case 1: return !!store.date && !!store.time;
      case 2: return !!store.address.line1 && !!store.address.city && !!store.address.pincode;
      case 3: return true;
      default: return false;
    }
  }, [store]);

  const handleNext = useCallback(() => {
    if (!canProceed()) return;
    if (store.step === 3) {
      const { success } = store.confirmBooking();
      if (success) router.push("/dashboard");
      return;
    }
    store.nextStep();
  }, [canProceed, store, router]);

  return { ...store, selectedService, canProceed: canProceed(), handleNext };
}
