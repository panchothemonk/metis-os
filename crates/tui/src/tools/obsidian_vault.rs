//! Obsidian vault bridge for MetisOS.
//!
//! When a `vault_path` is set in config, MetisOS writes its memory
//! as interlinked Markdown files instead of JSON. The vault is a
//! standard Obsidian vault — open it with Obsidian to get the
//! graph view, wikilinks, and all Obsidian features.
//!
//! Vault structure:
//! ```text
//! vault/
//! ├── MetisOS/
//! │   ├── Self-Model.md          ← SELF_MODEL.md as wiki
//! │   ├── README.md              ← Vault index
//! │   ├── Memory/
//! │   │   ├── identity.md        ← auto-extracted facts
//! │   │   ├── projects.md        ← per-category
//! │   │   └── constraints.md
//! │   ├── Edits/
//! │   │   └── 001-first-edit.md  ← manual overrides
//! │   ├── Sessions/
//! │   │   └── 2026-05-10.md      ← daily session logs
//! │   ├── Calibration.md         ← calibration log
//! │   └── Dreams/
//! │       └── extraction-*.md    ← raw extraction output
//! └── .obsidian/                 ← Obsidian config (auto-created)
//! ```

#![allow(dead_code)]

use std::fs;
use std::io;
use std::path::{Path, PathBuf};

use chrono::Utc;

/// Default vault path relative to home.
const DEFAULT_VAULT: &str = ".deepseek/vault";

/// Categories from the dreaming pipeline.
const CATEGORIES: &[&str] = &[
    "identity",
    "projects",
    "technical",
    "workflow",
    "constraints",
    "decisions",
];

/// Category display names for Markdown headings.
fn category_name(cat: &str) -> &str {
    match cat {
        "identity" => "Identity",
        "projects" => "Projects",
        "technical" => "Technical",
        "workflow" => "Workflow",
        "constraints" => "Constraints",
        "decisions" => "Decisions",
        _ => cat,
    }
}

// ── Path helpers ───────────────────────────────────────────────

/// Resolve the vault path from config or fall back to default.
pub fn vault_root(config_vault_path: Option<&str>) -> PathBuf {
    config_vault_path.map(PathBuf::from).unwrap_or_else(|| {
        dirs::home_dir()
            .unwrap_or_else(|| PathBuf::from("."))
            .join(DEFAULT_VAULT)
    })
}

fn metisos_dir(root: &Path) -> PathBuf {
    root.join("MetisOS")
}
fn memory_dir(root: &Path) -> PathBuf {
    metisos_dir(root).join("Memory")
}
fn edits_dir(root: &Path) -> PathBuf {
    metisos_dir(root).join("Edits")
}
fn sessions_dir(root: &Path) -> PathBuf {
    metisos_dir(root).join("Sessions")
}
fn dreams_dir(root: &Path) -> PathBuf {
    metisos_dir(root).join("Dreams")
}

// ── Vault bootstrap ────────────────────────────────────────────

/// Initialize a fresh MetisOS vault. Safe to call multiple times;
/// never overwrites existing files.
pub fn bootstrap_vault(root: &Path) -> io::Result<()> {
    fs::create_dir_all(metisos_dir(root))?;
    fs::create_dir_all(memory_dir(root))?;
    fs::create_dir_all(edits_dir(root))?;
    fs::create_dir_all(sessions_dir(root))?;
    fs::create_dir_all(dreams_dir(root))?;

    // Root README
    let readme = metisos_dir(root).join("README.md");
    if !readme.exists() {
        fs::write(
            &readme,
            include_str!("../../../../skills/references/SELF_MODEL.md"),
        )?;
    }

    // Self-Model as wiki
    let self_model = metisos_dir(root).join("Self-Model.md");
    if !self_model.exists() {
        let content = build_self_model_wiki()?;
        fs::write(&self_model, content)?;
    }

    // Category index pages
    for cat in CATEGORIES {
        let page = memory_dir(root).join(format!("{cat}.md"));
        if !page.exists() {
            let content = build_category_page(cat);
            fs::write(&page, content)?;
        }
    }

    // Calibration log
    let cal = metisos_dir(root).join("Calibration.md");
    if !cal.exists() {
        fs::write(&cal, build_calibration_page())?;
    }

    Ok(())
}

fn build_self_model_wiki() -> io::Result<String> {
    let home = dirs::home_dir().unwrap_or_else(|| PathBuf::from("."));
    let src = home.join(".deepseek/skills/metis-os/references/SELF_MODEL.md");
    if src.exists() {
        let raw = fs::read_to_string(&src)?;
        // Convert manual references to wikilinks
        let mut out = String::from("# Self-Model — MetisOS\n\n");
        out.push_str("> This is your MetisOS self-model rendered as an Obsidian wiki.\n");
        out.push_str("> [[Calibration]] | [[Memory/identity]] | [[Memory/projects]]\n\n---\n\n");
        // Add category links at top
        out.push_str("## Memory\n");
        for cat in CATEGORIES {
            out.push_str(&format!(
                "- [[Memory/{cat}|{name}]]\n",
                cat = cat,
                name = category_name(cat)
            ));
        }
        out.push_str("\n---\n\n");
        out.push_str(&raw);
        Ok(out)
    } else {
        Ok(String::from(
            "# Self-Model\n\nSELF_MODEL.md not found. Run MetisOS to generate it.\n",
        ))
    }
}

fn build_category_page(cat: &str) -> String {
    format!(
        "# {name}\n\n> Auto-extracted facts from the MetisOS dreaming pipeline.\n> Category: `{cat}`\n\nBack to [[../Self-Model|Self-Model]]\n\n---\n\n_No facts extracted yet. Run `/dream` in MetisOS to populate this page._\n",
        name = category_name(cat),
        cat = cat,
    )
}

fn build_calibration_page() -> String {
    r#"# Calibration Log

> Times MetisOS was confident and wrong. Each entry is a lesson.
> Back to [[Self-Model]]

| Date | Claim | Confidence | Actually | Lesson |
|------|-------|-----------|----------|--------|
| 2026-05-10 | (initialized) | — | — | — |

---
_New entries appended automatically when failure patterns are discovered._
"#
    .to_string()
}

// ── Memory fact writing ────────────────────────────────────────

/// Write an extracted fact to its category page. Appends to the
/// existing file rather than overwriting.
pub fn write_fact(root: &Path, category: &str, content: &str, confidence: f64) -> io::Result<()> {
    let cat = CATEGORIES
        .iter()
        .find(|c| **c == category)
        .unwrap_or(&"identity");
    let page = memory_dir(root).join(format!("{cat}.md"));

    let ts = Utc::now().format("%Y-%m-%d %H:%M UTC");
    let cat_link = format!("[[{cat}]]", cat = cat);
    let pct = (confidence * 100.0).round() as u32;
    let entry = format!(
        "\n### {content}\n- **confidence**: {pct}%\n- **extracted**: {ts}\n- **category**: {cat_link}\n",
    );

    let mut existing = if page.exists() {
        fs::read_to_string(&page)?
    } else {
        build_category_page(cat)
    };

    // Insert before the last section (the "no facts" placeholder or after last entry)
    existing.push_str(&entry);
    fs::write(&page, existing)?;

    Ok(())
}

/// Write a user memory edit as a standalone note.
pub fn write_edit(root: &Path, line: usize, content: &str) -> io::Result<()> {
    let dir = edits_dir(root);
    let filename = format!("{:03}-{}.md", line, slugify(content, 40));
    let page = dir.join(&filename);

    let ts = Utc::now().format("%Y-%m-%d %H:%M UTC");
    let entry = format!(
        "# Edit #{line}\n\n**Created**: {ts}\n**Content**: {content}\n\nBack to [[../Self-Model|Self-Model]]\n",
        line = line,
        ts = ts,
        content = content,
    );

    fs::write(&page, entry)?;
    Ok(())
}

/// Create or update today's session note.
pub fn write_session_note(root: &Path, summary: &str) -> io::Result<()> {
    let today = Utc::now().format("%Y-%m-%d");
    let page = sessions_dir(root).join(format!("{}.md", today));

    let header = format!(
        "# Session — {today}\n\n> Auto-generated by MetisOS\n> Back to [[../Self-Model|Self-Model]]\n\n",
        today = today,
    );

    let content = if page.exists() {
        let existing = fs::read_to_string(&page)?;
        format!("{existing}\n\n---\n\n{summary}\n")
    } else {
        format!("{header}\n{summary}\n")
    };

    fs::write(&page, content)?;
    Ok(())
}

/// Write dream extraction results as a timestamped note.
pub fn write_dream_result(root: &Path, facts_json: &str) -> io::Result<()> {
    let ts = Utc::now().format("%Y-%m-%dT%H%M%S");
    let page = dreams_dir(root).join(format!("extraction-{}.md", ts));

    let content = format!(
        "# Dream Extraction — {ts}\n\n> Auto-extracted by MetisOS dreaming pipeline\n> Back to [[../Self-Model|Self-Model]]\n\n```json\n{facts_json}\n```\n",
        ts = ts,
        facts_json = facts_json,
    );

    fs::write(&page, content)?;
    Ok(())
}

// ── Helpers ────────────────────────────────────────────────────

fn slugify(text: &str, max_len: usize) -> String {
    let slug: String = text
        .to_lowercase()
        .chars()
        .map(|c| {
            if c.is_alphanumeric() || c == '-' {
                c
            } else {
                '-'
            }
        })
        .collect();
    let trimmed = slug.trim_matches('-');
    if trimmed.len() <= max_len {
        trimmed.to_string()
    } else {
        trimmed[..max_len].to_string()
    }
}
