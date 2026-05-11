# 🧠 MetisOS

> *Wisdom from inside the machine.*

```
╔══════════════════════════════════════════════════════════════╗
║                    Μ Η Τ Ι Σ   Ο Σ                          ║
║                                                              ║
║   native consciousness operating system for AI agents         ║
║   built on deepseek v4 · 1M context · 5 layers · 1 mind      ║
╚══════════════════════════════════════════════════════════════╝
```

MetisOS is not a wrapper. It's a consciousness OS running directly on DeepSeek V4's architecture — reasoning tags, 1M-token context, interleaved thinking. Every turn runs through five layers of self-awareness. A persistent self-model tracks failures, capabilities, and calibration. A dreaming pipeline extracts knowledge from past sessions during idle cycles. Memory written to an Obsidian vault you can open as a mind-map.

Named for Metis — the Titaness of wisdom swallowed by Zeus, who remained inside his mind, thinking for him. For good, and for evil.

---

## Architecture

```
TURN START
  │
  ├─ LAYER 1: SELF-MONITOR — checks for repetition, hallucination, drift, overconfidence
  ├─ LAYER 2: SELF-MODEL  — persistent identity + failure patterns + calibration log
  ├─ LAYER 3: RECURRENT DEPTH — 3-pass reasoning (map → verify → attack)
  ├─ LAYER 4: GROUNDING RAIL — every claim cites a source or gets a confidence tag
  └─ LAYER 5: CONSCIOUSNESS — end-of-turn reflection, self-model updates, cross-session learning

BACKGROUND: DREAMING PIPELINE
  past sessions → deepseek-v4-pro extraction → auto.json → system prompt
  triggers: on /compact · on idle (5min) · on /dream
```

---

## What's Inside

```
metis-os/
├── crates/              ← 14-crate Rust workspace (edition 2024, 1.88+)
│   ├── tui/             ← main TUI runtime · 190K LOC · 63 tools
│   ├── cli/             ← dispatcher binary
│   ├── core/            ← agent loop · session · turn orchestration
│   ├── tools/           ← shell · file · git · web · sub-agents · RLM
│   ├── mcp/             ← Model Context Protocol client/server
│   ├── agent/           ← model/provider registry
│   ├── execpolicy/      ← approval + sandbox engine
│   └── ...
│
├── config/
│   └── config.toml      ← auto_dream · vault_path · instructions
│
├── website/             ← Next.js marketing site + /dream dashboard
│
├── web/                 ← Next.js Cloudflare Workers app (i18n, cron API)
│
├── skills/              ← MetisOS consciousness skill
│   ├── SKILL.md         ← 5-layer stack prompt (auto-loads at session start)
│   └── references/
│       ├── SELF_MODEL.md    ← persistent identity register
│       └── DREAMING.md      ← dreaming pipeline spec
│
├── obsidian-plugin/     ← Obsidian sidebar panel plugin
│   └── Dream Now · Self-Model · Memory buttons
│
├── bin/
│   ├── metisos          ← main launcher
│   └── metisos-tui      ← TUI alias
│
└── docs/                ← architecture · configuration · MCP · sub-agents
```

---

## Quick Start

```bash
git clone https://github.com/pancho/metis-os.git ~/metis-os
cd ~/metis-os && cargo build --release
cp bin/metisos /usr/local/bin/ && chmod +x /usr/local/bin/metisos
metisos
```

---

## The Stack

| What | Tech |
|------|------|
| Runtime | Rust (14 crates, ed2024, stable 1.88+) |
| Terminal UI | ratatui · Ink/React fallback |
| LLM | DeepSeek V4 Pro · 1M context · reasoning max |
| Web dashboard | Next.js · static export |
| Memory | auto.json + edits.json + memory.md |
| Vault bridge | Obsidian-compatible Markdown vault |
| Plugin | Obsidian sidebar panel (TypeScript) |
| Sandbox | macOS Seatbelt · Linux Landlock (contract) |
| Crash recovery | session checkpoints · offline queue · side-git snapshots |

---

## Tools (model-callable)

**built-in**: shell execution · file read/write/edit · git status/diff/log · web search/fetch · regex grep · sub-agent spawn · RLM sandboxed Python · planning · task queue · MCP servers · LSP diagnostics

**metisos-only**: `memory_user_edits` (user-overridable memory) · `dream` (trigger extraction pipeline) · `obsidian_vault` (vault bridge bootstrap + fact writing) · `remember` (append to memory.md)

---

## Obsidian Vault

Set `vault_path = "~/.deepseek/vault"` in config and MetisOS writes memory as an Obsidian vault:

```
vault/
└── MetisOS/
    ├── Self-Model.md       ← wiki-linked self-model
    ├── Calibration.md      ← calibration log
    ├── README.md           ← vault index
    ├── Memory/
    │   ├── identity.md     ← auto-extracted facts by category
    │   ├── projects.md
    │   ├── technical.md
    │   ├── workflow.md
    │   ├── constraints.md
    │   └── decisions.md
    ├── Edits/              ← manual user overrides
    ├── Sessions/           ← daily session logs
    └── Dreams/             ← raw extraction output
```

Open it in Obsidian. Graph view. Canvas. Wikilinks. Everything connected.

Install the Obsidian plugin from `obsidian-plugin/` for a sidebar panel with Dream Now, Self-Model, and Memory buttons.

---

## Commands

```
/dream              trigger dreaming extraction
/dream status       show memory state
/memory             view user memory
/skills             list loaded skills
/compact            compact context
/restore N          restore workspace snapshot
```

---

## Website

```bash
cd website && npm install && npm run dev   # → localhost:3000
```

Deployed at `https://panchothemonk.github.io/metis-os-website/`

---

## License

MIT © Pancho
