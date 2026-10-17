# Retro Creator Landing Page (RETRO_OS v1.99)

A responsive, accessible, retro-styled landing page for content creator **Kira Nova** built with standalone HTML5, CSS3, and vanilla JavaScript (zero external runtime dependencies).

## ✨ Features

- **Cohesive Retro Aesthetic**:
  - Authentic 80s/90s Cyberpunk, Vaporwave, and Arcade styling.
  - Pixel typography using Google Fonts (`Press Start 2P` & `VT323`) with monospace fallbacks.
  - Interactive CRT scanlines & phosphor vignette overlay with toggle control (`CRT: ON/OFF`).
  - Dynamic Theme switcher: Cyber Synth, Matrix Terminal Green, and Vaporwave Sunset.
  - Live 24-hour digital system clock updating every second.
- **Creator Profile & Bio Window**:
  - Retro OS window frame with 3D beveled borders and simulated window controls.
  - Custom pixel-art SVG avatar with animated glowing frame and "LIVE ON AIR" broadcast pill.
  - Creator statistics and quick CTA buttons.
- **Interactive Cyber Cassette Deck / Web Audio Synthesizer**:
  - 100% self-contained chiptune music synthesis using the HTML5 Web Audio API (no external audio files needed).
  - 3 procedurally synthesized tracks (*Cyber Midnight*, *8-Bit Sunset*, *Dungeon Crawler*).
  - Animated spinning tape reels and reactive 8-bit frequency visualizer bars.
- **Transmissions & Creation Showcase**:
  - Filter tabs (`All`, `Streams`, `Chiptune Releases`, `Hardware & Gear`).
  - Interactive cards with badges, durations, and persistent like heart counters (`localStorage`).
- **Interactive Retro CRT Terminal (VT100 Console)**:
  - Functional terminal shell accepting commands: `help`, `about`, `specs`, `schedule`, `socials`, `tracks`, `tip`, `echo`, `date`, `clear`, and secret Konami easter egg (`secret`).
- **Arcade Tip Jar & Coin Box**:
  - Coin drop cabinet with animated falling pixel coin and chime sound effect.
  - Live tip counter tally saved to `localStorage`.
  - Quick donation amounts ($1, $5, $10) and custom amount input.
- **Netizen BBS Guestbook**:
  - Fan message board with retro avatars (`👾`, `🕹️`, `💾`, `📼`, `🚀`, `⚡`, `🐱`).
  - Real-time submission, validation, and `localStorage` persistence.
- **90s Webring & Badges**:
  - Authentic 88x31 vintage pixel badges ("Netscape Ready", "Made with Raw Code", etc.).
  - Social channel link buttons with retro hover feedback.
- **Mechanical / Digital Rolling Hit Counter**:
  - Authentic 6-digit rolling odometer hit counter in footer tracking visitor hits.
- **Accessibility & Performance**:
  - Semantic HTML5 structure (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
  - WCAG 2.1 AA compliant color contrast, ARIA landmarks, `aria-live` regions, and keyboard `:focus-visible` styles.
  - Full support for `prefers-reduced-motion`.
  - Responsive design adapting smoothly across mobile, tablet, and desktop viewports.

## 📁 Project Structure

```text
├── index.html         # Main standalone landing page
├── styles.css         # Retro design styles, CRT effects, themes & animations
├── app.js             # Core audio synth, terminal, guestbook, counter & DOM logic
├── test/
│   └── app.test.js    # Comprehensive unit test suite (35 tests, 94%+ coverage)
└── package.json       # Project scripts and configuration
```

## 🚀 Running Locally

Open `index.html` directly in any modern web browser, or run a local static web server:

```bash
# Using Node / npx
npx serve .
```

## 🧪 Testing

The unit test suite uses Node.js's built-in test runner with high test coverage:

```bash
npm test

# Run with test coverage
node --experimental-test-coverage --test test/*.test.js
```
