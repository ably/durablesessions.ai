"use client";

import { useEffect, useRef } from "react";

/* ── Scan line overlay ── */
export function ScanLines() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[2] opacity-[0.03]"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
        backgroundSize: "100% 4px",
      }}
    />
  );
}

/* ── Glitch canvas — RGB bars, noise, flash ── */
export function GlitchCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const scrollRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onScroll = () => {
      scrollRef.current =
        window.scrollY / (document.body.scrollHeight - window.innerHeight);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    let lastGlitchTime = 0;
    let glitchActive = false;
    let glitchIntensity = 0;

    const draw = (now: number) => {
      const w = canvas.width;
      const h = canvas.height;
      const scroll = scrollRef.current;

      ctx.clearRect(0, 0, w, h);

      // Glitch zones: higher in the scroll-beat sections (roughly 5-25%)
      const inDropZone = scroll > 0.04 && scroll < 0.2;
      const targetIntensity = inDropZone ? 0.6 : 0.03;
      glitchIntensity += (targetIntensity - glitchIntensity) * 0.05;

      if (
        now - lastGlitchTime >
        100 + (Math.random() * 2000) / (glitchIntensity + 0.1)
      ) {
        glitchActive = true;
        lastGlitchTime = now;
        setTimeout(() => {
          glitchActive = false;
        }, 50 + Math.random() * 150);
      }

      if (glitchActive && glitchIntensity > 0.1) {
        const numBars = Math.floor(3 + glitchIntensity * 15);
        for (let i = 0; i < numBars; i++) {
          const barY = Math.random() * h;
          const barH = 1 + Math.random() * (4 + glitchIntensity * 20);
          const displacement =
            (Math.random() - 0.5) * glitchIntensity * 60;

          ctx.fillStyle = `rgba(255, 0, 0, ${0.03 * glitchIntensity})`;
          ctx.fillRect(displacement - 3, barY, w, barH);

          ctx.fillStyle = `rgba(0, 255, 255, ${0.03 * glitchIntensity})`;
          ctx.fillRect(displacement + 3, barY, w, barH);
        }

        if (Math.random() < glitchIntensity * 0.3) {
          ctx.fillStyle = `rgba(6, 182, 212, ${0.02 * glitchIntensity})`;
          ctx.fillRect(0, 0, w, h);
        }
      }

      if (glitchIntensity > 0.02) {
        const imageData = ctx.getImageData(0, 0, w, h);
        const data = imageData.data;
        const noiseLevel = glitchIntensity * 8;
        for (let i = 0; i < data.length; i += 16) {
          if (Math.random() < 0.01 * glitchIntensity) {
            data[i] = Math.random() * noiseLevel;
            data[i + 1] = Math.random() * noiseLevel;
            data[i + 2] = Math.random() * noiseLevel;
            data[i + 3] = Math.random() * 30 * glitchIntensity;
          }
        }
        ctx.putImageData(imageData, 0, 0);
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw(performance.now());

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[1]"
    />
  );
}

/* ── RGB-split text ── */
export function GlitchText({
  children,
  className = "",
  intensity = 1,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <span
        className="absolute inset-0 z-0 opacity-70"
        style={{
          color: "rgba(255, 0, 80, 0.8)",
          clipPath: "inset(10% 0 30% 0)",
          transform: `translate(${2 * intensity}px, ${1 * intensity}px)`,
        }}
        aria-hidden
      >
        {children}
      </span>
      <span
        className="absolute inset-0 z-0 opacity-70"
        style={{
          color: "rgba(0, 255, 200, 0.8)",
          clipPath: "inset(40% 0 10% 0)",
          transform: `translate(${-2 * intensity}px, ${-1 * intensity}px)`,
        }}
        aria-hidden
      >
        {children}
      </span>
    </span>
  );
}

/* ── Session state indicator (always visible, always stable) ── */
export function SessionIndicator() {
  return (
    <div className="session-indicator">
      <div className="session-bar" />
      <span className="session-label">session:active</span>
    </div>
  );
}
