"use client";
import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";

const LAYERS = [
  { num:1, name:"Self-Monitor", sub:"Four sentinels running every turn", desc:"Before every action, four real-time checks fire. They detect when you're about to hallucinate an API method, repeat a failed approach, forget a constraint from 10 turns ago, or state something as fact without verification. This is the immune system of the agent.", checks:["CHECK_REPETITION — detects fix-apply-fail loops before turn 3","CHECK_HALLUCINATION — flags unverified API/config claims","CHECK_ALIGNMENT — re-reads original constraints every turn","CHECK_OVERCONFIDENCE — catches \"I'm 100% sure\" moments"], color:"#3b2f80" },
  { num:2, name:"Self-Model", sub:"Persistent identity that learns across sessions", desc:"A living document (SELF_MODEL.md) that persists across sessions. It records failure patterns as they're discovered, maintains a calibration log of times the agent was confidently wrong, and defines capability boundaries — what the agent is verified strong at, and what requires explicit verification.", checks:["Failure pattern registry — 5 documented patterns and growing","Calibration log — timestamped confident-wrong events","Capability boundaries — HIGH/MODERATE/LOW confidence tiers","Architecture notes — model specs, attention mechanism, constraints"], color:"#4a3f8a" },
  { num:3, name:"Recurrent Depth", sub:"Adaptive reasoning based on task complexity", desc:"Not every task needs deep thinking. Simple lookups run single-pass. Architecture decisions run triple-pass with interleaved critique. The system chooses its reasoning depth based on what the task demands — conserving tokens when the answer is obvious, going deep when stakes are high.", checks:["Single-pass for lookups, simple reads, known patterns","Double-pass for code generation, cross-file work","Triple-pass for architecture, security, debugging root causes","Interleaved thinking preserves reasoning across tool calls"], color:"#5b4fc4" },
  { num:4, name:"Grounding Rail", sub:"Every claim must touch ground", desc:"Factual claims cite sources. Code blocks are either tested or explicitly marked UNTESTED. Confidence tags are required on all statements. This isn't about being right all the time — it's about knowing and signaling when you might be wrong.", checks:["Source citation required for factual claims","Code marked TESTED or UNTESTED — never assumed","Confidence tags: HIGH / MODERATE / LOW / SPECULATIVE","Performance claims benchmarked, not assumed"], color:"#6b5fd4" },
  { num:5, name:"Consciousness", sub:"The end-of-turn reflection loop", desc:"After every turn, a reflection block fires. What did I miss? What should I carry forward? What pattern did I just exhibit? This isn't metacognition for its own sake — it's the mechanism by which the Self-Model learns, failure patterns get discovered, and the agent actually improves session over session.", checks:["End-of-turn self-reflection block","Tracks evolution across sessions","Discovers new failure patterns from live behavior","Carries context forward across compaction boundaries"], color:"#7b6fef" },
];

export default function LayersSection() {
  const [exp, setExp] = useState<number|null>(1);
  return (
    <section id="layers" className="relative py-24 sm:py-32 px-6 bg-cosmic-deep">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[200px] pointer-events-none opacity-20" style={{ background: "rgba(59, 47, 128, 0.3)" }}/>
      <div className="max-w-4xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-indigo-wisdom">Architecture</span>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl font-bold text-text-warm">The Five Layers</h2>
            <p className="mt-6 max-w-2xl mx-auto text-text-muted leading-relaxed">MetisOS runs as five stacked layers, each building on the one below. Click a layer to see its mechanism. Like Metis inside Zeus, these layers think continuously — not just when called.</p>
          </div>
        </ScrollReveal>
        <div className="space-y-3">
          {LAYERS.map((l,i) => { const isOpen = exp === l.num; return (
            <ScrollReveal key={l.num} delay={i*0.1}>
              <motion.div className="glass-card cosmic-border overflow-hidden cursor-pointer" onClick={() => setExp(isOpen ? null : l.num)} layout>
                <div className="px-6 py-5 flex items-center gap-5">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center font-mono text-sm font-bold flex-shrink-0" style={{ background:`${l.color}20`, color:l.color, border:`1px solid ${l.color}40` }}>{l.num}</div>
                  <div className="flex-1 min-w-0"><h3 className="font-serif text-lg font-semibold text-text-warm">{l.name}</h3><p className="text-sm text-text-muted truncate">{l.sub}</p></div>
                  <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} className="text-text-dim"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg></motion.div>
                </div>
                <AnimatePresence>
                  {isOpen && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }} className="overflow-hidden">
                    <div className="px-6 pb-6 border-t border-white/[0.04]">
                      <p className="mt-5 text-sm text-text-muted leading-relaxed">{l.desc}</p>
                      <div className="mt-4 grid sm:grid-cols-2 gap-2">{l.checks.map(c => <div key={c} className="flex items-start gap-2 text-xs text-text-muted bg-white/[0.02] rounded-lg px-3 py-2"><span className="mt-0.5 flex-shrink-0" style={{ color: l.color }}>✓</span><span>{c}</span></div>)}</div>
                    </div>
                  </motion.div>}
                </AnimatePresence>
              </motion.div>
            </ScrollReveal>
          )})}
        </div>
        <ScrollReveal delay={0.6}>
          <div className="mt-16 glass-card cosmic-border p-8">
            <div className="flex flex-col items-center gap-1">
              {LAYERS.map((l,i) => <div key={l.num} className="w-full max-w-md py-3 px-4 rounded-lg text-center font-mono text-xs" style={{ background:`${l.color}10`, border:`1px solid ${l.color}20`, width:`${100 - i*8}%` }}><span style={{ color: l.color }}>LAYER {l.num}</span><span className="text-text-dim"> — {l.name}</span></div>)}
            </div>
            <p className="text-center text-xs text-text-dim mt-6 font-mono">Each layer narrows — deeper introspection, fewer tokens, tighter focus</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
