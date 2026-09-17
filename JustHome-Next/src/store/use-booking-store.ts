import { create } from "zustand";
import type { Address, BookingState } from "@/types";

interface BookingStore extends BookingState {
  setService: (id: string, proId: string) => void;
  setDateTime: (date: string, time: string) => void;
  setAddress: (address: Partial<Address>) => void;
  setPaymentMethod: (method: BookingState["paymentMethod"]) => void;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
  confirmBooking: () => { success: boolean };
}

const emptyAddress: Address = { line1: "", line2: "", city: "", pincode: "", latitude: undefined, longitude: undefined };

const initial: BookingState = {
  serviceId: null,
  professionalId: null,
  date: "",
  time: "",
  address: emptyAddress,
  paymentMethod: "upi",
  step: 0,
};

export const useBookingStore = create<BookingStore>((set, get) => ({
  ...initial,
  setService: (serviceId, professionalId) => set({ serviceId, professionalId }),
  setDateTime: (date, time) => set({ date, time }),
  setAddress: (address) =>
    set((s) => ({ address: { ...s.address, ...address } })),
  setPaymentMethod: (paymentMethod) => set({ paymentMethod }),
  setStep: (step) => set({ step }),
  nextStep: () => set((s) => ({ step: Math.min(s.step + 1, 3) })),
  prevStep: () => set((s) => ({ step: Math.max(s.step - 1, 0) })),
  reset: () => set(initial),
  confirmBooking: () => {
    const { serviceId, date, time, address } = get();
    if (!serviceId || !date || !time || !address.line1) return { success: false };
    set(initial);
    return { success: true };
  },
}));
