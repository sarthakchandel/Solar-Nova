"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check } from "lucide-react";
import { services } from "@/lib/data";
import { useBookingFlow } from "@/features/booking/use-booking-flow";
import { StepIndicator } from "@/components/booking/step-indicator";
import { ServiceStep } from "@/components/booking/service-step";
import { DateTimeStep } from "@/components/booking/datetime-step";
import { AddressStep } from "@/components/booking/address-step";
import { PaymentStep } from "@/components/booking/payment-step";
import { Button } from "@/components/ui/button";

function BookingContent() {
  const params = useSearchParams();
  const [confirmed, setConfirmed] = useState(false);
  const {
    step, serviceId, date, time, address, paymentMethod,
    selectedService, canProceed, handleNext, prevStep,
    setService, setDateTime, setAddress, setPaymentMethod, confirmBooking,
  } = useBookingFlow();

  useEffect(() => {
    const svc = params.get("service");
    if (svc) {
      const s = services.find((x) => x.id === svc || x.slug === svc);
      if (s) setService(s.id, s.professionalId);
    }
  }, [params, setService]);

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="mx-auto max-w-2xl px-6">
        <Link href="/services" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to services
        </Link>

        <h1 className="font-display text-3xl font-semibold text-primary dark:text-foreground">Book a Service</h1>
        <p className="text-muted-foreground mt-1">Complete your booking in 4 easy steps</p>

        {!confirmed && <StepIndicator currentStep={step} />}

        <div className="glass-strong rounded-2xl p-6 shadow-card">
          <AnimatePresence mode="wait">
            {!confirmed ? (
              <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}>
                {step === 0 && <ServiceStep selectedId={serviceId} onSelect={setService} />}
                {step === 1 && <DateTimeStep date={date} time={time} onDateChange={(d) => setDateTime(d, time)} onTimeChange={(t) => setDateTime(date, t)} />}
                {step === 2 && <AddressStep address={address} onChange={setAddress} />}
                {step === 3 && <PaymentStep service={selectedService} date={date} time={time} paymentMethod={paymentMethod} onMethodChange={setPaymentMethod} />}
              </motion.div>
            ) : (
              <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 mx-auto mb-4">
                  <Check className="h-8 w-8 text-accent" />
                </div>
                <h2 className="font-display text-2xl font-semibold">Booking Confirmed!</h2>
                <p className="text-muted-foreground mt-2 text-sm">Your service has been scheduled successfully.</p>
                <Link href="/dashboard" className="inline-block mt-6"><Button>View Dashboard</Button></Link>
              </motion.div>
            )}
          </AnimatePresence>

          {!confirmed && (
            <div className="flex justify-between mt-6 pt-4 border-t border-border">
              {step > 0 ? <Button variant="ghost" onClick={prevStep}>Back</Button> : <div />}
              <Button
                disabled={!canProceed}
                onClick={() => {
                  if (step === 3) {
                    const { success } = confirmBooking();
                    if (success) setConfirmed(true);
                  } else {
                    handleNext();
                  }
                }}
              >
                {step === 3 ? "Confirm & Pay" : "Continue"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="pt-32 min-h-screen" />}>
      <BookingContent />
    </Suspense>
  );
}
