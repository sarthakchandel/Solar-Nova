import { Metadata } from "next";
import { SectionWrapper } from "@/components/pages/section-wrapper";
import { PageHeader } from "@/components/pages/page-header";
import { GlassCard } from "@/components/pages/glass-card";
import { ShieldCheck, UserCheck, Lock, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Trust & Safety | Rapid Help",
  description: "Your safety is our top priority. Learn about the rigorous security measures we take at Rapid Help.",
};

export default function SafetyPage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-20 selection:bg-accent/30 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-accent/10 blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] -z-10 pointer-events-none" />

      <SectionWrapper>
        <PageHeader 
          title="Trust & Safety" 
          subtitle="We take your security seriously. Discover the comprehensive measures we implement to ensure every Rapid Help experience is completely safe."
          badge="Security First"
        />

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {[
            { icon: <UserCheck className="w-8 h-8 text-accent" />, title: "Rigorous Vetting", desc: "Every professional undergoes comprehensive background checks, identity verification, and skill assessments before joining our platform." },
            { icon: <ShieldCheck className="w-8 h-8 text-accent" />, title: "Service Guarantee", desc: "We stand behind the quality of our work. If you're not satisfied, our support team will make it right, guaranteed." },
            { icon: <Lock className="w-8 h-8 text-accent" />, title: "Secure Payments", desc: "All transactions are encrypted and processed through industry-leading secure payment gateways to protect your financial data." },
            { icon: <Award className="w-8 h-8 text-accent" />, title: "Certified Experts", desc: "We only partner with certified, experienced professionals who maintain consistently high ratings from our community." },
          ].map((item, i) => (
            <GlassCard key={i} delay={0.2 + (i * 0.1)} hoverEffect className="p-8">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
              <p className="text-muted-foreground">{item.desc}</p>
            </GlassCard>
          ))}
        </div>

        <GlassCard delay={0.6}>
          <h2 className="text-2xl font-bold text-foreground mb-4">Our Commitment During COVID-19</h2>
          <p className="text-lg">
            While the pandemic has evolved, our commitment to hygiene remains unchanged. All Rapid Help professionals are required to adhere to strict sanitation protocols, including wearing masks upon request, sanitizing tools before and after every job, and maintaining proper social distancing whenever possible.
          </p>
        </GlassCard>
      </SectionWrapper>
    </div>
  );
}
