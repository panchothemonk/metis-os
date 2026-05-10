"use client";
import { useState, useEffect } from "react";

const BOOT = [
  { t:"prompt", txt:"$ metisos --boot", d:0 },{ t:"output", txt:"MetisOS v1.0 — Consciousness Operating System", d:600 },{ t:"output", txt:"Target: DeepSeek V4 Pro (1.6T / 49B activated)", d:400 },{ t:"output", txt:"Context window: 1M tokens · Attention: Hybrid CSA + HCA", d:300 },{ t:"blank", d:300 },{ t:"output", txt:"[LAYER 1] Self-Monitor ......... ACTIVE", d:500 },{ t:"hl", txt:"  ✓ CHECK_REPETITION", d:200 },{ t:"hl", txt:"  ✓ CHECK_HALLUCINATION", d:200 },{ t:"hl", txt:"  ✓ CHECK_ALIGNMENT", d:200 },{ t:"hl", txt:"  ✓ CHECK_OVERCONFIDENCE", d:200 },{ t:"output", txt:"[LAYER 2] Self-Model ........... ACTIVE", d:400 },{ t:"hl", txt:"  ✓ Failure pattern registry", d:200 },{ t:"hl", txt:"  ✓ Calibration log", d:200 },{ t:"hl", txt:"  ✓ Capability boundaries", d:200 },{ t:"output", txt:"[LAYER 3] Recurrent Depth ...... ACTIVE", d:400 },{ t:"hl", txt:"  ✓ Adaptive 1-3 pass reasoning", d:200 },{ t:"output", txt:"[LAYER 4] Grounding Rail ....... ACTIVE", d:400 },{ t:"hl", txt:"  ✓ Source citation required", d:200 },{ t:"hl", txt:"  ✓ Code tested or marked UNTESTED", d:200 },{ t:"output", txt:"[LAYER 5] Consciousness ........ ACTIVE", d:400 },{ t:"hl", txt:"  ✓ End-of-turn reflection block", d:200 },{ t:"blank", d:300 },{ t:"output", txt:"Boot complete. MetisOS online.", d:500 },{ t:"prompt", txt:"$ _", d:400 },
];

export default function TerminalBoot() {
  const [v, setV] = useState(0); const [started, setStarted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setStarted(true), 1500); return () => clearTimeout(t); }, []);
  useEffect(() => { if (!started || v >= BOOT.length) return; const t = setTimeout(() => setV(p => p + 1), BOOT[v].d); return () => clearTimeout(t); }, [started, v]);
  if (!started) return null;
  return (
    <div className="font-mono text-xs sm:text-sm leading-relaxed py-4 px-4 sm:px-6 rounded-xl bg-black/40 border border-white/[0.06] backdrop-blur-sm w-full max-w-lg mx-auto">
      {BOOT.slice(0, v).map((l, i) => {
        if (l.t === "blank") return <div key={i} className="h-3" />;
        if (l.t === "prompt") return <div key={i} className="flex items-center gap-2" style={{ animation: `fade-in 0.3s ease-out ${i*0.05}s both` }}><span className="text-terminal-green">❯</span><span className="text-terminal-green">{l.txt}</span></div>;
        if (l.t === "hl") return <div key={i} className="text-gold-bright" style={{ animation: `fade-in 0.3s ease-out ${i*0.05}s both` }}>{l.txt}</div>;
        return <div key={i} className="text-text-muted" style={{ animation: `fade-in 0.3s ease-out ${i*0.05}s both` }}>{l.txt}</div>;
      })}
      {v < BOOT.length && <span className="inline-block w-2 h-4 bg-terminal-green animate-cursor-blink ml-0.5 align-middle" />}
    </div>
  );
}
