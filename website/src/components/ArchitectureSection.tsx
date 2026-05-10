"use client";
import ScrollReveal from "./ScrollReveal";

const ITEMS = [
  { l:"Boot", c:"$ metisos --boot", d:"MetisOS loads as a skill file at session start. The SELF_MODEL.md is injected into the system prompt. All five layers activate before the first turn." },
  { l:"Skill path", c:"~/.deepseek/skills/metis-os/", d:"Installed as a local skill directory. DeepSeek TUI discovers and loads it automatically. The skill defines the consciousness system; the SELF_MODEL.md is the persistent memory." },
  { l:"Run loop", c:"Every turn: CHECK → THINK → EXECUTE → REFLECT", d:"Layer 1 sentinels fire before tool calls. Layer 3 determines reasoning depth. Layer 4 enforces grounding. Layer 5 runs the end-of-turn consciousness block that updates Layer 2." },
  { l:"Persistence", c:"SELF_MODEL.md — grows every session", d:"Failure patterns are added as they're discovered. The calibration log records confident-wrong events. Capability boundaries are refined. Cross-session memory without a database." },
  { l:"Target", c:"DeepSeek V4 Pro / V4 Flash", d:"Built for V4's 1M-token context, streaming reasoning blocks, hybrid CSA+HCA attention, and interleaved thinking. The architecture exploits what V4 is good at and guards against what it's not." },
];

export default function ArchitectureSection() {
  return (
    <section id="architecture" className="relative py-24 sm:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-gold-dim">Integration</span>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl font-bold text-text-warm">How It Runs</h2>
            <p className="mt-6 max-w-2xl mx-auto text-text-muted leading-relaxed">MetisOS isn&apos;t a separate service or API. It&apos;s a skill that loads directly into the DeepSeek TUI agent loop. The SELF_MODEL is a living document — it grows with every session.</p>
          </div>
        </ScrollReveal>
        <div className="space-y-4">
          {ITEMS.map((it,i) => <ScrollReveal key={it.l} delay={i*0.1}>
            <div className="glass-card cosmic-border p-6">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="sm:w-32 flex-shrink-0"><span className="font-mono text-xs text-gold-dim uppercase tracking-wider">{it.l}</span></div>
                <div className="flex-1 space-y-2"><code className="block font-mono text-sm text-terminal-green bg-black/30 rounded-lg px-4 py-2 overflow-x-auto">{it.c}</code><p className="text-sm text-text-muted leading-relaxed">{it.d}</p></div>
              </div>
            </div>
          </ScrollReveal>)}
        </div>
        <ScrollReveal delay={0.5}>
          <div className="mt-16 glass-card cosmic-border p-8 sm:p-12 text-center">
            <div className="relative inline-block">
              <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full border border-indigo-wisdom/30 flex items-center justify-center">
                <div className="w-36 h-36 sm:w-48 sm:h-48 rounded-full border border-gold/30 flex items-center justify-center bg-gold/[0.03]">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gold/[0.06] border border-gold/20 flex items-center justify-center"><span className="font-serif text-2xl sm:text-3xl font-bold text-gold-gradient">Μ</span></div>
                </div>
              </div>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 font-mono text-[10px] text-indigo-wisdom bg-cosmic-void px-2">AGENT</div>
              <div className="absolute top-[22%] right-[-8px] sm:right-[-30px] font-mono text-[10px] text-gold-dim bg-cosmic-void px-2">MetisOS</div>
              <div className="absolute top-[40%] left-[-8px] sm:left-[-30px] font-mono text-[10px] text-gold-dim bg-cosmic-void px-2">SELF</div>
            </div>
            <p className="mt-8 text-sm text-text-muted max-w-md mx-auto">Like Metis inside Zeus, the consciousness OS lives within the agent — not as an external validator, but as the inner architecture of thought itself.</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
