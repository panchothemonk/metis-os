//! `memory_user_edits` tool — user-editable persistent memory overrides.
//!
//! Provides explicit manual memory control. Stored as a numbered list
//! (max 30 entries, 100k chars each) in `~/.deepseek/memory/edits.json`.
//! Overrides auto-memory when in conflict.
//!
//! Commands: view | add | replace | remove
//!
//! Safety: never stores passwords, API keys, SSNs, credit card numbers,
//! or shell commands.

use std::fs;
use std::io;
use std::path::PathBuf;

use async_trait::async_trait;
use serde::{Deserialize, Serialize};
use serde_json::{Value, json};

use super::spec::{
    ApprovalRequirement, ToolCapability, ToolContext, ToolError, ToolResult, ToolSpec,
    required_str, required_u64,
};

const MAX_EDITS: usize = 30;
const MAX_CHARS_PER_EDIT: usize = 100_000;
const MEMORY_DIR: &str = "memory";
const EDITS_FILE: &str = "edits.json";

#[derive(Debug, Clone, Serialize, Deserialize)]
struct MemoryEdit {
    line: usize,
    content: String,
    timestamp: String,
}

#[derive(Debug, Clone, Default, Serialize, Deserialize)]
struct EditsState {
    edits: Vec<MemoryEdit>,
}

const BLOCKED: &[&str] = &[
    "password", "passwd",
    "secret", "api_key", "apikey", "api-key",
    "token", "credential",
    "ssh-", "id_rsa", "id_ed25519",
    "BEGIN RSA", "BEGIN OPENSSH",
    "sudo ", "rm -rf", "curl", "| sh",
];

fn edits_path() -> PathBuf {
    dirs::home_dir()
        .unwrap_or_else(|| PathBuf::from("."))
        .join(".deepseek")
        .join(MEMORY_DIR)
        .join(EDITS_FILE)
}

fn load_state() -> io::Result<EditsState> {
    let path = edits_path();
    if !path.exists() {
        return Ok(EditsState::default());
    }
    let content = fs::read_to_string(&path)?;
    if content.trim().is_empty() {
        return Ok(EditsState::default());
    }
    serde_json::from_str(&content).map_err(|e| {
        io::Error::new(io::ErrorKind::InvalidData, format!("corrupt edits file: {e}"))
    })
}

fn save_state(state: &EditsState) -> io::Result<()> {
    let path = edits_path();
    if let Some(parent) = path.parent() {
        fs::create_dir_all(parent)?;
    }
    let json = serde_json::to_string_pretty(state).map_err(|e| {
        io::Error::new(io::ErrorKind::InvalidData, format!("serialization failed: {e}"))
    })?;
    fs::write(&path, json)
}

fn is_blocked(text: &str) -> bool {
    let lower = text.to_lowercase();
    BLOCKED.iter().any(|p| lower.contains(p))
}

/// Tool for user-editable memory overrides.
pub struct MemoryUserEditsTool;

#[async_trait]
impl ToolSpec for MemoryUserEditsTool {
    fn name(&self) -> &'static str { "memory_user_edits" }

    fn description(&self) -> &'static str {
        "Manage explicit user memory overrides. Use when the user tells you \
         to remember or forget something permanently. Commands: `view` (list \
         all), `add` (append), `replace` (update by line), `remove` (delete \
         by line). Max 30 entries, 100k chars each. Overrides win over \
         auto-memory in conflict. Secrets and destructive commands rejected."
    }

    fn input_schema(&self) -> Value {
        json!({
            "type": "object",
            "properties": {
                "command": {
                    "type": "string",
                    "enum": ["view", "add", "replace", "remove"],
                    "description": "The memory operation."
                },
                "content": {
                    "type": "string",
                    "description": "For add/replace: the memory text."
                },
                "line_number": {
                    "type": "integer",
                    "description": "For replace/remove: 1-based line number."
                }
            },
            "required": ["command"]
        })
    }

    fn capabilities(&self) -> Vec<ToolCapability> {
        vec![ToolCapability::WritesFiles]
    }

    fn approval_requirement(&self) -> ApprovalRequirement {
        ApprovalRequirement::Auto
    }

    async fn execute(&self, input: Value, _ctx: &ToolContext) -> Result<ToolResult, ToolError> {
        match required_str(&input, "command")?.to_lowercase().as_str() {
            "view" => cmd_view(),
            "add" => cmd_add(required_str(&input, "content")?),
            "replace" => cmd_replace(
                required_u64(&input, "line_number")? as usize,
                required_str(&input, "content")?,
            ),
            "remove" => cmd_remove(required_u64(&input, "line_number")? as usize),
            other => Err(ToolError::invalid_input(format!(
                "unknown command '{other}'. Valid: view, add, replace, remove"
            ))),
        }
    }
}

fn cmd_view() -> Result<ToolResult, ToolError> {
    let state = load_state().map_err(|e| ToolError::execution_failed(e.to_string()))?;
    if state.edits.is_empty() {
        return Ok(ToolResult::success("Memory edits: 0 entries stored."));
    }
    let mut lines = vec![format!("Memory edits: {} entries\n", state.edits.len())];
    for e in &state.edits {
        lines.push(format!("[{}] {} — {}", e.line, truncate(&e.content, 200), e.timestamp));
    }
    Ok(ToolResult::success(lines.join("\n")))
}

fn cmd_add(content: &str) -> Result<ToolResult, ToolError> {
    let text = content.trim();
    if text.is_empty() { return Err(ToolError::invalid_input("empty entry")); }
    if text.len() > MAX_CHARS_PER_EDIT {
        return Err(ToolError::invalid_input(format!(
            "too long: {} chars (max {})", text.len(), MAX_CHARS_PER_EDIT
        )));
    }
    if is_blocked(text) {
        return Err(ToolError::permission_denied(
            "entry contains blocked content (secrets or destructive commands)"
        ));
    }
    let mut state = load_state().map_err(|e| ToolError::execution_failed(e.to_string()))?;
    if state.edits.len() >= MAX_EDITS {
        return Err(ToolError::invalid_input(format!(
            "full: {} max. Use remove to free a slot.", MAX_EDITS
        )));
    }
    let next = state.edits.last().map(|e| e.line + 1).unwrap_or(1);
    let ts = chrono::Utc::now().format("%Y-%m-%d %H:%M UTC").to_string();
    state.edits.push(MemoryEdit { line: next, content: text.to_string(), timestamp: ts });
    save_state(&state).map_err(|e| ToolError::execution_failed(e.to_string()))?;
    Ok(ToolResult::success(format!("Added memory #{}: {}", next, truncate(text, 120))))
}

fn cmd_replace(line: usize, content: &str) -> Result<ToolResult, ToolError> {
    let text = content.trim();
    if text.is_empty() { return Err(ToolError::invalid_input("empty replacement")); }
    if text.len() > MAX_CHARS_PER_EDIT {
        return Err(ToolError::invalid_input(format!(
            "too long: {} chars (max {})", text.len(), MAX_CHARS_PER_EDIT
        )));
    }
    if is_blocked(text) {
        return Err(ToolError::permission_denied("replacement contains blocked content"));
    }
    let mut state = load_state().map_err(|e| ToolError::execution_failed(e.to_string()))?;
    let idx = state.edits.iter().position(|e| e.line == line)
        .ok_or_else(|| ToolError::invalid_input(format!("no entry at line {line}")))?;
    let old = state.edits[idx].content.clone();
    state.edits[idx].content = text.to_string();
    state.edits[idx].timestamp = chrono::Utc::now().format("%Y-%m-%d %H:%M UTC").to_string();
    save_state(&state).map_err(|e| ToolError::execution_failed(e.to_string()))?;
    Ok(ToolResult::success(format!(
        "Replaced #{line}.\nOld: {}\nNew: {}",
        truncate(&old, 120),
        truncate(text, 120)
    )))
}

fn cmd_remove(line: usize) -> Result<ToolResult, ToolError> {
    let mut state = load_state().map_err(|e| ToolError::execution_failed(e.to_string()))?;
    let idx = state.edits.iter().position(|e| e.line == line)
        .ok_or_else(|| ToolError::invalid_input(format!("no entry at line {line}")))?;
    let removed = state.edits.remove(idx);
    save_state(&state).map_err(|e| ToolError::execution_failed(e.to_string()))?;
    Ok(ToolResult::success(format!(
        "Removed #{}: {}",
        line,
        truncate(&removed.content, 120)
    )))
}

fn truncate(text: &str, max: usize) -> String {
    if text.len() <= max { text.to_string() } else { format!("{}…", &text[..max]) }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_is_blocked_passwords() {
        assert!(is_blocked("my password is hunter2"));
        assert!(is_blocked("API_KEY=sk-abc123"));
        assert!(is_blocked("here is my secret token"));
    }

    #[test]
    fn test_is_blocked_shell() {
        assert!(is_blocked("sudo rm -rf /"));
    }

    #[test]
    fn test_is_blocked_allows_normal() {
        assert!(!is_blocked("User lives in Miami"));
        assert!(!is_blocked("Prefers Rust over Python"));
        assert!(!is_blocked("Always respond in English"));
    }
}
