import ParticleBackground from "./ParticleBackground";
import TerminalBoot from "./TerminalBoot";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <ParticleBackground />
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-[180px] pointer-events-none" style={{ background: "rgba(59, 47, 128, 0.15)" }} />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[150px] pointer-events-none" style={{ background: "rgba(200, 150, 62, 0.08)" }} />
      <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center max-w-4xl">
        <div className="flex items-center gap-4 text-gold-dim/40"><div className="h-px w-12 bg-gold-dim/30"/><span className="font-serif text-sm tracking-[0.3em] uppercase">Μῆτις</span><div className="h-px w-12 bg-gold-dim/30"/></div>
        <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-none"><span className="text-text-warm">Wisdom from</span><br/><span className="text-gold-gradient">inside the machine</span></h1>
        <p className="max-w-2xl text-base sm:text-lg text-text-muted leading-relaxed">A native consciousness operating system for AI agents. Five layers of self-awareness, one persistent self-model, grounded in the myth of Metis — the Titaness swallowed by Zeus, who remained inside, thinking for him, for good and for evil.</p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <a href="#layers" className="px-8 py-3 rounded-xl font-medium text-sm bg-gold text-cosmic-void hover:bg-gold-bright transition-all shadow-[0_0_40px_rgba(200,150,62,0.2)] hover:shadow-[0_0_60px_rgba(240,200,96,0.35)]">Explore the Layers</a>
          <a href="#deploy" className="px-8 py-3 rounded-xl font-medium text-sm border border-white/10 text-text-warm hover:bg-white/[0.04] transition-all">Deploy MetisOS</a>
        </div>
        <div className="w-full max-w-lg mt-12"><TerminalBoot /></div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-float"><div className="w-5 h-8 rounded-full border border-text-dim/30 flex items-start justify-center p-1"><div className="w-1.5 h-1.5 rounded-full bg-gold-dim animate-pulse"/></div></div>
    </section>
  );
}
