"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/features/auth/use-auth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { profileService, WorkerEarningDto, WorkerEarningStatsDto, WorkerProfileDto } from "@/services/profile.service";
import { ArrowLeft, IndianRupee, CheckCircle2, AlertCircle, Clock, Calendar } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export default function WorkerEarningsPage() {
  const { token, role, isAuthenticated } = useAuth();
  const [workerProfile, setWorkerProfile] = useState<WorkerProfileDto | null>(null);
  const [stats, setStats] = useState<WorkerEarningStatsDto>({
    totalEarnings: 0,
    pendingEarnings: 0,
    completedEarnings: 0,
  });
  const [earnings, setEarnings] = useState<WorkerEarningDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const loadEarningsData = async (workerId: string) => {
    setIsLoading(true);
    try {
      const statsRes = await profileService.getWorkerEarningsStats(workerId);
      if (statsRes.success && statsRes.data) {
        setStats(statsRes.data);
      }

      const listRes = await profileService.getWorkerEarnings(workerId);
      if (listRes.success && listRes.data) {
        setEarnings(listRes.data.data ?? []);
      }
    } catch (err: any) {
      setErrorMsg("Failed to load earnings history.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated || !token || role !== "Worker") return;

    async function loadProfile() {
      try {
        const res = await profileService.getWorkerProfile();
        if (res.success && res.data) {
          setWorkerProfile(res.data);
          if (res.data.id) {
            await loadEarningsData(res.data.id);
          }
        } else {
          setErrorMsg("Please create your worker profile first to view earnings.");
          setIsLoading(false);
        }
      } catch (err: any) {
        setErrorMsg("Failed to load worker details.");
        setIsLoading(false);
      }
    }

    loadProfile();
  }, [isAuthenticated, token, role]);

  if (!isAuthenticated || role !== "Worker") {
    return (
      <div className="pt-32 pb-24 text-center px-6">
        <h1 className="font-display text-2xl font-semibold">Access Denied</h1>
        <p className="text-muted-foreground mt-2">Only worker accounts can access this screen.</p>
        <Link href="/" className="inline-block mt-4"><Button>Go Home</Button></Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-3xl px-6">
        {/* Back link */}
        <Link href="/profile" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors group">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Profile
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-4xl font-semibold text-primary dark:text-foreground">Earnings & Payouts</h1>
          <p className="text-muted-foreground mt-1">Track your job payouts and earnings history</p>
        </div>

        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm px-4 py-3 rounded-xl mb-6">
            {errorMsg}
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-accent border-t-transparent mx-auto" />
            <p className="text-sm text-muted-foreground mt-4">Loading earnings data...</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Stats Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card hover={false} className="p-5 flex flex-col justify-between relative overflow-hidden bg-accent/5">
                <span className="text-xs font-semibold text-muted-foreground uppercase">Total Earnings</span>
                <span className="text-2xl font-bold text-accent-gradient mt-2">{formatPrice(stats.totalEarnings)}</span>
                <div className="absolute right-4 bottom-4 text-accent/10"><IndianRupee className="h-12 w-12" /></div>
              </Card>

              <Card hover={false} className="p-5 flex flex-col justify-between relative overflow-hidden bg-emerald-500/5">
                <span className="text-xs font-semibold text-muted-foreground uppercase">Completed Payouts</span>
                <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">{formatPrice(stats.completedEarnings)}</span>
                <div className="absolute right-4 bottom-4 text-emerald-500/10"><CheckCircle2 className="h-12 w-12" /></div>
              </Card>

              <Card hover={false} className="p-5 flex flex-col justify-between relative overflow-hidden bg-yellow-500/5">
                <span className="text-xs font-semibold text-muted-foreground uppercase">Pending Payouts</span>
                <span className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mt-2">{formatPrice(stats.pendingEarnings)}</span>
                <div className="absolute right-4 bottom-4 text-yellow-500/10"><Clock className="h-12 w-12" /></div>
              </Card>
            </div>

            {/* Earnings List */}
            <div>
              <h2 className="font-display text-2xl font-semibold mb-4 text-primary dark:text-foreground">Payout History</h2>
              {!earnings.length ? (
                <Card hover={false} className="p-8 text-center text-muted-foreground">
                  No earnings history recorded yet. Completed jobs will show payouts here.
                </Card>
              ) : (
                <div className="space-y-4">
                  {earnings.map((earn) => (
                    <Card key={earn.id} hover={false} className="p-5">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <h4 className="font-semibold text-primary dark:text-foreground">
                            Job Payout - Booking #{earn.bookingNumber || earn.bookingId.substring(0, 8)}
                          </h4>
                          {earn.payoutDate && (
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                              <Calendar className="h-3.5 w-3.5" />
                              <span>{new Date(earn.payoutDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                            </div>
                          )}
                        </div>

                        <div className="text-right">
                          <span className="block font-bold text-lg text-foreground">{formatPrice(earn.amount)}</span>
                          <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-md mt-1 ${
                            earn.status === "Paid" ? "text-emerald-600 bg-emerald-500/10 border border-emerald-500/20" :
                            earn.status === "Pending" ? "text-yellow-600 bg-yellow-500/10 border border-yellow-500/20" :
                            "text-red-600 bg-red-500/10 border border-red-500/20"
                          }`}>
                            {earn.status}
                          </span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
