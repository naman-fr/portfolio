"use client";

import { useEffect, useRef } from "react";
import { useDisplayMode } from "../contexts/DisplayModeContext";

export default function NeuralBackground() {
  const { isRecruiterMode } = useDisplayMode();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const nodes: Array<{ x: number; y: number; vx: number; vy: number }> = [];
    const nodeCount = 100;

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "#00ff88";
        ctx.fill();
      });

      nodes.forEach((node, i) => {
        nodes.slice(i + 1).forEach((other) => {
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(0, 255, 136, ${1 - distance / 150})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        });
      });
    };

    const animate = () => {
      draw();
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [isRecruiterMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-50"
      style={{ background: "transparent" }}
    />
  );
}
