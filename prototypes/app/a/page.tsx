"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ────────────────────────────────────────────
   Prototype A — "Dither Matrix"

   Real-time ordered dithering via canvas.
   Elements dissolve into dithered pixels on scroll,
   then reconverge. Terminal / infrastructure feel.
   ──────────────────────────────────────────── */

// Bayer 4x4 dither matrix
const BAYER_4X4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

function DitherCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const scrollRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const pixelSize = 4;

    const resize = () => {
      canvas.width = Math.ceil(window.innerWidth / pixelSize);
      canvas.height = Math.ceil(window.innerHeight / pixelSize);
    };
    resize();
    window.addEventListener("resize", resize);

    const onScroll = () => {
      scrollRef.current = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const t = performance.now() * 0.001;
      const scroll = scrollRef.current;

      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const idx = (y * w + x) * 4;

          // Create flowing noise pattern
          const nx = x / w;
          const ny = y / h;
          const dist = Math.sqrt((nx - 0.5) ** 2 + (ny - 0.5) ** 2);

          // Base intensity — radial gradient with time-based flow
          const wave = Math.sin(nx * 6 + t * 0.5) * Math.cos(ny * 4 + t * 0.3) * 0.5 + 0.5;
          const radial = 1 - dist * 1.8;
          let intensity = (wave * 0.3 + radial * 0.7) * 255;

          // Apply scroll-driven disruption
          const disruption = Math.sin(scroll * Math.PI * 2) * scroll;
          if (disruption > 0.1) {
            const glitchLine = Math.sin(y * 0.5 + t * 10) > (1 - disruption * 2) ? 1 : 0;
            intensity += glitchLine * 120 * disruption;
            // Random block displacement
            if (Math.random() < disruption * 0.3) {
              intensity = Math.random() * 255;
            }
          }

          // Apply Bayer dithering
          const threshold = (BAYER_4X4[y % 4][x % 4] / 16) * 255;
          const dithered = intensity > threshold ? 1 : 0;

          // Color: indigo-tinted
          data[idx] = dithered * 30;     // R
          data[idx + 1] = dithered * 25; // G
          data[idx + 2] = dithered * 60; // B
          data[idx + 3] = dithered * 40; // A — subtle
        }
      }

      ctx.putImageData(imageData, 0, 0);
      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ imageRendering: "pixelated" }}
    />
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

export default function PrototypeA() {
  const heroRef = useRef<HTMLDivElement>(null);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  const section4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text stagger entrance
      gsap.from(".dither-hero-line", {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        delay: 0.3,
      });

      // Section 1: Connection drops — text pixelates out
      if (section1Ref.current) {
        const tl1 = gsap.timeline({
          scrollTrigger: {
            trigger: section1Ref.current,
            start: "top 80%",
            end: "center center",
            scrub: 1,
          },
        });
        tl1.from(".s1-status", {
          opacity: 0,
          scale: 0.8,
          filter: "blur(8px)",
          duration: 1,
        });
        tl1.from(".s1-text", {
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 0.5,
        }, "-=0.5");

        // The disruption animation
        const tl1b = gsap.timeline({
          scrollTrigger: {
            trigger: section1Ref.current,
            start: "center center",
            end: "bottom center",
            scrub: 1,
          },
        });
        tl1b.to(".s1-blocks .block", {
          x: () => gsap.utils.random(-200, 200),
          y: () => gsap.utils.random(-100, 100),
          opacity: 0,
          rotation: () => gsap.utils.random(-45, 45),
          stagger: {
            each: 0.05,
            from: "random",
          },
          duration: 1,
        });
      }

      // Section 2: Reconnection — pieces fly back together
      if (section2Ref.current) {
        const tl2 = gsap.timeline({
          scrollTrigger: {
            trigger: section2Ref.current,
            start: "top 70%",
            end: "center center",
            scrub: 1,
          },
        });
        tl2.from(".s2-blocks .block", {
          x: () => gsap.utils.random(-300, 300),
          y: () => gsap.utils.random(-200, 200),
          opacity: 0,
          rotation: () => gsap.utils.random(-90, 90),
          scale: 0,
          stagger: {
            each: 0.03,
            from: "edges",
          },
          duration: 1.5,
          ease: "power2.inOut",
        });
        tl2.from(".s2-text", {
          opacity: 0,
          y: 30,
          duration: 0.5,
        }, "-=0.5");
      }

      // Section 3: Device change — morph/transform
      if (section3Ref.current) {
        const tl3 = gsap.timeline({
          scrollTrigger: {
            trigger: section3Ref.current,
            start: "top 70%",
            end: "center center",
            scrub: 1,
          },
        });
        tl3.from(".s3-device-1", {
          opacity: 1,
          x: 0,
        });
        tl3.to(".s3-device-1", {
          opacity: 0,
          x: -100,
          scale: 0.8,
          filter: "blur(4px)",
          duration: 0.5,
        });
        tl3.from(".s3-device-2", {
          opacity: 0,
          x: 100,
          scale: 0.8,
          filter: "blur(4px)",
          duration: 0.5,
        }, "-=0.3");
        tl3.from(".s3-state-line", {
          scaleX: 0,
          duration: 0.5,
        }, "-=0.3");
        tl3.from(".s3-text", {
          opacity: 0,
          y: 20,
          duration: 0.3,
        });
      }

      // Section 4: Crash & recovery — dramatic
      if (section4Ref.current) {
        const tl4 = gsap.timeline({
          scrollTrigger: {
            trigger: section4Ref.current,
            start: "top 60%",
            end: "bottom 40%",
            scrub: 1,
          },
        });
        tl4.from(".s4-text-pre", { opacity: 0, y: 30, duration: 0.3 });
        tl4.to(".s4-screen", {
          filter: "brightness(3) contrast(0)",
          duration: 0.1,
        });
        tl4.to(".s4-screen", {
          filter: "brightness(0)",
          duration: 0.2,
        });
        tl4.to(".s4-screen", {
          filter: "brightness(1) contrast(1)",
          duration: 0.8,
          ease: "power2.out",
        });
        tl4.from(".s4-cursor", {
          opacity: 0,
          duration: 0.1,
        });
        tl4.from(".s4-text-post", { opacity: 0, y: 20, duration: 0.3 });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <DitherCanvas />
      <SessionIndicator />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 bg-[#07070e]/80 backdrop-blur-sm border-b border-white/5">
        <Link href="/" className="font-mono text-xs text-gray-500 hover:text-gray-300 transition-colors">
          &larr; prototypes
        </Link>
        <span className="font-mono text-xs text-indigo-400/60 tracking-widest uppercase">
          A / Dither Matrix
        </span>
      </nav>

      <main className="relative z-10">
        {/* Hero */}
        <section ref={heroRef} className="min-h-screen flex items-center justify-center px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-8 px-4 py-2 border border-indigo-500/20 rounded-full">
              <span className="font-mono text-xs text-indigo-400 tracking-widest uppercase">
                &#x2588;&#x2588;&#x2588; Durable Sessions
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-8">
              <span className="dither-hero-line block">Sessions that</span>
              <span className="dither-hero-line block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                survive everything
              </span>
            </h1>

            <p className="dither-hero-line max-w-xl mx-auto text-lg text-gray-400 leading-relaxed mb-12">
              Connections drop. Devices change. Agents crash. The session state
              persists — always.
            </p>

            <div className="dither-hero-line flex items-center justify-center gap-4 font-mono text-sm">
              <span className="text-emerald-400">&#x25CF;</span>
              <span className="text-gray-500">session_id: ds_7f3k9x</span>
              <span className="text-gray-600">|</span>
              <span className="text-gray-500">uptime: &#x221E;</span>
            </div>
          </div>
        </section>

        {/* Section 1: Connection Drops */}
        <section ref={section1Ref} className="min-h-screen flex items-center justify-center px-8 py-32">
          <div className="max-w-3xl mx-auto text-center">
            <div className="s1-status inline-flex items-center gap-3 px-5 py-3 rounded-lg bg-red-500/10 border border-red-500/20 mb-12">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="font-mono text-sm text-red-400">CONNECTION_LOST</span>
            </div>

            <h2 className="s1-text text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              The connection drops
            </h2>
            <p className="s1-text text-gray-400 text-lg max-w-lg mx-auto mb-16">
              Network fails. WebSocket closes. TCP timeout. The transport layer
              is gone.
            </p>

            {/* Animated blocks that scatter */}
            <div className="s1-blocks grid grid-cols-8 gap-1 max-w-md mx-auto">
              {Array.from({ length: 64 }).map((_, i) => (
                <div
                  key={i}
                  className="block aspect-square rounded-sm"
                  style={{
                    background: `rgba(99, 102, 241, ${0.1 + Math.random() * 0.4})`,
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: Reconnection */}
        <section ref={section2Ref} className="min-h-screen flex items-center justify-center px-8 py-32">
          <div className="max-w-3xl mx-auto text-center">
            {/* Blocks reassemble */}
            <div className="s2-blocks grid grid-cols-8 gap-1 max-w-md mx-auto mb-16">
              {Array.from({ length: 64 }).map((_, i) => (
                <div
                  key={i}
                  className="block aspect-square rounded-sm"
                  style={{
                    background: `rgba(6, 182, 212, ${0.1 + Math.random() * 0.4})`,
                  }}
                />
              ))}
            </div>

            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="font-mono text-sm text-emerald-400">RECONNECTED</span>
            </div>

            <h2 className="s2-text text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Client reconnects
            </h2>
            <p className="s2-text text-gray-400 text-lg max-w-lg mx-auto">
              New transport, same session. Every message, every state change —
              recovered in order. As if nothing happened.
            </p>
          </div>
        </section>

        {/* Section 3: Device Change */}
        <section ref={section3Ref} className="min-h-screen flex items-center justify-center px-8 py-32">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-8 mb-16">
              {/* Device 1 */}
              <div className="s3-device-1 w-32 h-48 rounded-lg border border-indigo-500/30 bg-indigo-500/5 flex items-center justify-center">
                <div className="text-center">
                  <div className="font-mono text-xs text-indigo-400 mb-2">device_a</div>
                  <div className="w-8 h-12 mx-auto border border-indigo-500/40 rounded" />
                </div>
              </div>

              {/* State transfer line */}
              <div className="s3-state-line h-0.5 w-24 bg-gradient-to-r from-indigo-500 to-cyan-500 origin-left" />

              {/* Device 2 */}
              <div className="s3-device-2 w-32 h-48 rounded-lg border border-cyan-500/30 bg-cyan-500/5 flex items-center justify-center">
                <div className="text-center">
                  <div className="font-mono text-xs text-cyan-400 mb-2">device_b</div>
                  <div className="w-16 h-10 mx-auto border border-cyan-500/40 rounded" />
                </div>
              </div>
            </div>

            <h2 className="s3-text text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Device changes
            </h2>
            <p className="s3-text text-gray-400 text-lg max-w-lg mx-auto">
              Phone to laptop. Laptop to tablet. The session follows — state
              intact, cursor position preserved, context maintained.
            </p>
          </div>
        </section>

        {/* Section 4: Crash & Recovery */}
        <section ref={section4Ref} className="min-h-screen flex items-center justify-center px-8 py-32">
          <div className="max-w-3xl mx-auto text-center">
            <p className="s4-text-pre text-gray-500 font-mono text-sm mb-8">
              agent process killed — PID 4892
            </p>

            {/* Terminal screen */}
            <div className="s4-screen max-w-lg mx-auto rounded-lg border border-white/10 bg-black/50 p-6 mb-8 font-mono text-sm text-left">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/5">
                <span className="w-3 h-3 rounded-full bg-red-500/60" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/60" />
              </div>
              <div className="space-y-1 text-gray-400">
                <div><span className="text-gray-600">$</span> session.resume()</div>
                <div className="text-emerald-400">&#x2713; State recovered: 847 events</div>
                <div className="text-emerald-400">&#x2713; Cursor position: restored</div>
                <div className="text-emerald-400">&#x2713; Pending mutations: replayed</div>
                <div className="text-cyan-400">
                  <span className="s4-cursor animate-pulse">&#x2588;</span>
                </div>
              </div>
            </div>

            <h2 className="s4-text-post text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                Right where you left off
              </span>
            </h2>
            <p className="s4-text-post text-gray-400 text-lg max-w-lg mx-auto">
              Process crashed. Agent restarted. The durable session replays
              exactly what was missed — nothing lost, nothing duplicated.
            </p>
          </div>
        </section>

        {/* Footer spacer */}
        <section className="h-[40vh] flex items-center justify-center">
          <p className="font-mono text-sm text-gray-600">
            &#x25CF; session_id: ds_7f3k9x — still active
          </p>
        </section>
      </main>
    </>
  );
}
