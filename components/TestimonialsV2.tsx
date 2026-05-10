"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";

const testimonials = [
  { name: "SR_ENGINEER", company: "TECH_CORP", text: "AN ABSOLUTE GENIUS IN SYSTEM ARCHITECTURE." },
  { name: "PRODUCT_LEAD", company: "INNOVATE_AI", text: "REDEFINED OUR AGENTIC WORKFLOWS IN WEEKS." },
  { name: "CTO", company: "CYBER_DYNAMICS", text: "THE BEST EMBEDDED CONTROL LOGIC I'VE SEEN." },
  { name: "DIR_RESEARCH", company: "QUANTUM_LABS", text: "A MASTER OF BOTH CLASSICAL AND QUANTUM SIMULATION." },
  { name: "LEAD_DESIGNER", company: "AWARDS_AGENCY", text: "VISUAL TASTE THAT MATCHES TECHNICAL DEPTH." },
];

export default function TestimonialsV2() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    // Duplicate testimonials for infinite loop
    const totalWidth = slider.scrollWidth;
    
    gsap.to(slider, {
      x: `-${totalWidth / 2}px`,
      duration: 20,
      ease: "none",
      repeat: -1,
    });
  }, []);

  return (
    <section id="testimonials" className="py-32 bg-[#0a0a0a] overflow-hidden border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <span className="text-accent font-mono text-sm tracking-[0.4em] uppercase">[ 05:_TRANSMISSIONS ]</span>
      </div>

      <div ref={containerRef} className="relative flex whitespace-nowrap">
        <div ref={sliderRef} className="flex gap-12">
          {[...testimonials, ...testimonials].map((t, i) => (
            <div
              key={i}
              className="glass-premium p-12 rounded-3xl min-w-[400px] flex flex-col justify-between border-white/10"
            >
              <p className="text-2xl font-bold text-white tracking-tight leading-tight">
                &quot;{t.text}&quot;
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/40" />
                <div>
                  <div className="text-xs font-mono text-accent">{t.name}</div>
                  <div className="text-[10px] font-mono text-white/20">{t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
