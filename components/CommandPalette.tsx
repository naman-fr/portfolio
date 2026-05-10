"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { FileText, Mail, Terminal, Code, Award, User, Briefcase, Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const [copied, setCopied] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
      if (e.key === "Escape") {
        onOpenChange(false);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  const copyEmail = async () => {
    await navigator.clipboard.writeText("namangautam172@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      onOpenChange(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={() => onOpenChange(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-1/4 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50"
          >
            <Command className="glass rounded-lg border border-terminal/50 shadow-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-terminal/20">
                <Terminal className="w-4 h-4 text-terminal" />
                <Command.Input
                  placeholder="Type a command or search..."
                  value={search}
                  onValueChange={setSearch}
                  className="flex-1 bg-transparent outline-none text-white font-mono placeholder-gray-500"
                  autoFocus
                />
                <kbd className="px-2 py-1 text-xs font-mono bg-obsidian border border-terminal/50 rounded text-terminal">
                  ESC
                </kbd>
              </div>
              
              <Command.List className="max-h-96 overflow-y-auto p-2">
                <Command.Empty className="py-8 text-center text-gray-400 font-mono text-sm">
                  No results found.
                </Command.Empty>

                <Command.Group heading="Navigation">
                  <Command.Item
                    onSelect={() => scrollToSection("hero")}
                    className="flex items-center gap-3 px-3 py-2 rounded cursor-pointer hover:bg-terminal/10 data-[selected]:bg-terminal/20"
                  >
                    <User className="w-4 h-4 text-terminal" />
                    <span className="font-mono">Go to Hero</span>
                  </Command.Item>
                  <Command.Item
                    onSelect={() => scrollToSection("experience")}
                    className="flex items-center gap-3 px-3 py-2 rounded cursor-pointer hover:bg-terminal/10 data-[selected]:bg-terminal/20"
                  >
                    <Briefcase className="w-4 h-4 text-terminal" />
                    <span className="font-mono">Go to Experience</span>
                  </Command.Item>
                  <Command.Item
                    onSelect={() => scrollToSection("projects")}
                    className="flex items-center gap-3 px-3 py-2 rounded cursor-pointer hover:bg-terminal/10 data-[selected]:bg-terminal/20"
                  >
                    <Code className="w-4 h-4 text-terminal" />
                    <span className="font-mono">Go to Systems Projects</span>
                  </Command.Item>
                  <Command.Item
                    onSelect={() => scrollToSection("projects")}
                    className="flex items-center gap-3 px-3 py-2 rounded cursor-pointer hover:bg-terminal/10 data-[selected]:bg-terminal/20"
                  >
                    <Code className="w-4 h-4 text-neural" />
                    <span className="font-mono">Go to AI Research</span>
                  </Command.Item>
                  <Command.Item
                    onSelect={() => scrollToSection("achievements")}
                    className="flex items-center gap-3 px-3 py-2 rounded cursor-pointer hover:bg-terminal/10 data-[selected]:bg-terminal/20"
                  >
                    <Award className="w-4 h-4 text-terminal" />
                    <span className="font-mono">Go to Achievements</span>
                  </Command.Item>
                  <Command.Item
                    onSelect={() => scrollToSection("contact")}
                    className="flex items-center gap-3 px-3 py-2 rounded cursor-pointer hover:bg-terminal/10 data-[selected]:bg-terminal/20"
                  >
                    <Mail className="w-4 h-4 text-terminal" />
                    <span className="font-mono">Go to Contact</span>
                  </Command.Item>
                </Command.Group>

                <Command.Group heading="Actions">
                  <Command.Item
                    onSelect={() => {
                      window.open("https://drive.google.com/file/d/10LQRHx-rUHeARxdlL_9TFLLX8zYytgrd/view?usp=drive_link", "_blank");
                      onOpenChange(false);
                    }}
                    className="flex items-center gap-3 px-3 py-2 rounded cursor-pointer hover:bg-terminal/10 data-[selected]:bg-terminal/20"
                  >
                    <FileText className="w-4 h-4 text-terminal" />
                    <span className="font-mono">View Resume (PDF)</span>
                  </Command.Item>
                  <Command.Item
                    onSelect={copyEmail}
                    className="flex items-center gap-3 px-3 py-2 rounded cursor-pointer hover:bg-terminal/10 data-[selected]:bg-terminal/20"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-terminal" />
                    ) : (
                      <Copy className="w-4 h-4 text-terminal" />
                    )}
                    <span className="font-mono">
                      {copied ? "Email Copied!" : "Copy Email to Clipboard"}
                    </span>
                  </Command.Item>
                </Command.Group>
              </Command.List>

              <div className="px-4 py-2 border-t border-terminal/20 flex items-center justify-between text-xs text-gray-500 font-mono">
                <span>Navigate: ↑↓</span>
                <span>Select: Enter</span>
                <span>Close: ESC</span>
              </div>
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
