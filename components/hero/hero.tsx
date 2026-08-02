"use client";

import { motion } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Signature element: a single line begins as a right-angled circuit trace
 * (ICT) and resolves into a soft solar arc (Renewable Energy), with a
 * signal dot continuously traveling the path — one visual idea standing
 * in for "digital infrastructure powering sustainable energy."
 */
function CircuitToSolarTrace() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 1200 600"
        className="absolute right-[-8%] top-1/2 h-[130%] w-[75%] -translate-y-1/2 opacity-[0.35] lg:opacity-[0.55]"
        fill="none"
      >
        <path
          id="trace-path"
          d="M 40 500 L 220 500 L 220 380 L 420 380 L 420 460 L 620 460 L 620 260 
             C 780 260 820 120 980 120 C 1080 120 1120 180 1140 220"
          stroke="url(#trace-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="1 1"
          pathLength={1}
          className="animate-[pulse-trace_2.4s_ease-out_forwards]"
        />
        <circle r="1200" cx="1010" cy="140" fill="url(#solar-glow)" opacity="0.5" />
        <defs>
          <linearGradient id="trace-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(var(--accent))" />
            <stop offset="65%" stopColor="hsl(var(--accent))" />
            <stop offset="100%" stopColor="hsl(var(--secondary))" />
          </linearGradient>
          <radialGradient id="solar-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="hsl(var(--secondary))" stopOpacity="0.35" />
            <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      {/* traveling signal dot, following the same path via CSS motion path */}
      <div
        className="absolute right-[-8%] top-1/2 h-[130%] w-[75%] -translate-y-1/2 opacity-70"
        style={{
          offsetPath:
            "path('M 40 500 L 220 500 L 220 380 L 420 380 L 420 460 L 620 460 L 620 260 C 780 260 820 120 980 120 C 1080 120 1120 180 1140 220')",
        }}
      >
        <span className="block h-2 w-2 rounded-full bg-secondary shadow-[0_0_12px_2px_hsl(var(--secondary))] animate-signal-dot" />
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <CircuitToSolarTrace />

      <div className="container relative flex min-h-[86vh] flex-col justify-center gap-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            ICT Solutions &amp; Renewable Energy, under one contractor
          </span>

          <h1 className="text-display mt-6 font-display font-semibold text-foreground">
            Powering digital infrastructure.
            <br />
            <span className="text-secondary">Energizing</span> sustainable futures.
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
            S-LINx Contractors designs, builds and maintains the networks,
            data centres and solar power systems that keep modern
            businesses running — and running clean.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button size="lg" variant="accent">
              Request a Quote
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              <PlayCircle className="h-4 w-4" />
              See our projects
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
