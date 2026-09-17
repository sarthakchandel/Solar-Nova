import { Metadata } from "next";
import { SectionWrapper } from "@/components/pages/section-wrapper";
import { PageHeader } from "@/components/pages/page-header";
import { GlassCard } from "@/components/pages/glass-card";
import { CTASection } from "@/components/pages/cta-section";

export const metadata: Metadata = {
  title: "About Us | Rapid Help",
  description: "Learn about Rapid Help's mission to redefine home services with premium quality, trusted professionals, and seamless experiences.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-20 selection:bg-accent/30 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-accent/10 blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] -z-10 pointer-events-none" />

      <SectionWrapper>
        <PageHeader 
          title="About Rapid Help" 
          subtitle="We are redefining home services by bringing premium quality, trusted professionals, and seamless experiences directly to your doorstep."
          badge="Our Story"
        />

        <GlassCard delay={0.2} className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-lg">
              At Rapid Help, our mission is simple: to transform the way people manage their homes. We believe that booking a home service should be as easy and reliable as booking a premium ride. 
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Uncompromising Quality</h2>
            <p className="text-lg">
              We rigorously vet every single professional on our platform. From background checks to skill assessments, we ensure that when a Rapid Help expert walks through your door, you are getting the absolute best in the business.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">The Future of Home Care</h2>
            <p className="text-lg">
              We are constantly innovating, using technology to predict maintenance needs, standardize pricing, and provide a transparent, friction-free experience for homeowners everywhere.
            </p>
          </section>
        </GlassCard>

        <CTASection 
          title="Ready to experience the difference?"
          description="Book your first premium home service today and see why thousands trust Rapid Help."
          buttonText="Explore Services"
          buttonHref="/services"
        />
      </SectionWrapper>
    </div>
  );
}
