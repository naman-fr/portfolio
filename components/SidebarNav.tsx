"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const sections = [
  { id: "hero", label: "01" },
  { id: "experience", label: "02" },
  { id: "projects", label: "03" },
  { id: "skills", label: "04" },
  { id: "achievements", label: "05" },
  { id: "publications", label: "06" },
  { id: "contact", label: "07" },
];

export default function SidebarNav() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-6">
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className="group flex items-center gap-4 focus:outline-none"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className={`text-[10px] font-mono transition-all duration-300 ${
            activeSection === section.id ? "text-terminal opacity-100" : "text-white opacity-0 group-hover:opacity-50"
          }`}>
            {section.label}
          </span>
          <div className={`h-1.5 transition-all duration-300 rounded-full ${
            activeSection === section.id ? "w-12 bg-terminal" : "w-3 bg-white/20 group-hover:bg-white/40"
          }`} />
        </a>
      ))}
    </div>
  );
}
