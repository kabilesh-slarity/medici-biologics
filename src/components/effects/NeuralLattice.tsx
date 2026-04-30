"use client";

import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  size: number;
  pulse: number;
  pulseSpeed: number;
};

export function NeuralLattice() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    let raf = 0;

    const seed = (count: number) => {
      nodes = [];
      for (let i = 0; i < count; i++) {
        const baseX = Math.random() * width;
        const baseY = Math.random() * height;
        nodes.push({
          x: baseX,
          y: baseY,
          baseX,
          baseY,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          size: Math.random() * 1.2 + 0.6,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.005 + Math.random() * 0.012,
        });
      }
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const density = Math.min(1, (width * height) / (1280 * 720));
      const target = Math.round(46 * density) + 18;
      seed(target);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // ambient gradient wash — fixed position, no cursor tracking
      const grad = ctx.createRadialGradient(
        width * 0.7, height * 0.45, 0,
        width * 0.7, height * 0.45,
        Math.max(width, height) * 0.55,
      );
      grad.addColorStop(0, "rgba(30, 205, 146, 0.075)");
      grad.addColorStop(0.45, "rgba(30, 205, 146, 0.018)");
      grad.addColorStop(1, "rgba(30, 205, 146, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // update positions
      for (const n of nodes) {
        if (!reduced) {
          n.x += n.vx;
          n.y += n.vy;

          // soft tether to base position so nodes don't drift away
          n.x += (n.baseX - n.x) * 0.0008;
          n.y += (n.baseY - n.y) * 0.0008;

          n.pulse += n.pulseSpeed;
        }

        // wrap
        if (n.x < -10) n.x = width + 10;
        if (n.x > width + 10) n.x = -10;
        if (n.y < -10) n.y = height + 10;
        if (n.y > height + 10) n.y = -10;
      }

      // connections
      const linkRange = 130;
      const linkRange2 = linkRange * linkRange;
      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < linkRange2) {
            const t = 1 - d2 / linkRange2;
            const alpha = t * 0.18;
            ctx.strokeStyle = `rgba(30, 205, 146, ${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // nodes
      for (const n of nodes) {
        const pulse = (Math.sin(n.pulse) + 1) * 0.5;
        const r = n.size + pulse * 0.6;
        const alpha = 0.45 + pulse * 0.4;

        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 3.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(30, 205, 146, ${(alpha * 0.08).toFixed(3)})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(247, 247, 243, ${alpha.toFixed(3)})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);

    if (reduced) {
      draw();
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
    </div>
  );
}
