"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ────────────────────────────────────────────
   Prototype C — "Signal Persistence"

   Geometric fragmentation with smooth reassembly.
   Refined engineering aesthetic. Subtle noise grain.
   Cleaner, more modern — elegant engineering.
   ──────────────────────────────────────────── */

function NoiseOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    canvas.width = 256;
    canvas.height = 256;

    const imageData = ctx.createImageData(256, 256);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const v = Math.random() * 255;
      data[i] = v;
      data[i + 1] = v;
      data[i + 2] = v;
      data[i + 3] = 12;
    }
    ctx.putImageData(imageData, 0, 0);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[2] opacity-40"
      style={{ imageRendering: "pixelated", mixBlendMode: "overlay" }}
    />
  );
}

function GridBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Gradient mesh */}
      <div
        className="absolute -top-1/2 -left-1/4 w-[800px] h-[800px] rounded-full opacity-[0.07]"
        style={{
          background: "radial-gradient(circle, #6366f1 0%, transparent 70%)",
          filter: "blur(100px)",
          animation: "float-a 20s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] rounded-full opacity-[0.05]"
        style={{
          background: "radial-gradient(circle, #10b981 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "float-b 25s ease-in-out infinite",
        }}
      />
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <style jsx>{`
        @keyframes float-a {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(60px, 40px); }
        }
        @keyframes float-b {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-40px, -60px); }
        }
      `}</style>
    </div>
  );
}

function FragmentGrid({
  className = "",
  color = "emerald",
  rows = 6,
  cols = 8,
}: {
  className?: string;
  color?: string;
  rows?: number;
  cols?: number;
}) {
  const colorMap: Record<string, string> = {
    emerald: "16, 185, 129",
    indigo: "99, 102, 241",
    cyan: "6, 182, 212",
  };
  const rgb = colorMap[color] || colorMap.emerald;

  return (
    <div className={`grid gap-1 ${className}`} style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
      {Array.from({ length: rows * cols }).map((_, i) => {
        const row = Math.floor(i / cols);
        const col = i % cols;
        const centerDist = Math.sqrt(
          ((col - cols / 2) / cols) ** 2 + ((row - rows / 2) / rows) ** 2
        );
        return (
          <div
            key={i}
            className="fragment aspect-square rounded-[2px]"
            style={{
              background: `rgba(${rgb}, ${0.05 + (1 - centerDist) * 0.25})`,
              transitionDelay: `${centerDist * 200}ms`,
            }}
          />
        );
      })}
    </div>
  );
}

function SessionIndicator() {
  return (
    <div className="session-indicator">
      <div className="session-bar" />
      <span className="session-label">session:active</span>
    </div>
  );
}

export default function PrototypeC() {
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  const section4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero — clean fade in with slight parallax
      gsap.from(".signal-hero-el", {
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.2,
      });

      // Hero progress bar fills
      gsap.from(".hero-progress", {
        scaleX: 0,
        duration: 2,
        ease: "power2.out",
        delay: 1,
      });

      // Section 1: Connection drops — fragments scatter outward from center
      if (section1Ref.current) {
        gsap.from(".s1c-enter", {
          scrollTrigger: {
            trigger: section1Ref.current,
            start: "top 80%",
            end: "top 40%",
            scrub: 1,
          },
          opacity: 0,
          y: 40,
          stagger: 0.05,
        });

        // Fragments explode
        gsap.to("#s1c-grid .fragment", {
          scrollTrigger: {
            trigger: section1Ref.current,
            start: "30% center",
            end: "70% center",
            scrub: 1,
          },
          x: () => gsap.utils.random(-150, 150),
          y: () => gsap.utils.random(-100, 100),
          rotation: () => gsap.utils.random(-180, 180),
          opacity: 0,
          scale: 0.3,
          stagger: {
            each: 0.01,
            from: "center",
          },
        });
      }

      // Section 2: Reconnection — fragments reassemble from chaos
      if (section2Ref.current) {
        gsap.from("#s2c-grid .fragment", {
          scrollTrigger: {
            trigger: section2Ref.current,
            start: "top 70%",
            end: "center center",
            scrub: 1,
          },
          x: () => gsap.utils.random(-200, 200),
          y: () => gsap.utils.random(-150, 150),
          rotation: () => gsap.utils.random(-360, 360),
          opacity: 0,
          scale: 0,
          stagger: {
            each: 0.01,
            from: "edges",
          },
          ease: "power2.inOut",
        });

        gsap.from(".s2c-text", {
          scrollTrigger: {
            trigger: section2Ref.current,
            start: "30% 60%",
            end: "50% center",
            scrub: 1,
          },
          opacity: 0,
          y: 30,
          stagger: 0.1,
        });
      }

      // Section 3: Device change — elegant slide
      if (section3Ref.current) {
        const tl3 = gsap.timeline({
          scrollTrigger: {
            trigger: section3Ref.current,
            start: "top 60%",
            end: "bottom 40%",
            scrub: 1,
          },
        });

        tl3.from(".s3c-card-1", { x: -120, opacity: 0, duration: 0.5, ease: "power2.out" });
        tl3.from(".s3c-card-2", { x: 120, opacity: 0, duration: 0.5, ease: "power2.out" }, "-=0.3");
        tl3.from(".s3c-connector", { scaleX: 0, duration: 0.3, ease: "power2.out" });
        tl3.from(".s3c-badge", { scale: 0, opacity: 0, duration: 0.3, ease: "back.out(2)" });
        tl3.from(".s3c-text", { opacity: 0, y: 20, stagger: 0.1, duration: 0.3 });
      }

      // Section 4: Crash & Recovery — dramatic blackout/restore
      if (section4Ref.current) {
        const tl4 = gsap.timeline({
          scrollTrigger: {
            trigger: section4Ref.current,
            start: "top 60%",
            end: "bottom 40%",
            scrub: 1,
          },
        });

        tl4.from(".s4c-pre", { opacity: 0, y: 20, duration: 0.2 });

        // The crash: fragments scatter
        tl4.to("#s4c-grid .fragment", {
          x: () => gsap.utils.random(-100, 100),
          y: () => gsap.utils.random(-80, 80),
          opacity: 0,
          scale: 0,
          stagger: { each: 0.005, from: "random" },
          duration: 0.3,
        });

        // The recovery: smooth rebuild
        tl4.to("#s4c-grid .fragment", {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          stagger: { each: 0.005, from: "center" },
          duration: 0.5,
          ease: "power2.out",
        });

        tl4.from(".s4c-check", {
          scale: 0,
          opacity: 0,
          stagger: 0.05,
          duration: 0.2,
          ease: "back.out(3)",
        });

        tl4.from(".s4c-text", { opacity: 0, y: 20, stagger: 0.1, duration: 0.3 });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <GridBackground />
      <NoiseOverlay />
      <SessionIndicator />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 bg-[#07070e]/80 backdrop-blur-sm border-b border-white/5">
        <Link href="/" className="font-mono text-xs text-gray-500 hover:text-gray-300 transition-colors">
          &larr; prototypes
        </Link>
        <span className="font-mono text-xs text-emerald-400/60 tracking-widest uppercase">
          C / Signal Persistence
        </span>
      </nav>

      <main className="relative z-10">
        {/* Hero */}
        <section className="min-h-screen flex items-center justify-center px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="signal-hero-el inline-flex items-center gap-3 mb-8 px-5 py-2.5 rounded-full bg-emerald-500/5 border border-emerald-500/15">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="font-mono text-xs text-emerald-400/80 tracking-wide">
                Durable Sessions
              </span>
            </div>

            <h1 className="signal-hero-el text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-8">
              <span className="block">State that</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400">
                persists
              </span>
            </h1>

            <p className="signal-hero-el max-w-xl mx-auto text-lg text-gray-400 leading-relaxed mb-12">
              Connections are ephemeral. Sessions shouldn&apos;t be. Durable sessions
              maintain state across disconnects, device changes, and crashes.
            </p>

            {/* Status bar */}
            <div className="signal-hero-el max-w-sm mx-auto">
              <div className="flex justify-between text-xs font-mono text-gray-500 mb-2">
                <span>session integrity</span>
                <span className="text-emerald-400">100%</span>
              </div>
              <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="hero-progress h-full rounded-full origin-left"
                  style={{
                    background: "linear-gradient(to right, #10b981, #06b6d4, #6366f1)",
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: Connection Drops — fragments scatter */}
        <section ref={section1Ref} className="min-h-screen flex items-center justify-center px-8 py-32">
          <div className="max-w-3xl mx-auto text-center">
            <div className="s1c-enter inline-flex items-center gap-3 px-5 py-3 rounded-lg bg-amber-500/10 border border-amber-500/15 mb-12">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="font-mono text-sm text-amber-400">connection.state: disconnected</span>
            </div>

            <h2 className="s1c-enter text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              The connection breaks
            </h2>
            <p className="s1c-enter text-gray-400 text-lg max-w-lg mx-auto mb-16">
              Transport fails. The grid fragments. But watch the session
              indicator on the right — it never falters.
            </p>

            <FragmentGrid
              className="max-w-md mx-auto"
              color="emerald"
              rows={6}
              cols={8}
            />
            <div id="s1c-grid" className="max-w-md mx-auto" style={{ display: "none" }} />
          </div>
        </section>

        {/* Section 2: Reconnection — fragments reassemble */}
        <section ref={section2Ref} className="min-h-screen flex items-center justify-center px-8 py-32">
          <div className="max-w-3xl mx-auto text-center">
            <div id="s2c-grid">
              <FragmentGrid
                className="max-w-md mx-auto mb-16"
                color="cyan"
                rows={6}
                cols={8}
              />
            </div>

            <div className="s2c-text inline-flex items-center gap-3 px-5 py-3 rounded-lg bg-emerald-500/10 border border-emerald-500/15 mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="font-mono text-sm text-emerald-400">connection.state: connected</span>
            </div>

            <h2 className="s2c-text text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Seamless reconnection
            </h2>
            <p className="s2c-text text-gray-400 text-lg max-w-lg mx-auto">
              Every fragment returns to its place. Every event replayed.
              The state is whole again — exactly as it was.
            </p>
          </div>
        </section>

        {/* Section 3: Device Handoff */}
        <section ref={section3Ref} className="min-h-screen flex items-center justify-center px-8 py-32">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-6 mb-16">
              {/* Card 1 */}
              <div className="s3c-card-1 w-44 rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-10 rounded border border-cyan-500/30 bg-cyan-500/5" />
                  <div className="font-mono text-xs text-cyan-400">mobile</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">events</span>
                    <span className="font-mono text-cyan-400">1,204</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">cursor</span>
                    <span className="font-mono text-cyan-400">evt_k9x</span>
                  </div>
                </div>
              </div>

              {/* Connector */}
              <div className="s3c-connector flex flex-col items-center gap-2 origin-left">
                <div className="w-16 h-px bg-gradient-to-r from-cyan-500/50 to-indigo-500/50" />
                <div className="s3c-badge px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
                  <span className="font-mono text-[10px] text-emerald-400">&#x2713; synced</span>
                </div>
                <div className="w-16 h-px bg-gradient-to-r from-indigo-500/50 to-cyan-500/50" />
              </div>

              {/* Card 2 */}
              <div className="s3c-card-2 w-44 rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-12 h-8 rounded border border-indigo-500/30 bg-indigo-500/5" />
                  <div className="font-mono text-xs text-indigo-400">desktop</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">events</span>
                    <span className="font-mono text-indigo-400">1,204</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">cursor</span>
                    <span className="font-mono text-indigo-400">evt_k9x</span>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="s3c-text text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Device-agnostic state
            </h2>
            <p className="s3c-text text-gray-400 text-lg max-w-lg mx-auto">
              The session doesn&apos;t belong to a device. It belongs to the
              workflow. Resume anywhere, with full fidelity.
            </p>
          </div>
        </section>

        {/* Section 4: Crash & Recovery */}
        <section ref={section4Ref} className="min-h-screen flex items-center justify-center px-8 py-32">
          <div className="max-w-3xl mx-auto text-center">
            <p className="s4c-pre font-mono text-sm text-gray-500 mb-8">
              process exited with code 137 (SIGKILL)
            </p>

            {/* Fragment grid that shatters and rebuilds */}
            <div id="s4c-grid" className="mb-12">
              <FragmentGrid
                className="max-w-sm mx-auto"
                color="indigo"
                rows={5}
                cols={6}
              />
            </div>

            {/* Recovery checks */}
            <div className="flex items-center justify-center gap-6 mb-12 font-mono text-sm">
              <span className="s4c-check flex items-center gap-2">
                <span className="text-emerald-400">&#x2713;</span>
                <span className="text-gray-400">state recovered</span>
              </span>
              <span className="s4c-check flex items-center gap-2">
                <span className="text-emerald-400">&#x2713;</span>
                <span className="text-gray-400">events replayed</span>
              </span>
              <span className="s4c-check flex items-center gap-2">
                <span className="text-emerald-400">&#x2713;</span>
                <span className="text-gray-400">cursor restored</span>
              </span>
            </div>

            <h2 className="s4c-text text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-400">
                Nothing was lost
              </span>
            </h2>
            <p className="s4c-text text-gray-400 text-lg max-w-lg mx-auto">
              The agent crashed. The session didn&apos;t. Every event, every state
              mutation, every cursor position — restored exactly.
            </p>
          </div>
        </section>

        {/* Footer */}
        <section className="h-[40vh] flex items-center justify-center">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 font-mono text-sm text-gray-600 mb-2">
              <span className="text-emerald-400">&#x25CF;</span>
              <span>session integrity: 100%</span>
            </div>
            <p className="text-xs text-gray-700">
              No events lost. No state corrupted. No session expired.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
