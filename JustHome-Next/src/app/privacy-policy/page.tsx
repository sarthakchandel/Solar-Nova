import { Metadata } from "next";
import { SectionWrapper } from "@/components/pages/section-wrapper";
import { PageHeader } from "@/components/pages/page-header";
import { GlassCard } from "@/components/pages/glass-card";

export const metadata: Metadata = {
  title: "Privacy Policy | Rapid Help",
  description: "Learn how Rapid Help collects, uses, and protects your personal data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-20 selection:bg-accent/30 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-accent/10 blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] -z-10 pointer-events-none" />

      <SectionWrapper>
        <PageHeader 
          title="Privacy Policy" 
          subtitle="Your privacy is critically important to us. Learn how we collect, use, and protect your data."
          badge="Legal"
        />

        <GlassCard delay={0.2} className="space-y-10">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Data Collection</h2>
            <p className="text-lg">
              We collect information that you provide directly to us when creating an account, booking a service, or communicating with our support team. This includes your name, contact information, and location data to facilitate service delivery.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">2. Use of Information</h2>
            <p className="text-lg">
              The information we collect is used to provide, maintain, and improve our services, process transactions, and send you related information including confirmations, invoices, and technical notices. We also use it to monitor and analyze trends and usage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">3. Data Protection</h2>
            <p className="text-lg">
              We implement advanced security measures to protect your personal information. We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties without your explicit consent, except to trusted partners who assist us in operating our platform.
            </p>
          </section>
        </GlassCard>
      </SectionWrapper>
    </div>
  );
}
