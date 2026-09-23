# Sujal · Full Stack & AI Engineer Portfolio

<div align="center">

[![Astro](https://img.shields.io/badge/Astro-7.3-BC52EE?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![GSAP](https://img.shields.io/badge/GSAP-3.15-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://gsap.com/)
[![Lenis](https://img.shields.io/badge/Lenis-Smooth_Scroll-black?style=for-the-badge)](https://lenis.darkroom.engineering/)
[![CI](https://img.shields.io/github/actions/workflow/status/RoxxSujal7/portfolio_roxx/ci.yml?branch=main&label=CI%20Gate&style=for-the-badge)](https://github.com/RoxxSujal7/portfolio_roxx/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

<br/>

![Sujal Portfolio Open Graph Social Preview](./public/og-image.png)

<br/>

**Interactive, poster-style portfolio for Sujal — Full Stack & AI Software Engineer.**  
Featuring *Into the Spider-Verse* comic art direction, tactile physical interactions, advanced GSAP choreographies, Lenis kinetic smooth scrolling, and an interactive **Spidey** dark mode with radial wipe transitions.

🌐 **Live Site**: [sujal.dev](https://sujal.dev) &nbsp;|&nbsp; 🐙 **GitHub**: [@RoxxSujal7](https://github.com/RoxxSujal7) &nbsp;|&nbsp; 💼 **LinkedIn**: [sujalroxx7](https://www.linkedin.com/in/sujalroxx7/) &nbsp;|&nbsp; 📸 **Instagram**: [@roxxsujal7](https://www.instagram.com/roxxsujal7/) &nbsp;|&nbsp; 📬 **Email**: [sujalsah9@gmail.com](mailto:sujalsah9@gmail.com)

</div>

---

## ⚡ Highlights & Engineering Architecture

### 1. 🕷️ Illustrated Poster Art Direction & Spidey Theme
- **Comic Book Poster Aesthetic**: Warm vintage paper texture (`#faf8f3`), deep ink navy typography (`#1f1d3a`), sticker-style illustrations, taped note labels with natural rotational jitter, and custom SVG webs.
- **Interactive Spidey Dark Mode**:
  - Deep crimson accents (`#d8402f`), comic halftone patterns, red thread highlights, and comic sticker drop-shadow glows.
  - Smooth **circular radial wipe transition** powered by the Web Animations API (WAAPI), expanding dynamically from the toggle button coordinates across the entire viewport.
  - Persistent theme preference stored in `localStorage`.

### 2. 🎬 Advanced Animation & Motion Engineering
- **Cinematic Entrance Timeline**: Spidey swings in on a silk web line, lets go mid-air, squishes and rebounds into the hero landing pose, as taped labels rain down and the red thread draws itself dynamically via SVG `strokeDashoffset`.
- **Lenis Smooth Anchor Gliding**: All internal navigation links (`About`, `Work`, `Contact`, and hero CTA buttons) glide with exponential ease-out interpolation (`1.15s duration`, `-70px offset`), perfectly clearing the sticky navbar.
- **3D Magnetic Cursor Tilt**: Project cards track cursor coordinates in real-time, tilting across Euler angles (`rotateX`, `rotateY`) and rebounding elastically on mouse leave.
- **Interactive Spider Silk Physics**: Hovering over the spiders pulls them downward with dynamic SVG silk stretching (`elastic.out`), springing back on release.
- **Scroll-Velocity Responsive Pendulum**: The upside-down hanging Spider-Man reads scroll velocity via `ScrollTrigger.create` and swings wider with scroll momentum before settling into gentle idle oscillations.
- **Organic Floating Labels**: Hero skill notes gently float and breathe with staggered sine curves after landing.
- **Multi-Plane Hero Parallax**: Background lettering and corner webs scrub at differential speeds during scroll.

### 3. 🎯 Visual Polish & Tactile Feedback (Emil Kowalski Design)
- **Tactile Active Press States**: Buttons, notes, and project cards physically compress (`scale(0.97)`) on click with reduced shadow elevation, providing satisfying physical response.
- **Calibrated Motion Curves**: Custom cubic-bezier tokens (`--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`, `--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1)`).
- **Inner Thumbnail Zoom**: Card previews scale smoothly (`scale(1.05)`) within an overflow mask on hover.
- **Hover Micro-Animations Gated**: All transform hovers are strictly gated behind `@media (hover: hover) and (pointer: fine)` to protect touch and mobile devices.

### 4. 📸 Social Preview, SEO & Brand Kit
- **1200 × 630 Open Graph Banner**: Custom composite image ([public/og-image.png](public/og-image.png)) with Spider-Verse perspective city art, glowing badges, and tech stack tags.
- **Brand Identity Guidelines Board**: Studio brand board ([public/brandkit.jpg](public/brandkit.jpg)) detailing brandmark construction, typography specimens, color swatches, and IDE terminal frames.
- **Complete Meta Suite**: Open Graph (`og:image`, `og:title`, `og:description`), Twitter Cards (`summary_large_image`), and canonical links configured for rich embeds across Twitter/X, LinkedIn, WhatsApp, Telegram, and Discord.
- **Automated Generator**: Re-composite social cards on demand via `node scripts/create-og.js`.

### 5. ♿ Accessibility & Web Interface Guidelines
- **Accessible Focus Rings**: High-contrast, offset focus outlines (`:focus-visible { outline: 2.5px solid var(--red); outline-offset: 3px; }`) for full keyboard navigation.
- **Skip Navigation**: Accessible skip link (`<a href="#main-content" class="skip-link">`) allows keyboard and screen reader users to jump straight to content.
- **Sticky Nav Offset**: Configured `[id] { scroll-margin-top: 80px; }` so anchor jumps never hide section headings under the fixed 64px navbar.
- **Typographic Widows Prevention**: Added `text-wrap: balance` to `h1, h2, h3` to prevent orphaned words on smaller viewports.
- **Comprehensive Reduced Motion**: Robust `@media (prefers-reduced-motion: reduce)` fallbacks disabling idle oscillations, bobs, and transitions.

### 6. 🛡️ CI/CD & Automated Gates
- **GitHub Actions CI Workflow** ([.github/workflows/ci.yml](.github/workflows/ci.yml)):
  - Fast, reproducible installs via `npm ci`
  - TypeScript typechecking & diagnostic linting via `astro check`
  - Production static bundle compilation verification
  - Dependency vulnerability auditing via `npm audit`
- **Strix AI Pentest & Security Gate** ([.github/workflows/security.yml](.github/workflows/security.yml)):
  - Diff-scoped automated AI security pentest on PRs and pushes to `main`
  - Anti-fail-open check guaranteeing complete scan coverage
  - SARIF 2.1.0 output uploaded to GitHub's **Security → Code scanning alerts** tab

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | [Astro 7](https://astro.build/) (Static Site Generation, 0-runtime baseline) |
| **Language & Types** | TypeScript 5.9, Semantic HTML5 |
| **Motion & Physics** | [GSAP 3.15](https://gsap.com/) (Timeline, ScrollTrigger), [Lenis 1.3](https://lenis.darkroom.engineering/) (Smooth Scroll), Web Animations API (WAAPI) |
| **Styling** | Vanilla CSS, OKLCH/HSL Design Tokens, Spidey Theme Variables |
| **Image Processing** | [Sharp 0.35](https://sharp.pixelplumbing.com/) (WebP conversion, SVG compositing) |
| **CI/CD & Security** | GitHub Actions, [Strix AI Pentesting](https://docs.strix.ai), CodeQL SARIF |

---

## 📁 Project Structure

```text
├── .github/
│   └── workflows/
│       ├── ci.yml                 # Build verification, typecheck, & audit gate
│       └── security.yml           # Strix AI diff-scoped pentest & SARIF workflow
├── public/
│   ├── favicon.svg                # Spider-Man mask SVG favicon
│   ├── og-image.png               # 1200x630 Open Graph preview banner
│   └── brandkit.jpg               # Brand identity guidelines board
├── scripts/
│   └── create-og.js               # Node.js Sharp generator for social banner
├── src/
│   ├── assets/
│   │   ├── stickers/              # Character sticker illustrations (hero, swing, crouch, etc.)
│   │   └── work/                  # Curated project preview artwork
│   ├── components/
│   │   ├── Note.astro             # Taped label note with rotational tilt
│   │   ├── Spider.astro           # Interactive SVG spider with elastic silk
│   │   ├── Thumb.astro            # Stand-in project preview artwork
│   │   └── Web.astro              # Mathematically plotted spiderweb SVG
│   ├── pages/
│   │   └── index.astro            # Main page, SEO metadata, and project definitions
│   ├── scripts/
│   │   ├── motion.ts              # GSAP timelines, Lenis scroll, 3D tilt, and interactions
│   │   └── theme.ts               # Spidey / Paper WAAPI radial theme switcher
│   └── styles/
│       └── global.css             # Tokens, Spidey dark theme, focus states, and responsive layout
├── astro.config.mjs               # Astro static configuration
├── package.json                   # Dependencies, scripts, and engine specifications
└── tsconfig.json                  # TypeScript configuration
```

---

## 🚀 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start development server (available at http://localhost:4321/)
npm run dev

# 3. Run typecheck & Astro diagnostics
npm run check

# 4. Build static production bundle (outputs to /dist)
npm run build

# 5. Preview production build locally
npm run preview

# 6. Regenerate Open Graph social banner (optional)
node scripts/create-og.js
```

---

## 👤 Author

**Sujal**  
Full Stack & AI Engineer  
- 🌐 Website: [sujal.dev](https://sujal.dev)  
- 🐙 GitHub: [@RoxxSujal7](https://github.com/RoxxSujal7)  
- 💼 LinkedIn: [in/sujalroxx7](https://www.linkedin.com/in/sujalroxx7/)  
- 📸 Instagram: [@roxxsujal7](https://www.instagram.com/roxxsujal7/)  
- 📬 Email: [sujalsah9@gmail.com](mailto:sujalsah9@gmail.com)

---

## 📄 License

Maintained for personal portfolio use under the [MIT License](LICENSE).
