"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const MEMORY_DATA = {
  autoMemory: {
    label: "Auto-Generated Memory (auto.json)",
    color: "#0aff90",
    description:
      "MetisOS dreaming pipeline reads past conversations, extracts durable facts via deepseek-v4-flash, and injects them into every session start as a structured block.",
    implementation: `// Injected at session start — READ ONLY
<user_memories>
  // Dreaming pipeline extracts from past chats:
  // - Identity, projects, stack
  // - Communication preferences
  // - Active work context
  // - Technical environment
  //
  // Updates: on /compact, idle, or /dream
  // Recency bias: recent convos weighted higher
</user_memories>`,
    fields: [
      "Work context — all active projects",
      "Personal identity — brand, humor style",
      "Technical stack",
      "Communication preferences",
    ],
  },
  userEdits: {
    label: "User-Editable Memory (edits.json)",
    color: "#f0c860",
    description:
      "Explicit manual overrides. You tell MetisOS to remember/forget. Stored as numbered list, max 30 edits × 100k chars each.",
    implementation: `// Tool: memory_user_edits
// Commands: view | add | replace | remove

> memory_user_edits { command: "add",
  content: "User moved to Miami" }
// → Added memory #1

> memory_user_edits { command: "view" }
// → Returns numbered list

> memory_user_edits { command: "replace",
  line_number: 1,
  content: "User moved to Austin" }

> memory_user_edits { command: "remove",
  line_number: 1 }`,
    fields: [
      "Max 30 edits stored",
      "Max 100,000 chars per edit",
      "Persists across ALL sessions",
      "Overrides auto-memory when in conflict",
      "Never stores: passwords, API keys, shell commands",
    ],
  },
  tools: {
    label: "Tool Arsenal",
    color: "#7b6fef",
    groups: [
      {
        name: "Memory & Identity",
        color: "#0aff90",
        tools: ["memory_user_edits", "remember", "DREAMING.md"],
      },
      {
        name: "File & Editor",
        color: "#38bdf8",
        tools: ["read_file", "write_file", "edit_file", "apply_patch"],
      },
      {
        name: "Shell & Execution",
        color: "#fb923c",
        tools: ["exec_shell", "task_shell_start", "task_shell_wait"],
      },
      {
        name: "Web & Search",
        color: "#f472b6",
        tools: ["web_search", "fetch_url", "web_run"],
      },
      {
        name: "Git & Version Control",
        color: "#facc15",
        tools: ["git_status", "git_diff", "git_log", "git_show", "git_blame"],
      },
      {
        name: "Sub-agents & RLM",
        color: "#c084fc",
        tools: ["agent_spawn", "agent_wait", "agent_result", "rlm"],
      },
      {
        name: "Planning & Tracking",
        color: "#22d3ee",
        tools: ["update_plan", "checklist_write", "task_create", "task_list"],
      },
    ],
  },
};

const PIPELINE = [
  { id: "conv", label: "Past Conversations", icon: "💬", color: "#334155" },
  { id: "extract", label: "MetisOS NLP Pipeline", icon: "⚙️", color: "#1e293b" },
  { id: "memory", label: "auto.json", icon: "🧠", color: "#0f172a" },
  { id: "inject", label: "System Prompt", icon: "📥", color: "#020617" },
];

export default function DreamPage() {
  const [tab, setTab] = useState<string>("auto");

  return (
    <>
      <Navbar />
      <main className="pt-20 pb-16 px-6 bg-cosmic-void min-h-screen">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 text-gold-dim/40 mb-4">
              <div className="h-px w-10 bg-gold-dim/30" />
              <span className="font-serif text-sm tracking-[0.3em] uppercase">Dreaming</span>
              <div className="h-px w-10 bg-gold-dim/30" />
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-text-warm mb-4">
              Memory Pipeline
            </h1>
            <p className="text-text-muted max-w-xl mx-auto text-sm leading-relaxed">
              The dreaming system processes past conversations into structured memory.
              Auto-extraction runs on idle, manual overrides via memory_user_edits tool.
            </p>
          </div>

          {/* Pipeline visualization */}
          <div className="glass-card cosmic-border p-6 mb-12">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
              {PIPELINE.map((step, i) => (
                <div key={step.id} className="flex items-center gap-2 sm:gap-4">
                  <div
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono"
                    style={{ background: `${step.color}40`, border: `1px solid ${step.color}60` }}
                  >
                    <span>{step.icon}</span>
                    <span className="text-text-warm">{step.label}</span>
                  </div>
                  {i < PIPELINE.length - 1 && (
                    <span className="text-text-dim text-lg">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8">
            {[
              { id: "auto", label: "Auto-Memory", color: "#0aff90" },
              { id: "edits", label: "User Edits", color: "#f0c860" },
              { id: "tools", label: "Tool Arsenal", color: "#7b6fef" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  tab === t.id
                    ? "bg-white/[0.06] text-text-warm border border-white/[0.08]"
                    : "text-text-muted hover:text-text-warm hover:bg-white/[0.02]"
                }`}
                style={
                  tab === t.id
                    ? { borderColor: `${t.color}30`, boxShadow: `0 0 20px ${t.color}10` }
                    : {}
                }
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="glass-card cosmic-border p-8">
            {tab === "auto" && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: "#0aff90" }} />
                  <span className="font-mono text-xs tracking-[0.2em] text-terminal-green uppercase">
                    Auto-Generated Memory
                  </span>
                </div>
                <p className="text-sm text-text-muted leading-relaxed">
                  {MEMORY_DATA.autoMemory.description}
                </p>
                <pre className="font-mono text-xs text-terminal-green bg-black/30 rounded-lg p-5 overflow-x-auto leading-relaxed">
                  {MEMORY_DATA.autoMemory.implementation}
                </pre>
                <div className="space-y-2">
                  <span className="text-xs text-text-dim uppercase tracking-wider">
                    Extracted Fields
                  </span>
                  {MEMORY_DATA.autoMemory.fields.map((f) => (
                    <div
                      key={f}
                      className="flex items-center gap-2 text-sm text-text-muted bg-white/[0.02] rounded-lg px-3 py-2"
                    >
                      <span className="text-terminal-green text-xs">✓</span>
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "edits" && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: "#f0c860" }} />
                  <span className="font-mono text-xs tracking-[0.2em] text-gold-bright uppercase">
                    User-Editable Memory
                  </span>
                </div>
                <p className="text-sm text-text-muted leading-relaxed">
                  {MEMORY_DATA.userEdits.description}
                </p>
                <pre className="font-mono text-xs text-terminal-green bg-black/30 rounded-lg p-5 overflow-x-auto leading-relaxed">
                  {MEMORY_DATA.userEdits.implementation}
                </pre>
                <div className="space-y-2">
                  {MEMORY_DATA.userEdits.fields.map((f) => (
                    <div
                      key={f}
                      className="flex items-center gap-2 text-sm text-text-muted bg-white/[0.02] rounded-lg px-3 py-2"
                    >
                      <span className="text-gold-dim text-xs">◆</span>
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "tools" && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: "#7b6fef" }} />
                  <span className="font-mono text-xs tracking-[0.2em] text-indigo-wisdom uppercase">
                    Tool Arsenal — {MEMORY_DATA.tools.groups.reduce((s, g) => s + g.tools.length, 0)} Tools
                  </span>
                </div>
                {MEMORY_DATA.tools.groups.map((group) => (
                  <div key={group.name} className="space-y-2">
                    <span
                      className="font-mono text-[10px] tracking-[0.2em] uppercase"
                      style={{ color: group.color }}
                    >
                      {group.name}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {group.tools.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 text-xs font-mono rounded-md"
                          style={{
                            background: `${group.color}10`,
                            border: `1px solid ${group.color}30`,
                            color: group.color,
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
