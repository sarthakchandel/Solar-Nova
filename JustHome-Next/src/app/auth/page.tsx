"use client";

import { useState, Suspense, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/features/auth/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { User, Briefcase, Loader2 } from "lucide-react";

function AuthContent() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "";

  const { sendLoginOtp, verifyLoginOtp, resendOtp } = useAuth();
  const [phone, setPhone] = useState("+91 ");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [isCustomer, setIsCustomer] = useState<boolean>(true);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (step === "otp") {
      setCountdown(30);
    }
  }, [step]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResendOtp = async () => {
    setError("");
    setIsLoading(true);
    try {
      const res = await resendOtp(phone, isCustomer);
      if (res.success) {
        setCountdown(30);
      } else {
        setError(res.error || "Failed to resend OTP.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const cleaned = phone.replace(/\s+/g, "").replace(/^\+/, "");
    if (cleaned.length < 10) {
      setError("Please enter a valid phone number");
      return;
    }
    setIsLoading(true);
    try {
      const res = await sendLoginOtp(phone, isCustomer);
      if (res.success) {
        setStep("otp");
      } else {
        setError(res.error || "Failed to send OTP. Please make sure the number is registered.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (otp.length < 6) {
      setError("Please enter a 6-digit OTP");
      return;
    }
    setIsLoading(true);
    try {
      const res = await verifyLoginOtp(phone, otp, isCustomer, redirect);
      if (!res.success) {
        setError(res.error || "Invalid OTP. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
      <Card hover={false} className="p-8">
        <div className="text-center mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground font-display font-bold text-xl mx-auto mb-4">R</div>
          <h1 className="font-display text-2xl font-semibold text-primary dark:text-foreground">Welcome back</h1>
          <p className="text-sm text-muted-foreground mt-1">Sign in to your JustHome account</p>
        </div>

        {/* Role Toggle Selector */}
        {step === "phone" && (
          <div className="grid grid-cols-2 gap-3 mb-6 p-1 rounded-xl bg-muted">
            <button
              type="button"
              onClick={() => setIsCustomer(true)}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isCustomer ? "bg-accent text-accent-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <User className="h-4 w-4" />
              Customer
            </button>
            <button
              type="button"
              onClick={() => setIsCustomer(false)}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                !isCustomer ? "bg-accent text-accent-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Briefcase className="h-4 w-4" />
              Worker / Pro
            </button>
          </div>
        )}

        {step === "phone" ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <Input label="Phone Number" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210" required />
            {error && <p className="text-xs text-red-500 bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-lg">{error}</p>}
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Sending OTP..." : "Send OTP"}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="text-center text-xs text-accent bg-accent/10 border border-accent/20 py-2 rounded-lg mb-4">
              OTP sent to {phone} ({isCustomer ? "Customer" : "Worker / Pro"})
            </div>
            <Input label="Enter 6-Digit OTP" type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" maxLength={6} required />
            {error && <p className="text-xs text-red-500 bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-lg">{error}</p>}
            <div className="flex justify-between items-center text-xs px-1 py-1">
              <span className="text-muted-foreground">Didn&apos;t receive code?</span>
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={isLoading || countdown > 0}
                className="text-accent hover:underline font-semibold disabled:opacity-50 disabled:hover:no-underline"
              >
                {countdown > 0 ? `Resend in ${countdown}s` : "Resend OTP"}
              </button>
            </div>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Verifying..." : "Verify & Login"}
            </Button>
            <Button type="button" variant="outline" className="w-full mt-2" onClick={() => setStep("phone")} disabled={isLoading}>Change Phone Number</Button>
          </form>
        )}

        <p className="text-center text-sm text-muted-foreground mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="text-accent hover:underline font-semibold">Sign up</Link>
        </p>
      </Card>
    </motion.div>
  );
}

export default function AuthPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen flex items-center justify-center px-6 bg-background relative overflow-hidden">
      {/* Ambient Glows */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <Suspense fallback={
        <div className="text-center p-8 bg-card border border-border rounded-xl shadow-lg flex flex-col items-center">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
          <p className="text-sm text-muted-foreground mt-4">Loading login gateway…</p>
        </div>
      }>
        <AuthContent />
      </Suspense>
    </div>
  );
}
