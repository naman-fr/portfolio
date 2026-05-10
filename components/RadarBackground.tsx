"use client";

import { useEffect, useRef } from "react";

export default function RadarBackground() {
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

    let angle = 0;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const draw = () => {
      ctx.fillStyle = "#0A0A0A";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw concentric circles
      for (let i = 1; i <= 5; i++) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, i * 100, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 255, 65, ${0.2 / i})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw sweeping line
      angle += 0.02;
      const sweepLength = Math.min(canvas.width, canvas.height) * 0.8;
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + Math.cos(angle) * sweepLength,
        centerY + Math.sin(angle) * sweepLength
      );
      ctx.strokeStyle = "rgba(0, 255, 65, 0.5)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw sweep gradient
      const gradient = ctx.createLinearGradient(
        centerX,
        centerY,
        centerX + Math.cos(angle) * sweepLength,
        centerY + Math.sin(angle) * sweepLength
      );
      gradient.addColorStop(0, "rgba(0, 255, 65, 0.3)");
      gradient.addColorStop(1, "rgba(0, 255, 65, 0)");
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + Math.cos(angle) * sweepLength,
        centerY + Math.sin(angle) * sweepLength
      );
      ctx.stroke();
    };

    const animate = () => {
      draw();
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
    />
  );
}
