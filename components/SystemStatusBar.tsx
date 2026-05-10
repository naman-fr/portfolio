"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Wifi, Shield, Activity, HardDrive } from "lucide-react";

const logs = [
  "INITIALIZING_CORE_SYSTEM...",
  "ATTACHING_AGENT_SENSORS...",
  "SYNCING_LOCAL_VECTOR_CACHE...",
  "RESOLVING_DEPENDENCY_GRAPH...",
  "ESTABLISHING_TLS_HANDSHAKE...",
  "FETCHING_TELEMETRY_STREAM...",
  "DEPLOYING_HYPERVISOR_HOOKS...",
  "CALIBRATING_LQR_CONTROLLER...",
  "STARTING_DASHBOARD_ENGINE...",
  "SYSTEM_OPTIMAL_STABILITY_0.999",
];

export default function SystemStatusBar() {
  const [currentLog, setCurrentLog] = useState(0);
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    const logInterval = setInterval(() => {
      setCurrentLog((prev) => (prev + 1) % logs.length);
    }, 4000);

    const uptimeInterval = setInterval(() => {
      setUptime((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(logInterval);
      clearInterval(uptimeInterval);
    };
  }, []);

  const formatUptime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed bottom-0 left-0 w-full h-8 bg-obsidian/80 backdrop-blur-md border-t border-white/10 z-[100] px-4 hidden md:flex items-center justify-between font-mono text-[10px] tracking-widest text-gray-400">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-terminal">
          <Activity className="w-3 h-3" />
          <span>STATUS: ONLINE</span>
        </div>
        <div className="flex items-center gap-2">
          <Cpu className="w-3 h-3 text-neural" />
          <span>CPU_LOAD: 12.4%</span>
        </div>
        <div className="flex items-center gap-2">
          <HardDrive className="w-3 h-3 text-amber" />
          <span>MEM_ALLOC: 2.1GB</span>
        </div>
      </div>

      <div className="flex-1 flex justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={currentLog}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-white/60"
          >
            {`>> ${logs[currentLog]}`}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Shield className="w-3 h-3 text-neural" />
          <span>SECURITY: AES-256</span>
        </div>
        <div className="flex items-center gap-2">
          <Wifi className="w-3 h-3 text-terminal" />
          <span>UPTIME: {formatUptime(uptime)}</span>
        </div>
      </div>
    </div>
  );
}
