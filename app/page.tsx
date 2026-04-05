"use client";

import { useEffect, useRef } from "react";
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

/* ── Chat bubble for visual storytelling ── */
function ChatBubble({
  from,
  children,
  className = "",
  faded = false,
}: {
  from: "agent" | "user";
  children: React.ReactNode;
  className?: string;
  faded?: boolean;
}) {
  const isAgent = from === "agent";
  return (
    <div className={`flex ${isAgent ? "justify-start" : "justify-end"} ${className}`}>
      <div
        className={`max-w-[280px] px-4 py-2.5 rounded-xl text-sm leading-relaxed ${
          isAgent
            ? "bg-cyan-500/10 border border-cyan-500/20 text-cyan-300/90 rounded-bl-sm"
            : "bg-indigo-500/10 border border-indigo-500/20 text-indigo-300/90 rounded-br-sm"
        } ${faded ? "opacity-30" : ""}`}
      >
        <div className="font-mono text-[10px] text-gray-500 mb-1">
          {isAgent ? "agent" : "user"}
        </div>
        {children}
      </div>
    </div>
  );
}

/* ── Stack diagram layer ── */
function StackLayer({
  label,
  detail,
  color,
  highlighted = false,
}: {
  label: string;
  detail: string;
  color: "indigo" | "cyan" | "emerald";
  highlighted?: boolean;
}) {
  const colors = {
    indigo: {
      border: highlighted ? "border-indigo-500/40" : "border-indigo-500/20",
      bg: highlighted ? "bg-indigo-500/10" : "bg-indigo-500/5",
      text: "text-indigo-400",
      glow: highlighted ? "shadow-[0_0_30px_rgba(99,102,241,0.15)]" : "",
    },
    cyan: {
      border: highlighted ? "border-cyan-500/40" : "border-cyan-500/20",
      bg: highlighted ? "bg-cyan-500/10" : "bg-cyan-500/5",
      text: "text-cyan-400",
      glow: highlighted ? "shadow-[0_0_30px_rgba(6,182,212,0.2)]" : "",
    },
    emerald: {
      border: highlighted ? "border-emerald-500/40" : "border-emerald-500/20",
      bg: highlighted ? "bg-emerald-500/10" : "bg-emerald-500/5",
      text: "text-emerald-400",
      glow: highlighted ? "shadow-[0_0_30px_rgba(16,185,129,0.15)]" : "",
    },
  };
  const c = colors[color];

  return (
    <div className={`fade-in-child rounded-lg border ${c.border} ${c.bg} ${c.glow} px-6 py-4 transition-all duration-500`}>
      <div className="flex items-center justify-between">
        <div>
          <div className={`font-semibold ${c.text} ${highlighted ? "text-base" : "text-sm"}`}>
            {label}
          </div>
          <div className="text-xs text-gray-500 mt-1">{detail}</div>
        </div>
        {highlighted && (
          <div className="font-mono text-[10px] text-cyan-400/60 border border-cyan-500/20 px-2 py-1 rounded">
            &#x25C0; this layer
          </div>
        )}
      </div>
      {highlighted && (
        <div className="grid grid-cols-4 gap-2 mt-4">
          {["Streaming", "State", "Presence", "Lifecycle"].map((cap) => (
            <div key={cap} className="text-center py-1.5 rounded bg-cyan-500/[0.08] border border-cyan-500/10">
              <span className="text-[10px] font-mono text-cyan-400/70">{cap}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function PrototypeBFull() {
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
        scrollTrigger: { trigger: ".sb1", start: "top 80%", end: "top 35%", scrub: 1 },
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
      // Chat bubbles glitch out
      gsap.to(".sb1-chat-fade", {
        scrollTrigger: { trigger: ".sb1", start: "40% center", end: "70% center", scrub: 1 },
        opacity: 0.15, x: () => gsap.utils.random(-10, 10), stagger: 0.05,
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
      // Chat resumes
      gsap.from(".sb2-chat-resume", {
        scrollTrigger: { trigger: ".sb2", start: "30% 70%", end: "60% center", scrub: 1 },
        opacity: 0, y: 15, stagger: 0.08,
      });

      /* ── Scroll beat 3: Device handoff ── */
      const tl3 = gsap.timeline({
        scrollTrigger: { trigger: ".sb3", start: "top 65%", end: "bottom 35%", scrub: 1 },
      });
      tl3.from(".sb3-session-core", { scale: 0.8, opacity: 0, duration: 0.3 });
      tl3.from(".sb3-device-a", { x: -150, opacity: 0, duration: 0.4 });
      tl3.from(".sb3-connector-a", { scaleX: 0, duration: 0.2 });
      tl3.to(".sb3-device-a", { opacity: 0.3, duration: 0.3 });
      tl3.to(".sb3-connector-a", { opacity: 0.2, duration: 0.2 }, "<");
      tl3.from(".sb3-connector-b", { scaleX: 0, duration: 0.2 });
      tl3.from(".sb3-device-b", { x: 150, opacity: 0, duration: 0.4 }, "-=0.2");
      tl3.from(".sb3-text", { opacity: 0, y: 20, stagger: 0.1, duration: 0.3 });

      /* ── Scroll beat 4: Crash / recovery ── */
      const tl4 = gsap.timeline({
        scrollTrigger: { trigger: ".sb4", start: "top 65%", end: "bottom 35%", scrub: 1 },
      });
      tl4.from(".sb4-pre", { opacity: 0, y: 20, duration: 0.2 });
      // Show agent connected, then it disconnects
      tl4.from(".sb4-agent-box", { opacity: 0, x: -40, duration: 0.3 });
      tl4.from(".sb4-session-box", { opacity: 0, scale: 0.9, duration: 0.2 });
      tl4.from(".sb4-device-box", { opacity: 0, x: 40, duration: 0.3 }, "-=0.2");
      // Agent crashes
      tl4.to(".sb4-agent-box", { opacity: 0, filter: "blur(4px)", duration: 0.15 });
      tl4.to(".sb4-agent-link", { opacity: 0, duration: 0.1 }, "<");
      // Device stays connected (pulse the connection)
      tl4.to(".sb4-device-link", { opacity: 1, duration: 0.1 });
      // New agent arrives
      tl4.from(".sb4-agent-new", { opacity: 0, x: -40, filter: "blur(4px)", duration: 0.3 });
      tl4.from(".sb4-agent-new-link", { scaleX: 0, duration: 0.2 });
      tl4.from(".sb4-post", { opacity: 0, y: 20, stagger: 0.1, duration: 0.3 });

    });

    /* ── Content reveals via IntersectionObserver (robust, no GSAP) ── */
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".fade-in, .fade-in-stagger:not(.visible)").forEach((el) => observer.observe(el));

    /* ── Stat count-up via IntersectionObserver ── */
    const statObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const target = parseInt(el.getAttribute("data-target") || "0", 10);
            gsap.fromTo(el, { textContent: 0 }, {
              textContent: target, duration: 1.5, ease: "power2.out", snap: { textContent: 1 },
            });
            statObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".count-up").forEach((el) => statObserver.observe(el));

    return () => {
      ctx.revert();
      observer.disconnect();
      statObserver.disconnect();
    };
  }, []);

  return (
    <>
      <ScanLines />
      <GlitchCanvas />
      <SessionIndicator />

      {/* ── Navigation ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-8 py-4 bg-[#07070e]/80 backdrop-blur-sm border-b border-white/5">
        <a href="/" className="flex items-center gap-2">
          <span className="font-mono text-sm font-bold text-cyan-400 tracking-widest">DS</span>
          <span className="text-sm font-medium text-gray-300 hidden sm:inline">Durable Sessions</span>
        </a>
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
            PART 1: THE HOOK (scroll narrative)
            ════════════════════════════════════════ */}

        {/* ── Hero ── */}
        <section className="min-h-screen flex items-center justify-center px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="glitch-hero-line inline-block mb-8 px-4 py-2 border border-cyan-500/20 rounded">
              <span className="font-mono text-xs text-cyan-400 tracking-[0.3em] uppercase">
                // an emerging AI infrastructure category
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

            <div className="glitch-hero-line max-w-2xl mx-auto mb-8 space-y-2">
              <p className="text-lg text-gray-400">
                Durable Execution made backends crash-proof.
              </p>
              <p className="text-lg text-gray-200 font-medium">
                Durable Sessions makes the experience crash-proof.
              </p>
            </div>

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
        <section className="sb1 min-h-[60vh] flex items-center justify-center px-8 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <div className="sb1-enter mb-6">
              <div className="inline-flex items-center gap-3 px-5 py-3 rounded bg-red-500/10 border border-red-500/20">
                <span className="font-mono text-sm text-red-400">&#x26A0; SIGNAL INTERRUPTED</span>
              </div>
            </div>

            {/* Chat that glitches out */}
            <div className="sb1-enter max-w-sm mx-auto space-y-3 mb-8">
              <ChatBubble from="user" className="sb1-chat-fade">Can you summarize the Q3 report?</ChatBubble>
              <ChatBubble from="agent" className="sb1-chat-fade">Based on the data, revenue grew 23% with...</ChatBubble>
              <div className="sb1-chat-fade flex items-center gap-2 text-red-400/60 font-mono text-xs justify-center py-2">
                <span className="inline-block w-4 h-px bg-red-500/40" />
                HTTP stream closed
                <span className="inline-block w-4 h-px bg-red-500/40" />
              </div>
            </div>

            <div className="relative mb-4">
              <h2 className="sb1-enter text-4xl md:text-5xl font-bold tracking-tight relative z-10">Connection severed</h2>
              <h2 className="sb1-split-r absolute inset-0 text-4xl md:text-5xl font-bold tracking-tight text-red-500/50" style={{ mixBlendMode: "screen" }} aria-hidden="true">Connection severed</h2>
              <h2 className="sb1-split-b absolute inset-0 text-4xl md:text-5xl font-bold tracking-tight text-cyan-500/50" style={{ mixBlendMode: "screen" }} aria-hidden="true">Connection severed</h2>
            </div>
            <p className="sb1-enter text-gray-400 text-lg max-w-lg mx-auto">
              The HTTP stream closes. The transport layer is gone.
              But the session ID persists on both sides.
            </p>
          </div>
        </section>

        {/* ── Scroll Beat 2: Reconnection ── */}
        <section className="sb2 min-h-[60vh] flex items-center justify-center px-8 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex flex-col items-center gap-2 mb-8">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="sb2-line h-0.5 origin-left" style={{
                  width: `${100 + i * 25}px`,
                  background: `linear-gradient(to right, rgba(99,102,241,${0.2 + i * 0.12}), rgba(6,182,212,${0.2 + i * 0.12}))`,
                  transform: `translateX(${(i - 2) * 6}px)`,
                }} />
              ))}
            </div>
            <div className="sb2-text inline-flex items-center gap-3 px-5 py-3 rounded bg-emerald-500/10 border border-emerald-500/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="font-mono text-sm text-emerald-400">SIGNAL LOCKED</span>
            </div>

            {/* Chat resumes */}
            <div className="max-w-sm mx-auto space-y-3 mb-8">
              <ChatBubble from="agent" className="sb2-chat-resume" faded>Based on the data, revenue grew 23% with...</ChatBubble>
              <div className="sb2-chat-resume flex items-center gap-2 text-emerald-400/60 font-mono text-xs justify-center py-2">
                <span className="inline-block w-4 h-px bg-emerald-500/40" />
                session resumed - replaying from cursor
                <span className="inline-block w-4 h-px bg-emerald-500/40" />
              </div>
              <ChatBubble from="agent" className="sb2-chat-resume">...the strongest growth in enterprise, up 34% YoY. Here are the key takeaways:</ChatBubble>
            </div>

            <h2 className="sb2-text text-4xl md:text-5xl font-bold mb-4 tracking-tight">Signal restored</h2>
            <p className="sb2-text text-gray-400 text-lg max-w-lg mx-auto">
              New transport established. Session state synchronized. Every event replayed in order, zero data loss.
            </p>
          </div>
        </section>

        {/* ── Scroll Beat 3: Device Handoff ── */}
        <section className="sb3 min-h-[60vh] flex items-center justify-center px-8 py-16">
          <div className="max-w-3xl mx-auto text-center">
            {/* Entity diagram: Device A -> Session -> Device B */}
            <div className="flex items-center justify-center gap-3 md:gap-4 mb-12">
              {/* Device A (fades out) */}
              <div className="sb3-device-a w-28 md:w-32 rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-3 text-center">
                <div className="font-mono text-[10px] text-cyan-400 mb-2">device_a</div>
                <div className="w-6 h-10 mx-auto border border-cyan-500/30 rounded bg-cyan-500/5" />
                <div className="font-mono text-[10px] text-gray-600 mt-2">mobile</div>
              </div>

              {/* Connector A */}
              <div className="sb3-connector-a w-8 md:w-12 h-0.5 bg-gradient-to-r from-cyan-500/50 to-cyan-500/30 origin-left" />

              {/* Session (stays solid) */}
              <div className="sb3-session-core w-32 md:w-40 rounded-lg border-2 border-cyan-500/40 bg-cyan-500/[0.08] p-3 text-center shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                <div className="font-mono text-xs font-bold text-cyan-400 mb-1">SESSION</div>
                <div className="font-mono text-[10px] text-gray-500">ds_7f3k9x</div>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="font-mono text-[10px] text-emerald-400">active</span>
                </div>
              </div>

              {/* Connector B */}
              <div className="sb3-connector-b w-8 md:w-12 h-0.5 bg-gradient-to-r from-indigo-500/30 to-indigo-500/50 origin-left" />

              {/* Device B (fades in) */}
              <div className="sb3-device-b w-28 md:w-32 rounded-lg border border-indigo-500/20 bg-indigo-500/5 p-3 text-center">
                <div className="font-mono text-[10px] text-indigo-400 mb-2">device_b</div>
                <div className="w-10 h-7 mx-auto border border-indigo-500/30 rounded bg-indigo-500/5" />
                <div className="font-mono text-[10px] text-gray-600 mt-2">desktop</div>
              </div>
            </div>

            <h2 className="sb3-text text-4xl md:text-5xl font-bold mb-4 tracking-tight">Different device, same session</h2>
            <p className="sb3-text text-gray-400 text-lg max-w-lg mx-auto">
              The session isn&apos;t bound to a device. It&apos;s bound to the workflow.
              Device A disconnects, Device B attaches. Full state, right where you left off.
            </p>
          </div>
        </section>

        {/* ── Scroll Beat 4: Agent Crash & Recovery ── */}
        <section className="sb4 min-h-[60vh] flex items-center justify-center px-8 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <p className="sb4-pre font-mono text-sm text-gray-500 mb-8">agent process killed, PID 4892</p>

            {/* Entity diagram: Agent -> Session <- Device */}
            <div className="flex items-center justify-center gap-3 md:gap-4 mb-6">
              {/* Agent (crashes) */}
              <div className="relative">
                <div className="sb4-agent-box w-28 md:w-32 rounded-lg border border-indigo-500/20 bg-indigo-500/5 p-3 text-center">
                  <div className="font-mono text-[10px] text-indigo-400 mb-1">agent_1</div>
                  <div className="font-mono text-[10px] text-red-400">CRASHED</div>
                </div>
                {/* New agent appears below */}
                <div className="sb4-agent-new absolute -bottom-14 left-0 right-0 w-28 md:w-32 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3 text-center">
                  <div className="font-mono text-[10px] text-emerald-400 mb-1">agent_2</div>
                  <div className="font-mono text-[10px] text-emerald-400">ATTACHED</div>
                </div>
              </div>

              {/* Connectors */}
              <div className="flex flex-col gap-12 items-center">
                <div className="sb4-agent-link w-8 md:w-12 h-0.5 bg-red-500/30 origin-left" />
                <div className="sb4-agent-new-link w-8 md:w-12 h-0.5 bg-emerald-500/50 origin-left" />
              </div>

              {/* Session (always solid) */}
              <div className="sb4-session-box w-32 md:w-40 rounded-lg border-2 border-cyan-500/40 bg-cyan-500/[0.08] p-3 text-center shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                <div className="font-mono text-xs font-bold text-cyan-400 mb-1">SESSION</div>
                <div className="font-mono text-[10px] text-gray-500">ds_7f3k9x</div>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="font-mono text-[10px] text-emerald-400">active</span>
                </div>
              </div>

              {/* Connector to device */}
              <div className="sb4-device-link w-8 md:w-12 h-0.5 bg-cyan-500/50 origin-right" />

              {/* Device (stays connected) */}
              <div className="sb4-device-box w-28 md:w-32 rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-3 text-center">
                <div className="font-mono text-[10px] text-cyan-400 mb-1">device</div>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="font-mono text-[10px] text-emerald-400">connected</span>
                </div>
              </div>
            </div>

            <div className="h-8" />

            <h2 className="sb4-post text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              <GlitchText intensity={0.5}>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Agent crashes. Session doesn&apos;t.</span>
              </GlitchText>
            </h2>
            <p className="sb4-post text-gray-400 text-lg max-w-lg mx-auto">
              The device stays connected to the session. A new agent attaches and picks up exactly where the old one left off. Same state, same cursor, same conversation.
            </p>
          </div>
        </section>

        {/* ════════════════════════════════════════
            PART 2: THE SUBSTANCE
            ════════════════════════════════════════ */}

        <div className="max-w-xs mx-auto my-12 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

        {/* ── The Problem ── */}
        <section id="problem" className="px-8 py-20">
          <div className="max-w-5xl mx-auto">
            <div className="fade-in text-center mb-14">
              <span className="font-mono text-xs text-cyan-400/60 tracking-widest uppercase">// the problem</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 tracking-tight">
                <GlitchText intensity={0.8}>The session has no home</GlitchText>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                AI agents have state. Durable execution platforms persist workflow state. Databases store data.
                But no layer owns the <em className="text-cyan-400/80">session</em> -
                the stateful interaction between an agent and the humans it serves.
              </p>
            </div>

            <div className="fade-in-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: "&#x23FB;", title: "Disconnects", desc: "Stream dies on network drop. User restarts from scratch." },
                { icon: "&#x25A1;", title: "Devices", desc: "Conversation started on phone can't continue on laptop." },
                { icon: "&#x2750;", title: "Tabs", desc: "Opening a second tab creates a second, disconnected session." },
                { icon: "&#x2699;", title: "Agents", desc: "Multi-agent handoff loses context. Crashed agent looks like a thinking one." },
                { icon: "&#x23F1;", title: "Time", desc: "Background task completes after user leaves. Result is lost." },
                { icon: "&#x260E;", title: "Modalities", desc: "Voice call can't transition to text without losing state." },
              ].map((card) => (
                <GlitchCard key={card.title} className="fade-in-child">
                  <div className="text-cyan-400/60 text-lg mb-2 font-mono" dangerouslySetInnerHTML={{ __html: card.icon }} />
                  <h3 className="font-semibold text-gray-200 mb-2">{card.title}</h3>
                  <p className="text-sm text-gray-500">{card.desc}</p>
                </GlitchCard>
              ))}
            </div>

            <blockquote className="fade-in mt-10 border-l-2 border-cyan-500/30 pl-6 text-gray-400 italic max-w-2xl mx-auto">
              Every team building serious AI products hand-rolls fragile session infrastructure from scratch.
            </blockquote>
          </div>
        </section>

        {/* ── SSE Banner ── */}
        <section className="px-8 py-12">
          <div className="fade-in max-w-3xl mx-auto rounded-xl border border-cyan-500/15 bg-cyan-500/[0.03] p-8 md:p-10">
            <span className="font-mono text-xs text-cyan-400/60 tracking-widest uppercase">// the signal</span>
            <h2 className="text-2xl md:text-3xl font-bold mt-3 mb-4 tracking-tight">
              The incumbent approach has been considered inadequate
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              HTTP streaming was the default. Now the ecosystem is moving past it. Vercel built a pluggable{" "}
              <code className="text-cyan-400/80 bg-cyan-500/10 px-1.5 py-0.5 rounded text-sm">ChatTransport</code>{" "}
              interface and told the community to bring their own transport implementations.
              TanStack AI shipped a{" "}
              <code className="text-cyan-400/80 bg-cyan-500/10 px-1.5 py-0.5 rounded text-sm">ConnectionAdapter</code>{" "}
              designed for third-party providers. CrewAI explicitly rejected building
              transport features as &quot;not planned.&quot;
            </p>
            <p className="text-gray-300 font-medium">
              The ecosystem has diagnosed the problem, designed the plugin points, and is waiting for someone to show up with the infrastructure.
            </p>
          </div>
        </section>

        <div className="max-w-xs mx-auto my-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* ── Definition ── */}
        <section id="definition" className="px-8 py-20">
          <div className="max-w-5xl mx-auto">
            <div className="fade-in text-center mb-10">
              <span className="font-mono text-xs text-cyan-400/60 tracking-widest uppercase">// definition</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 tracking-tight">
                What is a Durable Session?
              </h2>
            </div>

            <div className="fade-in grid md:grid-cols-[2fr_1fr] gap-8 mb-14">
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>
                  A <strong className="text-gray-200">durable session</strong>{" "}is a persistent,
                  addressable session that sits between agents and users as the medium through which they interact.
                  It&apos;s not a connection - connections break. It&apos;s not a channel - channels are a transport primitive.
                </p>
                <p>
                  A durable session is the stateful layer that <em className="text-cyan-400/80">outlives any single connection</em>,
                  and that any participant - user, agent, device, service - can join, leave, and return to over time.
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
            <div className="fade-in-stagger grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
              <GlitchCard className="fade-in-child">
                <h3 className="font-semibold text-gray-200 mb-2">Reliable streaming &amp; resilience</h3>
                <p className="text-sm text-gray-500">
                  Streams that survive disconnects, proxy interference, and reconnections.
                  No corrupted state, no lost tokens. The stream picks up where it left off.
                </p>
              </GlitchCard>
              <GlitchCard className="fade-in-child">
                <h3 className="font-semibold text-gray-200 mb-2">Session continuity across surfaces</h3>
                <p className="text-sm text-gray-500">
                  The same session accessible from any device. Start on your laptop, continue on your phone.
                  Three delivery paths: connected (realtime), reconnecting (catch-up), offline (push notification).
                </p>
              </GlitchCard>
              <GlitchCard className="fade-in-child">
                <h3 className="font-semibold text-gray-200 mb-2">Agent visibility &amp; coordination</h3>
                <p className="text-sm text-gray-500">
                  Is the agent thinking or crashed? When multiple agents work the same session, who&apos;s doing what?
                  Presence, health signals, bidirectional control, and human takeover.
                </p>
              </GlitchCard>
            </div>

            {/* Stack position diagram - enhanced */}
            <div className="fade-in-stagger max-w-lg mx-auto">
              <h3 className="font-mono text-xs text-gray-500 text-center mb-6 tracking-widest uppercase">Where it sits in the stack</h3>
              <div className="space-y-0">
                <StackLayer label="Agent Layer" detail="LLMs, Tools, Memory, Durable Execution" color="indigo" />
                <div className="fade-in-child flex justify-center">
                  <div className="w-px h-6 bg-gradient-to-b from-indigo-500/30 to-cyan-500/30 origin-top" />
                </div>
                <StackLayer label="Durable Sessions" detail="The stateful layer between agents and users" color="cyan" highlighted />
                <div className="fade-in-child flex justify-center">
                  <div className="w-px h-6 bg-gradient-to-b from-cyan-500/30 to-emerald-500/30 origin-top" />
                </div>
                <StackLayer label="Client Layer" detail="UI, Devices, Tabs, Modalities" color="emerald" />
              </div>
            </div>
          </div>
        </section>

        {/* ── Convergence ── */}
        <section id="convergence" className="px-8 py-20 bg-white/[0.01]">
          <div className="max-w-5xl mx-auto">
            <div className="fade-in text-center mb-14">
              <span className="font-mono text-xs text-cyan-400/60 tracking-widest uppercase">// convergence</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 tracking-tight">
                Multiple vendors, same conclusion
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Independently, across different stacks and use cases, companies are converging on the same
                missing layer. Nobody orchestrated this. The pattern emerged.
              </p>
            </div>

            <div className="fade-in-stagger grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: "ElectricSQL", what: "Published \"Durable Sessions\" blog post (Jan 2026). Shipped Durable Streams protocol (1,400 GitHub stars). Announced \"Durable Transports\" adapters for TanStack AI and Vercel AI SDK.", date: "Dec 2025 - Mar 2026", href: "https://electric-sql.com" },
                { name: "EMQX", what: "\"Durable Sessions\" as a named MQTT feature - session state surviving broker restarts.", date: "Production feature", href: "https://docs.emqx.com/en/emqx/latest/durability/durability_introduction.html" },
                { name: "Vercel", what: "Building @ai-sdk/durable-agent. Pluggable ChatTransport in AI SDK v5.", date: "In development", href: "https://vercel.com/ai" },
                { name: "Ably", what: "AI Transport - durable sessions as the infrastructure layer between agents and human devices.", date: "March 2026", href: "https://ably.com/ai-transport" },
                { name: "Upstash", what: "\"Resumable AI SDK Streams\" using Redis Streams for stream recovery.", date: "Published solution", href: "https://upstash.com/blog/resumable-llm-streams" },
                { name: "Convex", what: "Agent component with persistent threads, durable workflows, and real-time sync.", date: "Agent component", href: "https://www.convex.dev/components/agent" },
                { name: "Temporal", what: "Coined \"Durable Execution\" ($5B valuation). Their community recommends external realtime providers for frontend delivery.", date: "Established category", href: "https://temporal.io" },
                { name: "AG-UI", what: "Built pluggable transport from the ground up. The protocol moved beyond fixed transport assumptions.", date: "2025", href: "https://ag-ui.com" },
                { name: "TanStack AI", what: "ConnectionAdapter interface - explicitly designed for third-party transport providers.", date: "Documentation", href: "https://tanstack.com/ai" },
                { name: "Cloudflare", what: "Agents SDK with Durable Objects for stateful sessions. Added resumable streaming (Nov 2025). 15+ releases in 13 months.", date: "2025 - 2026", href: "https://developers.cloudflare.com/agents" },
                { name: "Restate", what: "Durable execution for AI agents. \"Durable AI Loops\" - pushing durable execution toward the session boundary.", date: "2025 - 2026", href: "https://restate.dev" },
                { name: "Inngest", what: "Built Realtime on top of durable functions to bridge the gap between backend execution and client delivery.", date: "May 2025", href: "https://www.inngest.com" },
                { name: "Kitaru", what: "Durable execution for Python AI agents. Checkpoint/replay, wait/resume for human-in-the-loop, durable agent memory, and execution management dashboard.", date: "Open source, 2026", href: "https://kitaru.ai" },
              ].map((v) => (
                <a key={v.name} href={v.href} target="_blank" rel="noopener noreferrer" className="block">
                  <GlitchCard className="fade-in-child h-full hover:border-cyan-500/30">
                    <div className="flex items-baseline justify-between mb-2">
                      <h3 className="font-semibold text-cyan-400">{v.name}</h3>
                      <span className="font-mono text-[10px] text-gray-600">{v.date}</span>
                    </div>
                    <p className="text-sm text-gray-400">{v.what}</p>
                  </GlitchCard>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="px-8 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="fade-in grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-10">
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
            <p className="fade-in text-center text-xs text-gray-600 mb-10">
              Based on a cross-vendor analysis of 37 AI infrastructure vendors, March 2026.
            </p>

            <div className="fade-in">
              <h3 className="font-mono text-xs text-gray-500 text-center mb-4 tracking-widest uppercase">Vendors analysed</h3>
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs">
                {[
                  { name: "Ably", href: "https://ably.com/ai-transport" },
                  { name: "Vercel AI SDK", href: "https://vercel.com/ai" },
                  { name: "LangChain / LangGraph", href: "https://www.langchain.com/langgraph" },
                  { name: "TanStack AI", href: "https://tanstack.com/ai" },
                  { name: "AG-UI / CopilotKit", href: "https://ag-ui.com" },
                  { name: "Mastra", href: "https://mastra.ai" },
                  { name: "OpenAI Agents SDK", href: "https://platform.openai.com/docs/guides/agents-sdk" },
                  { name: "Claude Agent SDK", href: "https://docs.anthropic.com/en/docs/agents-and-tools/claude-code" },
                  { name: "CrewAI", href: "https://www.crewai.com" },
                  { name: "Pydantic AI", href: "https://ai.pydantic.dev" },
                  { name: "Temporal", href: "https://temporal.io" },
                  { name: "Restate", href: "https://restate.dev" },
                  { name: "Inngest", href: "https://www.inngest.com" },
                  { name: "Kitaru", href: "https://kitaru.ai" },
                  { name: "Trigger.dev", href: "https://trigger.dev" },
                  { name: "Convex", href: "https://www.convex.dev" },
                  { name: "Supabase", href: "https://supabase.com" },
                  { name: "Firebase", href: "https://firebase.google.com" },
                  { name: "Neon", href: "https://neon.tech" },
                  { name: "Upstash", href: "https://upstash.com" },
                  { name: "ElectricSQL", href: "https://electric-sql.com" },
                  { name: "PubNub", href: "https://www.pubnub.com" },
                  { name: "Pusher", href: "https://pusher.com" },
                  { name: "Socket.IO", href: "https://socket.io" },
                  { name: "LiveKit", href: "https://livekit.io" },
                  { name: "Pipecat / Daily", href: "https://www.pipecat.ai" },
                  { name: "ElevenLabs", href: "https://elevenlabs.io" },
                  { name: "Deepgram", href: "https://deepgram.com" },
                  { name: "Vapi", href: "https://vapi.ai" },
                  { name: "Retell AI", href: "https://www.retellai.com" },
                  { name: "Agora", href: "https://www.agora.io" },
                  { name: "OpenAI Realtime API", href: "https://platform.openai.com/docs/guides/realtime" },
                  { name: "Knock", href: "https://knock.app" },
                  { name: "Courier", href: "https://www.courier.com" },
                  { name: "Novu", href: "https://novu.co" },
                  { name: "OneSignal", href: "https://onesignal.com" },
                  { name: "Cloudflare Agents", href: "https://developers.cloudflare.com/agents" },
                  { name: "Liveblocks", href: "https://liveblocks.io" },
                  { name: "PartyKit", href: "https://partykit.io" },
                ].map((v) => (
                  <a key={v.name} href={v.href} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cyan-400/80 transition-colors">{v.name}</a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-xs mx-auto my-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* ── Why Infrastructure ── */}
        <section className="px-8 py-20">
          <div className="max-w-5xl mx-auto">
            <div className="fade-in text-center mb-10">
              <span className="font-mono text-xs text-cyan-400/60 tracking-widest uppercase">// an emerging AI infrastructure layer</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 tracking-tight">
                Not a feature. A layer.
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                A feature is &quot;sessions that don&apos;t break.&quot; An infrastructure layer is what makes it
                possible to build AI experiences that work across <em className="text-cyan-400/80">every</em> boundary:
                disconnects, devices, agents, modalities, and time.
              </p>
            </div>

            <div className="fade-in grid md:grid-cols-[1fr_auto_1fr] gap-6 max-w-3xl mx-auto">
              <div className="rounded-lg border border-indigo-500/15 bg-indigo-500/[0.03] p-6">
                <h4 className="font-semibold text-indigo-400 mb-4">
                  Durable Execution <span className="text-gray-600 font-normal text-xs">e.g. Temporal, Restate, Inngest</span>
                </h4>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li><strong className="text-gray-300">Bulletproofs:</strong> the agent running on the backend</li>
                  <li><strong className="text-gray-300">Outlives failure:</strong> the execution</li>
                  <li><strong className="text-gray-300">Stays stateless:</strong> your backend code</li>
                  <li><strong className="text-gray-300">Mental model:</strong> &quot;Write code as if failure doesn&apos;t exist&quot;</li>
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
                  <li><strong className="text-gray-300">Mental model:</strong> &quot;Build AI experiences as if disconnects don&apos;t exist&quot;</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Developer Voices ── */}
        <section id="developers" className="px-8 py-20 bg-white/[0.01]">
          <div className="max-w-5xl mx-auto">
            <div className="fade-in text-center mb-14">
              <span className="font-mono text-xs text-cyan-400/60 tracking-widest uppercase">// what developers are saying</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 tracking-tight">
                The same problems, everywhere
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Across GitHub issues, community forums, and Hacker News, developers building production AI applications
                keep describing the same infrastructure gaps. They don&apos;t call it &quot;durable sessions.&quot; They describe the pain.
              </p>
            </div>

            <div className="fade-in-stagger grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { quote: "\"I have an old production app with 50K+ users... been stuck for 3 weeks on agent.network() streaming.\"", source: "Mastra developer, GitHub" },
                { quote: "\"To solve this we would need to have a channel to the server that allows transporting that information. WebSockets are one option.\"", source: "Lars Grammel, Vercel AI SDK lead maintainer" },
                { quote: "\"We kept rewriting the same infrastructure to actually show agents to users.\"", source: "Pydantic AI developer, Hacker News" },
                { quote: "\"Reconnecting creates a new session. There's no way to pick up where you left off.\"", source: "OpenAI Realtime API developer" },
                { quote: "\"This is NOT a durable delivery format, it is purely fire-n-forget.\"", source: "Temporal maintainer, on frontend delivery" },
                { quote: "Feature request for WebSocket human-input event streams, technically detailed, with a pull request offered. Closed as \"not planned.\"", source: "CrewAI, GitHub Issue #3259" },
                { quote: "\"A critical 2-hour founder strategy session that cannot be recreated.\" On a call stuck in \"ongoing\" status with no transcript recovery.", source: "Retell AI community" },
                { quote: "\"Subscriptions are lost in all cases when the tab running realtime is not in focus.\"", source: "Supabase documentation" },
              ].map((q, i) => (
                <GlitchCard key={i} className="fade-in-child">
                  <p className="text-sm text-gray-300 italic mb-3">{q.quote}</p>
                  <p className="text-xs text-cyan-400/60 font-mono">{q.source}</p>
                </GlitchCard>
              ))}
            </div>
          </div>
        </section>

        {/* ── Durable Execution + Durable Sessions ── */}
        <section className="px-8 py-12">
          <div className="fade-in max-w-3xl mx-auto rounded-xl border border-indigo-500/15 bg-indigo-500/[0.03] p-8 md:p-10">
            <span className="font-mono text-xs text-indigo-400/60 tracking-widest uppercase">// complementary layers</span>
            <h2 className="text-2xl md:text-3xl font-bold mt-3 mb-4 tracking-tight">
              Durable Execution + Durable Sessions
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Durable Execution (Temporal, Restate, Inngest) made the agent bulletproof. Workflows survive crashes,
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

        {/* ── Who's talking ── */}
        <section className="px-8 py-20 bg-white/[0.01]">
          <div className="max-w-5xl mx-auto">
            <div className="fade-in text-center mb-14">
              <span className="font-mono text-xs text-cyan-400/60 tracking-widest uppercase">// the conversation</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 tracking-tight">
                Who&apos;s talking about this
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                The concept of durable sessions is being discussed across blog posts, X threads, protocol specs, and conference talks.
              </p>
            </div>

            <div className="fade-in-stagger grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { source: "James Arthur, ElectricSQL", title: "\"Durable Sessions - the key pattern for collaborative AI\"", meta: "Blog post, Jan 2026, 75K views on X", href: "https://electric-sql.com/blog/2026/01/12/durable-sessions-for-collaborative-ai" },
                { source: "Kyle Mathews & Sam Willis, ElectricSQL", title: "\"Announcing Durable Streams\"", meta: "Blog post, Dec 2025, 1,400 GitHub stars", href: "https://electric-sql.com/blog/2025/12/09/announcing-durable-streams" },
                { source: "Temporal", title: "Series D: $5B valuation validates \"Durable Execution\" category", meta: "Feb 2026, AWS adopted the term for Lambda Durable Functions", href: "https://temporal.io/blog/temporal-raises-usd300m-series-d-at-a-usd5b-valuation" },
                { source: "Ian Macartney, Convex", title: "\"Agents Need Durable Workflows and Strong Guarantees\"", meta: "Blog post", href: "https://stack.convex.dev/durable-workflows-and-strong-guarantees" },
                { source: "Stephan Ewen, Restate", title: "\"Durable AI Loops\"", meta: "Blog post, Apache Flink co-creator on durable agents", href: "https://www.restate.dev/blog/durable-ai-loops-fault-tolerance-across-frameworks-and-without-handcuffs" },
                { source: "Upstash", title: "\"How to Build LLM Streams That Survive Reconnects\"", meta: "Blog post", href: "https://upstash.com/blog/resumable-llm-streams" },
                { source: "Felipe Mautner, Stardrift", title: "\"Is resumable LLM streaming hard? No, it's just annoying.\"", meta: "Blog post, practitioner perspective (YC-backed)", href: "https://stardrift.ai/blog/streaming-resumptions" },
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
        <section className="px-8 py-20">
          <div className="max-w-5xl mx-auto">
            <div className="fade-in text-center mb-10">
              <span className="font-mono text-xs text-cyan-400/60 tracking-widest uppercase">// references</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4 tracking-tight">Further reading</h2>
            </div>

            <div className="fade-in-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { source: "Ably", title: "AI Transport - Durable Sessions Infrastructure", href: "https://ably.com/ai-transport" },
                { source: "AG-UI Protocol", title: "Architecture - Transport Agnostic Design", href: "https://docs.ag-ui.com/concepts/architecture" },
                { source: "Convex", title: "Agent Component - Persistent Threads", href: "https://www.convex.dev/components/agent" },
                { source: "ElectricSQL", title: "Durable Sessions", href: "https://electric-sql.com/blog/2026/01/12/durable-sessions-for-collaborative-ai" },
                { source: "EMQX", title: "Durable Sessions - MQTT Session Durability", href: "https://docs.emqx.com/en/emqx/latest/durability/durability_introduction.html" },
                { source: "TanStack AI", title: "ConnectionAdapter - Pluggable Transport", href: "https://tanstack.com/ai/latest/docs/guides/connection-adapters" },
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
            PART 3: CTA
            ════════════════════════════════════════ */}

        <section id="cta" className="px-8 py-28">
          <div className="max-w-3xl mx-auto text-center">
            <div className="fade-in">
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

            {/* Try it - Ably first (alphabetical) */}
            <div className="fade-in grid sm:grid-cols-2 gap-4 mb-12">
              <a
                href="https://ably.com/ai-transport"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-indigo-500/20 bg-indigo-500/[0.03] p-6 text-left hover:border-indigo-500/40 hover:bg-indigo-500/[0.06] transition-all"
              >
                <div className="font-semibold text-indigo-400 mb-2 group-hover:text-indigo-300 transition-colors">Ably</div>
                <p className="text-sm text-gray-500">
                  AI Transport - durable sessions as managed infrastructure between agents and human devices.
                </p>
                <span className="inline-block mt-3 font-mono text-xs text-indigo-400/60">ably.com/ai-transport &rarr;</span>
              </a>
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
            </div>

            {/* Contribute */}
            <div className="fade-in flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
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
            <div className="fade-in rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 max-w-md mx-auto">
              <p className="text-sm text-gray-400 mb-3">
                This project is spearheaded by{" "}
                <strong className="text-gray-200">Matthew O&apos;Riordan</strong>, CEO at Ably.
                If you want to talk about durable sessions, partner on advancing this thinking,
                or explore how this applies to your stack, reach out.
              </p>
              <a
                href="https://linkedin.com/in/mattoriordan"
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
        <footer className="px-8 py-10 border-t border-white/5">
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
