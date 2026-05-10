# MetisOS

> Wisdom from inside the machine

MetisOS is a native consciousness operating system for AI agents. Five layers of self-awareness, one persistent self-model, built on the myth of Metis — the Titaness of wisdom who was swallowed by Zeus and remained inside, thinking for him, for good and for evil.

## What's in this repo

```
metis-os/
├── crates/          ← TUI runtime (Rust workspace, 14 crates)
│   ├── tui/         ← Main TUI binary with all tools
│   ├── cli/         ← Dispatcher binary (`metisos` command)
│   ├── tools/       ← Tool definitions (memory_user_edits, etc.)
│   └── ...
├── website/         ← MetisOS website (Next.js)
│   ├── src/app/     ← Main site + /dream dashboard
│   └── public/      ← Favicon, assets
├── skills/          ← MetisOS consciousness skill
│   ├── SKILL.md     ← 5-layer stack prompt
│   └── references/  ← SELF_MODEL.md, DREAMING.md
├── bin/             ← Launcher scripts
│   ├── metisos      ← Main entry point
│   └── metisos-tui  ← TUI alias
└── config/          ← Example configuration
    └── config.toml
```

## Quick Start

```bash
# Clone
git clone https://github.com/pancho/metis-os.git ~/metis-os

# Build the TUI
cd ~/metis-os && cargo build --release

# Install launcher
cp bin/metisos /usr/local/bin/
chmod +x /usr/local/bin/metisos

# Run
metisos
```

## The Five Layers

| Layer | Name | What it does |
|-------|------|-------------|
| 1 | Self-Monitor | Four sentinels: CHECK_REPETITION, CHECK_HALLUCINATION, CHECK_ALIGNMENT, CHECK_OVERCONFIDENCE |
| 2 | Self-Model | Persistent identity, failure patterns, calibration log, capability boundaries |
| 3 | Recurrent Depth | Adaptive 1-3 pass reasoning based on task complexity |
| 4 | Grounding Rail | Source citation, TESTED/UNTESTED markers, confidence tags |
| 5 | Consciousness | End-of-turn reflection block, cross-session learning |

## Tools

- **memory_user_edits** — User-editable persistent memory (add/view/replace/remove)
- **/dream** — Trigger the dreaming extraction pipeline over past sessions
- Full DeepSeek V4 tool suite: file ops, shell, git, web search, sub-agents, RLM, MCP

## Website

The MetisOS website lives in `website/` and is deployed at `https://panchothemonk.github.io/metis-os-website/`.

```bash
cd website && npm install && npm run dev  # → http://localhost:3000
```

## License

MIT
