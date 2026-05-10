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
    <section id="certifications" className="py-32 bg-transparent overflow-hidden relative z-10">
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <header className="space-y-4">
          <span className="text-primary font-mono text-sm tracking-[0.4em] uppercase">[ 06:_LICENSES_&_CERTIFICATIONS ]</span>
          <h2 className="text-large font-bold text-white tracking-tighter uppercase">CREDENTIALS</h2>
        </header>
      </div>

      <div ref={containerRef} className="relative flex whitespace-nowrap">
        <div ref={sliderRef} className="flex gap-10 px-4">
          {[...resumeData.certifications, ...resumeData.certifications].map((cert, i) => {
            const Icon = iconMap[cert.icon as string] || Award;
            return (
              <div
                key={`${cert.id}-${i}`}
                className="group relative glass-premium p-10 rounded-3xl w-[480px] flex gap-8 border border-white/10 transition-all duration-700 hover:scale-[1.02]"
              >
                {/* Holographic Shimmer Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-[linear-gradient(45deg,transparent_25%,rgba(0,255,136,0.05)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer pointer-events-none" />

                {/* Side Tag */}
                <div className="absolute top-0 right-0 h-full w-8 border-l border-white/5 flex items-center justify-center bg-white/[0.02]">
                  <span className="rotate-90 font-mono text-[8px] tracking-[0.5em] text-white/20 whitespace-nowrap">
                    SECURED_LEVEL_04
                  </span>
                </div>

                {/* Left Side: Icon & Verification */}
                <div className="flex flex-col items-center justify-between py-2 border-r border-white/10 pr-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-white/10 shadow-lg">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-primary animate-pulse" />
                    <span className="text-[8px] font-mono text-primary tracking-widest font-bold">VERIFIED</span>
                  </div>
                </div>

                {/* Right Side: Content */}
                <div className="flex-1 space-y-6">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">
                      {cert.date}
                    </span>
                    <h3 className="text-xl font-bold text-white tracking-tight leading-tight group-hover:text-primary transition-colors whitespace-normal">
                      {cert.title.toUpperCase()}
                    </h3>
                    <p className="text-secondary font-mono text-xs uppercase tracking-widest font-bold">
                      {cert.org}
                    </p>
                  </div>

                  {cert.id_code && (
                    <div className="bg-black/40 p-3 rounded-xl border border-white/5 font-mono">
                      <div className="text-[7px] text-white/20 uppercase mb-1">CERT_ID_HASH</div>
                      <div className="text-[9px] text-white/50 truncate break-all">{cert.id_code}</div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill) => (
                      <span key={skill} className="px-2 py-0.5 bg-primary/5 text-[9px] font-mono text-primary/60 border border-primary/10 rounded uppercase">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button className="text-[9px] font-mono text-white/40 flex items-center gap-2 hover:text-primary transition-colors">
                      <ExternalLink className="w-3 h-3" />
                      VALIDATE_LINK
                    </button>
                    <div className="flex gap-1">
                      <div className="w-1 h-4 bg-primary/20 rounded-full" />
                      <div className="w-1 h-4 bg-primary/40 rounded-full" />
                      <div className="w-1 h-4 bg-primary/60 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
