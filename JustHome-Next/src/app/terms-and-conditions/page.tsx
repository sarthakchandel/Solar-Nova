import { Metadata } from "next";
import { SectionWrapper } from "@/components/pages/section-wrapper";
import { PageHeader } from "@/components/pages/page-header";
import { GlassCard } from "@/components/pages/glass-card";

export const metadata: Metadata = {
  title: "Terms & Conditions | Rapid Help",
  description: "Read the terms and conditions for using Rapid Help's premium home service platform.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-20 selection:bg-accent/30 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-accent/10 blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] -z-10 pointer-events-none" />

      <SectionWrapper>
        <PageHeader 
          title="Terms & Conditions" 
          subtitle="Please read these terms carefully before using our premium home services platform."
          badge="Legal"
        />

        <GlassCard delay={0.2} className="space-y-10">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
            <p className="text-lg">
              By accessing and using the Rapid Help platform, you accept and agree to be bound by the terms and provision of this agreement. These terms apply to all visitors, users, and others who access or use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">2. Service Modifications</h2>
            <p className="text-lg">
              We reserve the right to modify or discontinue the service with or without notice to the user. We shall not be liable to you or any third party should we exercise our right to modify or discontinue the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">3. User Responsibilities</h2>
            <p className="text-lg">
              You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete. You are responsible for safeguarding your password and any activities under your account.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Payment & Cancellation</h2>
            <p className="text-lg">
              Payments are processed securely via our trusted payment gateways. Cancellations made within 2 hours of the scheduled service time may be subject to a cancellation fee.
            </p>
          </section>
        </GlassCard>
      </SectionWrapper>
    </div>
  );
}
