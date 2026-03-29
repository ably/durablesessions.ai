"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ScanLines,
  GlitchCanvas,
  GlitchText,
  SessionIndicator,
} from "./components/GlitchEffects";

gsap.registerPlugin(ScrollTrigger);

/* ════════════════════════════════════════════════
   Prototype B-Full — "Glitch Protocol"
   Complete site: B visual language + all content
   ════════════════════════════════════════════════ */

/* ── Reusable card for convergence / developer quotes ── */
function GlitchCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-lg border border-white/[0.06] bg-white/[0.02] p-5 hover:border-cyan-500/20 hover:bg-white/[0.03] transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
}

export default function PrototypeBFull() {
  const heroRef = useRef<HTMLDivElement>(null);
  const scrollBeatsRef = useRef<HTMLDivElement>(null);
  const problemRef = useRef<HTMLDivElement>(null);
  const sseRef = useRef<HTMLDivElement>(null);
  const definitionRef = useRef<HTMLDivElement>(null);
  const convergenceRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const whyInfraRef = useRef<HTMLDivElement>(null);
  const devVoicesRef = useRef<HTMLDivElement>(null);
  const complementRef = useRef<HTMLDivElement>(null);
  const talkingRef = useRef<HTMLDivElement>(null);
  const refsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Hero entrance ── */
      gsap.from(".glitch-hero-line", {
        opacity: 0,
        y: 30,
        filter: "blur(10px)",
        stagger: 0.12,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.2,
      });

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

      /* ── Scroll beat 1: Connection drops ── */
      gsap.from(".sb1-enter", {
        scrollTrigger: { trigger: ".sb1", start: "top 75%", end: "top 25%", scrub: 1 },
        opacity: 0, y: 40, stagger: 0.1,
      });
      gsap.to(".sb1-split-r", {
        scrollTrigger: { trigger: ".sb1", start: "30% center", end: "70% center", scrub: 1 },
        x: -20, opacity: 0.7,
      });
      gsap.to(".sb1-split-b", {
        scrollTrigger: { trigger: ".sb1", start: "30% center", end: "70% center", scrub: 1 },
        x: 20, opacity: 0.7,
      });

      /* ── Scroll beat 2: Reconnection ── */
      gsap.from(".sb2-line", {
        scrollTrigger: { trigger: ".sb2", start: "top 70%", end: "center center", scrub: 1 },
        scaleX: 0, stagger: 0.05,
      });
      gsap.from(".sb2-text", {
        scrollTrigger: { trigger: ".sb2", start: "20% 70%", end: "50% center", scrub: 1 },
        opacity: 0, y: 30, filter: "blur(4px)", stagger: 0.1,
      });

      /* ── Scroll beat 3: Device handoff ── */
      const tl3 = gsap.timeline({
        scrollTrigger: { trigger: ".sb3", start: "top 60%", end: "bottom 40%", scrub: 1 },
      });
      tl3.from(".sb3-panel-left", { x: -200, opacity: 0, duration: 0.5 });
      tl3.from(".sb3-panel-right", { x: 200, opacity: 0, duration: 0.5 }, "-=0.3");
      tl3.from(".sb3-bridge", { scaleX: 0, duration: 0.3 });
      tl3.from(".sb3-text", { opacity: 0, y: 20, stagger: 0.1, duration: 0.3 });

      /* ── Scroll beat 4: Crash / recovery ── */
      const tl4 = gsap.timeline({
        scrollTrigger: { trigger: ".sb4", start: "top 60%", end: "bottom 40%", scrub: 1 },
      });
      tl4.from(".sb4-pre", { opacity: 0, y: 20, duration: 0.2 });
      tl4.to(".sb4-tear-top", { y: -8, duration: 0.1 });
      tl4.to(".sb4-tear-bottom", { y: 8, duration: 0.1 }, "<");
      tl4.to(".sb4-tear-top", { y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
      tl4.to(".sb4-tear-bottom", { y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" }, "<");
      tl4.from(".sb4-post", { opacity: 0, y: 20, stagger: 0.1, duration: 0.3 });

      /* ── Generic reveal for content sections ── */
      document.querySelectorAll(".reveal-section").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 85%", end: "top 55%", scrub: 1 },
          opacity: 0, y: 40,
        });
      });

      /* ── Staggered card reveals ── */
      document.querySelectorAll(".card-grid").forEach((grid) => {
        gsap.from(grid.querySelectorAll(".g-card"), {
          scrollTrigger: { trigger: grid, start: "top 80%", end: "top 40%", scrub: 1 },
          opacity: 0, y: 30, stagger: 0.06,
        });
      });

      /* ── Stat count-up ── */
      document.querySelectorAll(".count-up").forEach((el) => {
        const target = parseInt(el.getAttribute("data-target") || "0", 10);
        gsap.fromTo(
          el,
          { textContent: 0 },
          {
            textContent: target,
            duration: 1.5,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: { trigger: el, start: "top 80%" },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <ScanLines />
      <GlitchCanvas />
      <SessionIndicator />

      {/* ── Navigation ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-8 py-4 bg-[#07070e]/80 backdrop-blur-sm border-b border-white/5">
        <Link href="/b-full" className="flex items-center gap-2">
          <span className="font-mono text-xs text-cyan-400 tracking-widest">DS</span>
          <span className="text-sm font-medium text-gray-300 hidden sm:inline">Durable Sessions</span>
        </Link>
        <div className="flex items-center gap-6 text-xs font-mono text-gray-500">
          <a href="#problem" className="hover:text-cyan-400 transition-colors hidden md:inline">The Gap</a>
          <a href="#definition" className="hover:text-cyan-400 transition-colors hidden md:inline">Definition</a>
          <a href="#convergence" className="hover:text-cyan-400 transition-colors hidden md:inline">Convergence</a>
          <a href="#developers" className="hover:text-cyan-400 transition-colors hidden md:inline">Developers</a>
          <a href="#cta" className="hover:text-cyan-400 transition-colors">Get Involved</a>
        </div>
      </nav>

      <main className="relative z-10">

        {/* ════════════════════════════════════════
            PART 1 — THE HOOK (scroll narrative)
            ════════════════════════════════════════ */}

        {/* ── Hero ── */}
        <section ref={heroRef} className="min-h-screen flex items-center justify-center px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="glitch-hero-line inline-block mb-8 px-4 py-2 border border-cyan-500/20 rounded">
              <span className="font-mono text-xs text-cyan-400 tracking-[0.3em] uppercase">
                // an emerging infrastructure category
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-8">
              <span className="glitch-hero-line block hero-rgb-split">
                <GlitchText intensity={2}>The missing layer</GlitchText>
              </span>
              <span className="glitch-hero-line block">
                <GlitchText intensity={1.5}>
                  <span className="text-cyan-400">between agents &amp; users</span>
                </GlitchText>
              </span>
            </h1>

            <p className="glitch-hero-line max-w-2xl mx-auto text-lg text-gray-400 leading-relaxed mb-8">
              Durable Execution made backends crash-proof.{" "}
              <strong className="text-gray-200">Durable Sessions</strong> makes the
              experience crash-proof.
            </p>

            <div className="glitch-hero-line flex flex-wrap items-center justify-center gap-4 mb-12">
              <a href="#problem" className="px-6 py-3 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-sm hover:bg-cyan-500/20 transition-colors">
                Understand the gap
              </a>
              <a href="#convergence" className="px-6 py-3 rounded border border-white/10 text-gray-400 font-mono text-sm hover:border-white/20 hover:text-gray-300 transition-colors">
                Who&apos;s talking about it
              </a>
            </div>

            <div className="glitch-hero-line font-mono text-sm text-gray-600 flex items-center justify-center gap-6">
              <span><span className="text-cyan-500">&#x25B6;</span> transmitting</span>
              <span className="text-gray-700">|</span>
              <span>signal: <span className="text-emerald-500">strong</span></span>
              <span className="text-gray-700">|</span>
              <span>loss: <span className="text-emerald-500">0.00%</span></span>
            </div>
          </div>
        </section>

        {/* ── Scroll Beat 1: Connection Drops ── */}
        <section className="sb1 min-h-[70vh] flex items-center justify-center px-8 py-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="sb1-enter mb-8">
              <div className="inline-flex items-center gap-3 px-5 py-3 rounded bg-red-500/10 border border-red-500/20">
                <span className="font-mono text-sm text-red-400">&#x26A0; SIGNAL INTERRUPTED</span>
              </div>
            </div>
            <div className="relative mb-6">
              <h2 className="sb1-enter text-4xl md:text-6xl font-bold tracking-tight relative z-10">Connection severed</h2>
              <h2 className="sb1-split-r absolute inset-0 text-4xl md:text-6xl font-bold tracking-tight text-red-500/50" style={{ mixBlendMode: "screen" }} aria-hidden>Connection severed</h2>
              <h2 className="sb1-split-b absolute inset-0 text-4xl md:text-6xl font-bold tracking-tight text-cyan-500/50" style={{ mixBlendMode: "screen" }} aria-hidden>Connection severed</h2>
            </div>
            <p className="sb1-enter text-gray-400 text-lg max-w-lg mx-auto">
              WebSocket closed. TCP timeout. The transport layer is gone — but the session ID persists on both sides.
            </p>
          </div>
        </section>

        {/* ── Scroll Beat 2: Reconnection ── */}
        <section className="sb2 min-h-[70vh] flex items-center justify-center px-8 py-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex flex-col items-center gap-2 mb-12">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="sb2-line h-0.5 origin-left" style={{
                  width: `${120 + i * 30}px`,
                  background: `linear-gradient(to right, rgba(99,102,241,${0.2 + i * 0.1}), rgba(6,182,212,${0.2 + i * 0.1}))`,
                  transform: `translateX(${(i - 3) * 8}px)`,
                }} />
              ))}
            </div>
            <div className="sb2-text inline-flex items-center gap-3 px-5 py-3 rounded bg-emerald-500/10 border border-emerald-500/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="font-mono text-sm text-emerald-400">SIGNAL LOCKED</span>
            </div>
            <h2 className="sb2-text text-4xl md:text-5xl font-bold mb-4 tracking-tight">Signal restored</h2>
            <p className="sb2-text text-gray-400 text-lg max-w-lg mx-auto">
              New transport established. Session state synchronized. Every event replayed in order — zero data loss.
            </p>
          </div>
        </section>

        {/* ── Scroll Beat 3: Device Handoff ── */}
        <section className="sb3 min-h-[70vh] flex items-center justify-center px-8 py-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-12">
              <div className="sb3-panel-left w-40 rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-4">
                <div className="font-mono text-xs text-cyan-400 mb-3">client_mobile</div>
                <div className="space-y-1.5">
                  <div className="h-1.5 rounded-full bg-cyan-500/20 w-full" />
                  <div className="h-1.5 rounded-full bg-cyan-500/20 w-3/4" />
                  <div className="h-1.5 rounded-full bg-cyan-500/30 w-full" />
                </div>
              </div>
              <div className="sb3-bridge flex flex-col items-center gap-1 origin-left">
                <div className="w-20 h-0.5 bg-gradient-to-r from-cyan-500 to-indigo-500" />
                <span className="font-mono text-[10px] text-gray-600">state_transfer</span>
                <div className="w-20 h-0.5 bg-gradient-to-r from-indigo-500 to-cyan-500" />
              </div>
              <div className="sb3-panel-right w-40 rounded-lg border border-indigo-500/20 bg-indigo-500/5 p-4">
                <div className="font-mono text-xs text-indigo-400 mb-3">client_desktop</div>
                <div className="space-y-1.5">
                  <div className="h-1.5 rounded-full bg-indigo-500/20 w-full" />
                  <div className="h-1.5 rounded-full bg-indigo-500/20 w-3/4" />
                  <div className="h-1.5 rounded-full bg-indigo-500/30 w-full" />
                </div>
              </div>
            </div>
            <h2 className="sb3-text text-4xl md:text-5xl font-bold mb-4 tracking-tight">Different device, same session</h2>
            <p className="sb3-text text-gray-400 text-lg max-w-lg mx-auto">
              The session state isn&apos;t bound to a device. It&apos;s bound to the session. Pick up on any client, right where you left off.
            </p>
          </div>
        </section>

        {/* ── Scroll Beat 4: Crash & Recovery ── */}
        <section className="sb4 min-h-[70vh] flex items-center justify-center px-8 py-24">
          <div className="max-w-3xl mx-auto text-center">
            <p className="sb4-pre text-gray-500 font-mono text-sm mb-6">&gt; SIGKILL received — agent terminated</p>
            <div className="relative max-w-lg mx-auto mb-10 overflow-hidden rounded-lg border border-white/10">
              <div className="sb4-tear-top bg-black/60 p-5 font-mono text-sm text-left border-b border-red-500/20">
                <div className="text-gray-600 mb-1">// before crash</div>
                <div className="text-gray-400">session.state = <span className="text-cyan-400">&quot;processing&quot;</span></div>
                <div className="text-gray-400">session.events = <span className="text-indigo-400">2,847</span></div>
                <div className="text-gray-400">session.cursor = <span className="text-indigo-400">&quot;evt_x8k2&quot;</span></div>
              </div>
              <div className="sb4-tear-bottom bg-black/60 p-5 font-mono text-sm text-left">
                <div className="text-emerald-500 mb-1">// after recovery</div>
                <div className="text-gray-400">session.state = <span className="text-cyan-400">&quot;processing&quot;</span></div>
                <div className="text-gray-400">session.events = <span className="text-emerald-400">2,847</span> <span className="text-emerald-400/60">&#x2713;</span></div>
                <div className="text-gray-400">session.cursor = <span className="text-emerald-400">&quot;evt_x8k2&quot;</span> <span className="text-emerald-400/60">&#x2713;</span></div>
              </div>
            </div>
            <h2 className="sb4-post text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              <GlitchText intensity={0.5}>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Identical state</span>
              </GlitchText>
            </h2>
            <p className="sb4-post text-gray-400 text-lg max-w-lg mx-auto">
              The agent crashed. The process died. But the durable session kept the truth — and handed it back, byte for byte.
            </p>
          </div>
        </section>

        {/* ════════════════════════════════════════
            PART 2 — THE SUBSTANCE
            ════════════════════════════════════════ */}

        {/* Divider */}
        <div className="max-w-xs mx-auto my-16 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

        {/* ── The Problem: "The session has no home" ── */}
        <section id="problem" ref={problemRef} className="px-8 py-24">
          <div className="max-w-5xl mx-auto">
            <div className="reveal-section text-center mb-16">
              <span className="font-mono text-xs text-cyan-400/60 tracking-widest uppercase">// the problem</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 tracking-tight">
                <GlitchText intensity={0.8}>The session has no home</GlitchText>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                AI agents have state. Durable execution platforms persist workflow state. Databases store data.
                But it&apos;s not clear which layer should own the <em className="text-cyan-400/80">session</em> —
                the stateful interaction between an agent and the humans it serves.
              </p>
            </div>

            <div className="card-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: "&#x23FB;", title: "Disconnects", desc: "Stream dies on network drop. User restarts from scratch." },
                { icon: "&#x25A1;", title: "Devices", desc: "Conversation started on phone can't continue on laptop." },
                { icon: "&#x2750;", title: "Tabs", desc: "Opening a second tab creates a second, disconnected session." },
                { icon: "&#x2699;", title: "Agents", desc: "Multi-agent handoff loses context. Crashed agent looks like a thinking one." },
                { icon: "&#x23F1;", title: "Time", desc: "Background task completes after user leaves. Result is lost." },
                { icon: "&#x260E;", title: "Modalities", desc: "Voice call can't transition to text without losing state." },
              ].map((card) => (
                <GlitchCard key={card.title} className="g-card">
                  <div className="text-cyan-400/60 text-lg mb-2 font-mono" dangerouslySetInnerHTML={{ __html: card.icon }} />
                  <h3 className="font-semibold text-gray-200 mb-2">{card.title}</h3>
                  <p className="text-sm text-gray-500">{card.desc}</p>
                </GlitchCard>
              ))}
            </div>

            <blockquote className="reveal-section mt-12 border-l-2 border-cyan-500/30 pl-6 text-gray-400 italic max-w-2xl mx-auto">
              Every team building serious AI products hand-rolls fragile session infrastructure from scratch.
            </blockquote>
          </div>
        </section>

        {/* ── SSE Banner ── */}
        <section ref={sseRef} className="px-8 py-16">
          <div className="reveal-section max-w-3xl mx-auto rounded-xl border border-cyan-500/15 bg-cyan-500/[0.03] p-8 md:p-10">
            <span className="font-mono text-xs text-cyan-400/60 tracking-widest uppercase">// the signal</span>
            <h2 className="text-2xl md:text-3xl font-bold mt-3 mb-4 tracking-tight">
              The incumbent protocol has been declared inadequate
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              AG-UI deprecated SSE as its reference transport. Vercel built a pluggable{" "}
              <code className="text-cyan-400/80 bg-cyan-500/10 px-1.5 py-0.5 rounded text-sm">ChatTransport</code>{" "}
              interface and told the community to bring their own WebSocket implementations.
              TanStack AI shipped a{" "}
              <code className="text-cyan-400/80 bg-cyan-500/10 px-1.5 py-0.5 rounded text-sm">ConnectionAdapter</code>{" "}
              designed for third-party transport providers. CrewAI explicitly rejected building
              transport features as &ldquo;not planned.&rdquo;
            </p>
            <p className="text-gray-300 font-medium">
              The ecosystem has diagnosed the problem, designed the plugin points, and is waiting for someone to show up with the infrastructure.
            </p>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-xs mx-auto my-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* ── Definition: What is a Durable Session? ── */}
        <section id="definition" ref={definitionRef} className="px-8 py-24">
          <div className="max-w-5xl mx-auto">
            <div className="reveal-section text-center mb-12">
              <span className="font-mono text-xs text-cyan-400/60 tracking-widest uppercase">// definition</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 tracking-tight">
                What is a Durable Session?
              </h2>
            </div>

            <div className="reveal-section grid md:grid-cols-[2fr_1fr] gap-8 mb-16">
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>
                  A <strong className="text-gray-200">durable session</strong> is a persistent,
                  addressable session that sits between agents and users as the medium through which they interact.
                  It&apos;s not a connection — connections break. It&apos;s not a channel — channels are a transport primitive.
                </p>
                <p>
                  A durable session is the stateful layer that <em className="text-cyan-400/80">outlives any single connection</em>,
                  and that any participant — user, agent, device, service — can join, leave, and return to over time.
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.02] p-5">
                <div className="font-mono text-xs text-gray-500 mb-4 tracking-wider uppercase">The analogy</div>
                <div className="space-y-3">
                  <div>
                    <div className="font-semibold text-indigo-400 text-sm">Durable Execution</div>
                    <div className="text-sm text-gray-500">made your backend crash-proof</div>
                  </div>
                  <div className="h-px bg-gradient-to-r from-indigo-500/30 to-cyan-500/30" />
                  <div>
                    <div className="font-semibold text-cyan-400 text-sm">Durable Sessions</div>
                    <div className="text-sm text-gray-500">makes the experience crash-proof</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Three pillars */}
            <div className="card-grid grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
              <GlitchCard className="g-card">
                <h3 className="font-semibold text-gray-200 mb-2">Reliable streaming &amp; resilience</h3>
                <p className="text-sm text-gray-500">
                  Streams that survive disconnects, proxy interference, and reconnections.
                  No corrupted state, no lost tokens. The stream picks up where it left off.
                </p>
              </GlitchCard>
              <GlitchCard className="g-card">
                <h3 className="font-semibold text-gray-200 mb-2">Session continuity across surfaces</h3>
                <p className="text-sm text-gray-500">
                  The same session accessible from any device. Start on your laptop, continue on your phone.
                  Three delivery paths: connected (realtime), reconnecting (catch-up), offline (push notification).
                </p>
              </GlitchCard>
              <GlitchCard className="g-card">
                <h3 className="font-semibold text-gray-200 mb-2">Agent visibility &amp; coordination</h3>
                <p className="text-sm text-gray-500">
                  Is the agent thinking or crashed? When multiple agents work the same session, who&apos;s doing what?
                  Presence, health signals, bidirectional control, and human takeover.
                </p>
              </GlitchCard>
            </div>

            {/* Stack position diagram */}
            <div className="reveal-section max-w-md mx-auto">
              <h3 className="font-mono text-xs text-gray-500 text-center mb-4 tracking-widest uppercase">Where it sits in the stack</h3>
              <div className="space-y-2">
                <div className="rounded-lg border border-indigo-500/20 bg-indigo-500/5 px-5 py-3 text-center">
                  <div className="font-semibold text-indigo-400 text-sm">Agent Layer</div>
                  <div className="text-xs text-gray-500 mt-1">LLMs &middot; Tools &middot; Memory &middot; Durable Execution</div>
                </div>
                <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/[0.08] px-5 py-4 text-center ring-1 ring-cyan-500/20">
                  <div className="font-bold text-cyan-400">Durable Sessions</div>
                  <div className="text-xs text-gray-400 mt-1">Streaming &middot; State &middot; Presence &middot; Lifecycle</div>
                </div>
                <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-5 py-3 text-center">
                  <div className="font-semibold text-emerald-400 text-sm">Client Layer</div>
                  <div className="text-xs text-gray-500 mt-1">UI &middot; Devices &middot; Tabs &middot; Modalities</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Convergence: Vendor evidence ── */}
        <section id="convergence" ref={convergenceRef} className="px-8 py-24 bg-white/[0.01]">
          <div className="max-w-5xl mx-auto">
            <div className="reveal-section text-center mb-16">
              <span className="font-mono text-xs text-cyan-400/60 tracking-widest uppercase">// convergence</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 tracking-tight">
                Multiple vendors, same conclusion
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Independently, across different stacks and use cases, companies are converging on the same
                missing layer. Nobody orchestrated this. The pattern emerged.
              </p>
            </div>

            <div className="card-grid grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: "ElectricSQL", what: 'Published "Durable Sessions" blog post (Jan 2026). Shipped Durable Streams protocol (1,400 GitHub stars). Announced "Durable Transports" adapters for TanStack AI and Vercel AI SDK (Mar 2026).', date: "Dec 2025 – Mar 2026" },
                { name: "EMQX", what: '"Durable Sessions" as a named MQTT feature — session state surviving broker restarts', date: "Production feature" },
                { name: "Vercel", what: "Building @ai-sdk/durable-agent. Pluggable ChatTransport in AI SDK v5", date: "In development" },
                { name: "Ably", what: "AI Transport — durable sessions as the infrastructure layer between agents and human devices", date: "March 2026" },
                { name: "Upstash", what: '"Resumable AI SDK Streams" using Redis Streams for stream recovery', date: "Published solution" },
                { name: "Convex", what: "Agent component with persistent threads, durable workflows, and real-time sync", date: "Agent component" },
                { name: "Temporal", what: 'Coined "Durable Execution" ($5B valuation). Their community recommends external realtime providers for frontend delivery — the complementary layer to durable sessions.', date: "Established category" },
                { name: "AG-UI", what: "Deprecated SSE (Aug 2025). Built pluggable transport from the ground up — the protocol moved beyond fixed transport assumptions.", date: "2025" },
                { name: "TanStack AI", what: "ConnectionAdapter interface — explicitly designed for third-party transport providers", date: "Documentation" },
                { name: "Cloudflare", what: "Agents SDK with Durable Objects for stateful sessions. Added resumable streaming (Nov 2025). 15+ releases in 13 months.", date: "2025 – 2026" },
                { name: "Restate", what: 'Durable execution for AI agents. "Durable AI Loops" — pushing durable execution toward the session boundary.', date: "2025 – 2026" },
                { name: "Inngest", what: "Built Realtime on top of durable functions to bridge the gap between backend execution and client delivery. Acknowledged the gap explicitly.", date: "May 2025" },
              ].map((v) => (
                <GlitchCard key={v.name} className="g-card">
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="font-semibold text-cyan-400">{v.name}</h3>
                    <span className="font-mono text-[10px] text-gray-600">{v.date}</span>
                  </div>
                  <p className="text-sm text-gray-400">{v.what}</p>
                </GlitchCard>
              ))}
            </div>
          </div>
        </section>

        {/* ── Stats ── */}
        <section ref={statsRef} className="px-8 py-24">
          <div className="max-w-4xl mx-auto">
            <div className="reveal-section grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-12">
              {[
                { target: 89, detail: "33 of 37 vendors", label: "have no agent health signal or crash detection" },
                { target: 86, detail: "32 of 37 vendors", label: "have no multi-device fan-out for AI sessions" },
                { target: 81, detail: "30 of 37 vendors", label: "have no human-in-the-loop delivery infrastructure" },
              ].map((s) => (
                <div key={s.target}>
                  <div className="text-5xl md:text-6xl font-bold text-cyan-400 mb-1">
                    <span className="count-up" data-target={s.target}>0</span>
                    <span className="text-cyan-400/60">%</span>
                  </div>
                  <div className="font-mono text-xs text-gray-500 mb-2">{s.detail}</div>
                  <div className="text-sm text-gray-400">{s.label}</div>
                </div>
              ))}
            </div>
            <p className="reveal-section text-center text-xs text-gray-600 mb-12">
              Based on a cross-vendor analysis of 37 AI infrastructure vendors, March 2026.
            </p>

            {/* Vendor list */}
            <div className="reveal-section">
              <h3 className="font-mono text-xs text-gray-500 text-center mb-4 tracking-widest uppercase">Vendors analysed</h3>
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-gray-500">
                {[
                  "Ably", "Vercel AI SDK", "LangChain / LangGraph", "TanStack AI", "AG-UI / CopilotKit",
                  "Mastra", "OpenAI Agents SDK", "Claude Agent SDK", "CrewAI", "Pydantic AI",
                  "Temporal", "Restate", "Inngest", "Trigger.dev", "Convex", "Supabase", "Firebase",
                  "Neon", "Upstash", "ElectricSQL", "PubNub", "Pusher", "Socket.IO", "LiveKit",
                  "Pipecat / Daily", "ElevenLabs", "Deepgram", "Vapi", "Retell AI", "Agora",
                  "OpenAI Realtime API", "Knock", "Courier", "Novu", "OneSignal",
                  "Cloudflare Agents", "Liveblocks", "PartyKit",
                ].map((v) => (
                  <span key={v} className="hover:text-cyan-400/60 transition-colors">{v}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-xs mx-auto my-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* ── Why Infrastructure: "Not a feature. A layer." ── */}
        <section ref={whyInfraRef} className="px-8 py-24">
          <div className="max-w-5xl mx-auto">
            <div className="reveal-section text-center mb-12">
              <span className="font-mono text-xs text-cyan-400/60 tracking-widest uppercase">// an emerging AI infrastructure layer</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 tracking-tight">
                Not a feature. A layer.
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                A feature is &ldquo;sessions that don&apos;t break.&rdquo; An infrastructure layer is what makes it
                possible to build AI experiences that work across <em className="text-cyan-400/80">every</em> boundary —
                disconnects, devices, agents, modalities, and time.
              </p>
            </div>

            <div className="reveal-section grid md:grid-cols-[1fr_auto_1fr] gap-6 max-w-3xl mx-auto">
              <div className="rounded-lg border border-indigo-500/15 bg-indigo-500/[0.03] p-6">
                <h4 className="font-semibold text-indigo-400 mb-4">
                  Durable Execution <span className="text-gray-600 font-normal text-xs">e.g. Temporal, Restate, Inngest</span>
                </h4>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li><strong className="text-gray-300">Bulletproofs:</strong> the agent running on the backend</li>
                  <li><strong className="text-gray-300">Outlives failure:</strong> the execution</li>
                  <li><strong className="text-gray-300">Stays stateless:</strong> your backend code</li>
                  <li><strong className="text-gray-300">Mental model:</strong> &ldquo;Write code as if failure doesn&apos;t exist&rdquo;</li>
                </ul>
              </div>
              <div className="hidden md:flex items-center">
                <div className="w-px h-24 bg-gradient-to-b from-indigo-500/30 to-cyan-500/30" />
              </div>
              <div className="rounded-lg border border-cyan-500/15 bg-cyan-500/[0.03] p-6">
                <h4 className="font-semibold text-cyan-400 mb-4">Durable Sessions</h4>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li><strong className="text-gray-300">Bulletproofs:</strong> the experience between agent and user</li>
                  <li><strong className="text-gray-300">Outlives failure:</strong> the session</li>
                  <li><strong className="text-gray-300">Stays stateless:</strong> your agent and your client</li>
                  <li><strong className="text-gray-300">Mental model:</strong> &ldquo;Build AI experiences as if disconnects don&apos;t exist&rdquo;</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Developer Voices ── */}
        <section id="developers" ref={devVoicesRef} className="px-8 py-24 bg-white/[0.01]">
          <div className="max-w-5xl mx-auto">
            <div className="reveal-section text-center mb-16">
              <span className="font-mono text-xs text-cyan-400/60 tracking-widest uppercase">// what developers are saying</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 tracking-tight">
                The same problems, everywhere
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Across GitHub issues, community forums, and Hacker News — developers building production AI applications
                keep describing the same infrastructure gaps. They don&apos;t call it &ldquo;durable sessions.&rdquo; They describe the pain.
              </p>
            </div>

            <div className="card-grid grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { quote: '"I have an old production app with 50K+ users... been stuck for 3 weeks on agent.network() streaming."', source: "Mastra developer, GitHub" },
                { quote: '"To solve this we would need to have a channel to the server that allows transporting that information. WebSockets are one option."', source: "Lars Grammel, Vercel AI SDK lead maintainer" },
                { quote: '"We kept rewriting the same infrastructure to actually show agents to users."', source: "Pydantic AI developer, Hacker News" },
                { quote: '"Reconnecting creates a new session. There\'s no way to pick up where you left off."', source: "OpenAI Realtime API developer" },
                { quote: '"This is NOT a durable delivery format, it is purely fire-n-forget."', source: "Temporal maintainer, on frontend delivery" },
                { quote: 'Feature request for WebSocket human-input event streams — technically detailed, with a pull request offered. Closed as "not planned."', source: "CrewAI, GitHub Issue #3259" },
                { quote: '"A critical 2-hour founder strategy session that cannot be recreated." On a call stuck in "ongoing" status with no transcript recovery.', source: "Retell AI community" },
                { quote: '"Subscriptions are lost in all cases when the tab running realtime is not in focus."', source: "Supabase documentation" },
              ].map((q, i) => (
                <GlitchCard key={i} className="g-card">
                  <p className="text-sm text-gray-300 italic mb-3">{q.quote}</p>
                  <p className="text-xs text-cyan-400/60 font-mono">{q.source}</p>
                </GlitchCard>
              ))}
            </div>
          </div>
        </section>

        {/* ── Durable Execution + Durable Sessions complement ── */}
        <section ref={complementRef} className="px-8 py-16">
          <div className="reveal-section max-w-3xl mx-auto rounded-xl border border-indigo-500/15 bg-indigo-500/[0.03] p-8 md:p-10">
            <span className="font-mono text-xs text-indigo-400/60 tracking-widest uppercase">// complementary layers</span>
            <h2 className="text-2xl md:text-3xl font-bold mt-3 mb-4 tracking-tight">
              Durable Execution + Durable Sessions
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Durable Execution (Temporal, Restate, Inngest) made the agent bulletproof — workflows survive crashes,
              retries are automatic, state is checkpointed. But durable execution has no mechanism for streaming results
              to a user&apos;s screen. The agent survives. The experience doesn&apos;t.
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              Durable Sessions makes the experience bulletproof. The user sees every token, on every device, even through
              disconnects. If the user goes offline, the session is there when they come back. If the agent crashes,
              the user knows immediately.
            </p>
            <p className="text-gray-300 font-medium">
              Both layers are needed. Neither alone is sufficient for production AI.
            </p>
          </div>
        </section>

        {/* ── Who's talking about this ── */}
        <section ref={talkingRef} className="px-8 py-24 bg-white/[0.01]">
          <div className="max-w-5xl mx-auto">
            <div className="reveal-section text-center mb-16">
              <span className="font-mono text-xs text-cyan-400/60 tracking-widest uppercase">// the conversation</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 tracking-tight">
                Who&apos;s talking about this
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                The concept of durable sessions is being discussed across blog posts, X threads, protocol specs, and conference talks.
              </p>
            </div>

            <div className="card-grid grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { source: "James Arthur, ElectricSQL", title: '"Durable Sessions — the key pattern for collaborative AI"', meta: "Blog post · Jan 2026 · 75K views on X", href: "https://electric-sql.com/blog/2026/01/12/durable-sessions-for-collaborative-ai" },
                { source: "Kyle Mathews & Sam Willis, ElectricSQL", title: '"Announcing Durable Streams"', meta: "Blog post · Dec 2025 · 1,400 GitHub stars", href: "https://electric-sql.com/blog/2025/12/09/announcing-durable-streams" },
                { source: "Temporal", title: "Series D: $5B valuation validates \"Durable Execution\" category", meta: "Feb 2026 · AWS adopted the term for Lambda Durable Functions", href: "https://temporal.io/blog/temporal-raises-usd300m-series-d-at-a-usd5b-valuation" },
                { source: "Ian Macartney, Convex", title: '"Agents Need Durable Workflows and Strong Guarantees"', meta: "Blog post", href: "https://stack.convex.dev/durable-workflows-and-strong-guarantees" },
                { source: "Stephan Ewen, Restate", title: '"Durable AI Loops"', meta: "Blog post · Apache Flink co-creator on durable agents", href: "https://www.restate.dev/blog/durable-ai-loops-fault-tolerance-across-frameworks-and-without-handcuffs" },
                { source: "Upstash", title: '"How to Build LLM Streams That Survive Reconnects"', meta: "Blog post", href: "https://upstash.com/blog/resumable-llm-streams" },
                { source: "Felipe Mautner, Stardrift", title: '"Is resumable LLM streaming hard? No, it\'s just annoying."', meta: "Blog post · Practitioner perspective (YC-backed)", href: "https://stardrift.ai/blog/streaming-resumptions" },
                { source: "Vercel AI SDK", title: "ChatTransport & the WebSocket transport discussion", meta: "GitHub Issue #6502", href: "https://github.com/vercel/ai/issues/6502" },
              ].map((r) => (
                <a key={r.title} href={r.href} target="_blank" rel="noopener noreferrer" className="block">
                  <GlitchCard className="g-card h-full hover:border-cyan-500/30">
                    <p className="text-xs text-cyan-400/60 font-mono mb-2">{r.source}</p>
                    <p className="text-sm text-gray-200 font-medium mb-2">{r.title}</p>
                    <p className="text-xs text-gray-600">{r.meta}</p>
                  </GlitchCard>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── Further Reading ── */}
        <section ref={refsRef} className="px-8 py-24">
          <div className="max-w-5xl mx-auto">
            <div className="reveal-section text-center mb-12">
              <span className="font-mono text-xs text-cyan-400/60 tracking-widest uppercase">// references</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4 tracking-tight">Further reading</h2>
            </div>

            <div className="card-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { source: "Ably", title: "AI Transport — Durable Sessions Infrastructure", href: "https://ably.com/ai-transport" },
                { source: "AG-UI Protocol", title: "Architecture — Transport Agnostic Design", href: "https://docs.ag-ui.com/concepts/architecture" },
                { source: "Convex", title: "Agent Component — Persistent Threads", href: "https://www.convex.dev/components/agent" },
                { source: "ElectricSQL", title: "Durable Sessions", href: "https://electric-sql.com/blog/2026/01/12/durable-sessions-for-collaborative-ai" },
                { source: "EMQX", title: "Durable Sessions — MQTT Session Durability", href: "https://docs.emqx.com/en/emqx/latest/durability/durability_introduction.html" },
                { source: "TanStack AI", title: "ConnectionAdapter — Pluggable Transport", href: "https://tanstack.com/ai/latest/docs/guides/connection-adapters" },
                { source: "Upstash", title: "Resumable AI SDK v5 Streams", href: "https://upstash.com/blog/realtime-ai-sdk" },
                { source: "Vercel AI SDK", title: "ChatTransport & Durable Agent Discussion", href: "https://github.com/vercel/ai/issues/6502" },
              ].map((r) => (
                <a key={r.href} href={r.href} target="_blank" rel="noopener noreferrer" className="block">
                  <GlitchCard className="g-card h-full hover:border-cyan-500/30">
                    <p className="text-[10px] text-cyan-400/60 font-mono mb-1.5">{r.source}</p>
                    <p className="text-xs text-gray-300">{r.title}</p>
                  </GlitchCard>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            PART 3 — CTA
            ════════════════════════════════════════ */}

        <section id="cta" ref={ctaRef} className="px-8 py-32">
          <div className="max-w-3xl mx-auto text-center">
            <div className="reveal-section">
              <span className="font-mono text-xs text-cyan-400/60 tracking-widest uppercase">// get involved</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 tracking-tight">
                <GlitchText intensity={0.5}>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                    The layer is emerging
                  </span>
                </GlitchText>
              </h2>
              <p className="text-gray-400 text-lg max-w-xl mx-auto mb-12">
                If you believe in durable sessions and see the value, try the vendors
                leading this space. If you want to shape the definition, get involved.
              </p>
            </div>

            {/* Try it */}
            <div className="reveal-section grid sm:grid-cols-2 gap-4 mb-12">
              <a
                href="https://electric-sql.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-cyan-500/20 bg-cyan-500/[0.03] p-6 text-left hover:border-cyan-500/40 hover:bg-cyan-500/[0.06] transition-all"
              >
                <div className="font-semibold text-cyan-400 mb-2 group-hover:text-cyan-300 transition-colors">ElectricSQL</div>
                <p className="text-sm text-gray-500">
                  Durable Streams protocol, Durable Transports adapters for TanStack AI and Vercel AI SDK.
                </p>
                <span className="inline-block mt-3 font-mono text-xs text-cyan-400/60">electric-sql.com &rarr;</span>
              </a>
              <a
                href="https://ably.com/ai-transport"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-indigo-500/20 bg-indigo-500/[0.03] p-6 text-left hover:border-indigo-500/40 hover:bg-indigo-500/[0.06] transition-all"
              >
                <div className="font-semibold text-indigo-400 mb-2 group-hover:text-indigo-300 transition-colors">Ably</div>
                <p className="text-sm text-gray-500">
                  AI Transport — durable sessions as managed infrastructure between agents and human devices.
                </p>
                <span className="inline-block mt-3 font-mono text-xs text-indigo-400/60">ably.com/ai-transport &rarr;</span>
              </a>
            </div>

            {/* Contribute */}
            <div className="reveal-section flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <a
                href="https://github.com/ably/durablesessions.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg bg-white/[0.05] border border-white/10 text-gray-300 font-mono text-sm hover:border-white/20 hover:bg-white/[0.08] transition-all"
              >
                Contribute on GitHub
              </a>
              <a
                href="https://github.com/ably/durablesessions.ai/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg border border-white/10 text-gray-400 font-mono text-sm hover:border-white/20 hover:text-gray-300 transition-all"
              >
                Open a PR or Issue
              </a>
            </div>

            {/* Personal reach-out */}
            <div className="reveal-section rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 max-w-md mx-auto">
              <p className="text-sm text-gray-400 mb-3">
                This project is spearheaded by{" "}
                <strong className="text-gray-200">Matthew O&apos;Riordan</strong>, CEO at Ably.
                If you want to talk about durable sessions, partner on advancing this thinking,
                or explore how this applies to your stack — reach out.
              </p>
              <a
                href="https://www.linkedin.com/in/mattheworiordan/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-mono text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Connect on LinkedIn &rarr;
              </a>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="px-8 py-12 border-t border-white/5">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-600">
            <p>
              Durable Sessions is an open resource tracking the emergence of session infrastructure for AI.
            </p>
            <p className="font-mono">
              &copy; 2026 durablesessions.ai
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
