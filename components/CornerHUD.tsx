"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CornerHUD() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toTimeString().split(" ")[0]);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[40] hidden lg:block font-mono text-[8px] text-[#dfc7b3]/45 tracking-widest select-none">
      {/* Top-Left HUD */}
      <div className="absolute top-8 left-8 flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="font-bold text-primary/80">SYS_STATUS: ACTIVE [OK]</span>
        </div>
        <div>STABLE_CORE_v2.026</div>
        <div>NET_SIGNAL: ENCRYPTED</div>
      </div>

      {/* Top-Right HUD */}
      <div className="absolute top-8 right-8 flex flex-col items-end gap-1.5">
        <div className="text-right">LOC: IIIT_VADODARA</div>
        <div>LAT: 23.0225° N</div>
        <div>LON: 72.5714° E</div>
      </div>

      {/* Bottom-Left HUD */}
      <div className="absolute bottom-8 left-8 flex flex-col gap-1.5">
        <div>FRAME_TELEMETRY: 60FPS</div>
        <div className="flex items-center gap-1.5">
          <span>RENDER_ENGINE:</span>
          <span className="text-[#e76f51]">R3F_WEBGL</span>
        </div>
        <div>LOCAL_TIME: {time}</div>
      </div>

      {/* Bottom-Right HUD */}
      <div className="absolute bottom-8 right-8 flex flex-col items-end gap-1.5">
        <div className="flex items-center gap-1">
          <span className="w-1 h-1 bg-primary rounded-full animate-pulse" />
          <span>SECURE_GATEWAY: 100%</span>
        </div>
        <div>SECTOR: 0x88F</div>
        <div>SYS_TELEMETRY: [READY]</div>
      </div>

      {/* Edge Crosshair Decoration ticks */}
      <div className="absolute top-1/2 left-4 -translate-y-1/2 w-[1px] h-6 bg-white/5" />
      <div className="absolute top-1/2 right-4 -translate-y-1/2 w-[1px] h-6 bg-white/5" />
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-6 h-[1px] bg-white/5" />
    </div>
  );
}
