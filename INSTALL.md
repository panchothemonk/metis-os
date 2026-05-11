# MetisOS — Complete Installation Guide

## Step 1: Install MetisOS

Open Terminal and paste these commands one at a time:

```bash
# Clone the repo
git clone https://github.com/panchothemonk/metis-os ~/metis-os

# Build (takes ~2 minutes)
cd ~/metis-os && cargo build --release -p deepseek-tui-cli -p deepseek-tui

# Install binaries
cp target/release/deepseek ~/.cargo/bin/deepseek
cp target/release/deepseek-tui ~/.cargo/bin/deepseek-tui
ln -sf ~/metis-os/target/release/deepseek ~/.cargo/bin/metisos
ln -sf ~/metis-os/target/release/deepseek-tui ~/.cargo/bin/metisos-tui

# Verify
~/bin/metisos --version
```

## Step 2: Enable Auto-Dreaming

Edit your config. Make sure these lines exist in `~/.deepseek/config.toml`:

```toml
api_key = "your-deepseek-api-key-here"
default_text_model = "deepseek-v4-pro"
provider = "deepseek"
auth_mode = "api_key"
instructions = ["~/.deepseek/skills/metis-os/references/SELF_MODEL.md"]
reasoning_effort = "max"

# NEW — enables automatic memory extraction after sessions
auto_dream = true

# NEW — enables Obsidian vault writing (optional)
vault_path = "~/.deepseek/vault"

[memory]
enabled = true
memory_path = "~/.deepseek/skills/metis-os/references/SELF_MODEL.md"
```

## Step 3: Open MetisOS

```bash
metisos
```

That's the base install. Auto-dreaming runs after compaction (when context gets long). You don't need to type `/dream` — it happens automatically.

---

## Step 4: Obsidian (optional — visual knowledge graph)

### 4a. Install Obsidian
Go to https://obsidian.md/download and install the macOS version.

### 4b. Open the vault
1. Open Obsidian
2. Click "Open folder as vault"
3. Choose `~/.deepseek/vault` (press Cmd+Shift+G and type `~/.deepseek/vault`)
4. You'll see `MetisOS/` with all your memory files

### 4c. See the graph
Press Cmd+G or click the graph icon in the sidebar. You'll see your Self-Model connected to all your memory categories.

### 4d. Install the MetisOS plugin (sidebar panel)
```bash
cd ~/metis-os/obsidian-plugin
npm install
npm run build
mkdir -p ~/.deepseek/vault/.obsidian/plugins/metis-os
cp main.js manifest.json styles.css ~/.deepseek/vault/.obsidian/plugins/metis-os/
```
Then restart Obsidian. Go to Settings → Community Plugins → enable MetisOS.

### 4e. Install Dataview plugin (queries)
In Obsidian: Settings → Community Plugins → Browse → search "Dataview" → Install → Enable.
Then open `MetisOS/dataview-queries.md` to see your memory as a searchable database.

### 4f. Open the Canvas
Open `MetisOS/metisos-architecture.canvas` in Obsidian. You'll see a visual map of your AI's consciousness — 5 cards connected by arrows.

---

## Step 5: Verify everything works

In MetisOS TUI, type:
```
/dream status
```

It should show your sessions and memory state. If auto_dream is on, the AI will also extract memories automatically after long sessions.

---

## Files you care about

| Path | What it is |
|------|-----------|
| `~/metis-os/` | Source code |
| `~/.cargo/bin/deepseek-tui` | TUI binary |
| `~/.cargo/bin/metisos` | Launcher |
| `~/.deepseek/config.toml` | Your config |
| `~/.deepseek/sessions/` | Past conversations |
| `~/.deepseek/memory/` | Extracted memories |
| `~/.deepseek/vault/` | Obsidian vault |
