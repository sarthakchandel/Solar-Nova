"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/features/auth/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft, User, Briefcase, CheckCircle2, Phone, ShieldCheck } from "lucide-react";

type Step = "role" | "phone" | "otp";

const slideVariants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

export default function SignUpPage() {
  const { registerByPhone, verifyPhoneOtp } = useAuth();
  const router = useRouter();

  const [step, setStep] = useState<Step>("role");
  const [isCustomer, setIsCustomer] = useState<boolean | null>(null);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // ─── Step 1: Role Selection ───────────────────────────────────────────────
  const handleRoleSelect = (asCustomer: boolean) => {
    setIsCustomer(asCustomer);
    setError("");
    setStep("phone");
  };

  // ─── Step 2: Send OTP ─────────────────────────────────────────────────────
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const cleaned = phone.replace(/\s+/g, "").replace(/^\+/, "");
    if (cleaned.length < 7) {
      setError("Please enter a valid phone number");
      return;
    }
    setIsLoading(true);
    try {
      const res = await registerByPhone(cleaned, isCustomer!);
      if (res.success) {
        setStep("otp");
      } else {
        setError(res.error || "Failed to send OTP. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ─── Step 3: Verify OTP ───────────────────────────────────────────────────
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const otpValue = otp.join("");
    if (otpValue.length < 6) {
      setError("Please enter all 6 digits");
      return;
    }
    setIsLoading(true);
    try {
      const cleaned = phone.replace(/\s+/g, "").replace(/^\+/, "");
      const res = await verifyPhoneOtp(cleaned, parseInt(otpValue, 10));
      if (res.success) {
        setSuccess(true);
        setTimeout(() => router.push("/auth"), 2500);
      } else {
        setError(res.error || "Invalid OTP. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ─── OTP digit input handler ──────────────────────────────────────────────
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const next = [...otp];
    next[index] = value.slice(-1);
    setOtp(next);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const stepTitle: Record<Step, string> = {
    role: "Join as a...",
    phone: "Enter your phone",
    otp: "Verify your number",
  };

  const stepDesc: Record<Step, string> = {
    role: "Choose how you want to use Rapid Help",
    phone: `Registering as a ${isCustomer ? "Customer" : "Worker / Pro"}`,
    otp: `We sent a 6-digit code to ${phone || "your number"}`,
  };

  return (
    <div className="relative min-h-screen pt-32 pb-24 flex items-center justify-center px-6 bg-background overflow-hidden text-foreground selection:bg-accent/30">
      {/* Ambient glows */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        {/* Back link */}
        <div className="mb-6">
          {step === "role" ? (
            <Link
              href="/auth"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Login
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => { setError(""); setStep(step === "otp" ? "phone" : "role"); }}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              {step === "otp" ? "Change phone number" : "Change role"}
            </button>
          )}
        </div>

        <Card hover={false} className="p-8 sm:p-10 overflow-hidden">
          {success ? (
            /* ── Success State ── */
            <div className="text-center py-8 flex flex-col items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="mb-6 text-emerald-500"
              >
                <CheckCircle2 className="h-16 w-16" />
              </motion.div>
              <h2 className="font-display text-2xl font-semibold text-primary dark:text-foreground mb-3">
                You&apos;re in!
              </h2>
              <p className="text-sm text-muted-foreground max-w-sm mb-6">
                Account verified successfully. Redirecting you to login…
              </p>
              <div className="h-1.5 w-full bg-border rounded-full overflow-hidden relative">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.5, ease: "linear" }}
                  className="absolute top-0 bottom-0 left-0 bg-accent"
                />
              </div>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground font-display font-bold text-xl mx-auto mb-4">
                  R
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                  >
                    <h1 className="font-display text-3xl font-semibold tracking-tight text-primary dark:text-foreground mb-1">
                      {stepTitle[step]}
                    </h1>
                    <p className="text-sm text-muted-foreground">{stepDesc[step]}</p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Step progress dots */}
              <div className="flex items-center justify-center gap-2 mb-8">
                {(["role", "phone", "otp"] as Step[]).map((s, i) => (
                  <div
                    key={s}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      s === step
                        ? "w-6 bg-accent"
                        : i < ["role", "phone", "otp"].indexOf(step)
                        ? "w-2 bg-accent/60"
                        : "w-2 bg-border"
                    }`}
                  />
                ))}
              </div>

              {/* Step content */}
              <AnimatePresence mode="wait">
                {step === "role" && (
                  <motion.div
                    key="role"
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => handleRoleSelect(true)}
                        className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 border-border hover:border-accent hover:bg-accent/5 text-muted-foreground hover:text-accent transition-all duration-300 cursor-pointer group"
                      >
                        <div className="h-14 w-14 rounded-xl bg-accent/10 group-hover:bg-accent/20 flex items-center justify-center transition-colors">
                          <User className="h-7 w-7 text-accent" />
                        </div>
                        <div className="text-center">
                          <span className="block font-semibold text-sm text-foreground">Customer</span>
                          <span className="block text-xs text-muted-foreground mt-0.5">Book services</span>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleRoleSelect(false)}
                        className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 border-border hover:border-accent hover:bg-accent/5 text-muted-foreground hover:text-accent transition-all duration-300 cursor-pointer group"
                      >
                        <div className="h-14 w-14 rounded-xl bg-accent/10 group-hover:bg-accent/20 flex items-center justify-center transition-colors">
                          <Briefcase className="h-7 w-7 text-accent" />
                        </div>
                        <div className="text-center">
                          <span className="block font-semibold text-sm text-foreground">Worker / Pro</span>
                          <span className="block text-xs text-muted-foreground mt-0.5">Offer services</span>
                        </div>
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === "phone" && (
                  <motion.div
                    key="phone"
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <form onSubmit={handleSendOtp} className="space-y-5">
                      {/* Role badge */}
                      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/10 border border-accent/20 w-fit mx-auto">
                        {isCustomer ? <User className="h-4 w-4 text-accent" /> : <Briefcase className="h-4 w-4 text-accent" />}
                        <span className="text-xs font-semibold text-accent">
                          {isCustomer ? "Customer" : "Worker / Pro"}
                        </span>
                      </div>

                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. 98978787686"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors text-sm"
                          required
                          autoFocus
                        />
                      </div>

                      {error && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-xs text-red-500 font-medium bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-lg"
                        >
                          {error}
                        </motion.p>
                      )}

                      <Button type="submit" disabled={isLoading} className="w-full">
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-accent-foreground border-t-transparent" />
                            Sending OTP…
                          </div>
                        ) : (
                          "Send OTP"
                        )}
                      </Button>
                    </form>
                  </motion.div>
                )}

                {step === "otp" && (
                  <motion.div
                    key="otp"
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <form onSubmit={handleVerifyOtp} className="space-y-5">
                      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/10 border border-accent/20 w-fit mx-auto">
                        <ShieldCheck className="h-4 w-4 text-accent" />
                        <span className="text-xs font-semibold text-accent">OTP sent to {phone}</span>
                      </div>

                      {/* 6-digit OTP boxes */}
                      <div className="flex items-center justify-center gap-2">
                        {otp.map((digit, i) => (
                          <input
                            key={i}
                            ref={(el) => { otpRefs.current[i] = el; }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpChange(i, e.target.value)}
                            onKeyDown={(e) => handleOtpKeyDown(i, e)}
                            className="h-12 w-10 text-center rounded-xl border-2 border-border bg-background text-foreground text-lg font-bold focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
                            autoFocus={i === 0}
                          />
                        ))}
                      </div>

                      {error && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-xs text-red-500 font-medium bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-lg"
                        >
                          {error}
                        </motion.p>
                      )}

                      <Button type="submit" disabled={isLoading || otp.join("").length < 6} className="w-full">
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-accent-foreground border-t-transparent" />
                            Verifying…
                          </div>
                        ) : (
                          "Verify & Create Account"
                        )}
                      </Button>

                      <button
                        type="button"
                        onClick={handleSendOtp as unknown as React.MouseEventHandler}
                        disabled={isLoading}
                        className="w-full text-xs text-muted-foreground hover:text-accent transition-colors disabled:opacity-50"
                      >
                        Didn&apos;t receive the code? Resend OTP
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

              <p className="text-center text-sm text-muted-foreground mt-8">
                Already have an account?{" "}
                <Link href="/auth" className="text-accent hover:underline font-medium">
                  Log in
                </Link>
              </p>
            </>
          )}
        </Card>
      </motion.div>
    </div>
  );
}
