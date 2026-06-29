"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function PikachuCompanion() {
  const [action, setAction] = useState<"idle" | "jump" | "walk" | "flee" | "return">("idle");
  const [direction, setDirection] = useState(1); // 1 = right, -1 = left
  const [reappearKey, setReappearKey] = useState(0);

  useEffect(() => {
    if (action === "flee") {
      // Return after 6 seconds
      const timer = setTimeout(() => {
        setAction("return");
      }, 6000);
      return () => clearTimeout(timer);
    }

    if (action === "return") {
      // Re-enter idle state after return animation completes (2 seconds)
      const timer = setTimeout(() => {
        setAction("idle");
        setReappearKey(prev => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    }

    // Cycle through random idle behaviors every 5 seconds
    const interval = setInterval(() => {
      const rand = Math.random();
      if (rand < 0.4) {
        setAction("idle");
      } else if (rand < 0.7) {
        setAction("jump");
      } else {
        setAction("walk");
        // Randomize facing direction
        setDirection(Math.random() > 0.5 ? 1 : -1);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [action]);

  const handlePress = () => {
    if (action !== "flee" && action !== "return") {
      setAction("flee");
    }
  };

  const variants = {
    idle: { 
      y: 0, 
      x: 0, 
      opacity: 1,
      scaleX: direction,
      transition: { duration: 0.5 }
    },
    jump: {
      y: [0, -16, 0, -16, 0],
      x: 0,
      opacity: 1,
      scaleX: direction,
      transition: { duration: 0.8, ease: "easeInOut" }
    },
    walk: {
      x: [0, 15 * direction, 0, -15 * direction, 0],
      y: 0,
      opacity: 1,
      scaleX: [direction, direction, -direction, -direction, direction],
      transition: { duration: 4, ease: "easeInOut" }
    },
    flee: {
      x: 400, // Move completely off-screen to the right
      y: 0,
      opacity: 1,
      scaleX: 1, // Face right when running away
      transition: { duration: 0.8, ease: "power2.in" }
    },
    return: {
      x: [400, 0], // Walk back on screen
      y: 0,
      opacity: 1,
      scaleX: -1, // Face left when walking back
      transition: { duration: 2, ease: "linear" }
    }
  };

  return (
    <motion.div
      key={reappearKey}
      onClick={handlePress}
      onTouchStart={handlePress}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      className="fixed bottom-20 right-6 sm:bottom-12 sm:right-12 z-[9999] cursor-pointer select-none pointer-events-auto"
      title="Click to scare Pikachu!"
    >
      <motion.div
        animate={action}
        variants={variants}
        className="relative"
      >
        {action !== "flee" && action !== "return" && (
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-white text-[7px] font-mono font-bold uppercase py-0.5 px-1.5 rounded opacity-0 hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-sm border border-white/20">
            BOO!
          </div>
        )}

        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/25.gif"
          alt="Pikachu Companion"
          className="w-10 h-10 object-contain drop-shadow-[2px_2px_0_rgba(0,0,0,0.15)]"
        />
      </motion.div>
    </motion.div>
  );
}
