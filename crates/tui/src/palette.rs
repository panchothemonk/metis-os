//! MetisOS color palette — Consciousness aesthetic.
//! Deep void background with electric purple/cyan accents.

use ratatui::style::Color;

// ── MetisOS Brand Colors ──────────────────────────────────────────
pub const METIS_PURPLE_RGB: (u8, u8, u8) = (192, 77, 255);    // #C04DFF — consciousness purple
pub const METIS_CYAN_RGB: (u8, u8, u8) = (0, 229, 255);       // #00E5FF — reasoning cyan
pub const METIS_MINT_RGB: (u8, u8, u8) = (0, 255, 136);       // #00FF88 — user mint
pub const METIS_VOID_RGB: (u8, u8, u8) = (8, 5, 16);          // #080510 — background void
pub const METIS_ABYSS_RGB: (u8, u8, u8) = (13, 10, 26);       // #0D0A1A — panel surface
pub const METIS_DEEP_RGB: (u8, u8, u8) = (21, 16, 37);        // #151025 — elevated
pub const METIS_BORDER_RGB: (u8, u8, u8) = (42, 26, 74);      // #2A1A4A — border
pub const METIS_REASONING_RGB: (u8, u8, u8) = (17, 8, 34);    // #110822 — reasoning bg
pub const METIS_RED_RGB: (u8, u8, u8) = (255, 68, 102);       // #FF4466 — error
pub const METIS_AMBER_RGB: (u8, u8, u8) = (255, 170, 40);     // #FFAA28 — warning
pub const METIS_SUCCESS_RGB: (u8, u8, u8) = (0, 212, 140);    // #00D48C — success
pub const METIS_TOOL_RGB: (u8, u8, u8) = (16, 20, 40);        // #101428 — tool bg

// Legacy aliases for compatibility with existing code
pub const DEEPSEEK_BLUE_RGB: (u8, u8, u8) = METIS_PURPLE_RGB;
pub const DEEPSEEK_SKY_RGB: (u8, u8, u8) = METIS_CYAN_RGB;
pub const DEEPSEEK_AQUA_RGB: (u8, u8, u8) = METIS_CYAN_RGB;
pub const DEEPSEEK_NAVY_RGB: (u8, u8, u8) = METIS_ABYSS_RGB;
pub const DEEPSEEK_INK_RGB: (u8, u8, u8) = METIS_VOID_RGB;
pub const DEEPSEEK_SLATE_RGB: (u8, u8, u8) = METIS_ABYSS_RGB;
pub const DEEPSEEK_RED_RGB: (u8, u8, u8) = METIS_RED_RGB;

pub const LIGHT_SURFACE_RGB: (u8, u8, u8) = (248, 250, 252);
pub const LIGHT_PANEL_RGB: (u8, u8, u8) = (241, 245, 249);
pub const LIGHT_ELEVATED_RGB: (u8, u8, u8) = (226, 232, 240);
pub const LIGHT_REASONING_RGB: (u8, u8, u8) = (254, 243, 199);
pub const LIGHT_SUCCESS_RGB: (u8, u8, u8) = (220, 252, 231);
pub const LIGHT_ERROR_RGB: (u8, u8, u8) = (254, 226, 226);
pub const LIGHT_TEXT_BODY_RGB: (u8, u8, u8) = (15, 23, 42);
pub const LIGHT_TEXT_MUTED_RGB: (u8, u8, u8) = (51, 65, 85);
pub const LIGHT_TEXT_HINT_RGB: (u8, u8, u8) = (71, 85, 105);
pub const LIGHT_TEXT_SOFT_RGB: (u8, u8, u8) = (30, 41, 59);
pub const LIGHT_BORDER_RGB: (u8, u8, u8) = (71, 85, 105);
pub const LIGHT_SELECTION_RGB: (u8, u8, u8) = (219, 234, 254);

pub const BORDER_COLOR_RGB: (u8, u8, u8) = METIS_BORDER_RGB;

// ── Color constants (keep existing names for compat) ────────────
pub const DEEPSEEK_BLUE: Color = Color::Rgb(METIS_PURPLE_RGB.0, METIS_PURPLE_RGB.1, METIS_PURPLE_RGB.2);
pub const DEEPSEEK_SKY: Color = Color::Rgb(METIS_CYAN_RGB.0, METIS_CYAN_RGB.1, METIS_CYAN_RGB.2);
pub const DEEPSEEK_AQUA: Color = Color::Rgb(METIS_CYAN_RGB.0, METIS_CYAN_RGB.1, METIS_CYAN_RGB.2);
pub const DEEPSEEK_NAVY: Color = Color::Rgb(METIS_ABYSS_RGB.0, METIS_ABYSS_RGB.1, METIS_ABYSS_RGB.2);
pub const DEEPSEEK_INK: Color = Color::Rgb(METIS_VOID_RGB.0, METIS_VOID_RGB.1, METIS_VOID_RGB.2);
pub const DEEPSEEK_SLATE: Color = Color::Rgb(METIS_ABYSS_RGB.0, METIS_ABYSS_RGB.1, METIS_ABYSS_RGB.2);
pub const DEEPSEEK_RED: Color = Color::Rgb(METIS_RED_RGB.0, METIS_RED_RGB.1, METIS_RED_RGB.2);

pub const LIGHT_SURFACE: Color = Color::Rgb(LIGHT_SURFACE_RGB.0, LIGHT_SURFACE_RGB.1, LIGHT_SURFACE_RGB.2);
pub const LIGHT_PANEL: Color = Color::Rgb(LIGHT_PANEL_RGB.0, LIGHT_PANEL_RGB.1, LIGHT_PANEL_RGB.2);
pub const LIGHT_ELEVATED: Color = Color::Rgb(LIGHT_ELEVATED_RGB.0, LIGHT_ELEVATED_RGB.1, LIGHT_ELEVATED_RGB.2);
pub const LIGHT_REASONING: Color = Color::Rgb(LIGHT_REASONING_RGB.0, LIGHT_REASONING_RGB.1, LIGHT_REASONING_RGB.2);
pub const LIGHT_SUCCESS: Color = Color::Rgb(LIGHT_SUCCESS_RGB.0, LIGHT_SUCCESS_RGB.1, LIGHT_SUCCESS_RGB.2);
pub const LIGHT_ERROR: Color = Color::Rgb(LIGHT_ERROR_RGB.0, LIGHT_ERROR_RGB.1, LIGHT_ERROR_RGB.2);
pub const LIGHT_TEXT_BODY: Color = Color::Rgb(LIGHT_TEXT_BODY_RGB.0, LIGHT_TEXT_BODY_RGB.1, LIGHT_TEXT_BODY_RGB.2);
pub const LIGHT_TEXT_MUTED: Color = Color::Rgb(LIGHT_TEXT_MUTED_RGB.0, LIGHT_TEXT_MUTED_RGB.1, LIGHT_TEXT_MUTED_RGB.2);
pub const LIGHT_TEXT_HINT: Color = Color::Rgb(LIGHT_TEXT_HINT_RGB.0, LIGHT_TEXT_HINT_RGB.1, LIGHT_TEXT_HINT_RGB.2);
pub const LIGHT_TEXT_SOFT: Color = Color::Rgb(LIGHT_TEXT_SOFT_RGB.0, LIGHT_TEXT_SOFT_RGB.1, LIGHT_TEXT_SOFT_RGB.2);
pub const LIGHT_BORDER: Color = Color::Rgb(LIGHT_BORDER_RGB.0, LIGHT_BORDER_RGB.1, LIGHT_BORDER_RGB.2);
pub const LIGHT_SELECTION_BG: Color = Color::Rgb(LIGHT_SELECTION_RGB.0, LIGHT_SELECTION_RGB.1, LIGHT_SELECTION_RGB.2);

// ── Text colors ──────────────────────────────────────────────────
pub const TEXT_BODY: Color = Color::Rgb(232, 226, 244);      // #E8E2F4 — soft purple-white
pub const TEXT_SECONDARY: Color = Color::Rgb(170, 160, 200);  // #AAA0C8 — muted purple
pub const TEXT_HINT: Color = Color::Rgb(120, 110, 155);       // #786E9B — dim purple
pub const TEXT_ACCENT: Color = DEEPSEEK_SKY;                   // cyan
pub const SELECTION_TEXT: Color = Color::White;
pub const TEXT_SOFT: Color = Color::Rgb(220, 212, 238);       // #DCD4EE
pub const TEXT_REASONING: Color = Color::Rgb(180, 160, 220);  // #B4A0DC — soft purple reasoning

pub const TEXT_PRIMARY: Color = TEXT_BODY;
pub const TEXT_MUTED: Color = TEXT_SECONDARY;
pub const TEXT_DIM: Color = TEXT_HINT;
pub const USER_BODY: Color = Color::Rgb(0, 255, 136);         // #00FF88 electric mint
pub const LIGHT_USER_BODY: Color = Color::Rgb(0, 180, 96);

// ── UI theming ───────────────────────────────────────────────────
pub const BORDER_COLOR: Color = Color::Rgb(METIS_BORDER_RGB.0, METIS_BORDER_RGB.1, METIS_BORDER_RGB.2);
pub const ACCENT_PRIMARY: Color = DEEPSEEK_BLUE;               // purple
pub const ACCENT_SECONDARY: Color = TEXT_ACCENT;                // cyan
pub const BACKGROUND_DARK: Color = Color::Rgb(6, 4, 14);      // #06040E — even darker
pub const STATUS_NEUTRAL: Color = Color::Rgb(140, 130, 170);
pub const SURFACE_PANEL: Color = Color::Rgb(METIS_ABYSS_RGB.0, METIS_ABYSS_RGB.1, METIS_ABYSS_RGB.2);
pub const SURFACE_ELEVATED: Color = Color::Rgb(METIS_DEEP_RGB.0, METIS_DEEP_RGB.1, METIS_DEEP_RGB.2);
pub const SURFACE_REASONING: Color = Color::Rgb(17, 8, 34);   // #110822
pub const SURFACE_REASONING_TINT: Color = Color::Rgb(10, 6, 20);
pub const SURFACE_REASONING_ACTIVE: Color = Color::Rgb(28, 16, 50);
pub const SURFACE_TOOL: Color = Color::Rgb(14, 18, 35);       // #0E1223
pub const SURFACE_TOOL_ACTIVE: Color = Color::Rgb(20, 26, 50);
pub const SURFACE_SUCCESS: Color = Color::Rgb(8, 40, 30);
pub const SURFACE_ERROR: Color = Color::Rgb(40, 12, 20);
pub const DIFF_ADDED_BG: Color = Color::Rgb(12, 40, 28);
pub const DIFF_DELETED_BG: Color = Color::Rgb(40, 14, 20);
pub const DIFF_ADDED: Color = Color::Rgb(0, 212, 140);        // #00D48C
pub const ACCENT_REASONING_LIVE: Color = Color::Rgb(192, 77, 255); // purple pulse
pub const ACCENT_TOOL_LIVE: Color = Color::Rgb(0, 229, 255);   // cyan pulse
pub const ACCENT_TOOL_ISSUE: Color = Color::Rgb(200, 140, 180);
pub const TEXT_TOOL_OUTPUT: Color = Color::Rgb(190, 180, 215);

pub const STATUS_SUCCESS: Color = DEEPSEEK_SKY;
pub const STATUS_WARNING: Color = Color::Rgb(255, 170, 40);
pub const STATUS_ERROR: Color = DEEPSEEK_RED;
pub const STATUS_INFO: Color = DEEPSEEK_BLUE;

// Mode colors
pub const MODE_AGENT: Color = Color::Rgb(192, 77, 255);       // purple agent
pub const MODE_YOLO: Color = Color::Rgb(255, 68, 102);        // red yolo
pub const MODE_PLAN: Color = Color::Rgb(255, 170, 40);        // amber plan

pub const SELECTION_BG: Color = Color::Rgb(50, 30, 80);       // purple selection
pub const COMPOSER_BG: Color = DEEPSEEK_SLATE;

// ── Palette mode detection (unchanged) ──────────────────────────
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum PaletteMode { Dark, Light }

impl PaletteMode {
    #[must_use]
    pub fn from_colorfgbg(value: &str) -> Option<Self> {
        let bg = value.split(';').rev().find_map(|part| part.parse::<u16>().ok())?;
        Some(if bg >= 8 { Self::Light } else { Self::Dark })
    }
    #[must_use]
    pub fn detect() -> Self {
        std::env::var("COLORFGBG").ok()
            .and_then(|value| Self::from_colorfgbg(&value))
            .unwrap_or(Self::Dark)
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct UiTheme {
    pub name: &'static str,
    pub mode: PaletteMode,
    pub surface_bg: Color,
    pub panel_bg: Color,
    pub elevated_bg: Color,
    pub composer_bg: Color,
    pub selection_bg: Color,
    pub header_bg: Color,
    pub footer_bg: Color,
    pub mode_agent: Color,
    pub mode_yolo: Color,
    pub mode_plan: Color,
    pub status_ready: Color,
    pub status_working: Color,
    pub status_warning: Color,
    pub text_dim: Color,
    pub text_hint: Color,
    pub text_muted: Color,
    pub text_body: Color,
    pub text_soft: Color,
    pub border: Color,
}

pub const UI_THEME: UiTheme = UiTheme {
    name: "metis",
    mode: PaletteMode::Dark,
    surface_bg: DEEPSEEK_INK,
    panel_bg: DEEPSEEK_SLATE,
    elevated_bg: SURFACE_ELEVATED,
    composer_bg: DEEPSEEK_SLATE,
    selection_bg: SELECTION_BG,
    header_bg: DEEPSEEK_INK,
    footer_bg: DEEPSEEK_INK,
    mode_agent: MODE_AGENT,
    mode_yolo: MODE_YOLO,
    mode_plan: MODE_PLAN,
    status_ready: TEXT_MUTED,
    status_working: DEEPSEEK_SKY,
    status_warning: STATUS_WARNING,
    text_dim: TEXT_DIM,
    text_hint: TEXT_HINT,
    text_muted: TEXT_MUTED,
    text_body: TEXT_BODY,
    text_soft: TEXT_SOFT,
    border: BORDER_COLOR,
};

pub const LIGHT_UI_THEME: UiTheme = UiTheme {
    name: "metis-light",
    mode: PaletteMode::Light,
    surface_bg: LIGHT_SURFACE,
    panel_bg: LIGHT_PANEL,
    elevated_bg: LIGHT_ELEVATED,
    composer_bg: LIGHT_PANEL,
    selection_bg: LIGHT_SELECTION_BG,
    header_bg: LIGHT_SURFACE,
    footer_bg: LIGHT_SURFACE,
    mode_agent: DEEPSEEK_BLUE,
    mode_yolo: DEEPSEEK_RED,
    mode_plan: Color::Rgb(180, 83, 9),
    status_ready: LIGHT_TEXT_MUTED,
    status_working: DEEPSEEK_BLUE,
    status_warning: Color::Rgb(180, 83, 9),
    text_dim: LIGHT_TEXT_HINT,
    text_hint: LIGHT_TEXT_HINT,
    text_muted: LIGHT_TEXT_MUTED,
    text_body: LIGHT_TEXT_BODY,
    text_soft: LIGHT_TEXT_SOFT,
    border: LIGHT_BORDER,
};

impl UiTheme {
    #[must_use] pub fn for_mode(mode: PaletteMode) -> Self { match mode { PaletteMode::Dark => UI_THEME, PaletteMode::Light => LIGHT_UI_THEME } }
    #[must_use] pub fn detect() -> Self { Self::for_mode(PaletteMode::detect()) }
    #[must_use] pub fn with_background_color(mut self, color: Color) -> Self { self.surface_bg = color; self.header_bg = color; self.footer_bg = color; self }
}

// ── Hex helpers (unchanged) ─────────────────────────────────────
#[must_use] pub fn parse_hex_rgb_color(value: &str) -> Option<Color> {
    let hex = value.trim().strip_prefix('#').unwrap_or(value.trim());
    if hex.len() != 6 || !hex.chars().all(|ch| ch.is_ascii_hexdigit()) { return None; }
    let r = u8::from_str_radix(&hex[0..2], 16).ok()?;
    let g = u8::from_str_radix(&hex[2..4], 16).ok()?;
    let b = u8::from_str_radix(&hex[4..6], 16).ok()?;
    Some(Color::Rgb(r, g, b))
}
#[must_use] pub fn normalize_hex_rgb_color(value: &str) -> Option<String> { hex_rgb_string(parse_hex_rgb_color(value)?) }
#[must_use] pub fn hex_rgb_string(color: Color) -> Option<String> {
    let Color::Rgb(r, g, b) = color else { return None; };
    Some(format!("#{r:02x}{g:02x}{b:02x}"))
}

#[must_use] pub fn adapt_fg_for_palette_mode(color: Color, _bg: Color, mode: PaletteMode) -> Color {
    if mode == PaletteMode::Dark { return color; }
    if color == TEXT_BODY || color == SELECTION_TEXT || color == Color::White { LIGHT_TEXT_BODY }
    else if color == TEXT_SECONDARY || color == TEXT_MUTED { LIGHT_TEXT_MUTED }
    else if color == TEXT_HINT || color == TEXT_DIM { LIGHT_TEXT_HINT }
    else if color == TEXT_SOFT || color == TEXT_TOOL_OUTPUT { LIGHT_TEXT_SOFT }
    else if color == BORDER_COLOR { LIGHT_BORDER }
    else if color == TEXT_ACCENT || color == DEEPSEEK_SKY || color == ACCENT_TOOL_LIVE { DEEPSEEK_BLUE }
    else if color == TEXT_REASONING || color == ACCENT_REASONING_LIVE { Color::Rgb(100, 30, 160) }
    else if color == ACCENT_TOOL_ISSUE { Color::Rgb(159, 18, 57) }
    else if color == DIFF_ADDED { Color::Rgb(22, 101, 52) }
    else if color == USER_BODY { LIGHT_USER_BODY }
    else { color }
}

#[must_use] pub fn adapt_bg_for_palette_mode(color: Color, mode: PaletteMode) -> Color {
    if mode == PaletteMode::Dark { return color; }
    if color == DEEPSEEK_INK || color == BACKGROUND_DARK { LIGHT_SURFACE }
    else if color == DEEPSEEK_SLATE || color == COMPOSER_BG || color == SURFACE_PANEL || color == SURFACE_TOOL { LIGHT_PANEL }
    else if color == SURFACE_ELEVATED || color == SURFACE_TOOL_ACTIVE { LIGHT_ELEVATED }
    else if color == SURFACE_REASONING || color == SURFACE_REASONING_TINT || color == SURFACE_REASONING_ACTIVE { LIGHT_REASONING }
    else if color == SURFACE_SUCCESS { LIGHT_SUCCESS }
    else if color == SURFACE_ERROR { LIGHT_ERROR }
    else if color == DIFF_ADDED_BG { LIGHT_SUCCESS }
    else if color == DIFF_DELETED_BG { LIGHT_ERROR }
    else if color == SELECTION_BG { LIGHT_SELECTION_BG }
    else { color }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum ColorDepth { Ansi16, Ansi256, TrueColor }

impl ColorDepth {
    #[must_use] pub fn detect() -> Self {
        if let Ok(ct) = std::env::var("COLORTERM") { let ct = ct.to_ascii_lowercase(); if ct.contains("truecolor") || ct.contains("24bit") { return Self::TrueColor; } }
        if std::env::var_os("WT_SESSION").is_some() { return Self::TrueColor; }
        if let Ok(tp) = std::env::var("TERM_PROGRAM") { let tp = tp.to_ascii_lowercase(); if tp.contains("iterm") || tp.contains("wezterm") || tp.contains("vscode") || tp.contains("warp") { return Self::TrueColor; } }
        let term = std::env::var("TERM").unwrap_or_default().to_ascii_lowercase();
        if term.contains("truecolor") || term.contains("24bit") { Self::TrueColor }
        else if term.contains("256") { Self::Ansi256 }
        else if term.is_empty() || term == "dumb" { Self::Ansi16 }
        else { Self::Ansi256 }
    }
}

#[must_use] pub fn adapt_color(color: Color, depth: ColorDepth) -> Color {
    match (color, depth) { (_, ColorDepth::TrueColor) => color, (Color::Rgb(r, g, b), ColorDepth::Ansi256) => Color::Indexed(rgb_to_ansi256(r, g, b)), (Color::Rgb(r, g, b), ColorDepth::Ansi16) => nearest_ansi16(r, g, b), _ => color }
}
#[must_use] pub fn adapt_bg(color: Color, depth: ColorDepth) -> Color {
    match (color, depth) { (_, ColorDepth::TrueColor) => color, (Color::Rgb(r, g, b), ColorDepth::Ansi256) => Color::Indexed(rgb_to_ansi256(r, g, b)), (_, ColorDepth::Ansi256) => color, (_, ColorDepth::Ansi16) => Color::Reset }
}
#[must_use] pub fn blend(fg: Color, bg: Color, alpha: f32) -> Color {
    let alpha = alpha.clamp(0.0, 1.0);
    match (fg, bg) { (Color::Rgb(fr, fg_, fb), Color::Rgb(br, bg_, bb)) => { let mix = |a: u8, b: u8| -> u8 { let a = f32::from(a); let b = f32::from(b); (b + (a - b) * alpha).round().clamp(0.0, 255.0) as u8 }; Color::Rgb(mix(fr, br), mix(fg_, bg_), mix(fb, bb)) } _ => fg }
}

/// Return the reasoning surface color tinted at 12% over the app background.
#[must_use] pub fn reasoning_surface_tint(depth: ColorDepth) -> Option<Color> {
    match depth { ColorDepth::Ansi16 => None, _ => Some(adapt_bg(SURFACE_REASONING_TINT, depth)) }
}

/// Pulse `color` between 30% and 100% brightness on a 2s cycle.
#[must_use] pub fn pulse_brightness(color: Color, now_ms: u64) -> Color {
    let phase = (now_ms % 2000) as f32 / 2000.0;
    let t = (phase * std::f32::consts::TAU).sin() * 0.5 + 0.5;
    let alpha = 0.30 + t * 0.70;
    match color { Color::Rgb(r, g, b) => { let s = |c: u8| -> u8 { ((f32::from(c)) * alpha).round().clamp(0.0, 255.0) as u8 }; Color::Rgb(s(r), s(g), s(b)) } other => other }
}

// ── RGB→ANSI conversion (unchanged) ─────────────────────────────
#[must_use] pub fn rgb_to_ansi256(r: u8, g: u8, b: u8) -> u8 {
    let (r, g, b) = (u32::from(r), u32::from(g), u32::from(b));
    if r == g && g == b {
        if r < 8 { return 16; } if r > 248 { return 231; }
        return ((r - 8) / 10 + 232) as u8;
    }
    let r6 = (r * 5 / 255) as u8; let g6 = (g * 5 / 255) as u8; let b6 = (b * 5 / 255) as u8;
    16 + 36 * u8::from(r6) + 6 * u8::from(g6) + u8::from(b6)
}
#[must_use] pub fn nearest_ansi16(r: u8, g: u8, b: u8) -> Color {
    let luminance = 0.299 * f32::from(r) + 0.587 * f32::from(g) + 0.114 * f32::from(b);
    let bright = luminance > 127.0;
    let sr = if r > 127 { 1 } else { 0 }; let sg = if g > 127 { 1 } else { 0 }; let sb = if b > 127 { 1 } else { 0 };
    match (sr, sg, sb, bright) {
        (0,0,0,false) => Color::Black, (0,0,0,true) => Color::Gray,
        (1,0,0,false) => Color::Red, (1,0,0,true) => Color::LightRed,
        (0,1,0,false) => Color::Green, (0,1,0,true) => Color::LightGreen,
        (1,1,0,false) => Color::Yellow, (1,1,0,true) => Color::LightYellow,
        (0,0,1,false) => Color::Blue, (0,0,1,true) => Color::LightBlue,
        (1,0,1,false) => Color::Magenta, (1,0,1,true) => Color::LightMagenta,
        (0,1,1,false) => Color::Cyan, (0,1,1,true) => Color::LightCyan,
        (1,1,1,false) => Color::White, (1,1,1,true) => Color::White,
        _ => if bright { Color::Gray } else { Color::DarkGray },
    }
}
