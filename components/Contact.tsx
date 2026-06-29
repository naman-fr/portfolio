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
          className="bg-[#fcfbf9] overflow-hidden border-[4px] border-[#1a1a1a] shadow-[12px_12px_0_0_#e02424] relative"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Header Bar */}
          <div className="bg-[#1a1a1a] text-white p-5 border-b-[4px] border-[#1a1a1a] flex items-center justify-between px-8 sm:px-10 shrink-0">
            <div className="flex gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-[#e02424] border border-white" />
              <div className="w-3.5 h-3.5 rounded-full bg-[#f9db34] border border-white" />
            </div>
            <div className="font-mono text-[10px] font-black tracking-[0.4em] text-white uppercase">
              SECURE_COMM_CHANNEL_v8.4
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Info Side */}
            <div className="p-6 sm:p-10 lg:p-12 border-b-[4px] md:border-b-0 md:border-r-[4px] border-[#1a1a1a] bg-[#fcfbf9] relative">
              {/* Decorative P5 background text */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl font-display font-black text-[#1a1a1a]/5 -z-10 -rotate-12 pointer-events-none uppercase">
                CONTACT
              </div>

              <div className="mb-12">
                <motion.h2 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.05 }
                    }
                  }}
                  className="text-6xl lg:text-7xl font-display font-black text-[#1a1a1a] mb-4 leading-none tracking-tighter uppercase flex"
                >
                  {Array.from("HELLO.").map((char, i) => (
                    <motion.span
                      key={i}
                      variants={{
                        hidden: { opacity: 0, y: 20, rotateX: -30 },
                        visible: { opacity: 1, y: 0, rotateX: 0 }
                      }}
                      transition={{ type: "spring", stiffness: 120, damping: 10 }}
                      style={{ display: "inline-block" }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.h2>
                <span className="inline-block bg-[#e02424] text-white font-mono text-[10px] font-black uppercase tracking-[0.3em] px-3 py-1 shadow-[3px_3px_0_0_#1a1a1a] transform -rotate-1">
                  [ ESTABLISHING_HANDSHAKE ]
                </span>
              </div>

              <div className="space-y-6">
                {[
                  { icon: Mail, label: "ENCRYPTED_MAIL", value: resumeData.profile.contact.email, themeColor: "#e02424" },
                  { icon: Linkedin, label: "NETWORK_ID", value: "naman-gautam-691158299", themeColor: "#1b9fe5" },
                  { icon: Github, label: "SOURCE_CONTROL", value: "naman-fr", themeColor: "#e6a100" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-5 group cursor-pointer">
                    <div 
                      className="p-3.5 border-[3px] border-[#1a1a1a] bg-white group-hover:bg-[#1a1a1a] group-hover:text-white transition-colors duration-300 shadow-[3px_3px_0_0_#1a1a1a]"
                      style={{ color: item.themeColor }}
                    >
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[9px] font-mono font-black text-[#1a1a1a]/55 tracking-[0.25em] mb-1">{item.label}</div>
                      <div className="font-mono text-sm font-black text-[#1a1a1a] group-hover:text-[#e02424] transition-colors">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* System Monitor Widget */}
              <div className="mt-12 p-6 bg-[#1a1a1a] border-[3px] border-[#1a1a1a] font-mono text-[10px] h-48 overflow-hidden relative shadow-inner">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-[#e02424]/40 animate-scan pointer-events-none" />
                <div className="text-white/30 mb-4 flex justify-between">
                  <span>{"// SYSTEM_LOGS"}</span>
                  <span className="text-[#e02424] font-black animate-pulse">ONLINE</span>
                </div>
                <div className="space-y-1.5">
                  {terminalLogs.map((log, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="text-white/60">
                      <span className="text-[#e02424]/40 mr-2">HEX_{i}F:</span> {log}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form Side */}
            <form onSubmit={handleSubmit} className="p-6 sm:p-10 lg:p-12 space-y-6 bg-[#fcfbf9]">
              <div className="space-y-5">
                {[
                  { label: "USER_IDENTIFIER", placeholder: "ENTER_NAME", type: "text", key: "name" },
                  { label: "RETURN_GATEWAY", placeholder: "EMAIL@PROTOCOL.IO", type: "email", key: "email" },
                ].map((field) => (
                  <div key={field.key} className="space-y-2">
                    <label className="block text-[9px] font-mono font-black text-[#1a1a1a]/65 tracking-[0.3em] uppercase">{field.label}</label>
                    <input
                      type={field.type}
                      value={(formData as any)[field.key]}
                      onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                      placeholder={field.placeholder}
                      className="w-full bg-white border-[3px] border-[#1a1a1a] p-4 font-mono font-bold text-sm text-[#1a1a1a] focus:outline-none focus:bg-[#f9db34]/15 focus:shadow-[4px_4px_0_0_#1a1a1a] transition-all placeholder:text-[#1a1a1a]/30 shadow-sm"
                      required
                    />
                  </div>
                ))}
                
                <div className="space-y-2">
                  <label className="block text-[9px] font-mono font-black text-[#1a1a1a]/65 tracking-[0.3em] uppercase">TRANSMISSION_PAYLOAD</label>
                  <textarea
                    className="w-full bg-white border-[3px] border-[#1a1a1a] p-4 font-mono font-bold text-sm text-[#1a1a1a] focus:outline-none focus:bg-[#f9db34]/15 focus:shadow-[4px_4px_0_0_#1a1a1a] transition-all h-36 resize-none placeholder:text-[#1a1a1a]/30 shadow-sm"
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
                className="w-full py-4.5 bg-[#e02424] text-white font-mono text-xs font-black tracking-[0.4em] border-[3px] border-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition-all shadow-[4px_4px_0_0_#1a1a1a] transform -rotate-1 uppercase disabled:opacity-50"
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
                    className="p-3 bg-[#42a859]/10 border-[2px] border-[#42a859] text-[#42a859] text-[9px] font-mono font-black text-center tracking-[0.25em]"
                  >
                    STATUS_200: TRANSMISSION_COMPLETE
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-3 bg-[#e02424]/10 border-[2px] border-[#e02424] text-[#e02424] text-[9px] font-mono font-black text-center tracking-[0.25em]"
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
