"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      setProgress(p);
      frame = 0;
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        zIndex: 60,
        pointerEvents: "none",
        background: "rgba(247, 247, 243, 0.04)",
      }}
    >
      <div
        style={{
          height: "100%",
          width: "100%",
          background: "linear-gradient(90deg, transparent 0%, #1ECD92 18%, #2BE5A6 100%)",
          transform: `scaleX(${progress})`,
          transformOrigin: "left center",
          transition: "transform 80ms linear",
          boxShadow: progress > 0.01 ? "0 0 12px rgba(30, 205, 146, 0.45)" : "none",
        }}
      />
    </div>
  );
}
