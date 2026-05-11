//! `/dream` slash command — trigger the dreaming extraction pipeline.
//!
//! The dreaming pipeline processes past session transcripts, extracts
//! durable facts via deepseek-v4-flash, and writes them to
//! `~/.deepseek/memory/auto.json`. User edits (edits.json) take
//! priority over auto-extracted memory.
//!
//! Subcommands:
//! - `/dream` — run the extraction pipeline now
//! - `/dream status` — show auto-memory state (fact count, last run)
//! - `/dream help` — show usage

use std::fs;
use std::path::PathBuf;

use super::CommandResult;
use crate::tui::app::{App, AppAction};

const DREAM_USAGE: &str = "/dream [status|help]";

fn memory_dir() -> PathBuf {
    dirs::home_dir()
        .unwrap_or_else(|| PathBuf::from("."))
        .join(".deepseek")
        .join("memory")
}

fn auto_path() -> PathBuf {
    memory_dir().join("auto.json")
}

fn edits_path() -> PathBuf {
    memory_dir().join("edits.json")
}

fn dream_help() -> String {
    format!(
        "MetisOS Dreaming Pipeline\n\n\
         Usage: {DREAM_USAGE}\n\n\
         Storage:\n  auto.json:  {}\n  edits.json: {}\n\n\
         The dreaming pipeline:\n\
         1. Reads past session transcripts from ~/.deepseek/sessions/\n\
         2. Extracts durable facts using deepseek-v4-flash\n\
         3. Deduplicates and merges with existing auto-memory\n\
         4. Writes structured facts to auto.json\n\
         5. User edits (edits.json) always win over auto-memory\n\n\
         Run `/dream` with no arguments to trigger extraction now.\n\
         Run `/dream status` to see current memory state.",
        auto_path().display(),
        edits_path().display()
    )
}

/// Build the extraction prompt that the background task will execute.
fn extraction_prompt() -> String {
    format!(
        "You are the MetisOS Dreaming Pipeline — an auto-memory extraction system.\n\n\
         Your job: read past session transcripts, extract durable facts about the \
         user, and write them to a structured memory file.\n\n\
         STEPS:\n\
         1. List files in `{}` (session transcripts)\n\
         2. Read the 5 most recent session transcript files\n\
         3. For each transcript, extract durable facts in these categories:\n\
           - identity: name, communication style, preferences\n\
           - projects: active projects, stacks, repositories\n\
           - technical: languages, frameworks, tools, environment\n\
           - workflow: how they like to work (YOLO/Plan/Agent mode, etc.)\n\
           - constraints: things they said to never do or always do\n\
           - decisions: architectural decisions, trade-offs made\n\
         4. Filter out: passwords, API keys, transient tasks, small talk, \
         facts with low confidence\n\
         5. Deduplicate — merge with existing facts in `{}`\n\
         6. Write the merged facts to `{}` as valid JSON:\n\
         {{\n           \"version\": 1,\n           \
         \"last_extraction\": \"<ISO 8601 timestamp>\",\n           \
         \"facts\": [\n             \
         {{\"id\": \"fact_001\", \"category\": \"identity\", \
         \"content\": \"...\", \"confidence\": 0.95, \
         \"first_seen\": \"2026-05-01\", \"last_seen\": \"2026-05-10\", \
         \"source_sessions\": [\"session_abc\"], \"user_edited\": false}}\n           ]\n         }}\n\n\
         Rules:\n\
         - One fact per entry. Be specific.\n\
         - Confidence below 0.7: skip it.\n\
         - Never extract secrets, passwords, or API keys.\n\
         - Check `{}` for user overrides — never overwrite user-edited facts.\n\
         - Use the `memory_user_edits` tool to check existing user edits.\n\n\
         When done, confirm with a summary of how many facts were extracted \
         and in which categories.",
        dirs::home_dir()
            .unwrap_or_else(|| PathBuf::from("."))
            .join(".deepseek")
            .join("sessions")
            .display(),
        auto_path().display(),
        auto_path().display(),
        edits_path().display(),
    )
}

pub fn dream(_app: &mut App, arg: Option<&str>) -> CommandResult {
    let sub = arg.unwrap_or("run").trim();

    match sub {
        "" | "run" => {
            let prompt = extraction_prompt();
            CommandResult::action(AppAction::TaskAdd { prompt })
        }
        "status" => {
            let mut lines = vec!["MetisOS Memory Status\n".to_string()];

            // Auto-memory
            match fs::read_to_string(auto_path()) {
                Ok(content) if !content.trim().is_empty() => {
                    if let Ok(parsed) = serde_json::from_str::<serde_json::Value>(&content) {
                        let count = parsed["facts"].as_array().map(|a| a.len()).unwrap_or(0);
                        let last = parsed["last_extraction"].as_str().unwrap_or("never");
                        lines.push(format!(
                            "Auto-memory (auto.json): {} facts | last extraction: {}",
                            count, last
                        ));
                    } else {
                        lines.push("Auto-memory (auto.json): file exists but is malformed".into());
                    }
                }
                Ok(_) => lines.push("Auto-memory (auto.json): empty".into()),
                Err(_) => lines.push("Auto-memory (auto.json): not created yet".into()),
            }

            // User edits
            match fs::read_to_string(edits_path()) {
                Ok(content) if !content.trim().is_empty() => {
                    if let Ok(parsed) = serde_json::from_str::<serde_json::Value>(&content) {
                        let count = parsed["edits"].as_array().map(|a| a.len()).unwrap_or(0);
                        lines.push(format!(
                            "User edits (edits.json): {} manual overrides",
                            count
                        ));
                    }
                }
                Ok(_) => lines.push("User edits (edits.json): empty".into()),
                Err(_) => lines.push("User edits (edits.json): not created yet".into()),
            }

            lines.push("\nRun `/dream` to trigger extraction.".into());
            CommandResult::message(lines.join("\n"))
        }
        "help" => CommandResult::message(dream_help()),
        _ => CommandResult::error(format!(
            "unknown subcommand `{sub}`. Try `/dream help`.\n\n{}",
            dream_help()
        )),
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::config::Config;
    use crate::tui::app::TuiOptions;
    use std::path::PathBuf;

    fn app() -> App {
        App::new(
            TuiOptions {
                model: "deepseek-v4-pro".to_string(),
                workspace: PathBuf::from("."),
                config_path: None,
                config_profile: None,
                allow_shell: false,
                use_alt_screen: false,
                use_mouse_capture: false,
                use_bracketed_paste: true,
                max_subagents: 2,
                skills_dir: PathBuf::from("."),
                memory_path: PathBuf::from("memory.md"),
                notes_path: PathBuf::from("notes.txt"),
                mcp_config_path: PathBuf::from("mcp.json"),
                use_memory: false,
                start_in_agent_mode: false,
                skip_onboarding: true,
                yolo: false,
                resume_session_id: None,
                initial_input: None,
            },
            &Config::default(),
        )
    }

    #[test]
    fn dream_run_enqueues_task() {
        let mut app = app();
        let result = dream(&mut app, None);
        assert!(matches!(result.action, Some(AppAction::TaskAdd { .. })));
    }

    #[test]
    fn dream_status_returns_info() {
        let mut app = app();
        let result = dream(&mut app, Some("status"));
        let msg = result.message.expect("status should return text");
        assert!(msg.contains("MetisOS Memory Status"));
        assert!(msg.contains("auto.json"));
        assert!(msg.contains("edits.json"));
    }

    #[test]
    fn dream_help_shows_usage() {
        let mut app = app();
        let result = dream(&mut app, Some("help"));
        let msg = result.message.expect("help should return text");
        assert!(msg.contains("/dream"));
        assert!(msg.contains("auto.json"));
    }
}
