"use client";

import { motion } from "framer-motion";
import BackgroundOrb from "@/components/ui/BackgroundOrb";

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center relative z-10 overflow-hidden">
      <BackgroundOrb />
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-center bg-black/40 backdrop-blur-md p-10 rounded-3xl border border-white/10"
          >
            <div className="inline-block px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm mb-6 w-max">
              <span className="text-cyan-300 tracking-widest uppercase text-xs font-semibold">
                Get In Touch
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter mb-8 leading-[1.05]">
              Let&apos;s build <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">something</span>.
            </h1>
            <p className="text-xl text-slate-400 mb-12 max-w-md leading-relaxed font-light">
              Whether you have a fully fleshed out project or just an idea, we&apos;d love to hear from you. We respond within 24 hours.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02] group-hover:border-cyan-500/50 transition-colors">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-slate-500 uppercase tracking-wider mb-1">Email Us</span>
                  <span className="text-xl font-medium text-white group-hover:text-cyan-400 transition-colors">hello@tsc.agency</span>
                </div>
              </div>
              
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02] group-hover:border-emerald-500/50 transition-colors">
                  <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-slate-500 uppercase tracking-wider mb-1">Visit Us</span>
                  <span className="text-xl font-medium text-white">San Francisco, CA</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <form className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/[0.05] backdrop-blur-md flex flex-col gap-6 relative overflow-hidden shadow-2xl">
              
              <div className="relative z-10 flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium text-slate-400 ml-2">Your Name</label>
                <input 
                  type="text" 
                  id="name"
                  placeholder="John Doe"
                  className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                />
              </div>

              <div className="relative z-10 flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-slate-400 ml-2">Email Address</label>
                <input 
                  type="email" 
                  id="email"
                  placeholder="john@example.com"
                  className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                />
              </div>

              <div className="relative z-10 flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium text-slate-400 ml-2">Project Details</label>
                <textarea 
                  id="message"
                  rows={4}
                  placeholder="Tell us about your vision..."
                  className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all resize-none"
                ></textarea>
              </div>

              <button 
                type="button"
                className="group relative z-10 mt-6 px-8 py-5 w-full overflow-hidden rounded-2xl font-medium tracking-wide border border-cyan-500/30 text-white transition-all duration-500"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Send Message
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 h-full w-0 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 transition-all duration-500 ease-out group-hover:w-full"></div>
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </main>
  );
}
