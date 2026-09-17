"use client";

import { useEffect, useState, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/features/auth/use-auth";
import { useCartStore } from "@/store/use-cart-store";
import { useCurrentServiceZone } from "@/hooks/use-current-service-zone";
import { profileService } from "@/services/profile.service";
import { bookingService } from "@/services/booking.service";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Clock, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";

function ReviewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const addressId = searchParams.get("addressId");

  const { isAuthenticated, token } = useAuth();
  const { currentZone } = useCurrentServiceZone();
  const { items, getSubtotal, clearCart, customerId } = useCartStore();

  const [address, setAddress] = useState<any | null>(null);
  const [isLoadingAddress, setIsLoadingAddress] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form states
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("09:00 AM - 12:00 PM");
  const [bookingNotes, setBookingNotes] = useState("");

  // Get minimum date (today)
  const minDateString = useMemo(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }, []);

  // Set default date to tomorrow
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, "0");
    const dd = String(tomorrow.getDate()).padStart(2, "0");
    setSelectedDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  const loadAddressDetails = async () => {
    if (!addressId) return;
    setIsLoadingAddress(true);
    try {
      const res = await profileService.getMyAddresses();
      if (res.success && res.data) {
        const found = res.data.find((a) => a.id === addressId);
        if (found) {
          setAddress(found);
        } else {
          setErrorMessage("Selected address not found.");
        }
      }
    } catch (err) {
      setErrorMessage("Error retrieving address details.");
    } finally {
      setIsLoadingAddress(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && token && addressId) {
      loadAddressDetails();
    }
  }, [isAuthenticated, token, addressId]);

  // Guard routing
  useEffect(() => {
    if (!addressId) {
      router.push("/checkout/address");
    }
    if (items.length === 0) {
      router.push("/cart");
    }
  }, [addressId, items.length, router]);

  // Calculate pricing breakdown
  const subtotal = getSubtotal();
  const tax = subtotal * 0.18; // 18% GST estimate
  const platformFee = 49; // Platform service charge
  const total = subtotal + tax + platformFee;

  // Time Slots list
  const timeSlots = [
    "09:00 AM - 12:00 PM",
    "12:00 PM - 03:00 PM",
    "03:00 PM - 06:00 PM",
    "06:00 PM - 09:00 PM",
  ];

  const handleBookNow = async () => {
    if (!selectedDate) {
      setErrorMessage("Please select a date for your service.");
      return;
    }
    if (!address) {
      setErrorMessage("Please select a service address before proceeding.");
      return;
    }
    if (!currentZone) {
      setErrorMessage("Could not resolve service zone. Please check your address.");
      return;
    }
    if (!customerId) {
      setErrorMessage("Customer profile is missing. Please reload or complete your profile details.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      // 1. Resolve default Organization Unit (OrgUnitId)
      let orgUnitId = "";
      const orgsRes = await bookingService.getOrganizations();
      if (orgsRes.success && orgsRes.data) {
        const orgs = orgsRes.data.data || orgsRes.data;
        if (orgs && orgs.length > 0) {
          orgUnitId = orgs[0].id;
        }
      }

      // 2. Create Org Unit if missing
      if (!orgUnitId) {
        const createOrgRes = await bookingService.createOrganization({
          name: "JustHome HQ",
          orgUnitType: 0, // Headquarter
        });
        if (createOrgRes.success && createOrgRes.data) {
          orgUnitId = createOrgRes.data;
        } else {
          throw new Error(createOrgRes.error ?? "Failed to initialize booking organization unit.");
        }
      }

      // 3. Prepare payload items mapping
      const bookingItems = items.map((item) => ({
        serviceId: item.parentServiceId || item.serviceId,
        serviceVariantId: item.serviceId, // Zustand cart serviceId is the variant ID
        quantity: item.quantity,
      }));

      const firstItem = items[0];
      const parentServiceId = firstItem.parentServiceId || firstItem.serviceId;

      // Map Scheduled time (combine date and start hour of selected time slot)
      const slotHour = selectedTimeSlot.startsWith("09")
        ? 9
        : selectedTimeSlot.startsWith("12")
        ? 12
        : selectedTimeSlot.startsWith("03")
        ? 15
        : 18;
      
      const scheduledDate = new Date(selectedDate);
      scheduledDate.setHours(slotHour, 0, 0, 0);

      const command = {
        customerId: customerId,
        serviceId: parentServiceId,
        addressId: address.id,
        serviceZoneId: currentZone.id,
        orgUnitId: orgUnitId,
        bookingType: 1, // Scheduled
        scheduledAt: scheduledDate.toISOString(),
        internalNotes: bookingNotes || undefined,
        bookingItems: bookingItems,
      };

      const res = await bookingService.createBooking(command);
      if (res.success && res.data) {
        const bookingId = res.data;
        clearCart(); // clear client cart store
        router.push(`/booking/success?id=${bookingId}`);
      } else {
        setErrorMessage(res.error ?? "Failed to place your booking. Please try again.");
      }
    } catch (err: any) {
      setErrorMessage(err.message ?? "An unexpected error occurred during checkout.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-6">
      <Link href={`/checkout/address?addressId=${addressId}`} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Address Selection
      </Link>

      <h1 className="font-display text-4xl font-semibold text-primary dark:text-foreground mb-8">
        Review Booking
      </h1>

      {errorMessage && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm px-4 py-3 rounded-xl mb-6">
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Address & Scheduling */}
        <div className="lg:col-span-2 space-y-6">
          {/* Address Section */}
          <Card hover={false} className="p-6 rounded-[2rem] border border-border/50 glass relative">
            <div className="flex items-center justify-between border-b border-border/50 pb-4 mb-4">
              <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" /> Execution Address
              </h3>
              <Link href={`/checkout/address?addressId=${addressId}`} className="text-sm font-semibold text-primary hover:underline">
                Change
              </Link>
            </div>
            {isLoadingAddress ? (
              <div className="flex items-center gap-2 py-2">
                <Loader2 className="h-4 w-4 animate-spin text-accent" />
                <span className="text-xs text-muted-foreground">Loading address details…</span>
              </div>
            ) : address ? (
              <div>
                <p className="font-bold text-foreground capitalize">🏠 {address.line2 || "Home"}</p>
                <p className="text-sm text-muted-foreground mt-2">{address.line1}</p>
                <p className="text-xs text-muted-foreground/80 mt-1">{address.city} - {address.pincode}</p>
              </div>
            ) : (
              <p className="text-sm text-destructive">No address loaded.</p>
            )}
          </Card>

          {/* Scheduling Section */}
          <Card hover={false} className="p-6 rounded-[2rem] border border-border/50 glass">
            <h3 className="font-semibold text-lg text-foreground flex items-center gap-2 border-b border-border/50 pb-4 mb-4">
              <Calendar className="h-5 w-5 text-primary" /> Select Date & Time
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground font-semibold uppercase tracking-wider block mb-1">
                  Service Date
                </label>
                <input
                  type="date"
                  min={minDateString}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
                />
              </div>

              <div>
                <label className="text-xs text-muted-foreground font-semibold uppercase tracking-wider block mb-2">
                  Time Slot
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {timeSlots.map((slot) => {
                    const isSelected = selectedTimeSlot === slot;
                    return (
                      <div
                        key={slot}
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`cursor-pointer border p-3 rounded-xl text-center text-xs font-semibold transition-all duration-200 ${
                          isSelected
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border hover:border-primary/45 text-muted-foreground bg-transparent"
                        }`}
                      >
                        {slot}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Card>

          {/* Booking Notes */}
          <Card hover={false} className="p-6 rounded-[2rem] border border-border/50 glass">
            <h3 className="font-semibold text-lg text-foreground flex items-center gap-2 border-b border-border/50 pb-4 mb-4">
              Booking Notes
            </h3>
            <textarea
              placeholder="Any instructions for our service professional? (e.g. landmark, gate code, pet instructions...)"
              value={bookingNotes}
              onChange={(e) => setBookingNotes(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </Card>
        </div>

        {/* Right Side: Order Summary */}
        <div className="space-y-6">
          <Card hover={false} className="p-6 rounded-[2rem] border border-border/50 glass-strong">
            <h3 className="font-semibold text-lg text-foreground border-b border-border/50 pb-4 mb-4">
              Selected Services
            </h3>
            <div className="divide-y divide-border/30 max-h-64 overflow-y-auto mb-6">
              {items.map((item) => (
                <div key={item.serviceId} className="py-3 flex justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-foreground leading-tight truncate">
                      {item.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Qty: {item.quantity} × ₹{item.price}
                    </p>
                  </div>
                  <div className="text-sm font-bold text-foreground shrink-0">
                    ₹{item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>

            <h3 className="font-semibold text-lg text-foreground border-b border-border/50 pb-4 mb-4">
              Payment Breakdown
            </h3>
            <div className="space-y-3 mb-6 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>₹{Math.round(subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Taxes & Fees (18% GST)</span>
                <span>₹{Math.round(tax)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Convenience Platform Fee</span>
                <span>₹{platformFee}</span>
              </div>
              <div className="border-t border-border/50 pt-3 flex justify-between font-bold text-lg text-foreground">
                <span>Grand Total</span>
                <span>₹{Math.round(total)}</span>
              </div>
            </div>

            <Button
              onClick={handleBookNow}
              disabled={isSubmitting || isLoadingAddress || !address}
              className="w-full py-4 rounded-xl font-bold text-base gap-2 flex items-center justify-center shadow-soft"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Creating Booking...
                </>
              ) : (
                "Book Now"
              )}
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutReviewPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-background relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <Suspense fallback={
        <div className="text-center py-24 min-h-[60vh] flex flex-col items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
          <p className="text-sm text-muted-foreground mt-4">Loading review details…</p>
        </div>
      }>
        <ReviewContent />
      </Suspense>
    </div>
  );
}
