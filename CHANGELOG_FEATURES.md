# Feature Implementation Changelog — `sujal.dev`

This document tracks all new feature additions, component implementations, UX improvements, and architectural decisions made locally.

---

## [Phase 1: Core UX & Conversion Engine] — 2026-09-24

### 1. In-Page Case Study Slide-Over Drawer
* **Components Created:**
  * `src/components/CaseStudyDrawer.astro`: Semantic `<dialog>` drawer component with responsive docking (620px slide-over on desktop, bottom-sheet on mobile).
  * `src/scripts/drawer.ts`: TypeScript controller handling accessible focus trapping, keyboard navigation (`Esc` to dismiss), body scroll-locking with scrollbar layout-shift compensation, and URL hash routing.
* **UX & Interaction Decisions:**
  * **Emil Kowalski Motion Spec:** Hardware-accelerated `transform: translateX(100%)` ➔ `translateX(0)` entry curve: `280ms cubic-bezier(0.23, 1, 0.32, 1)`, and `180ms ease-in` exit.
  * **Progressive Disclosure:** Replaced external navigation bounces with an in-page deep dive showcasing system architecture flows, technical tradeoffs, benchmarks, and direct GitHub links.
  * **Deep-Linking:** Supports deep-links (e.g. `sujal.dev#project-agent`) to immediately open the corresponding project drawer.

### 2. 1-Click "Copy Email" & Tactile Toast System
* **Components & Scripts Created:**
  * `src/scripts/toast.ts`: Lightweight, accessible toast utility rendering non-intrusive bottom-center feedback when copying contact info.
* **UX & Interaction Decisions:**
  * Intercepts `mailto:` links on click to write `sujalsah9@gmail.com` to the clipboard.
  * Displays a tactile confirmation toast (`"Copied sujalsah9@gmail.com to clipboard! 📋"`) with a secondary fallback to launch the mail client.

### 3. Automated Playwright E2E Verification
* **Test Suite 1 (`tests/test-ux-features.cjs`):**
  * ✅ **Drawer Slide-Over:** Project card click properly slides open the case study drawer with 3 metric tiles, 6 architecture flow nodes, and GitHub links.
  * ✅ **Keyboard Dismissal:** `Escape` key cleanly closes the drawer and restores scroll position.
  * ✅ **Deep-Linking:** Direct URL hash deep-linking (`#project-systems`) immediately opens the RAG & Semantic Search Engine case study.
  * ✅ **Theme Compatibility:** Spidey dark mode theme switcher updates drawer surfaces, borders, and text seamlessly.
  * ✅ **1-Click Copy Email:** Clicking email link triggers clipboard copy and renders the bottom-center tactile toast notification (`"Copied sujalsah9@gmail.com to clipboard! 📋"`).

* **Test Suite 2 (`tests/test-motion-scroll.cjs`):**
  * ✅ **GSAP Hero Entrance:** 6 taped skill notes and sticker rigs animate into position.
  * ✅ **GSAP ScrollTrigger:** Sticky navigation bar dynamically toggles `.nav-scrolled` on scroll.
  * ✅ **Lenis Smooth Anchor Gliding:** Clicking navigation anchors (`#about`, `#work`, `#contact`) smoothly glides with exponential ease-out interpolation (e.g. #work to 2,311px, #contact to 4,162px).
  * ✅ **GSAP 3D Magnetic Card Tilt:** Real-time pointer tracking calculates Euler angles (`matrix3d` transforms) on hover and rebounds elastically.
  * ✅ **Scroll Restoration:** Body scroll lock correctly freezes scroll while drawer is open, and unlocks cleanly upon dismissal without layout shift or breaking Lenis kinetic scroll.

### 4. Drawer Scrolling Resolution & Universal Input Forwarding
* **Root Cause Diagnosis:**
  * **Lenis Event Trapping:** When `lenis.stop()` was called, Lenis defaulted to calling `event.preventDefault()` on wheel events unless the target matched `[data-lenis-prevent]`. Mouse movements over `<svg>` icons (which are `SVGElement` rather than `HTMLElement`) or parent containers triggered event cancellation.
  * **Event Bubbling & Containing Block:** When the mouse hovered over `.drawer-head` or `.drawer-foot`, wheel events terminated on the non-scrolling parent rather than propagating into `.drawer-body`.
  * **Destructive Body Position Fixed:** `document.body.style.position = 'fixed'` caused viewport coordinate recalculations that broke touch dragging on modal elements inside `<body>`.
* **Engineering Resolutions Applied:**
  * Added `prevent: (node) => node?.closest?.('#case-study-drawer') !== null` predicate directly to `new Lenis(...)` in [src/scripts/motion.ts](file:///c:/Users/sujal/OneDrive/Desktop/portfolio/src/scripts/motion.ts) to guarantee zero interference with the drawer.
  * Replaced `position: fixed` on body with non-destructive `html.drawer-locked, body.drawer-locked { overflow: hidden !important; overscroll-behavior: none !important; }` in [src/styles/global.css](file:///c:/Users/sujal/OneDrive/Desktop/portfolio/src/styles/global.css).
  * Added universal wheel and touch gesture forwarding on `.drawer-panel` in [src/scripts/drawer.ts](file:///c:/Users/sujal/OneDrive/Desktop/portfolio/src/scripts/drawer.ts) so scrolling anywhere on the drawer panel, header, or footer smoothly scrolls `.drawer-body`.
  * Implemented keyboard scrolling inside the drawer (`ArrowDown`, `ArrowUp`, `PageDown`, `PageUp`, `Home`, `End`, `Space`).
  * Styled custom thin tactile scrollbar with Spider-Verse red thumb (`scrollbar-width: thin;` and `::-webkit-scrollbar` with Spidey theme overrides) in [src/components/CaseStudyDrawer.astro](file:///c:/Users/sujal/OneDrive/Desktop/portfolio/src/components/CaseStudyDrawer.astro).
* **Automated Verification (`tests/test-drawer-scroll-v2.cjs`):**
  * ✅ **Direct Body Wheel:** Scrolled from 0px ➔ 250px.
  * ✅ **Header Forwarded Wheel:** Scrolled from 250px ➔ 400px.
  * ✅ **Keyboard PageDown:** Scrolled from 400px ➔ 494px (bottom reached).
  * ✅ **Background Lock:** `drawer-locked` verified active during open state.
  * ✅ **Visual Proof:** Verified via `tests/screenshots/6-drawer-scrolled-perfect.png`.

---

## [Phase 2: Recruiter Conversion, Tactile Physics & Micro-Sensory Feedback] — 2026-09-24

### 1. One-Click Recruiter / ATS High-Density Resume Overlay
* **Components & Scripts Created:**
  * [src/components/RecruiterModal.astro](file:///c:/Users/sujal/OneDrive/Desktop/portfolio/src/components/RecruiterModal.astro): Semantic `<dialog>` modal engineered for recruiters and hiring managers. Features an executive summary, a structured ATS competencies matrix (AI, Backend, Frontend, DevOps), 4 quantified production systems, and education.
  * [src/scripts/recruiter.ts](file:///c:/Users/sujal/OneDrive/Desktop/portfolio/src/scripts/recruiter.ts): Recruiter controller providing 1-click `window.print()` trigger for immediate PDF export, plain-text resume clipboard export, and accessible `Escape` dismissal.
* **UX & Interaction Decisions:**
  * **Emil Kowalski Transition:** Swift modal entrance (`260ms cubic-bezier(0.23, 1, 0.32, 1)`) with background blur and `transform: scale(0.96) ➔ scale(1)`.
  * **Print Optimization (`@media print`):** Strips backdrops, buttons, and navigation, formatting the resume cleanly for standard 8.5x11 / A4 PDF saving.
  * **Theme Adaptability:** Full integration with Spidey dark mode (`.spidey` and `.spidey-theme`).

### 2. Interactive Draggable & Peelable Tape Skill Stickers
* **Location in UI:**
  * Located directly in the **Hero Landing Section**, wrapped around the central Sujal character illustration (`AI Systems`, `Distributed`, `Autonomous Agents`, `Cloud Infra`, `ML Pipelines`, `60fps Web`).
* **Implementation ([src/scripts/motion.ts](file:///c:/Users/sujal/OneDrive/Desktop/portfolio/src/scripts/motion.ts), [src/styles/global.css](file:///c:/Users/sujal/OneDrive/Desktop/portfolio/src/styles/global.css)):**
  * **Hover Lift:** Hovering over the yellow tape strip curls the tape edge (`rotate(-9deg) skewX(8deg) translateY(-2px)`).
  * **Click to Peel:** Clicking the tape strip directly physically peels it back at an angle (`-26deg`, `skewX: 20`, `y: -9px`) with haptic tape peel audio, followed by an elastic snap-back settling (`ease: 'elastic.out(1.3, 0.35)'`).
  * **Drag & Toss Physics:** Dragging any note triggers `.is-peeled` mode where the tape stays unpeeled during drag with dynamic momentum tilt based on pointer velocity. Releasing the note elastically adheres the tape back to the paper.
  * **Boundary Clamping:** GSAP `Draggable` ensures stickers cannot be dragged off-screen (`bounds: '.hero'`).

### 3. Synthesized Web Audio Micro-FX Engine (0kb Zero-Asset)
* **Implementation ([src/scripts/audio.ts](file:///c:/Users/sujal/OneDrive/Desktop/portfolio/src/scripts/audio.ts)):**
  * Pure native browser `AudioContext` — 0 external audio files, 0KB network payload.
  * **Sound Library:**
    * `playClick()`: 12ms soft sine decay (`1100Hz ➔ 450Hz`, gain `0.06`) on buttons.
    * `playPop()`: Bubble pop (`320Hz ➔ 680Hz`) on project card interactions.
    * `playPeel()`: Filtered bandpass noise burst simulating tape peel on sticker drag.
    * `playSpidey()`: Resonant low-frequency triangle surge (`220Hz ➔ 55Hz`) on dark theme activation.
    * `playChime()`: Dual-tone harmonic chime (`660Hz + 990Hz`) on email copy.
  * **User Controls & Consent:**
    * Global mute toggle button in navigation (`#sound-toggle` with `🔇` / `🔊` state).
    * Preference persisted in `localStorage ('sujal-sound')`.
    * Auto-muted if `prefers-reduced-motion: reduce` is enabled.

### 4. Automated Playwright E2E Verification (`tests/test-phase2.cjs`)
* ✅ **ATS Resume Modal:** Recruiter button opens modal, loads candidate profile, 4 project blueprints, and copies raw resume text (`"Copied! ✓"`).
* ✅ **Modal Dismissal:** `Escape` key cleanly closes modal and restores focus.
* ✅ **Web Audio Controls:** Mute toggle flips state (`aria-pressed: true`), triggers audio synthesizer cleanly without console errors.
* ✅ **Draggable Physics:** Tape sticker successfully dragged and displaced by `dx=120px, dy=70px` within hero bounds.
* ✅ **Screenshots Captured:**
  * `tests/screenshots/7-recruiter-mode-desktop.png` (Clean ATS light mode)
  * `tests/screenshots/8-recruiter-mode-dark.png` (Spidey dark mode)
  * `tests/screenshots/9-draggable-stickers-moved.png` (Draggable stickers in action)

---

## [Phase 3] - Command Palette & Live Architecture Flow Simulation (Completed & Verified)

### 1. Raycast / Linear-Style Command Palette (⌘K / Ctrl+K)
* **Component ([src/components/CommandPalette.astro](file:///c:/Users/sujal/OneDrive/Desktop/portfolio/src/components/CommandPalette.astro)):**
  * Accessible `<dialog>` modal with native focus trap, `aria-modal="true"`, and blur backdrop filter (`blur(8px)`).
  * Fast fuzzy-filtering input for instant project navigation, section jumps, and action triggers.
  * Nav bar trigger button with tactile `<kbd>⌘K</kbd>` badge.
  * Bottom status footer with keyboard shortcut guide (`↑↓ Navigate`, `↵ Select`, `esc Dismiss`) and `sujal.dev` branding.
* **Controller ([src/scripts/palette.ts](file:///c:/Users/sujal/OneDrive/Desktop/portfolio/src/scripts/palette.ts)):**
  * Global hotkey listener for `Cmd+K` (Mac) and `Ctrl+K` (Windows/Linux).
  * Arrow key cycling with automatic scroll-into-view behavior.
  * Full command palette registry:
    * **Actions & Tools:** Open Recruiter / ATS Resume Mode, Copy Email Address, Toggle Spidey Theme, Toggle Audio Effects.
    * **Projects & Case Studies:** Autonomous AI Assistant Swarm, Real-Time Collaboration Platform, Hybrid RAG Search Engine, AI Analytics Dashboard, Intelligent Automation Pipeline, Interactive Portfolio.
    * **Navigation:** Jump to Top (Hero & Stickers), About Section, Selected Work Grid, Contact Section.
  * Lenis smooth scroll coordination (pauses scroll while palette is open, resumes on close).

### 2. Live Interactive Architecture Flow Simulator
* **Interactive Pipeline Simulation ([src/components/CaseStudyDrawer.astro](file:///c:/Users/sujal/OneDrive/Desktop/portfolio/src/components/CaseStudyDrawer.astro), [src/scripts/drawer.ts](file:///c:/Users/sujal/OneDrive/Desktop/portfolio/src/scripts/drawer.ts)):**
  * Added `⚡ Simulate Pipeline Flow` button with a pulsing status dot (`simPulse` animation).
  * When triggered, step-by-step asynchronous event packet traversal lights up architecture nodes sequentially.
  * Dynamic latency simulation badges appended to each node (`+16ms`, `+22ms`, etc.) along with running cumulative latency tracking.
  * Tactile node highlight: active node scales with bright crimson glow (`0 0 16px rgba(216, 64, 47, 0.6)`), completed nodes turn emerald green (`#00b862`).
  * Connecting arrows pulse in sequence (`transform: scale(1.5)`).
  * Audio synthesis sync: `playPop()` fires at each pipeline step; terminal node fires dual-tone `playChime()`.
  * Status button updates in real time to `"Transmitting Event..."` ➔ `"✓ Validated (145ms total)"`, and auto-resets smoothly after 3.2s.
  * Clean cancellation: if the drawer is dismissed or another project is opened mid-simulation, all timeouts are cleared immediately via `stopSimulation()`.

### 3. Automated Playwright E2E Verification (`tests/test-phase3.cjs`)
* ✅ **Hotkey Trigger:** `Ctrl+K` / `Cmd+K` instantly displays command palette dialog.
* ✅ **Search Filtering:** Typing query (e.g. `"agent"`) accurately filters commands with zero layout flicker.
* ✅ **Direct Execution:** Selecting an item via `Enter` closes the palette and opens the corresponding case study drawer.
* ✅ **Live Pipeline Simulator:** Step traversal successfully animates through all nodes, creates latency badges, and validates pipeline latency.
* ✅ **Theme Toggle from Palette:** Theme toggling from palette successfully switches between Paper light mode and Spidey dark mode.
* ✅ **Screenshots Captured (`tests/screenshots/`):**
  * `14-command-palette-open.png` (Default state with categories, badges, shortcuts)
  * `15-command-palette-search-agent.png` (Search filter and active selection highlight)
  * `16-flow-simulation-active.png` (Active pipeline packet traversal with live latency pills)
  * `17-flow-simulation-validated.png` (Final validation state with cumulative total latency)
  * `18-command-palette-dark-mode.png` (Spider-Verse dark mode palette with glowing neon accents)

---

## [Phase 4] - Developer CLI Terminal, Work Filter Tabs & Confetti Engine (Completed & Verified)

### 1. Interactive Developer CLI Terminal (`sujal.sh`)
* **Component ([src/components/DeveloperTerminal.astro](file:///c:/Users/sujal/OneDrive/Desktop/portfolio/src/components/DeveloperTerminal.astro)):**
  * Accessible `<dialog>` modal with macOS-style window controls (red/yellow/green dot buttons), monospace terminal styling, and blur backdrop.
  * Floating quick-access terminal dock button (`>_ CLI`) anchored at bottom-left with tactile press and hover elevation.
  * Quick-command chips row at the bottom for instant mobile and mouse execution (`help`, `skills`, `projects`, `whoami`, `sudo hire 🎉`).
* **Controller ([src/scripts/terminal.ts](file:///c:/Users/sujal/OneDrive/Desktop/portfolio/src/scripts/terminal.ts)):**
  * Global hotkey listener: toggle with backtick (`` ` ``) or tilde (`~`) from anywhere on the page.
  * Command history navigation with `ArrowUp` / `ArrowDown`.
  * Real-time audio typing clicks synced with `AudioContext`.
  * **Command Registry:**
    * `help`: Formatted command table with descriptions.
    * `skills`: ASCII matrix of tech proficiencies with progress gauges (`[█████████░] 92%`).
    * `projects`: Table of 6 projects with instructions to run `open <name>`.
    * `open <name>`: Directly opens project case study drawer without leaving the shell.
    * `resume`: Opens Recruiter / ATS Resume Mode.
    * `contact`: Formatted contact channels & social links.
    * `theme`: Toggles Spidey dark / Paper light theme.
    * `sound`: Toggles Web Audio feedback.
    * `clear`: Clears output buffer.
    * `sudo hire`: Triggers celebratory access granted banner, harmonic chime, and multi-colored confetti!

### 2. High-Performance 0-Dependency Canvas Confetti Engine
* **Engine ([src/scripts/confetti.ts](file:///c:/Users/sujal/OneDrive/Desktop/portfolio/src/scripts/confetti.ts)):**
  * Pure native `<canvas>` particle physics engine with zero external dependencies (0kb bundle bloat).
  * 60fps locked particle physics with gravity, air drag, and angular spin.
  * Color palette calibrated to Spider-Verse theme (`#d8402f`, `#f4b41a`, `#1f1d3a`, `#00d26a`, `#3b82f6`).

### 3. Interactive Work Category Filter Tabs
* **Markup & Styles ([src/pages/index.astro](file:///c:/Users/sujal/OneDrive/Desktop/portfolio/src/pages/index.astro), [src/styles/global.css](file:///c:/Users/sujal/OneDrive/Desktop/portfolio/src/styles/global.css)):**
  * Category tabs: `All Projects (6)`, `AI & Agents (2)`, `Distributed Systems (2)`, `Full-Stack & Cloud (2)`.
  * Real-time counter badge: `"Showing X of 6 projects"`.
  * Smooth card filter transitions (`.is-filtered-out`, `.is-filtered-in` with `transform: scale(0.92)`).
* **Controller ([src/scripts/filter.ts](file:///c:/Users/sujal/OneDrive/Desktop/portfolio/src/scripts/filter.ts)):**
  * Tactile button clicks with Web Audio integration (`playClick`).
  * Instant non-blocking DOM filtering without page reload or layout shift.

### 4. Automated Playwright E2E Verification (`tests/test-phase4.cjs`)
* ✅ **Work Filter Tabs:** Successfully filters down to 2 AI projects, updates counter badge to `"Showing 2 of 6 projects"`, and restores to 6 on `"All Projects"`.
* ✅ **Terminal Dock & Hotkey:** Opens cleanly via dock button `#terminal-dock-btn` and backtick hotkey.
* ✅ **Command Execution:** `skills`, `projects`, and `sudo hire` execute properly and append formatted DOM structures.
* ✅ **Confetti Particle Burst:** `sudo hire` triggers celebratory banner and live canvas confetti explosion.
* ✅ **Quick Pills:** Quick command buttons execute associated commands on click.
* ✅ **Screenshots Captured (`tests/screenshots/`):**
  * `19-work-filter-ai.png` (Work grid filtered by AI & Agents with counter badge)
  * `20-terminal-initial.png` (Developer terminal window with title bar and quick pills)
  * `21-terminal-commands-celebration.png` (Terminal with ASCII skills matrix, "sudo hire", and live confetti particles)

---

## [Phase 5: Simplification & Gimmick Elimination] — 2026-09-24

Per user direction, eliminated novelty gimmicks and portfolio slop to restore a focused, senior-level presentation:

### 1. Removed Features
* **Feature 9 (Command Palette / Quick Launcher):** Removed `src/components/CommandPalette.astro`, `src/scripts/palette.ts`, and `#palette-nav-btn`. Navigation is direct and single-page, making a palette redundant overhead.
* **Feature 11 (Work Category Filter Tabs):** Removed `.work-filter-bar`, filter tabs, and `src/scripts/filter.ts`. With 6 curated, high-impact projects, filtering adds visual clutter and artificially fragments the grid.
* **Feature 12 (Developer CLI Terminal):** Removed `src/components/DeveloperTerminal.astro`, `src/scripts/terminal.ts`, and dock trigger. Terminal emulators feel like novelty toys rather than authentic enterprise engineering.
* **Feature 13 (Canvas Confetti Engine):** Removed `src/scripts/confetti.ts`. Confetti animations dilute a professional engineering tone.
* **Audio FX Engine & Sound Button:** Removed `#sound-toggle`, `src/scripts/audio.ts`, and all Web Audio invocations across drawer, toasts, buttons, and themes. Unsolicited sound effects in web portfolios are distracting and unprofessional.
* **Architecture Flow Event Simulation Loop:** Removed `⚡ Simulate Pipeline Flow` button, fake latency badges, and loop from [src/components/CaseStudyDrawer.astro](file:///c:/Users/sujal/OneDrive/Desktop/portfolio/src/components/CaseStudyDrawer.astro) and [src/scripts/drawer.ts](file:///c:/Users/sujal/OneDrive/Desktop/portfolio/src/scripts/drawer.ts). The architecture diagram is now a clean, authentic static system blueprint.
* **Hero Skill Sticker Dragging (`gsap.Draggable`):** Removed `Draggable` plugin import and displacement logic from [src/scripts/motion.ts](file:///c:/Users/sujal/OneDrive/Desktop/portfolio/src/scripts/motion.ts) and grab cursors from [src/styles/global.css](file:///c:/Users/sujal/OneDrive/Desktop/portfolio/src/styles/global.css). Stickers stay firmly anchored in their illustrated layout with gentle ambient floating and hover lift, preventing accidental touch/scroll displacement.

### 2. Cleaned Assets & Styles
* Removed CSS rules for `.nav-palette-btn`, `.nav-sound-btn`, `.work-filter-bar`, `.filter-tabs`, `.work-filter-tab`, `.simulate-flow-btn`, `.sim-latency-badge`, and grab cursors.
* Completely unlinked deleted script bundles from [src/pages/index.astro](file:///c:/Users/sujal/OneDrive/Desktop/portfolio/src/pages/index.astro).
* Build verified with `0 errors` and automated test verification passed across all test suites (100% pass rate).


---



