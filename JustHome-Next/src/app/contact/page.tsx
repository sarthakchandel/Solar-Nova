"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-20 selection:bg-accent/30">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold tracking-wide uppercase mb-6 inline-block">
            We're Here to Help
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
            Get in <span className="text-accent-gradient">Touch</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a question, need assistance with a booking, or just want to say hi? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          
          {/* Contact Information Cards */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {[
              { icon: <Phone className="w-6 h-6 text-primary" />, title: "Call Us", value: "+1 (800) 123-4567", desc: "Mon-Fri from 8am to 8pm." },
              { icon: <Mail className="w-6 h-6 text-primary" />, title: "Email Us", value: "support@rapidhelp.com", desc: "We'll respond within 24 hours." },
              { icon: <MapPin className="w-6 h-6 text-primary" />, title: "Visit Us", value: "123 Innovation Drive", desc: "Tech Park, NY 10001, USA" },
            ].map((info, i) => (
              <div key={i} className="glass p-6 rounded-2xl flex items-start gap-5 hover:border-accent/30 transition-colors group">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-accent/10 group-hover:scale-110 transition-all duration-300">
                  {info.icon}
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">{info.title}</h3>
                  <p className="text-accent font-medium mb-1">{info.value}</p>
                  <p className="text-sm text-muted-foreground">{info.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-3 glass-strong rounded-3xl p-8 md:p-10"
          >
            <h2 className="text-2xl font-bold text-foreground mb-8">Send us a message</h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">First Name</label>
                  <input type="text" placeholder="John" className="w-full h-12 px-4 rounded-xl bg-card border border-border focus:border-accent/50 focus:ring-1 focus:ring-accent/50 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Last Name</label>
                  <input type="text" placeholder="Doe" className="w-full h-12 px-4 rounded-xl bg-card border border-border focus:border-accent/50 focus:ring-1 focus:ring-accent/50 outline-none transition-all" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email Address</label>
                <input type="email" placeholder="john@example.com" className="w-full h-12 px-4 rounded-xl bg-card border border-border focus:border-accent/50 focus:ring-1 focus:ring-accent/50 outline-none transition-all" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Subject</label>
                <input type="text" placeholder="How can we help?" className="w-full h-12 px-4 rounded-xl bg-card border border-border focus:border-accent/50 focus:ring-1 focus:ring-accent/50 outline-none transition-all" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Message</label>
                <textarea rows={4} placeholder="Tell us more about your inquiry..." className="w-full p-4 rounded-xl bg-card border border-border focus:border-accent/50 focus:ring-1 focus:ring-accent/50 outline-none transition-all resize-none"></textarea>
              </div>

              <button className="w-full h-12 rounded-xl bg-primary hover:bg-secondary text-primary-foreground font-semibold transition-all hover:scale-[1.02] flex items-center justify-center gap-2">
                Send Message <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
