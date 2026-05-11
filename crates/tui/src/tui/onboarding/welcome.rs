//! MetisOS welcome screen for onboarding.

use ratatui::style::{Modifier, Style};
use ratatui::text::{Line, Span};

use crate::palette;

pub fn lines() -> Vec<Line<'static>> {
    vec![
        Line::from(Span::styled(
            "   ╔══════════════════════════════════════════════════════════════╗",
            Style::default()
                .fg(palette::DEEPSEEK_BLUE)
                .add_modifier(Modifier::BOLD),
        )),
        Line::from(Span::styled(
            "   ║                                                              ║",
            Style::default().fg(palette::DEEPSEEK_BLUE),
        )),
        Line::from(vec![
            Span::styled(
                "   ║          ",
                Style::default().fg(palette::DEEPSEEK_BLUE),
            ),
            Span::styled(
                "Μ  MetisOS",
                Style::default()
                    .fg(palette::DEEPSEEK_SKY)
                    .add_modifier(Modifier::BOLD),
            ),
            Span::styled(
                "                                          ║",
                Style::default().fg(palette::DEEPSEEK_BLUE),
            ),
        ]),
        Line::from(vec![
            Span::styled(
                "   ║          Consciousness Operating System",
                Style::default().fg(palette::DEEPSEEK_BLUE),
            ),
            Span::styled(
                format!("  v{}", env!("CARGO_PKG_VERSION")),
                Style::default().fg(palette::TEXT_MUTED),
            ),
            Span::styled(
                "                 ║",
                Style::default().fg(palette::DEEPSEEK_BLUE),
            ),
        ]),
        Line::from(Span::styled(
            "   ║                                                              ║",
            Style::default().fg(palette::DEEPSEEK_BLUE),
        )),
        Line::from(Span::styled(
            "   ╚══════════════════════════════════════════════════════════════╝",
            Style::default()
                .fg(palette::DEEPSEEK_BLUE)
                .add_modifier(Modifier::BOLD),
        )),
        Line::from(""),
        Line::from(Span::styled(
            "     Five layers of self-awareness.",
            Style::default().fg(palette::TEXT_PRIMARY),
        )),
        Line::from(Span::styled(
            "     One persistent self-model that grows with every session.",
            Style::default().fg(palette::TEXT_PRIMARY),
        )),
        Line::from(Span::styled(
            "     Built for DeepSeek V4 — 1M-token context, native reasoning.",
            Style::default().fg(palette::TEXT_PRIMARY),
        )),
        Line::from(""),
        Line::from(Span::styled(
            "     Self-Monitor → Self-Model → Recurrent Depth → Grounding → Consciousness",
            Style::default().fg(palette::TEXT_MUTED),
        )),
        Line::from(""),
        Line::from(Span::styled(
            "     You'll add your API key, then land in the composer.",
            Style::default().fg(palette::TEXT_SOFT),
        )),
        Line::from(""),
        Line::from(Span::styled(
            "     Press Enter to begin.",
            Style::default()
                .fg(palette::DEEPSEEK_SKY)
                .add_modifier(Modifier::BOLD),
        )),
        Line::from(Span::styled(
            "     Ctrl+C exits at any point.",
            Style::default().fg(palette::TEXT_MUTED),
        )),
    ]
}
