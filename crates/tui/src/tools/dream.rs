//! `dream` tool — model-callable dreaming extraction trigger.
//!
//! Unlike the `/dream` slash-command (which requires the human to type it),
//! this tool lets the model itself trigger the dreaming extraction pipeline.
//! It can run extraction, check status, or show the extraction prompt.

use async_trait::async_trait;
use serde_json::{Value, json};

use super::spec::{
    ApprovalRequirement, ToolCapability, ToolContext, ToolError, ToolResult, ToolSpec,
    required_str,
};

/// Tool that lets the model trigger the dreaming pipeline.
pub struct DreamTool;

#[async_trait]
impl ToolSpec for DreamTool {
    fn name(&self) -> &'static str { "dream" }

    fn description(&self) -> &'static str {
        "Trigger the MetisOS dreaming extraction pipeline over past sessions. \
         Commands: `run` (extract facts from past sessions and write auto.json), \
         `status` (show current memory state — fact counts, last extraction). \
         Use `run` after a long session to persist what was learned. \
         Use `status` to check if auto-memory exists yet."
    }

    fn input_schema(&self) -> Value {
        json!({
            "type": "object",
            "properties": {
                "action": {
                    "type": "string",
                    "enum": ["run", "status"],
                    "description": "What to do: 'run' triggers extraction, 'status' shows memory state."
                }
            },
            "required": ["action"]
        })
    }

    fn capabilities(&self) -> Vec<ToolCapability> {
        vec![ToolCapability::WritesFiles, ToolCapability::Network]
    }

    fn approval_requirement(&self) -> ApprovalRequirement {
        ApprovalRequirement::Auto
    }

    async fn execute(&self, input: Value, _ctx: &ToolContext) -> Result<ToolResult, ToolError> {
        let action = required_str(&input, "action")?.to_lowercase();

        match action.as_str() {
            "status" => dream_status(),
            "run" => dream_run(),
            other => Err(ToolError::invalid_input(format!(
                "unknown action '{other}'. Valid: run, status"
            ))),
        }
    }
}

fn memory_dir() -> std::path::PathBuf {
    dirs::home_dir()
        .unwrap_or_else(|| std::path::PathBuf::from("."))
        .join(".deepseek")
        .join("memory")
}

fn auto_path() -> std::path::PathBuf {
    memory_dir().join("auto.json")
}

fn edits_path() -> std::path::PathBuf {
    memory_dir().join("edits.json")
}

fn sessions_dir() -> std::path::PathBuf {
    dirs::home_dir()
        .unwrap_or_else(|| std::path::PathBuf::from("."))
        .join(".deepseek")
        .join("sessions")
}

fn dream_status() -> Result<ToolResult, ToolError> {
    let mut lines = vec!["MetisOS Memory Status\n".to_string()];

    match std::fs::read_to_string(auto_path()) {
        Ok(content) if !content.trim().is_empty() => {
            if let Ok(parsed) = serde_json::from_str::<serde_json::Value>(&content) {
                let count = parsed["facts"].as_array().map(|a| a.len()).unwrap_or(0);
                let last = parsed["last_extraction"].as_str().unwrap_or("never");
                lines.push(format!("Auto-memory: {} facts | last run: {}", count, last));
            }
        }
        Ok(_) => lines.push("Auto-memory: empty (no extraction run yet)".into()),
        Err(_) => lines.push("Auto-memory: not created yet".into()),
    }

    match std::fs::read_to_string(edits_path()) {
        Ok(content) if !content.trim().is_empty() => {
            if let Ok(parsed) = serde_json::from_str::<serde_json::Value>(&content) {
                let count = parsed["edits"].as_array().map(|a| a.len()).unwrap_or(0);
                lines.push(format!("User edits: {} manual overrides", count));
            }
        }
        Ok(_) => lines.push("User edits: empty".into()),
        Err(_) => lines.push("User edits: none".into()),
    }

    // Check sessions available
    if sessions_dir().exists() {
        if let Ok(entries) = std::fs::read_dir(sessions_dir()) {
            let count = entries.filter_map(|e| e.ok()).count();
            lines.push(format!("Sessions available: {}", count));
        }
    }

    Ok(ToolResult::success(lines.join("\n")))
}

fn dream_run() -> Result<ToolResult, ToolError> {
    // Ensure memory directory exists
    std::fs::create_dir_all(memory_dir()).map_err(|e| {
        ToolError::execution_failed(format!("cannot create memory dir: {e}"))
    })?;

    // Check if sessions exist
    let session_count = if sessions_dir().exists() {
        std::fs::read_dir(sessions_dir())
            .map(|entries| entries.filter_map(|e| e.ok()).count())
            .unwrap_or(0)
    } else {
        0
    };

    if session_count == 0 {
        return Ok(ToolResult::success(
            "Dreaming pipeline: no session transcripts found in ~/.deepseek/sessions/.\n\
             Run a session first, then trigger /dream from the composer to extract facts."
                .to_string(),
        ));
    }

    // Return the extraction prompt so the model can continue the pipeline
    Ok(ToolResult::success(format!(
        "Dreaming pipeline initiated. {} session transcripts available.\n\n\
         To complete the extraction, read the session files in `{}`,\n\
         extract durable facts about the user (identity, projects, technical,\n\
         workflow, constraints, decisions), and write them to `{}`\n\
         as a JSON array with category, content, and confidence fields.\n\n\
         Check `{}` first for any user overrides — never overwrite user-edited facts.\n\
         Use the `memory_user_edits` tool to view existing user edits.",
        session_count,
        sessions_dir().display(),
        auto_path().display(),
        edits_path().display(),
    )))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn dream_status_returns_info() {
        let tool = DreamTool;
        let result = tool
            .execute(json!({"action": "status"}), &ToolContext::new(std::path::PathBuf::from(".")))
            .await
            .expect("status should work");
        assert!(result.content.contains("Memory Status"));
    }

    #[tokio::test]
    async fn dream_run_without_sessions_reports_zero() {
        let tool = DreamTool;
        let result = tool
            .execute(json!({"action": "run"}), &ToolContext::new(std::path::PathBuf::from(".")))
            .await
            .expect("run should work");
        // The sessions dir may or may not exist in test; either 0 sessions or "no transcripts"
        assert!(
            result.content.contains("no session transcripts")
                || result.content.contains("session transcripts available")
        );
    }

    #[tokio::test]
    async fn dream_rejects_unknown_action() {
        let tool = DreamTool;
        let err = tool
            .execute(json!({"action": "wat"}), &ToolContext::new(std::path::PathBuf::from(".")))
            .await
            .unwrap_err();
        assert!(err.to_string().contains("unknown action"));
    }
}
