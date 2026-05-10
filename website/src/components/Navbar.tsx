"use client";
import { useState, useEffect } from "react";

const NAV = [{ href: "#myth", label: "The Myth" },{ href: "#layers", label: "Layers" },{ href: "#architecture", label: "Architecture" },{ href: "#deploy", label: "Deploy" }];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const on = () => setScrolled(window.scrollY > 40); window.addEventListener("scroll", on, { passive: true }); return () => window.removeEventListener("scroll", on); }, []);
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-cosmic-void/80 backdrop-blur-xl border-b border-white/[0.04]" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group"><span className="text-2xl font-serif font-semibold text-gold-bright group-hover:text-gold transition-colors">MetisOS</span></a>
        <div className="hidden md:flex items-center gap-1">
          {NAV.map(l => <a key={l.href} href={l.href} className="px-4 py-2 text-sm text-text-muted hover:text-text-warm transition-colors rounded-lg hover:bg-white/[0.03]">{l.label}</a>)}
          <a href="https://github.com/pancho/metis-os" target="_blank" rel="noopener noreferrer" className="ml-3 px-4 py-2 text-sm font-medium rounded-lg bg-gold/10 text-gold-bright hover:bg-gold/20 transition-colors border border-gold/20">GitHub</a>
        </div>
        <button className="md:hidden p-2 text-text-muted hover:text-text-warm"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg></button>
      </div>
    </nav>
  );
}
