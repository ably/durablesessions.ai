"use client";

import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ────────────────────────────────────────────
   Prototype B — "Glitch Protocol"

   RGB channel splitting, chromatic aberration,
   scan lines. A transmission being disrupted
   and recovered.
   ──────────────────────────────────────────── */

function ScanLines() {
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

function GlitchCanvas() {
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
      scrollRef.current = window.scrollY / (document.body.scrollHeight - window.innerHeight);
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

      // Determine glitch zones based on scroll
      // More glitchy in the "drop" sections (20-35%, 70-80%)
      const inDropZone =
        (scroll > 0.15 && scroll < 0.35) || (scroll > 0.65 && scroll < 0.8);
      const targetIntensity = inDropZone ? 0.8 : 0.05;
      glitchIntensity += (targetIntensity - glitchIntensity) * 0.05;

      // Random glitch triggers
      if (now - lastGlitchTime > 100 + Math.random() * 2000 / (glitchIntensity + 0.1)) {
        glitchActive = true;
        lastGlitchTime = now;
        setTimeout(() => { glitchActive = false; }, 50 + Math.random() * 150);
      }

      if (glitchActive && glitchIntensity > 0.1) {
        // Draw random horizontal displacement bars
        const numBars = Math.floor(3 + glitchIntensity * 15);
        for (let i = 0; i < numBars; i++) {
          const barY = Math.random() * h;
          const barH = 1 + Math.random() * (4 + glitchIntensity * 20);
          const displacement = (Math.random() - 0.5) * glitchIntensity * 60;

          // RGB channel offset bars
          ctx.fillStyle = `rgba(255, 0, 0, ${0.03 * glitchIntensity})`;
          ctx.fillRect(displacement - 3, barY, w, barH);

          ctx.fillStyle = `rgba(0, 255, 255, ${0.03 * glitchIntensity})`;
          ctx.fillRect(displacement + 3, barY, w, barH);
        }

        // Occasional full-width flash
        if (Math.random() < glitchIntensity * 0.3) {
          ctx.fillStyle = `rgba(6, 182, 212, ${0.02 * glitchIntensity})`;
          ctx.fillRect(0, 0, w, h);
        }
      }

      // Persistent subtle noise
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

function GlitchText({
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

function SessionIndicator() {
  return (
    <div className="session-indicator">
      <div className="session-bar" />
      <span className="session-label">session:active</span>
    </div>
  );
}

export default function PrototypeB() {
  const heroRef = useRef<HTMLDivElement>(null);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  const section4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance — text materializes from static
      gsap.from(".glitch-hero-line", {
        opacity: 0,
        y: 30,
        filter: "blur(10px)",
        stagger: 0.12,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.2,
      });

      // Hero — RGB split animation on title
      gsap.to(".hero-rgb-split", {
        keyframes: [
          { x: 0, duration: 2 },
          { x: 3, duration: 0.05 },
          { x: 0, duration: 0.05 },
          { x: -2, duration: 0.05 },
          { x: 0, duration: 3 },
        ],
        repeat: -1,
        ease: "none",
      });

      // Section 1: Connection drops — elements split into RGB channels
      if (section1Ref.current) {
        gsap.from(".s1b-enter", {
          scrollTrigger: {
            trigger: section1Ref.current,
            start: "top 75%",
            end: "top 25%",
            scrub: 1,
          },
          opacity: 0,
          y: 40,
          stagger: 0.1,
        });

        // The dramatic split
        gsap.to(".s1b-split-r", {
          scrollTrigger: {
            trigger: section1Ref.current,
            start: "30% center",
            end: "70% center",
            scrub: 1,
          },
          x: -20,
          opacity: 0.7,
        });
        gsap.to(".s1b-split-b", {
          scrollTrigger: {
            trigger: section1Ref.current,
            start: "30% center",
            end: "70% center",
            scrub: 1,
          },
          x: 20,
          opacity: 0.7,
        });
      }

      // Section 2: Reconnection — channels converge
      if (section2Ref.current) {
        gsap.from(".s2b-line", {
          scrollTrigger: {
            trigger: section2Ref.current,
            start: "top 70%",
            end: "center center",
            scrub: 1,
          },
          scaleX: 0,
          stagger: 0.05,
        });
        gsap.from(".s2b-text", {
          scrollTrigger: {
            trigger: section2Ref.current,
            start: "20% 70%",
            end: "50% center",
            scrub: 1,
          },
          opacity: 0,
          y: 30,
          filter: "blur(4px)",
          stagger: 0.1,
        });
      }

      // Section 3: Device handoff — slide transition
      if (section3Ref.current) {
        const tl3 = gsap.timeline({
          scrollTrigger: {
            trigger: section3Ref.current,
            start: "top 60%",
            end: "bottom 40%",
            scrub: 1,
          },
        });
        tl3.from(".s3b-panel-left", { x: -200, opacity: 0, duration: 0.5 });
        tl3.from(".s3b-panel-right", { x: 200, opacity: 0, duration: 0.5 }, "-=0.3");
        tl3.from(".s3b-bridge", { scaleX: 0, duration: 0.3 });
        tl3.from(".s3b-text", { opacity: 0, y: 20, stagger: 0.1, duration: 0.3 });
      }

      // Section 4: Crash — screen tears then resolves
      if (section4Ref.current) {
        const tl4 = gsap.timeline({
          scrollTrigger: {
            trigger: section4Ref.current,
            start: "top 60%",
            end: "bottom 40%",
            scrub: 1,
          },
        });
        tl4.from(".s4b-pre", { opacity: 0, y: 20, duration: 0.2 });
        tl4.to(".s4b-tear-top", { y: -8, duration: 0.1 });
        tl4.to(".s4b-tear-bottom", { y: 8, duration: 0.1 }, "<");
        tl4.to(".s4b-tear-top", { y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
        tl4.to(".s4b-tear-bottom", { y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" }, "<");
        tl4.from(".s4b-post", { opacity: 0, y: 20, stagger: 0.1, duration: 0.3 });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <ScanLines />
      <GlitchCanvas />
      <SessionIndicator />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 bg-[#07070e]/80 backdrop-blur-sm border-b border-white/5">
        <Link href="/" className="font-mono text-xs text-gray-500 hover:text-gray-300 transition-colors">
          &larr; prototypes
        </Link>
        <span className="font-mono text-xs text-cyan-400/60 tracking-widest uppercase">
          B / Glitch Protocol
        </span>
      </nav>

      <main className="relative z-10">
        {/* Hero */}
        <section ref={heroRef} className="min-h-screen flex items-center justify-center px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="glitch-hero-line inline-block mb-8 px-4 py-2 border border-cyan-500/20 rounded">
              <span className="font-mono text-xs text-cyan-400 tracking-[0.3em] uppercase">
                // durable_sessions
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-8">
              <span className="glitch-hero-line block hero-rgb-split">
                <GlitchText intensity={2}>Sessions that</GlitchText>
              </span>
              <span className="glitch-hero-line block">
                <GlitchText intensity={1.5}>
                  <span className="text-cyan-400">never lose state</span>
                </GlitchText>
              </span>
            </h1>

            <p className="glitch-hero-line max-w-xl mx-auto text-lg text-gray-400 leading-relaxed mb-12">
              The transport fails. The signal breaks. But the session &mdash;
              the session remembers everything.
            </p>

            <div className="glitch-hero-line font-mono text-sm text-gray-600 flex items-center justify-center gap-6">
              <span>
                <span className="text-cyan-500">&#x25B6;</span> transmitting
              </span>
              <span className="text-gray-700">|</span>
              <span>
                signal: <span className="text-emerald-500">strong</span>
              </span>
              <span className="text-gray-700">|</span>
              <span>
                loss: <span className="text-emerald-500">0.00%</span>
              </span>
            </div>
          </div>
        </section>

        {/* Section 1: Connection Drops — RGB split */}
        <section ref={section1Ref} className="min-h-screen flex items-center justify-center px-8 py-32">
          <div className="max-w-3xl mx-auto text-center">
            <div className="s1b-enter mb-12">
              <div className="inline-flex items-center gap-3 px-5 py-3 rounded bg-red-500/10 border border-red-500/20">
                <span className="font-mono text-sm text-red-400">
                  &#x26A0; SIGNAL INTERRUPTED
                </span>
              </div>
            </div>

            {/* RGB split text effect */}
            <div className="relative mb-8">
              <h2 className="s1b-enter text-4xl md:text-6xl font-bold tracking-tight relative z-10">
                Connection severed
              </h2>
              <h2
                className="s1b-split-r absolute inset-0 text-4xl md:text-6xl font-bold tracking-tight text-red-500/50"
                style={{ mixBlendMode: "screen" }}
                aria-hidden
              >
                Connection severed
              </h2>
              <h2
                className="s1b-split-b absolute inset-0 text-4xl md:text-6xl font-bold tracking-tight text-cyan-500/50"
                style={{ mixBlendMode: "screen" }}
                aria-hidden
              >
                Connection severed
              </h2>
            </div>

            <p className="s1b-enter text-gray-400 text-lg max-w-lg mx-auto">
              WebSocket closed. TCP timeout. The transport layer is gone —
              but the session ID persists on both sides.
            </p>
          </div>
        </section>

        {/* Section 2: Reconnection — signals converge */}
        <section ref={section2Ref} className="min-h-screen flex items-center justify-center px-8 py-32">
          <div className="max-w-3xl mx-auto text-center">
            {/* Signal lines converging */}
            <div className="flex flex-col items-center gap-2 mb-16">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className="s2b-line h-0.5 origin-left"
                  style={{
                    width: `${120 + i * 30}px`,
                    background: `linear-gradient(to right,
                      rgba(99, 102, 241, ${0.2 + i * 0.1}),
                      rgba(6, 182, 212, ${0.2 + i * 0.1}))`,
                    transform: `translateX(${(i - 3) * 8}px)`,
                  }}
                />
              ))}
            </div>

            <div className="s2b-text inline-flex items-center gap-3 px-5 py-3 rounded bg-emerald-500/10 border border-emerald-500/20 mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="font-mono text-sm text-emerald-400">
                SIGNAL LOCKED
              </span>
            </div>

            <h2 className="s2b-text text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Signal restored
            </h2>
            <p className="s2b-text text-gray-400 text-lg max-w-lg mx-auto">
              New transport established. Session state synchronized. Every
              event replayed in order — zero data loss.
            </p>
          </div>
        </section>

        {/* Section 3: Device Handoff */}
        <section ref={section3Ref} className="min-h-screen flex items-center justify-center px-8 py-32">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-16">
              {/* Device panels */}
              <div className="s3b-panel-left w-40 rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-4">
                <div className="font-mono text-xs text-cyan-400 mb-3">client_mobile</div>
                <div className="space-y-1.5">
                  <div className="h-1.5 rounded-full bg-cyan-500/20 w-full" />
                  <div className="h-1.5 rounded-full bg-cyan-500/20 w-3/4" />
                  <div className="h-1.5 rounded-full bg-cyan-500/30 w-full" />
                  <div className="h-1.5 rounded-full bg-cyan-500/10 w-1/2" />
                </div>
              </div>

              {/* Bridge */}
              <div className="s3b-bridge flex flex-col items-center gap-1 origin-left">
                <div className="w-20 h-0.5 bg-gradient-to-r from-cyan-500 to-indigo-500" />
                <span className="font-mono text-[10px] text-gray-600">state_transfer</span>
                <div className="w-20 h-0.5 bg-gradient-to-r from-indigo-500 to-cyan-500" />
              </div>

              {/* Device 2 */}
              <div className="s3b-panel-right w-40 rounded-lg border border-indigo-500/20 bg-indigo-500/5 p-4">
                <div className="font-mono text-xs text-indigo-400 mb-3">client_desktop</div>
                <div className="space-y-1.5">
                  <div className="h-1.5 rounded-full bg-indigo-500/20 w-full" />
                  <div className="h-1.5 rounded-full bg-indigo-500/20 w-3/4" />
                  <div className="h-1.5 rounded-full bg-indigo-500/30 w-full" />
                  <div className="h-1.5 rounded-full bg-indigo-500/10 w-1/2" />
                </div>
              </div>
            </div>

            <h2 className="s3b-text text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Different device, same session
            </h2>
            <p className="s3b-text text-gray-400 text-lg max-w-lg mx-auto">
              The session state isn&apos;t bound to a device. It&apos;s bound to the
              session. Pick up on any client, right where you left off.
            </p>
          </div>
        </section>

        {/* Section 4: Crash & Recovery — screen tear */}
        <section ref={section4Ref} className="min-h-screen flex items-center justify-center px-8 py-32">
          <div className="max-w-3xl mx-auto text-center">
            <p className="s4b-pre text-gray-500 font-mono text-sm mb-8">
              &gt; SIGKILL received &mdash; agent terminated
            </p>

            {/* Screen tear effect */}
            <div className="relative max-w-lg mx-auto mb-12 overflow-hidden rounded-lg border border-white/10">
              <div className="s4b-tear-top bg-black/60 p-6 font-mono text-sm text-left border-b border-red-500/20">
                <div className="text-gray-600 mb-1">// before crash</div>
                <div className="text-gray-400">
                  session.state = <span className="text-cyan-400">&quot;processing&quot;</span>
                </div>
                <div className="text-gray-400">
                  session.events = <span className="text-indigo-400">2,847</span>
                </div>
                <div className="text-gray-400">
                  session.cursor = <span className="text-indigo-400">&quot;evt_x8k2&quot;</span>
                </div>
              </div>
              <div className="s4b-tear-bottom bg-black/60 p-6 font-mono text-sm text-left">
                <div className="text-emerald-500 mb-1">// after recovery</div>
                <div className="text-gray-400">
                  session.state = <span className="text-cyan-400">&quot;processing&quot;</span>
                </div>
                <div className="text-gray-400">
                  session.events = <span className="text-emerald-400">2,847</span>
                  <span className="text-emerald-400/60"> &#x2713;</span>
                </div>
                <div className="text-gray-400">
                  session.cursor = <span className="text-emerald-400">&quot;evt_x8k2&quot;</span>
                  <span className="text-emerald-400/60"> &#x2713;</span>
                </div>
              </div>
            </div>

            <h2 className="s4b-post text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              <GlitchText intensity={0.5}>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                  Identical state
                </span>
              </GlitchText>
            </h2>
            <p className="s4b-post text-gray-400 text-lg max-w-lg mx-auto">
              The agent crashed. The process died. But the durable session
              kept the truth — and handed it back, byte for byte.
            </p>
          </div>
        </section>

        {/* Footer */}
        <section className="h-[40vh] flex items-center justify-center">
          <p className="font-mono text-sm text-gray-600">
            &#x25B6; signal: <span className="text-emerald-500">nominal</span> &mdash; 0 events lost
          </p>
        </section>
      </main>
    </>
  );
}
