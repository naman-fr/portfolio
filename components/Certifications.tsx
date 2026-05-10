"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { resumeData } from "../data/resume";
import { ExternalLink, Award, ShieldCheck, Zap, Cloud, Trophy } from "lucide-react";

const iconMap: Record<string, any> = {
  cloud: Cloud,
  zap: Zap,
  award: ShieldCheck,
  trophy: Trophy,
};

export default function Certifications() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const totalWidth = slider.scrollWidth;
    
    const animation = gsap.to(slider, {
      x: `-${totalWidth / 2}px`,
      duration: 40,
      ease: "none",
      repeat: -1,
    });

    slider.addEventListener("mouseenter", () => animation.pause());
    slider.addEventListener("mouseleave", () => animation.play());

    return () => {
      animation.kill();
    };
  }, []);

  return (
    <section id="certifications" className="py-32 bg-[#0a0a0a] overflow-hidden border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <header className="space-y-4">
          <span className="text-primary font-mono text-sm tracking-[0.4em] uppercase">[ 06:_LICENSES_&_CERTIFICATIONS ]</span>
          <h2 className="text-large font-bold text-white tracking-tighter uppercase">CREDENTIALS</h2>
        </header>
      </div>

      <div ref={containerRef} className="relative flex whitespace-nowrap">
        <div ref={sliderRef} className="flex gap-8 px-4">
          {[...resumeData.certifications, ...resumeData.certifications].map((cert, i) => {
            const Icon = iconMap[cert.icon as string] || Award;
            return (
              <div
                key={`${cert.id}-${i}`}
                className="glass-premium p-8 rounded-2xl w-[450px] flex flex-col justify-between border-white/5 hover:border-primary/30 transition-all duration-500 group"
              >
                <div className="space-y-6">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
                      {cert.date}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white tracking-tight leading-tight group-hover:text-primary transition-colors whitespace-normal">
                      {cert.title.toUpperCase()}
                    </h3>
                    <p className="text-primary/60 font-mono text-xs uppercase tracking-widest">
                      {cert.org}
                    </p>
                  </div>

                  {cert.id_code && (
                    <div className="bg-white/[0.02] p-3 rounded border border-white/5">
                      <div className="text-[8px] font-mono text-white/20 uppercase mb-1">CREDENTIAL_ID</div>
                      <div className="text-[10px] font-mono text-white/60 truncate">{cert.id_code}</div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 pt-2">
                    {cert.skills.map((skill) => (
                      <span key={skill} className="px-2 py-0.5 bg-white/5 text-[9px] font-mono text-white/40 rounded uppercase tracking-tighter">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                  <button className="text-[10px] font-mono text-primary flex items-center gap-2 hover:text-white transition-colors">
                    <ExternalLink className="w-3 h-3" />
                    SHOW_CREDENTIAL
                  </button>
                  <ShieldCheck className="w-4 h-4 text-white/10" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
