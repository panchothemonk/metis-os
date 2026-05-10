"use client";
import { useState } from "react";
import ScrollReveal from "./ScrollReveal";

export default function DeploySection() {
  const [copied, setCopied] = useState(false);
  const cmd = "git clone https://github.com/pancho/metis-os ~/.deepseek/skills/metis-os";
  const copy = async () => { await navigator.clipboard.writeText(cmd); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <section id="deploy" className="relative py-24 sm:py-32 px-6 bg-cosmic-deep">
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] rounded-full blur-[180px] pointer-events-none opacity-10" style={{ background: "rgba(200, 150, 62, 0.15)" }}/>
      <div className="max-w-4xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-terminal-green">Get Started</span>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl font-bold text-text-warm">Deploy MetisOS</h2>
            <p className="mt-6 max-w-2xl mx-auto text-text-muted leading-relaxed">One command. Zero configuration. MetisOS loads automatically on your next DeepSeek TUI session.</p>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <div className="glass-card cosmic-border p-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-4"><span className="font-mono text-sm text-text-muted">Terminal</span><button onClick={copy} className="px-3 py-1.5 text-xs font-mono rounded-lg bg-white/[0.04] text-text-muted hover:text-text-warm hover:bg-white/[0.08] transition-all border border-white/[0.06]">{copied ? "Copied ✓" : "Copy"}</button></div>
            <pre className="font-mono text-sm text-terminal-green bg-black/40 rounded-lg px-5 py-4 overflow-x-auto"><span className="text-text-dim select-none">$ </span>{cmd}</pre>
            <div className="mt-8 space-y-3">
              {[["No API keys required","MetisOS runs entirely inside your DeepSeek TUI session. It doesn't call external services."],["Loads automatically","Place the skill directory in ~/.deepseek/skills/ and it activates on the next session. No configuration needed."],["Persistent self-model","The SELF_MODEL.md grows with every session. Failure patterns, calibration data, and capability assessments persist across restarts."]].map(([t,d]) => <div key={t} className="flex items-start gap-3"><span className="text-terminal-green mt-0.5 text-sm">✓</span><div><p className="text-sm text-text-warm font-medium">{t}</p><p className="text-xs text-text-muted mt-0.5">{d}</p></div></div>)}
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.4}><div className="mt-12 text-center"><p className="text-sm text-text-dim">Requires <a href="https://github.com/Hmbown/DeepSeek-TUI" target="_blank" rel="noopener noreferrer" className="text-gold-dim hover:text-gold-bright underline underline-offset-4 transition-colors">DeepSeek TUI</a> v0.8.0 or later. Open-source under MIT license.</p></div></ScrollReveal>
      </div>
    </section>
  );
}
