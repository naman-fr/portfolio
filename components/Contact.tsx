"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
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
    addLog("SYN_SENT: Initializing secure SMTP tunnel...");
    addLog("SEQ_VERIFY: Validating transmission payload...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        addLog("ACK_RECEIVED: Data transmission successful.");
        addLog(`GATEWAY_RESPONSE: Delivered to ${resumeData.profile.contact.email}`);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        const errorData = await res.json();
        throw new Error(errorData.error || "GATEWAY_REFUSED_CONNECTION");
      }
    } catch (err: any) {
      setStatus("error");
      addLog(`ERR_RST: ${err.message || "Connection timeout."}`);
      addLog("FAILOVER: Transmission aborted.");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen py-32 px-4 relative flex items-center justify-center bg-transparent z-10"
    >
      <div className="max-w-5xl w-full">
        <motion.div
          className="glass-premium rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl relative"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Header Bar */}
          <div className="bg-white/5 p-6 border-b border-white/5 flex items-center justify-between px-10">
            <div className="flex gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-primary" />
            </div>
            <div className="font-mono text-[9px] tracking-[0.4em] text-white/20 uppercase">
              SECURE_COMM_CHANNEL_v8.4
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Info Side */}
            <div className="p-12 lg:p-16 border-r border-white/5 bg-white/[0.005]">
              <div className="mb-16">
                <h2 className="text-5xl lg:text-6xl font-display font-extrabold text-white mb-6 leading-none tracking-tighter uppercase">
                  HELLO.
                </h2>
                <p className="text-primary font-mono text-[9px] uppercase tracking-[0.4em] opacity-60">
                  [ ESTABLISHING_HANDSHAKE ]
                </p>
              </div>

              <div className="space-y-8">
                {[
                  { icon: Mail, label: "ENCRYPTED_MAIL", value: resumeData.profile.contact.email, color: "text-primary" },
                  { icon: Linkedin, label: "NETWORK_ID", value: "naman-gautam-691158299", color: "text-[#dfc7b3]" },
                  { icon: Github, label: "SOURCE_CONTROL", value: "naman-fr", color: "text-accent" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-6 group cursor-pointer">
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 group-hover:border-primary/30 transition-all duration-500 group-hover:bg-primary/5">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[8px] font-mono text-white/30 tracking-[0.3em] mb-1">{item.label}</div>
                      <div className="font-mono text-sm text-[#dfc7b3]/80 group-hover:text-white transition-colors">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* System Monitor Widget */}
              <div className="mt-16 p-8 bg-black/40 rounded-[2rem] border border-white/5 font-mono text-[10px] h-48 overflow-hidden relative group/monitor">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-primary/20 animate-scan pointer-events-none" />
                <div className="text-white/20 mb-6 flex justify-between">
                  <span>{"// SYSTEM_LOGS"}</span>
                  <span className="animate-pulse">ONLINE</span>
                </div>
                <div className="space-y-2">
                  {terminalLogs.map((log, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="text-white/40">
                      <span className="text-primary/30 mr-2">HEX_{i}F:</span> {log}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form Side */}
            <form onSubmit={handleSubmit} className="p-12 lg:p-16 space-y-8 bg-white/[0.01]">
              <div className="space-y-6">
                {[
                  { label: "USER_IDENTIFIER", placeholder: "ENTER_NAME", type: "text", key: "name" },
                  { label: "RETURN_GATEWAY", placeholder: "EMAIL@PROTOCOL.IO", type: "email", key: "email" },
                ].map((field) => (
                  <div key={field.key} className="space-y-3">
                    <label className="block text-[8px] font-mono text-white/30 tracking-[0.4em] uppercase">{field.label}</label>
                    <input
                      type={field.type}
                      value={(formData as any)[field.key]}
                      onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                      placeholder={field.placeholder}
                      className="w-full bg-white/[0.02] border border-white/5 rounded-xl p-5 font-mono text-sm text-white focus:outline-none focus:border-primary/30 transition-all placeholder:text-white/10 focus:bg-primary/[0.01]"
                      required
                    />
                  </div>
                ))}
                
                <div className="space-y-3">
                  <label className="block text-[8px] font-mono text-white/30 tracking-[0.4em] uppercase">TRANSMISSION_PAYLOAD</label>
                  <textarea
                    className="w-full bg-white/[0.02] border border-white/5 rounded-xl p-5 font-mono text-sm text-white focus:outline-none focus:border-primary/30 transition-all h-36 resize-none placeholder:text-white/10 focus:bg-primary/[0.01]"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="DESCRIBE_PROJECT_SCOPE..."
                    required
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-5 bg-primary text-black font-mono text-xs font-bold tracking-[0.4em] rounded-xl hover:bg-white transition-all shadow-[0_0_20px_rgba(242,123,80,0.2)] disabled:opacity-50 uppercase"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {status === "sending" ? "TRANSMITTING..." : "EXECUTE_CONNECT"}
              </motion.button>

              <AnimatePresence>
                {status === "success" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-4 bg-primary/10 border border-primary/20 rounded-xl text-primary text-[10px] font-mono text-center tracking-[0.3em]"
                  >
                    STATUS_200: TRANSMISSION_COMPLETE
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-[10px] font-mono text-center tracking-[0.3em]"
                  >
                    STATUS_500: TRANSMISSION_FAILED
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
