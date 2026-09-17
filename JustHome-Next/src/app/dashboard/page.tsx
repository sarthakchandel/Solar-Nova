"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/features/auth/use-auth";
import { useCartStore } from "@/store/use-cart-store";
import { bookingService } from "@/services/booking.service";
import { cartService } from "@/services/cart.service";
import { formatPrice, cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Loader2, ArrowRight, ClipboardList, ShieldCheck } from "lucide-react";

// Booking Status mapping
const STATUS_LABELS: Record<number, { text: string; variant: "accent" | "muted" | "default" }> = {
  0: { text: "Pending Approval", variant: "default" },
  1: { text: "Confirmed", variant: "accent" },
  2: { text: "Professional Assigned", variant: "accent" },
  3: { text: "Professional On The Way", variant: "accent" },
  4: { text: "Professional Arrived", variant: "accent" },
  5: { text: "Service Started", variant: "accent" },
  6: { text: "Completed (Pending OTP)", variant: "default" },
  7: { text: "Completed", variant: "muted" },
  8: { text: "Cancelled", variant: "muted" },
  9: { text: "Rejected", variant: "muted" },
  10: { text: "Refunded", variant: "muted" },
  11: { text: "Finding Professional", variant: "default" },
  12: { text: "No Professional Available", variant: "default" },
};

function getStatusDetails(status: number) {
  return STATUS_LABELS[status] ?? { text: "Unknown Status", variant: "default" };
}

export default function DashboardPage() {
  const { isAuthenticated, role, user, signOut } = useAuth();
  const { customerId } = useCartStore();

  const [tab, setTab] = useState<"bookings" | "history" | "profile">("bookings");
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const loadLiveBookings = async (profileId: string) => {
    setIsLoading(true);
    setErrorMsg("");
    try {
      const res = await bookingService.getBookings({
        customerId: profileId,
        pageSize: 100,
        pageNumber: 1,
      });

      if (res.success && res.data) {
        // Mapped from backend PaginatedResult structure
        const list = res.data.data || res.data;
        if (Array.isArray(list)) {
          setBookings(list);
        }
      } else {
        setErrorMsg(res.error ?? "Failed to retrieve bookings list.");
      }
    } catch (err) {
      setErrorMsg("Error loading bookings from server.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    const resolveProfileAndLoad = async () => {
      // If customerId is already in state, use it
      if (customerId) {
        await loadLiveBookings(customerId);
        return;
      }

      // If not, fetch it first
      try {
        const profileRes = await cartService.getMyProfile();
        if (profileRes.success && profileRes.data?.id) {
          await loadLiveBookings(profileRes.data.id);
        } else {
          setIsLoading(false);
          setErrorMsg("Could not load customer profile details.");
        }
      } catch {
        setIsLoading(false);
        setErrorMsg("Failed to resolve customer profile.");
      }
    };

    resolveProfileAndLoad();
  }, [isAuthenticated, customerId]);

  if (!isAuthenticated) {
    return (
      <div className="pt-32 pb-24 text-center px-6 min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="font-display text-2xl font-semibold">Please sign in to view your dashboard</h1>
        <Link href="/auth?redirect=/dashboard" className="inline-block mt-4">
          <Button className="rounded-full px-8">Sign In</Button>
        </Link>
      </div>
    );
  }

  // Filter bookings:
  // Active/Upcoming are statuses other than Completed, Cancelled, Rejected, Refunded
  // Completed/Cancelled history are statuses 7, 8, 9, 10
  const upcomingBookings = bookings.filter((b) => b.status !== 7 && b.status !== 8 && b.status !== 9 && b.status !== 10);
  const completedBookings = bookings.filter((b) => b.status === 7 || b.status === 8 || b.status === 9 || b.status === 10);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background relative overflow-hidden">
      {/* Glows */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-3xl px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6 mb-8">
          <div>
            <h1 className="font-display text-4xl font-semibold text-primary dark:text-foreground">
              Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">Manage your bookings and account settings</p>
          </div>
          <Button variant="outline" size="sm" onClick={signOut}>
            Sign Out
          </Button>
        </div>

        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm px-4 py-3 rounded-xl mb-6">
            {errorMsg}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 rounded-xl bg-muted p-1 mb-8">
          <button
            onClick={() => setTab("bookings")}
            className={cn(
              "flex-1 rounded-lg py-2.5 text-sm font-semibold capitalize transition-all duration-300",
              tab === "bookings" ? "bg-accent text-accent-foreground shadow-glow" : "text-muted-foreground hover:text-foreground"
            )}
          >
            Active Bookings ({upcomingBookings.length})
          </button>
          <button
            onClick={() => setTab("history")}
            className={cn(
              "flex-1 rounded-lg py-2.5 text-sm font-semibold capitalize transition-all duration-300",
              tab === "history" ? "bg-accent text-accent-foreground shadow-glow" : "text-muted-foreground hover:text-foreground"
            )}
          >
            Past History ({completedBookings.length})
          </button>
          <button
            onClick={() => setTab("profile")}
            className={cn(
              "flex-1 rounded-lg py-2.5 text-sm font-semibold capitalize transition-all duration-300",
              tab === "profile" ? "bg-accent text-accent-foreground shadow-glow" : "text-muted-foreground hover:text-foreground"
            )}
          >
            Profile Settings
          </button>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="text-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-accent mx-auto" />
            <p className="text-sm text-muted-foreground mt-4">Loading your bookings list…</p>
          </div>
        ) : (
          <div className="space-y-6">
            {tab === "bookings" && (
              upcomingBookings.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground border border-dashed border-border/80 rounded-[2rem] p-8 glass">
                  <ClipboardList className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="font-semibold text-foreground">No active bookings found</p>
                  <p className="text-xs text-muted-foreground mt-1">Need something done? Book a service variant now.</p>
                  <Link href="/" className="inline-block mt-4">
                    <Button size="sm" className="rounded-full px-6">Explore Services</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingBookings.map((b) => {
                    const scheduledDate = new Date(b.scheduledAt);
                    const formattedDate = scheduledDate.toLocaleDateString("en-IN", { day: "numeric", month: "short", weekday: "short" });
                    const formattedTime = scheduledDate.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
                    const statusInfo = getStatusDetails(b.status);

                    return (
                      <Card key={b.id} hover={false} className="p-6 rounded-[2rem] border border-border/50 glass relative">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-border/30 pb-4 mb-4">
                          <div>
                            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider block">
                              Booking No: {b.bookingNumber}
                            </span>
                            <h3 className="font-bold text-lg text-foreground mt-1 capitalize">
                              🛠️ {b.bookingItems?.[0]?.serviceVariant?.name || "Home Service"}
                            </h3>
                            <p className="text-xs text-muted-foreground mt-1">
                              {b.bookingItems?.[0]?.service?.name || ""} Service
                            </p>
                          </div>
                          <Badge variant={statusInfo.variant} className="w-fit text-[11px] font-bold py-1 px-3.5 rounded-full capitalize">
                            {statusInfo.text}
                          </Badge>
                        </div>

                        <div className="space-y-2.5 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-accent shrink-0" />
                            <span>{formattedDate} at {formattedTime}</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{b.snapshotFullAddress}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-border/30 pt-4">
                          <div className="text-xs text-muted-foreground">
                            Total amount: <span className="font-bold text-base text-foreground ml-1">₹{Math.round(b.totalAmount)}</span>
                          </div>
                          <Link href={`/booking/success?id=${b.id}`}>
                            <Button variant="outline" size="sm" className="rounded-full text-xs font-semibold gap-1.5">
                              View Details <ArrowRight className="w-3.5 h-3.5" />
                            </Button>
                          </Link>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              )
            )}

            {tab === "history" && (
              completedBookings.length === 0 ? (
                <p className="text-center py-16 text-muted-foreground border border-dashed border-border/80 rounded-[2rem] p-8 glass">
                  No historical bookings found.
                </p>
              ) : (
                <div className="space-y-4">
                  {completedBookings.map((b) => {
                    const scheduledDate = new Date(b.scheduledAt);
                    const formattedDate = scheduledDate.toLocaleDateString("en-IN", { day: "numeric", month: "short", weekday: "short" });
                    const formattedTime = scheduledDate.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
                    const statusInfo = getStatusDetails(b.status);

                    return (
                      <Card key={b.id} hover={false} className="p-6 rounded-[2rem] border border-border/50 glass opacity-85">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-border/30 pb-4 mb-4">
                          <div>
                            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider block">
                              Booking No: {b.bookingNumber}
                            </span>
                            <h3 className="font-bold text-base text-foreground mt-1 capitalize">
                              🛠 {b.bookingItems?.[0]?.serviceVariant?.name || "Home Service"}
                            </h3>
                          </div>
                          <Badge variant={statusInfo.variant} className="w-fit text-[10px] py-0.5 px-3 rounded-full">
                            {statusInfo.text}
                          </Badge>
                        </div>

                        <div className="space-y-2 text-xs text-muted-foreground mb-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-3.5 w-3.5 text-accent" />
                            <span>{formattedDate} at {formattedTime}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-3.5 w-3.5 text-accent" />
                            <span className="line-clamp-1">{b.snapshotFullAddress}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-border/30 pt-4">
                          <span className="font-semibold text-foreground text-sm">₹{Math.round(b.totalAmount)}</span>
                          <Link href={`/booking/success?id=${b.id}`}>
                            <Button variant="outline" size="sm" className="rounded-full text-xs">
                              Details
                            </Button>
                          </Link>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              )
            )}

            {tab === "profile" && (
              <Card hover={false} className="p-8 text-center rounded-[2.5rem] border border-border/50 glass">
                <p className="text-muted-foreground">Manage your personal details, documents, and saved addresses</p>
                <Link href="/profile" className="inline-block mt-6">
                  <Button variant="secondary" className="rounded-full px-8">
                    Go to Profile Setup
                  </Button>
                </Link>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
