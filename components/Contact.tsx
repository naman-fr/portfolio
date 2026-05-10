"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { resumeData } from "../data/resume";
import { Github, Linkedin, Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { margin: "-100px" });
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [terminalLogs, setTerminalLogs] = useState<string[]>(["SYSTEM READY", "WAITING FOR INPUT..."]);

  const addLog = (msg: string) => {
    setTerminalLogs(prev => [...prev, `> ${msg}`].slice(-6));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    addLog("Initializing secure SMTP tunnel...");
    addLog("Validating packet headers...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        addLog("Data transmission successful.");
        addLog("ACK received from namangautam172@gmail.com");
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error("Target refused connection");
      }
    } catch (err) {
      setStatus("error");
      addLog("ERROR: Connection timeout.");
      addLog("Retrying in fallback mode...");
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen py-32 px-4 relative flex items-center justify-center bg-[#0a0a0a]"
    >
      <div className="max-w-4xl w-full">
        <motion.div
          className="glass-premium rounded-3xl overflow-hidden border-white/10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="bg-white/5 p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <div className="w-2 h-2 rounded-full bg-secondary" />
              <div className="w-2 h-2 rounded-full bg-accent" />
            </div>
            <div className="font-mono text-[10px] tracking-widest text-white/40">CONNECT_PROTOCOL_v6.0</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-12 border-r border-white/5 bg-white/[0.02]">
              <div className="mb-12">
                <h2 className="text-5xl font-bold text-white mb-4 leading-none tracking-tighter">HELLO.</h2>
                <p className="text-primary/60 font-mono text-[10px] uppercase tracking-[0.3em]">
                  [ INITIALIZE_COMM_SEQUENCE ]
                </p>
              </div>
              <div className="space-y-8">
                <div className="flex items-center gap-6 group">
                  <div className="p-3 rounded-full bg-primary/10 border border-primary/20 group-hover:bg-primary group-hover:text-base transition-all duration-300">
                    <Mail className="w-5 h-5 text-primary group-hover:text-base" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-white/40 tracking-widest mb-1">ENDPOINT</div>
                    <div className="font-mono text-sm group-hover:text-primary transition-colors">{resumeData.profile.contact.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                   <div className="p-3 rounded-full bg-secondary/10 border border-secondary/20 group-hover:bg-secondary group-hover:text-base transition-all duration-300">
                    <Linkedin className="w-5 h-5 text-secondary group-hover:text-base" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-white/40 tracking-widest mb-1">NETWORK</div>
                    <div className="font-mono text-sm group-hover:text-secondary transition-colors">namangautam-691158299</div>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                   <div className="p-3 rounded-full bg-accent/10 border border-accent/20 group-hover:bg-accent group-hover:text-base transition-all duration-300">
                    <Github className="w-5 h-5 text-accent group-hover:text-base" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-white/40 tracking-widest mb-1">REPO</div>
                    <div className="font-mono text-sm group-hover:text-accent transition-colors">naman-fr</div>
                  </div>
                </div>
              </div>

              {/* Terminal Logs Widget */}
              <div className="mt-16 p-6 bg-black/40 rounded-2xl border border-white/5 font-mono text-[10px] h-40 overflow-hidden relative">
                <div className="text-white/20 mb-4 tracking-[0.2em]">{"// SYSTEM_STATUS"}</div>
                <div className="space-y-1">
                  {terminalLogs.map((log, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="text-white/60">
                      <span className="text-primary/40 mr-2">&gt;&gt;&gt;</span> {log}
                    </motion.div>
                  ))}
                </div>
                {status === "sending" && (
                  <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="text-primary mt-1">
                    &gt; _
                  </motion.div>
                )}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-12 space-y-8 bg-white/[0.01]">
              <div className="space-y-4">
                <label className="block text-[10px] font-mono text-white/40 tracking-widest uppercase">{"01 // IDENTIFIER"}</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="NAME_HERE"
                  className="w-full bg-transparent border-b border-white/10 p-4 font-mono text-white focus:outline-none focus:border-primary transition-colors placeholder:text-white/10"
                  required
                />
              </div>
              <div className="space-y-4">
                <label className="block text-[10px] font-mono text-white/40 tracking-widest uppercase">{"02 // GATEWAY"}</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="EMAIL@PROTOCOL.COM"
                  className="w-full bg-transparent border-b border-white/10 p-4 font-mono text-white focus:outline-none focus:border-primary transition-colors placeholder:text-white/10"
                  required
                />
              </div>
              <div className="space-y-4">
                <label className="block text-[10px] font-mono text-white/40 tracking-widest uppercase">{"03 // PAYLOAD"}</label>
                <textarea
                  className="w-full bg-transparent border-b border-white/10 p-4 font-mono text-white focus:outline-none focus:border-primary transition-colors h-32 resize-none placeholder:text-white/10"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="DESCRIBE_YOUR_OBJECTIVE"
                  required
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === "sending"}
                className="btn-magnetic w-full !rounded-xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {status === "sending" ? "TRANSMITTING..." : "EXECUTE_CONNECT"}
              </motion.button>

              {status === "success" && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-primary text-[10px] font-mono text-center tracking-widest">
                  {"// TRANSMISSION_SUCCESSFUL"}
                </motion.p>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
