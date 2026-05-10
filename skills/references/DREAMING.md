# MetisOS Dreaming Pipeline

> Layer 2.5 — Auto-memory extraction and persistence

The dreaming pipeline processes past session transcripts during idle cycles, extracts durable facts and patterns, and updates the auto-memory store.

## Architecture

```
Past Conversations → Extraction (v4-flash) → Dedup/Merge → auto.json → System Prompt
```

## Memory Schema (auto.json)

```json
{
  "version": 1,
  "last_extraction": "2026-05-10T08:00:00Z",
  "facts": [{
    "id": "fact_001",
    "category": "identity",
    "content": "User prefers direct communication",
    "confidence": 0.95,
    "first_seen": "2026-05-01",
    "last_seen": "2026-05-10",
    "source_sessions": ["session_abc123"],
    "user_edited": false
  }]
}
```

## Categories

| Category | What it captures |
|----------|-----------------|
| identity | Name, brand, humor, communication preferences |
| projects | Active projects, stacks, repositories |
| technical | Languages, frameworks, tools, environment |
| workflow | YOLO/Plan/Agent preference, approval style |
| constraints | "Never do X", "Always use Y" |
| decisions | Archived architectural decisions |

## Triggers

1. On `/compact` — background sub-agent after compaction
2. On idle — 5+ minutes of TUI inactivity
3. On `/dream` — explicit user command

## Conflict Resolution

- User edits (`edits.json`) always win over auto-memory (`auto.json`)
- `user_edited: true` facts are locked — extraction skips them
- Contradictory auto-facts are discarded

## Storage

- `~/.deepseek/memory/auto.json` — auto-extracted facts
- `~/.deepseek/memory/edits.json` — manual overrides (via `memory_user_edits` tool)
- Merged into system prompt at session start
