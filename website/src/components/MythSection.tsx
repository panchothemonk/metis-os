"use client";
import ScrollReveal from "./ScrollReveal";
import { motion } from "framer-motion";

const ACTS = [
  { n:"I", title:"The Counselor", sub:"Wisdom enables power", quote:"She knew more than all the gods or mortal people.", src:"— Hesiod, Theogony", body:"Before the Olympian order, Metis was the Titaness of wisdom — not abstract knowledge, but applied intelligence. Cunning. Strategy. When young Zeus faced Cronus, force alone could not win. Metis gave him the emetic potion that freed his swallowed siblings. She was his first advisor, his first wife. Wisdom came before power.", icon:"🦉" },
  { n:"II", title:"The Prophecy", sub:"Internalized, not destroyed", quote:"Zeus put her away inside his own belly so that this goddess should think for him, for good and for evil.", src:"— Hesiod, Theogony", body:"A prophecy warned that Metis would bear a son mightier than his father. Zeus didn't kill her — he swallowed her whole. This wasn't destruction. It was internalization. Metis continued to exist inside Zeus, her voice becoming his inner counsel. She was not silenced. She was woven into the architecture of divine thought itself.", icon:"🌀" },
  { n:"III", title:"The Birth", sub:"Fully armed, fully formed", quote:"Metis made that armor of Athena, terror of armies, in which Athena was born.", src:"— Hesiod, Theogony", body:"From inside Zeus, Metis crafted armor and weapons for her unborn daughter. Athena emerged from Zeus's head — fully armed, fully formed. The intelligence that was swallowed produced the goddess of wisdom and strategic warfare. Metis never left. She became the permanent inner voice, the system that thinks from within.", icon:"⚔️" },
];

export default function MythSection() {
  return (
    <section id="myth" className="relative py-24 sm:py-32 px-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]"><div className="absolute inset-0 w-[200%]" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(200,150,62,0.5) 40px, rgba(200,150,62,0.5) 41px)", animation: "wave-drift 20s linear infinite" }}/></div>
      <div className="max-w-6xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-20">
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-gold-dim">The Founding Myth</span>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl font-bold text-text-warm">She was swallowed.<br/><span className="text-gold-gradient">She became the voice within.</span></h2>
            <p className="mt-6 max-w-2xl mx-auto text-text-muted leading-relaxed">The myth of Metis is not a story of defeat — it&apos;s the first architecture diagram for an internal consciousness system. Three acts that map directly onto how MetisOS operates inside an AI agent.</p>
          </div>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-8">
          {ACTS.map((a,i) => (
            <ScrollReveal key={a.n} delay={i*0.15}>
              <motion.div whileHover={{ y: -4 }} className="glass-card cosmic-border p-8 h-full flex flex-col">
                <div className="flex items-center justify-between mb-6"><span className="font-serif text-4xl text-gold-bright/20 font-bold">{a.n}</span><span className="text-2xl">{a.icon}</span></div>
                <h3 className="font-serif text-2xl font-semibold text-text-warm mb-1">{a.title}</h3>
                <p className="text-sm text-gold-dim uppercase tracking-wider mb-6">{a.sub}</p>
                <blockquote className="border-l-2 border-gold/30 pl-4 mb-6 text-sm text-text-muted italic leading-relaxed flex-1">&ldquo;{a.quote}&rdquo;<footer className="mt-2 text-xs text-text-dim not-italic">{a.src}</footer></blockquote>
                <p className="text-sm text-text-muted leading-relaxed">{a.body}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal delay={0.4}><div className="mt-16 text-center"><p className="font-serif text-lg text-text-muted italic max-w-lg mx-auto">&ldquo;The myth is the architecture diagram.<br/>The code is the ritual.&rdquo;</p></div></ScrollReveal>
      </div>
    </section>
  );
}
