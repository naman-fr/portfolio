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
      className="min-h-screen py-20 px-4 relative flex items-center justify-center"
    >
      <div className="max-w-4xl w-full">
        <motion.div
          className="glass rounded-lg overflow-hidden border-terminal/30 border-2"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-terminal/10 p-4 border-b border-terminal/30 flex items-center justify-between">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <div className="font-mono text-xs text-terminal">CONTACT_PROTOCOL_v4.2</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 border-r border-terminal/30 bg-black/40">
              <h2 className="text-4xl font-mono font-bold text-terminal mb-6 uppercase tracking-tighter">
                Secure Channel
              </h2>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Mail className="w-5 h-5 text-terminal" />
                  <div>
                    <div className="text-[10px] font-mono text-terminal/60">ENDPOINT</div>
                    <div className="font-mono text-sm">{resumeData.profile.contact.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Linkedin className="w-5 h-5 text-terminal" />
                  <div>
                    <div className="text-[10px] font-mono text-terminal/60">NETWORK</div>
                    <div className="font-mono text-sm">namangautam-691158299</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Github className="w-5 h-5 text-terminal" />
                  <div>
                    <div className="text-[10px] font-mono text-terminal/60">REPO</div>
                    <div className="font-mono text-sm">naman-fr</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="w-5 h-5 text-terminal" />
                  <div>
                    <div className="text-[10px] font-mono text-terminal/60">GEO</div>
                    <div className="font-mono text-sm">{resumeData.profile.contact.location}</div>
                  </div>
                </div>
              </div>

              {/* Terminal Logs Widget */}
              <div className="mt-12 p-4 bg-black/60 rounded border border-terminal/20 font-mono text-[10px] h-36 overflow-hidden">
                <div className="text-terminal/40 mb-2">{"// SYSTEM LOGS"}</div>
                {terminalLogs.map((log, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                    {log}
                  </motion.div>
                ))}
                {status === "sending" && (
                  <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }}>
                    &gt; _
                  </motion.div>
                )}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-4">
              <div className="space-y-2">
                <label className="block text-xs font-mono text-terminal/60">IDENTIFIER (NAME)</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-black/40 border border-terminal/30 rounded p-3 font-mono text-terminal focus:outline-none focus:border-terminal transition-colors"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-mono text-terminal/60">GATEWAY (EMAIL)</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-black/40 border border-terminal/30 rounded p-3 font-mono text-terminal focus:outline-none focus:border-terminal transition-colors"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-mono text-terminal/60">PAYLOAD (MESSAGE)</label>
                <textarea
                  className="w-full bg-black/40 border border-terminal/30 rounded p-3 font-mono text-terminal focus:outline-none focus:border-terminal transition-colors h-32 resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-4 bg-terminal text-black font-mono font-bold uppercase tracking-widest hover:bg-terminal/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {status === "sending" ? "TRANSMITTING..." : (
                  <>
                    <Send className="w-4 h-4" />
                    EXECUTE_SEND
                  </>
                )}
              </motion.button>

              {status === "success" && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-terminal text-xs font-mono text-center">
                  MESSAGE TRANSMITTED SUCCESSFULLY.
                </motion.p>
              )}
              {status === "error" && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-xs font-mono text-center">
                  TRANSMISSION FAILED. CHECK LOGS.
                </motion.p>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
