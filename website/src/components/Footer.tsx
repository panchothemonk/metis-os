export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3"><span className="font-serif text-lg font-semibold text-gold-bright">MetisOS</span><span className="text-xs text-text-dim font-mono">v1.0</span></div>
        <div className="flex items-center gap-6 text-xs text-text-dim">
          <a href="https://github.com/pancho/metis-os" target="_blank" rel="noopener noreferrer" className="hover:text-text-muted transition-colors">GitHub</a>
          <a href="https://github.com/Hmbown/DeepSeek-TUI" target="_blank" rel="noopener noreferrer" className="hover:text-text-muted transition-colors">DeepSeek TUI</a>
          <span>MIT License</span>
        </div>
        <p className="text-xs text-text-dim/60">Inspired by the Titaness who thinks from within.</p>
      </div>
    </footer>
  );
}
