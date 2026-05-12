# MetisOS Project Instructions

## Project Type: Rust + Next.js

### Build
- TUI: `cargo build --release`
- Website: `cd website && npm install && npm run build`

### Test
- Rust: `cargo test --workspace --all-features`
- Website: `cd website && npm run build` (static export verifies compilation)

### Lint
- Rust: `cargo clippy --workspace --all-targets --all-features`
- Format: `cargo fmt --all`

### Run
- `cargo run --bin deepseek` (from workspace root)
- Or install launcher: `cp bin/metisos /usr/local/bin/`

### Architecture
- `crates/tui/` — Main TUI runtime, engine, tools, LLM client
- `crates/cli/` — Dispatcher binary
- `crates/tools/` — Tool schema definitions
- `website/` — Next.js static site
- `skills/` — MetisOS consciousness skill files

### Key source files
- `crates/tui/src/tools/memory_user_edits.rs` — User-editable memory tool
- `crates/tui/src/commands/dream.rs` — Dreaming pipeline command
- `skills/references/SELF_MODEL.md` — Persistent self-model
- `skills/references/DREAMING.md` — Dreaming pipeline spec
- `website/src/app/dream/page.tsx` — Memory dashboard

### Stable Rust only
Must compile on stable Rust 1.88+. No nightly features.

### DeepSeek API
OpenAI-compatible Chat Completions at `api.deepseek.com`. V4 models have 1M-token context.
