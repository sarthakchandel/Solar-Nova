import { Metadata } from "next";
import { SectionWrapper } from "@/components/pages/section-wrapper";
import { PageHeader } from "@/components/pages/page-header";
import { GlassCard } from "@/components/pages/glass-card";
import { CTASection } from "@/components/pages/cta-section";
import { Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Help Center | Rapid Help",
  description: "Find answers to frequently asked questions and get support for your Rapid Help bookings.",
};

export default function HelpCenterPage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-20 selection:bg-accent/30 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-accent/10 blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] -z-10 pointer-events-none" />

      <SectionWrapper>
        <PageHeader 
          title="How can we help you?" 
          subtitle="Search our knowledge base or browse frequently asked questions below."
          badge="Support"
        />

        <div className="max-w-2xl mx-auto relative group mb-16">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-accent transition-colors" />
          <input 
            type="text" 
            placeholder="Search for articles, questions, etc..." 
            className="w-full h-14 pl-12 pr-4 rounded-2xl bg-card border border-border focus:border-accent/50 focus:ring-1 focus:ring-accent/50 outline-none transition-all shadow-sm text-foreground"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            { q: "How do I book a service?", a: "Simply browse to the category of service you need, select your preferred time slot, and confirm your booking. Our system will instantly match you with a verified professional." },
            { q: "What is your cancellation policy?", a: "You can cancel any booking for free up to 2 hours before the scheduled time. Cancellations made within 2 hours may incur a small fee to compensate the professional." },
            { q: "Are the professionals verified?", a: "Yes, every professional on Rapid Help undergoes a rigorous multi-step verification process, including background checks, skill assessments, and ongoing performance reviews." },
            { q: "How do I pay?", a: "Payment is handled securely through the app. You can pay via credit card, debit card, or UPI after the service is completed to your satisfaction." },
          ].map((faq, i) => (
            <GlassCard key={i} delay={0.2 + (i * 0.1)} hoverEffect className="p-8">
              <h3 className="text-xl font-bold text-foreground mb-3">{faq.q}</h3>
              <p className="text-muted-foreground">{faq.a}</p>
            </GlassCard>
          ))}
        </div>

        <CTASection 
          title="Still need help?"
          description="Our premium support team is available 24/7 to assist you with any issues."
          buttonText="Contact Support"
          buttonHref="/contact"
        />
      </SectionWrapper>
    </div>
  );
}
