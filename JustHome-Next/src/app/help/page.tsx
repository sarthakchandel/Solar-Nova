"use client";

import { motion } from "framer-motion";
import { Search, Mail, MessageCircle, Phone, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

const faqs = [
  {
    question: "How do I book a service?",
    answer: "You can book a service by navigating to the Services page, selecting the service you need, and following the 4-step booking process to choose a date, time, and payment method.",
  },
  {
    question: "How can I reschedule or cancel my booking?",
    answer: "Go to your Dashboard and navigate to the 'Bookings' tab. Find your upcoming booking and click the 'Reschedule' button. Cancellations can be made up to 24 hours before the service time.",
  },
  {
    question: "Are your professionals verified?",
    answer: "Yes, all our service professionals undergo a strict background check and verification process to ensure your safety and the highest quality of service.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit and debit cards, UPI, and digital wallets. You can also choose to pay after the service is completed for certain categories.",
  },
];

const categories = [
  { icon: FileText, title: "Booking & Payments", desc: "Issues related to your bookings or transactions." },
  { icon: MessageCircle, title: "Service Quality", desc: "Feedback and concerns about the service provided." },
  { icon: Phone, title: "Contact Professional", desc: "How to reach the assigned professional." },
];

export default function HelpCenterPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="font-display text-4xl font-semibold text-primary dark:text-foreground">Help Center</h1>
          <p className="text-muted-foreground mt-4 text-lg">How can we help you today?</p>
          
          <div className="relative mt-8 max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              placeholder="Search for articles, questions, or topics..."
              className="w-full h-14 pl-12 pr-4 rounded-full bg-card/50 border border-border focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all shadow-sm"
            />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {categories.map((cat, idx) => (
            <motion.div key={cat.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
              <Card hover={true} className="p-6 text-center h-full flex flex-col items-center justify-center">
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <cat.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{cat.title}</h3>
                <p className="text-sm text-muted-foreground">{cat.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="space-y-8">
          <h2 className="font-display text-2xl font-semibold text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {faqs.map((faq, idx) => (
              <motion.div key={idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + idx * 0.1 }}>
                <Card hover={false} className="p-6 h-full border-border/50">
                  <h3 className="font-semibold text-lg mb-3">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-16 text-center glass-strong rounded-2xl p-8 border border-border">
          <Mail className="h-8 w-8 text-accent mx-auto mb-4" />
          <h2 className="font-display text-xl font-semibold mb-2">Still need help?</h2>
          <p className="text-muted-foreground mb-6">Our support team is available 24/7 to assist you.</p>
          <a href="mailto:support@rapidhelp.com" className="inline-flex items-center justify-center h-11 px-8 rounded-full bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-colors">
            Contact Support
          </a>
        </motion.div>
      </div>
    </div>
  );
}
