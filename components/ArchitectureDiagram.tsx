"use client";

import { motion } from "framer-motion";

interface ArchitectureDiagramProps {
  type: "vbs" | "sawl" | "chigma" | "amfd";
}

export default function ArchitectureDiagram({ type }: ArchitectureDiagramProps) {
  if (type === "vbs") {
    return (
      <div className="space-y-4 p-6 bg-obsidian/50 rounded-lg border border-terminal/20 mt-4">
        <h4 className="text-lg font-mono font-bold text-terminal mb-4">VBS Architecture: Ring -1 to Ring 0</h4>
        <div className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-purple-900/20 border border-purple-500/50 rounded-lg">
            <div className="flex items-center gap-2 mb-2"><div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" /><span className="font-mono text-purple-300 font-bold">Ring -1: Hypervisor</span></div>
            <ul className="text-sm text-gray-300 space-y-1 ml-5 font-mono"><li>• MSR/Register Monitoring</li><li>• SMEP/SMAP Validation</li></ul>
          </motion.div>
          <div className="flex justify-center text-terminal">↓</div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-4 bg-terminal/10 border border-terminal/50 rounded-lg">
            <div className="flex items-center gap-2 mb-2"><div className="w-3 h-3 bg-terminal rounded-full animate-pulse" /><span className="font-mono text-terminal font-bold">Ring 0: Linux Kernel</span></div>
            <ul className="text-sm text-gray-300 space-y-1 ml-5 font-mono"><li>• Kernel Hooks</li><li>• Instruction Trapping</li></ul>
          </motion.div>
        </div>
      </div>
    );
  }

  if (type === "amfd") {
    return (
      <div className="space-y-4 p-6 bg-obsidian/50 rounded-lg border border-terminal/20 mt-4">
        <h4 className="text-lg font-mono font-bold text-terminal mb-4">AMFD: Multi-Agent Workflow</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="p-4 bg-neural/10 border border-neural/50 rounded-lg">
            <div className="font-mono text-neural font-bold mb-2">Supervisor Agent</div>
            <p className="text-xs text-gray-400 font-mono">Orchestrates task routing and state management</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="p-4 bg-amber/10 border border-amber/50 rounded-lg">
            <div className="font-mono text-amber font-bold mb-2">Specialist Agents</div>
            <p className="text-xs text-gray-400 font-mono">RAG, Safety, Detector, Analyzer</p>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="p-4 bg-terminal/10 border border-terminal/50 rounded-lg text-center">
          <div className="font-mono text-terminal font-bold">Safety-Gated Maintenance Plan</div>
        </motion.div>
      </div>
    );
  }

  if (type === "chigma") {
    return (
      <div className="space-y-4 p-6 bg-obsidian/50 rounded-lg border border-neural/20 mt-4">
        <h4 className="text-lg font-mono font-bold text-neural mb-4">Chigma: Platform Stack</h4>
        <div className="grid grid-cols-3 gap-2">
          <div className="p-2 bg-neural/10 border border-neural/50 rounded text-center font-mono text-[10px] text-neural">Perception (YOLO11)</div>
          <div className="p-2 bg-neural/10 border border-neural/50 rounded text-center font-mono text-[10px] text-neural">SLAM (ORB-SLAM3)</div>
          <div className="p-2 bg-neural/10 border border-neural/50 rounded text-center font-mono text-[10px] text-neural">RL Control (PPO)</div>
        </div>
        <div className="flex justify-center text-neural">↓</div>
        <div className="p-3 bg-terminal/10 border border-terminal/50 rounded text-center font-mono text-xs text-terminal">Autonomous Industrial Operation</div>
      </div>
    );
  }

  // SAWL-Net Architecture
  return (
    <div className="space-y-4 p-6 bg-obsidian/50 rounded-lg border border-neural/20 mt-4">
      <h4 className="text-lg font-mono font-bold text-neural mb-4">SAWL-Net: CNN Architecture</h4>
      <div className="grid grid-cols-3 gap-2">
        <div className="p-2 bg-neural/10 border border-neural/50 rounded text-center font-mono text-[10px] text-neural">MobileNet Base</div>
        <div className="p-2 bg-neural/20 border border-neural/50 rounded text-center font-mono text-[10px] text-neural">SAWL Module</div>
        <div className="p-2 bg-terminal/10 border border-terminal/50 rounded text-center font-mono text-[10px] text-terminal">Result</div>
      </div>
    </div>
  );
}

