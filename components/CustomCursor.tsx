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
        duration: 0.5,
        ease: "power3.out",
      });
    };

    const handleHover = () => {
      gsap.to(follower, {
        scale: 2.2,
        borderRadius: "16px",
        backgroundColor: "rgba(242, 123, 80, 0.04)",
        borderColor: "rgba(242, 123, 80, 0.6)",
        duration: 0.4,
        ease: "elastic.out(1, 0.3)",
      });
      gsap.to(cursor, {
        scale: 0,
        duration: 0.2,
      });
    };

    const handleUnhover = () => {
      gsap.to(follower, {
        scale: 1,
        borderRadius: "50%",
        backgroundColor: "transparent",
        borderColor: "rgba(223, 199, 179, 0.3)",
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(cursor, {
        scale: 1,
        duration: 0.2,
      });
    };

    window.addEventListener("mousemove", moveCursor);

    const refreshListeners = () => {
      const interactiveElements = document.querySelectorAll("a, button, [role='button'], .project-card");
      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", handleHover);
        el.addEventListener("mouseleave", handleUnhover);
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
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-primary rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 border border-white/40 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-[border-radius] duration-500"
      />
    </>
  );
}
