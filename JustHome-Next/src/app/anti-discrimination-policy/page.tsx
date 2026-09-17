import { Metadata } from "next";
import { SectionWrapper } from "@/components/pages/section-wrapper";
import { PageHeader } from "@/components/pages/page-header";
import { GlassCard } from "@/components/pages/glass-card";

export const metadata: Metadata = {
  title: "Anti-Discrimination Policy | Rapid Help",
  description: "Rapid Help's zero-tolerance policy against discrimination to ensure a safe environment for everyone.",
};

export default function AntiDiscriminationPage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-20 selection:bg-accent/30 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-accent/10 blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] -z-10 pointer-events-none" />

      <SectionWrapper>
        <PageHeader 
          title="Anti-Discrimination Policy" 
          subtitle="We are committed to creating an inclusive, respectful, and safe environment for all our users and professionals."
          badge="Our Values"
        />

        <GlassCard delay={0.2} className="space-y-10">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Zero Tolerance</h2>
            <p className="text-lg">
              Rapid Help maintains a strict zero-tolerance policy towards discrimination of any kind. We do not tolerate discrimination based on race, religion, national origin, disability, sexual orientation, sex, marital status, gender identity, or age.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Expectations for Users</h2>
            <p className="text-lg">
              Homeowners and users of our platform are expected to treat all service professionals with respect and dignity. Any reports of discriminatory behavior, harassment, or verbal abuse will result in immediate suspension or termination of the user's account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Expectations for Professionals</h2>
            <p className="text-lg">
              Our service partners and professionals are equally bound by this policy. They must provide services to all customers equitably and without bias. Violations of this policy by any professional will lead to immediate removal from the Rapid Help platform.
            </p>
          </section>
        </GlassCard>
      </SectionWrapper>
    </div>
  );
}
