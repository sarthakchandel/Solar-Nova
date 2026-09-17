"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/features/auth/use-auth";
import { bookingService, BookingResponse } from "@/services/booking.service";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Calendar, MapPin, Loader2, ArrowRight, Home, ShieldCheck } from "lucide-react";

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("id");

  const { isAuthenticated, token } = useAuth();
  const [booking, setBooking] = useState<BookingResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadBookingDetails = async () => {
    if (!bookingId) return;
    setIsLoading(true);
    try {
      const res = await bookingService.getBookingById(bookingId);
      if (res.success && res.data) {
        setBooking(res.data);
      } else {
        setError(res.error ?? "Failed to retrieve booking confirmation details.");
      }
    } catch (err: any) {
      setError("An error occurred loading booking confirmation.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && token && bookingId) {
      loadBookingDetails();
    }
  }, [isAuthenticated, token, bookingId]);

  // Route protection
  useEffect(() => {
    if (!bookingId) {
      router.push("/");
    }
  }, [bookingId, router]);

  if (isLoading) {
    return (
      <div className="text-center py-24 min-h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-accent mx-auto" />
        <p className="text-sm text-muted-foreground mt-4 font-medium">Retrieving booking confirmation details…</p>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="max-w-md mx-auto text-center py-24 min-h-[60vh] flex flex-col items-center justify-center px-6">
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm px-4 py-3 rounded-xl mb-6">
          {error ?? "Booking confirmation not found."}
        </div>
        <Link href="/">
          <Button className="rounded-full">Back to Home</Button>
        </Link>
      </div>
    );
  }

  // Format Scheduled Date/Time
  const scheduledDate = new Date(booking.scheduledAt);
  const formattedDate = scheduledDate.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = scheduledDate.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="mx-auto max-w-2xl px-6 text-center">
      {/* Success Animation & Header */}
      <div className="flex flex-col items-center justify-center mb-8">
        <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center text-emerald-500 mb-6 shadow-sm">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h1 className="font-display text-4xl font-bold text-primary dark:text-foreground">
          Booking Confirmed!
        </h1>
        <p className="text-muted-foreground mt-2 text-base max-w-md">
          Your service has been successfully scheduled. We will notify you once a service professional is assigned.
        </p>
      </div>

      {/* Booking Details Card */}
      <Card hover={false} className="p-6 md:p-8 rounded-[2.5rem] border border-border/50 glass-strong text-left space-y-6 mb-8">
        <div className="flex justify-between items-center border-b border-border/50 pb-4">
          <div>
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
              Booking Number
            </p>
            <p className="text-sm font-mono font-bold text-foreground mt-1">
              {booking.bookingNumber}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
              Amount Paid
            </p>
            <p className="text-lg font-bold text-foreground mt-1">
              ₹{Math.round(booking.totalAmount)}
            </p>
          </div>
        </div>

        {/* Schedule */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-accent/10 border border-accent/20 rounded-xl flex items-center justify-center shrink-0 text-accent">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
              Scheduled Arrival
            </p>
            <p className="text-sm font-semibold text-foreground mt-1">
              {formattedDate}
            </p>
            <p className="text-xs text-muted-foreground/90 mt-0.5">
              At {formattedTime}
            </p>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-accent/10 border border-accent/20 rounded-xl flex items-center justify-center shrink-0 text-accent">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
              Service Execution Address
            </p>
            <p className="text-sm font-semibold text-foreground mt-1 leading-snug">
              {booking.snapshotFullAddress}
            </p>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <Link href="/" className="w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto rounded-full px-8 gap-2 font-semibold">
            <Home className="w-4.5 h-4.5" /> Continue Shopping
          </Button>
        </Link>
        <Link href="/profile" className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto rounded-full px-8 gap-2 font-bold shadow-soft">
            Track Booking <ArrowRight className="w-4.5 h-4.5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-background relative overflow-hidden flex items-center justify-center">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <Suspense fallback={
        <div className="text-center py-24 min-h-[60vh] flex flex-col items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
          <p className="text-sm text-muted-foreground mt-4">Loading confirmation details…</p>
        </div>
      }>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
