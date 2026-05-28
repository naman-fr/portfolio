"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.45,
        ease: "power3.out",
      });
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      let labelText = "";
      let scaleValue = 2.0;

      // Class or ID check to set contextual indicator
      if (target.closest("#experience")) {
        labelText = "FLIP";
        scaleValue = 2.8;
      } else if (target.closest("#certifications")) {
        labelText = "DRAG";
        scaleValue = 2.8;
      } else if (target.closest("#projects")) {
        labelText = "TAB";
        scaleValue = 2.8;
      } else {
        scaleValue = 2.0;
      }

      const labelEl = document.getElementById("cursor-label");
      if (labelEl) {
        labelEl.textContent = labelText;
        gsap.to(labelEl, { opacity: labelText ? 1 : 0, duration: 0.2 });
      }

      gsap.to(follower, {
        scale: scaleValue,
        backgroundColor: "rgba(242, 123, 80, 0.06)",
        borderColor: "rgba(242, 123, 80, 0.6)",
        duration: 0.35,
        ease: "power2.out",
      });
      gsap.to(cursor, {
        scale: 0,
        duration: 0.15,
      });
    };

    const handleUnhover = () => {
      const labelEl = document.getElementById("cursor-label");
      if (labelEl) {
        gsap.to(labelEl, { 
          opacity: 0, 
          duration: 0.15, 
          onComplete: () => { 
            if (labelEl) labelEl.textContent = ""; 
          } 
        });
      }

      gsap.to(follower, {
        scale: 1,
        borderRadius: "50%",
        backgroundColor: "transparent",
        borderColor: "rgba(223, 199, 179, 0.35)",
        duration: 0.35,
        ease: "power2.out",
      });
      gsap.to(cursor, {
        scale: 1,
        duration: 0.15,
      });
    };

    window.addEventListener("mousemove", moveCursor);

    const refreshListeners = () => {
      const interactiveElements = document.querySelectorAll("a, button, [role='button'], #projects h3, #experience > div, #certifications p, #certifications h3, #competitive a");
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleHover as any);
        el.removeEventListener("mouseleave", handleUnhover as any);
        el.addEventListener("mouseenter", handleHover as any);
        el.addEventListener("mouseleave", handleUnhover as any);
      });
    };

    refreshListeners();
    // Re-bind on dynamic content changes
    const observer = new MutationObserver(refreshListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-primary rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block"
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-9 h-9 border border-[#dfc7b3]/30 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center mix-blend-difference hidden md:flex"
      >
        <span 
          id="cursor-label" 
          className="opacity-0 font-mono text-[6px] tracking-wider text-primary font-bold text-center pointer-events-none"
        />
      </div>
    </>
  );
}
