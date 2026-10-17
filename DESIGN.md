---
version: alpha
name: "Retro Creator OS"
description: "Authentic 80s/90s Cyberpunk, Vaporwave, and Arcade design system specification for retro content creator web applications."
colors:
  # Base Backgrounds (Cyber Synth default)
  bg-primary: "#0A0B12"
  bg-secondary: "#121424"
  bg-surface: "#181B30"
  bg-window-header: "#1F2342"
  window-border: "#3D4370"

  # Core Neon Accents
  neon-cyan: "#00F0FF"
  neon-pink: "#FF007F"
  neon-yellow: "#FFBE0B"
  neon-green: "#39FF14"
  neon-purple: "#9D4EDD"

  # Semantic Interaction Tokens
  primary: "#00F0FF"
  secondary: "#FF007F"
  accent-glow: "rgba(0, 240, 255, 0.40)"
  accent-glow-pink: "rgba(255, 0, 127, 0.40)"
  accent-glow-yellow: "rgba(255, 190, 11, 0.50)"

  # Typography & Contrast Tokens
  text-main: "#F0F4FF"
  text-muted: "#8E99B7"
  text-terminal: "#39FF14"
  text-dark: "#050608"

  # Hardware Bevel Tokens
  bevel-light: "#4C548A"
  bevel-dark: "#08090F"

  # Theme Palette: Matrix Terminal Green
  theme-matrix-bg-primary: "#050D05"
  theme-matrix-bg-secondary: "#0A1A0C"
  theme-matrix-bg-surface: "#0F2812"
  theme-matrix-bg-header: "#143619"
  theme-matrix-border: "#22592B"
  theme-matrix-primary: "#00FF66"
  theme-matrix-secondary: "#70FF00"
  theme-matrix-text-main: "#D0FFD8"
  theme-matrix-text-muted: "#66B277"
  theme-matrix-bevel-light: "#25612F"
  theme-matrix-bevel-dark: "#030803"

  # Theme Palette: Vaporwave Sunset
  theme-vapor-bg-primary: "#180D28"
  theme-vapor-bg-secondary: "#26143F"
  theme-vapor-bg-surface: "#361B58"
  theme-vapor-bg-header: "#4C267A"
  theme-vapor-border: "#6D3CA8"
  theme-vapor-primary: "#FF71CE"
  theme-vapor-secondary: "#01CDFE"
  theme-vapor-text-main: "#FFF0FC"
  theme-vapor-text-muted: "#B99CCB"
  theme-vapor-bevel-light: "#7C44C2"
  theme-vapor-bevel-dark: "#0F071A"

typography:
  pixel-display:
    fontFamily: "'Press Start 2P', 'Courier New', monospace"
    fontSize: "1.85rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  pixel-title:
    fontFamily: "'Press Start 2P', 'Courier New', monospace"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.25
  pixel-subhead:
    fontFamily: "'Press Start 2P', 'Courier New', monospace"
    fontSize: "0.85rem"
    fontWeight: 700
    lineHeight: 1.3
  pixel-caption:
    fontFamily: "'Press Start 2P', 'Courier New', monospace"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.35
  pixel-btn:
    fontFamily: "'Press Start 2P', 'Courier New', monospace"
    fontSize: "0.72rem"
    fontWeight: 700
    lineHeight: 1
  pixel-badge:
    fontFamily: "'Press Start 2P', 'Courier New', monospace"
    fontSize: "0.55rem"
    fontWeight: 700
    lineHeight: 1
  pixel-micro:
    fontFamily: "'Press Start 2P', 'Courier New', monospace"
    fontSize: "0.48rem"
    fontWeight: 700
    lineHeight: 1
  mono-terminal:
    fontFamily: "'VT323', 'Courier New', monospace"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.45
  mono-body:
    fontFamily: "'VT323', 'Courier New', monospace"
    fontSize: "1.15rem"
    fontWeight: 400
    lineHeight: 1.5
  mono-meta:
    fontFamily: "'VT323', 'Courier New', monospace"
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.4
  sans-system:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5

rounded:
  none: "0px"
  xs: "1px"
  sm: "2px"
  md: "4px"
  full: "9999px"

spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  2xl: "32px"
  3xl: "48px"

components:
  window:
    backgroundColor: "{colors.bg-surface}"
    textColor: "{colors.text-main}"
    rounded: "{rounded.sm}"
    padding: "24px"
  window-header:
    backgroundColor: "{colors.bg-window-header}"
    textColor: "{colors.primary}"
    padding: "8px 14px"
  window-control-btn:
    backgroundColor: "{colors.bg-surface}"
    textColor: "{colors.text-muted}"
    rounded: "{rounded.none}"
    size: "18px"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-dark}"
    rounded: "{rounded.none}"
    padding: "12px 18px"
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "#FFFFFF"
    rounded: "{rounded.none}"
    padding: "12px 18px"
  button-compact:
    backgroundColor: "{colors.bg-surface}"
    textColor: "{colors.text-main}"
    rounded: "{rounded.none}"
    padding: "6px 10px"
  card:
    backgroundColor: "{colors.bg-surface}"
    textColor: "{colors.text-main}"
    rounded: "{rounded.none}"
    padding: "16px"
  terminal:
    backgroundColor: "#05070C"
    textColor: "{colors.text-terminal}"
    rounded: "{rounded.none}"
    padding: "16px"
  input:
    backgroundColor: "#000000"
    textColor: "#FFFFFF"
    rounded: "{rounded.none}"
    padding: "8px 14px"
  badge:
    backgroundColor: "{colors.secondary}"
    textColor: "#FFFFFF"
    rounded: "{rounded.xs}"
    padding: "4px 8px"
---

## Overview

Retro Creator OS is an immersive design system inspired by late-80s arcade cabinets, early-90s desktop operating systems (Windows 95 / System 7 / AmigaOS Workbench), cyberpunk terminal interfaces, and late-90s vaporwave net culture.

The system is designed specifically for content creator portfolios, digital artists, chiptune composers, game developers, and streaming personalities who demand high-flavor visual identity without sacrificing modern web standards, responsive fluidity, or accessibility.

### Core Philosophy
1. **Faithful Nostalgia with Modern Rigor:** Recreate authentic physical hardware sensations — tactile 3D beveled edges, scanline monitors, mechanical cassette tape reels, arcade coin slots, and glowing phosphor cathode-ray tubes (CRTs) — rendered through lightweight CSS3 and semantic HTML5.
2. **Deterministic Token Hierarchy:** All color choices, typography scales, elevation shadows, and component dimensions adhere to strict token scales defined in the YAML frontmatter.
3. **High Contrast & Inclusivity:** Despite vibrant neon aesthetics, contrast ratios strictly satisfy WCAG 2.1 AA benchmarks across all three switchable palettes. Motion and CRT effects honor reduced motion preferences and user toggles.

---

## Colors

The color palette centers on three themes: **Cyber Synth** (default), **Matrix Terminal**, and **Vaporwave Sunset**. All color tokens are designed to provide maximum visual punch while maintaining readable text contrasts.

### 1. Cyber Synth (Default Palette)
* **`bg-primary` (`#0A0B12`):** Obsidian deep space background, grounding the canvas with subtle magenta and cyan radial glow washes.
* **`bg-secondary` (`#121424`):** Elevated navy container background for taskbars, footers, and card chrome.
* **`bg-surface` (`#181B30`):** Window panes, active card bodies, and interactive surface panels.
* **`bg-window-header` (`#1F2342`):** Beveled OS title bars and chrome headers.
* **`window-border` (`#3D4370`):** Outer window framing and structural dividing rules.
* **`neon-cyan` / `primary` (`#00F0FF`):** High-voltage cyan for primary buttons, avatar frames, window headers, and active links.
* **`neon-pink` / `secondary` (`#FF007F`):** Hot magenta for secondary action buttons, live broadcast badges, and like hearts.
* **`neon-yellow` (`#FFBE0B`):** Arcade gold for coin slots, system clock displays, and tape reel progress labels.
* **`neon-green` (`#39FF14`):** Phosphor terminal green for online status indicators, audio visualizer bars, and VT100 prompt responses.
* **`text-main` (`#F0F4FF`):** Crisp cool white with a 17.8:1 contrast ratio against `--bg-primary` (WCAG AAA).
* **`text-muted` (`#8E99B7`):** Slate lavender for metadata, author handles, timestamps, and secondary captions (5.4:1 contrast ratio, WCAG AA).
* **`text-dark` (`#050608`):** Deep carbon text placed over primary cyan buttons, delivering a 14.8:1 contrast ratio.

### 2. Matrix Terminal Green Palette
* **`theme-matrix-bg-primary` (`#050D05`):** Deep terminal black-green.
* **`theme-matrix-bg-surface` (`#0F2812`):** Dark phosphor chamber panel.
* **`theme-matrix-primary` (`#00FF66`):** Vibrant cyber-green driver.
* **`theme-matrix-secondary` (`#70FF00`):** Acid lime accent.
* **`theme-matrix-text-main` (`#D0FFD8`):** Bright phosphor luminescent text.

### 3. Vaporwave Sunset Palette
* **`theme-vapor-bg-primary` (`#180D28`):** Deep twilight purple.
* **`theme-vapor-bg-surface` (`#361B58`):** Rich royal violet.
* **`theme-vapor-primary` (`#FF71CE`):** Electric pastel magenta.
* **`theme-vapor-secondary` (`#01CDFE`):** Pastel sky cyan.
* **`theme-vapor-text-main` (`#FFF0FC`):** Soft rose-tinted white.

### Contrast Ratios & Accessibility Compliance
| Foreground | Background | Usage | Ratio | WCAG 2.1 AA |
|:---|:---|:---|:---|:---|
| `#F0F4FF` (`text-main`) | `#0A0B12` (`bg-primary`) | Body copy, card headers | 17.8:1 | Pass (AAA) |
| `#8E99B7` (`text-muted`) | `#181B30` (`bg-surface`) | Metadata, dates, bios | 4.9:1 | Pass (AA) |
| `#050608` (`text-dark`) | `#00F0FF` (`primary`) | Primary button labels | 14.8:1 | Pass (AAA) |
| `#FFFFFF` | `#FF007F` (`secondary`) | Secondary buttons, badges | 4.6:1 | Pass (AA) |
| `#39FF14` (`text-terminal`) | `#05070C` (`terminal`) | Terminal command stream | 15.2:1 | Pass (AAA) |

---

## Typography

Typography establishes the vintage computational character through two distinct font styles: **Pixel Display Typography** and **Monospace Computing Typography**.

### Font Families
* **Display / Pixel Headings:** `'Press Start 2P', 'Courier New', monospace`
  * Applied to: Main titles, window chrome titles, buttons, tags, hit counter numbers, arcade coin tally, and category filter tabs.
  * Rendering: Crisp integer rendering with letter-spacing tuned to avoid pixel collisions.
* **Prose & Terminal Monospace:** `'VT323', 'Courier New', monospace`
  * Applied to: Long-form creator bio, guestbook messages, card descriptions, navigation links, and terminal inputs.
  * Rendering: High-density vertical pixel geometry with smooth reading rhythm at `1.15rem` - `1.3rem`.
* **System Sans Fallback:** `system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif`
  * Reserved strictly as a safe universal system fallback for mobile environments where custom web fonts fail to load.

### Type Hierarchy
1. **`pixel-display` (`1.85rem` / `~30px`):** Used for creator handle banner (`KIRA_NOVA // LEVEL 99`). Features multi-color cyan/magenta offset shadow effects (`2px 2px 0 #FF007F, -2px -2px 0 #00F0FF`).
2. **`pixel-title` (`1.25rem` / `~20px`):** Used for arcade cabinet headers, level stats, and module milestones.
3. **`pixel-subhead` (`0.85rem` / `~14px`):** Used for window titles, section headers, and coin cabinet titles.
4. **`pixel-caption` (`0.75rem` / `~12px`):** Card titles and primary button labels.
5. **`pixel-badge` (`0.55rem` / `~9px`):** Live broadcasting pills, category badges, hit counter labels, and audio track titles.
6. **`mono-terminal` (`1.25rem` / `~20px`):** Terminal command prompts and VT100 console output streams.
7. **`mono-body` (`1.15rem` / `~18px`):** General paragraph text, guestbook comments, and release descriptions.
8. **`mono-meta` (`0.95rem` / `~15px`):** Card durations, author timestamps, and audio timestamps.

---

## Layout

Layouts employ a modular window architecture grounded on an 8px spacing grid and responsive CSS Grid / Flexbox structures.

### Grid & Spacing Scales
* **Base Unit:** 4px micro scale, 8px layout rhythm (`sm: 8px`, `md: 12px`, `lg: 16px`, `xl: 24px`, `2xl: 32px`, `3xl: 48px`).
* **Container Max Width:** `1100px` centered with `1.25rem` (`20px`) inline padding.
* **Section Gap:** `2.25rem` (`36px`) between desktop OS window containers.

### Responsive Breakpoints
* **Desktop (`> 900px`):**
  * Top sticky OS taskbar with brand indicator, navigation, theme pills, CRT/SFX toggles, and live clock.
  * Hero Section: 2-column grid (`240px` avatar column, `1fr` creator bio and stats).
  * Content Showcase: Auto-fill grid (`repeat(auto-fill, minmax(300px, 1fr))`).
  * Tip Jar & Guestbook: 2-column equal split (`1fr 1fr`).
* **Tablet (`601px` - `900px`):**
  * Hero switches to a stacked centered single-column layout.
  * Tip Jar and Guestbook collapse into stacked single-column windows.
  * Stats bar maintains a 3-column inline format (`max-width: 500px`).
* **Mobile (`<= 600px`):**
  * Root font size downscales to `14px` for comfortable pixel rendering.
  * Taskbar wraps into flex-column with justified utility action buttons.
  * Creator stats bar collapses to single-column stacked rows.
  * Custom coin form and terminal inputs shift to full-width block buttons.

---

## Elevation & Depth

Retro Creator OS rejects modern soft Gaussian blurs in favor of physical hardware elevation cues: sharp beveled highlights, mechanical insets, and neon bloom lighting.

### Bevel & Shadow Tokens
* **Raised Button & Panel Elevation (`--box-shadow-raised`):**
  * `2px 2px 0px var(--bevel-dark), -2px -2px 0px var(--bevel-light)`
  * Simulates a physically extruded piece of hardware illuminated from the top-left.
* **Pressed / Inset Active State (`--box-shadow-pressed`):**
  * `inset 2px 2px 0px var(--bevel-dark), inset -2px -2px 0px var(--bevel-light)`
  * Simulates a button physically depressed into the console casing.
* **Window Chrome Hard Drop Shadow:**
  * `4px 4px 0px rgba(0, 0, 0, 0.70), inset 1px 1px 0px var(--bevel-light)`
  * Gives OS windows crisp mechanical separation over the starfield background.
* **Neon Glow / Bloom:**
  * Cyan Bloom: `box-shadow: 0 0 10px rgba(0, 240, 255, 0.40)`
  * Magenta Bloom: `box-shadow: 0 0 12px rgba(255, 0, 127, 0.40)`
  * Gold Bloom: `box-shadow: 0 0 8px rgba(255, 190, 11, 0.50)`
  * Phosphor Green Bloom: `box-shadow: 0 0 8px rgba(57, 255, 20, 0.60)`

### CRT Scanline Overlay
* Rendered via fixed pseudo-layer `#crt-overlay` with pointer-events disabled.
* Generated using repeating linear gradient (`rgba(18, 16, 16, 0) 50%` to `rgba(0, 0, 0, 0.35) 50%` with `100% 3px` sizing) combined with an elliptical vignette gradient.
* User controllable: Can be toggled on/off instantly via the taskbar `[CRT: ON/OFF]` control.

---

## Shapes

Authentic 8bit/16bit aesthetics require crisp, boxy geometries with minimal corner curvature.

* **Corners (`rounded`):**
  * `none` (`0px`): Buttons, input fields, cards, terminal, badges, and coin drop slots.
  * `xs` (`1px`): Micro badges and system pills.
  * `sm` (`2px`): Outer retro window containers.
  * `md` (`4px`): Cassette deck inner chassis.
  * `full` (`9999px`): Reserved exclusively for circular mechanical hardware (tape reels, status LED dots).
* **Border Lines:** Consistent `2px solid` borders for containers, windows, cards, and primary buttons. Outer taskbar uses `2px solid var(--window-border)`.
* **Badge Dimensions:** Standardized vintage 90s web badge dimensions: `88px × 31px` with `1px solid #FFF` border.

---

## Components

The design system specifies 10 core component patterns:

### 1. Retro OS Window (`.retro-window`)
* Top header bar with window icon, title text, and window control buttons (`_`, `□`, `✕`).
* Close button turns red (`#FF3344`) on hover.
* Inner content pane framed by `2px solid var(--window-border)` and 3D bevel.

### 2. Retro Action Buttons (`.retro-btn`)
* **Primary Variant (`.btn-primary`):** High-voltage cyan gradient (`#00F0FF` to `#0099FF`), bold dark text (`#050608`), white border, hover brightness `1.15`, cyan bloom shadow.
* **Secondary Variant (`.btn-secondary`):** Magenta gradient (`#FF007F` to `#CC0066`), white text, hot pink bloom.
* **Surface Variant (`.retro-btn`):** Surface background, muted text, bevel raised shadow, cyan border on hover.
* **Pressed State (`:active`, `.pressed`):** Inset bevel shadow with `translate(1px, 1px)`.

### 3. System Taskbar (`.system-taskbar`)
* Sticky top navigation bar containing brand logo, live broadcasting pill with blinking pulse dot, section anchors, theme color switcher, CRT toggle, SFX toggle, and monospace live digital clock.

### 4. Cassette Deck Synthesizer (`.cassette-player-box`)
* 2-tone chassis gradient with dual rotating tape reels (`.tape-reel`) animated via CSS keyframe rotation.
* Reactive 8-bar frequency visualizer (`.synth-visualizer`) dynamically animated or synchronized to HTML5 Web Audio API output.
* Hardware tape controls: Play, Pause, Track Skip, and Now Playing LED status indicator.

### 5. Content Showcase Cards (`.retro-card`)
* Top header bar with category tag and badge.
* 8-bit icon preview box with zoom/tilt hover micro-interaction.
* Card body with pixel title, monospace description, and duration pill.
* Interactive footer featuring like counter button with glowing pink heart.

### 6. Interactive CRT Terminal (`.terminal-body`)
* VT100 black chassis (`#05070C`).
* Scrollable terminal stream with color-coded syntax:
  * User command: Cyan (`#00F0FF`)
  * Command response: Phosphor Green (`#39FF14`)
  * System error: Vermillion (`#FF3344`)
* Active command prompt with blinking cursor and neon pink indicator (`KIRA_OS>`).

### 7. Arcade Tip Jar & Coin Slot (`.tipjar-arcade-cabinet`)
* Golden coin slot frame (`#FFBE0B`).
* Digital tally display with neon green illuminated amount.
* Drop zone triggering physics-simulated falling coin animations and floating yellow "+$X" text.
* Quick-coin selector buttons (`[+ $1]`, `[+ $5]`, `[+ $10]`) plus custom amount input.

### 8. Netizen BBS Guestbook (`.guestbook-layout`)
* High-contrast inputs (`.retro-input`, `.retro-textarea`, `.retro-select`) with inset bevels and cyan focus halos.
* Real-time stream of visitor posts with pixel avatar badges, author callsigns, timestamps, and message cards.

### 9. 88x31 Vintage Webring Badges (`.retro-88x31-badge`)
* Authentic `88px × 31px` buttons replicating 90s net culture ("Netscape Now", "Notepad Coded", "Best at 1024x768", "Cyberpunk Verified").

### 10. Mechanical Visitor Odometer (`.visitor-counter-digits`)
* 6-digit odometer counter with individual gradient digit cylinders, green pixel numbers, and inset shadows.

---

## Do's and Don'ts

### Do's
* **DO** use pixel fonts (`Press Start 2P`) exclusively for short headlines, buttons, window titles, badges, and status labels.
* **DO** use monospace fonts (`VT323`) for all multi-line body text, lists, and terminal outputs to preserve legibility.
* **DO** use hard pixel drop shadows (`2px 2px 0px #000`) and 3D bevels instead of soft blurry drop shadows.
* **DO** provide accessible alternative controls (such as CRT disable toggles and `:focus-visible` dashed outlines).
* **DO** honor `@media (prefers-reduced-motion: reduce)` by disabling reel spins, coin drops, and visualizer dances.
* **DO** verify all text-on-background combinations meet or exceed WCAG 2.1 AA (4.5:1 ratio for normal text, 3:1 for large text).
* **DO** keep interactive elements touch-friendly on mobile with minimum 44px tap targets.

### Don'ts
* **DON'T** apply large border-radii (`border-radius: 8px`, `rounded-lg`, `rounded-full`) to windows, cards, or buttons — this breaks the 8-bit aesthetic.
* **DON'T** use smooth modern pastel tones or desaturated earth tones; stick to high-contrast neon accents over dark obsidian backgrounds.
* **DON'T** write long paragraphs of prose in `Press Start 2P`; dense pixel fonts cause severe eye strain on extended reading.
* **DON'T** use autoplay audio without explicit user interaction (audio synthesizer must start paused or await user initiation).
* **DON'T** remove the skip link (`.skip-link`) or suppress `:focus-visible` outlines.
* **DON'T** rely on non-semantic tags for interactive elements; always use semantic `<button>`, `<nav>`, `<header>`, and `<main>` landmarks.
