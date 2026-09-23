# Sujal · Portfolio

Interactive poster-style portfolio for **Sujal** — Full Stack & AI Engineer. Features dynamic typography, GSAP-driven micro-interactions, smooth kinetic scrolling, and an interactive **Spidey** dark mode with radial wipe transitions and glowing web overlays.

🌐 **Website**: [sujal.dev](https://sujal.dev)  
🐙 **GitHub**: [@RoxxSujal7](https://github.com/RoxxSujal7)  
💼 **LinkedIn**: [sujalroxx7](https://www.linkedin.com/in/sujalroxx7/)  
📸 **Instagram**: [@roxxsujal7](https://www.instagram.com/roxxsujal7/)  
📬 **Email**: [sujalsah9@gmail.com](mailto:sujalsah9@gmail.com)

---

## ⚡ Highlights & Features

- **Illustrated Poster Aesthetic**: Warm paper texture, high-contrast typography, taped note labels, and sticker-style art direction.
- **Interactive Spidey Theme**:
  - Full dark theme featuring deep crimson accents, glowing neon webs, red thread highlights, and comic-style sticker glows.
  - Smooth **circular radial wipe transition** powered by the Web Animations API (WAAPI) expanding directly from the toggle button.
  - Persistent theme preference saved in `localStorage`.
- **Motion & Micro-interactions**:
  - **GSAP & Lenis**: Butter-smooth kinetic scrolling synchronized with GSAP ScrollTrigger.
  - Dynamic entrance animation: character swings in on a thread, taped labels rain down with natural tilts, and the red thread draws itself dynamically.
  - Interactive spider rigs bobbing on physical silk lines (clickable to replay intro).
  - Scroll-linked watermark parallax, staggered project reveals, and pop-in character poses.
- **Fast & Zero-Runtime Framework**: Powered by **Astro** for near-zero JS client overhead, blazing performance, and automatic WebP image optimization.

---

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build/) (Static Site Generation)
- **Styling**: Vanilla CSS with customized design tokens and theme variables
- **Motion & Animations**: [GSAP](https://gsap.com/) (Timeline, ScrollTrigger), [Lenis](https://lenis.darkroom.engineering/) (Smooth Scroll), WAAPI
- **Language**: TypeScript & Semantic HTML5
- **Assets**: Optimized WebP sticker graphics & custom inline SVGs

---

## 📁 Project Structure

```
├── public/                 # Static assets & favicons
├── src/
│   ├── assets/             # Sticker illustrations and project thumbnails
│   │   ├── stickers/       # Character poses (hero, swing, crouch, laptop, wave)
│   │   └── work/           # Project preview cards
│   ├── components/         # Astro components
│   │   ├── Spider.astro    # SVG spider with animated silk
│   │   ├── Web.astro       # Mathematically drawn corner spiderweb
│   │   ├── Note.astro      # Taped label note with rotational tilt
│   │   └── Thumb.astro     # Stand-in project preview artwork
│   ├── pages/
│   │   └── index.astro     # Main portfolio page & data definitions
│   ├── scripts/
│   │   ├── motion.ts       # GSAP timelines, Lenis scroll, and trigger choreographies
│   │   └── theme.ts        # WAAPI-based Spidey/Paper theme switcher & local persistence
│   └── styles/
│       └── global.css      # Core design tokens, Spidey theme overrides, and layout
├── astro.config.mjs        # Astro configuration
└── package.json
```

---

## 🚀 Local Development

To run this project locally:

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Build production bundle (static output in /dist)
npm run build

# 4. Preview production build
npm run preview
```

---

## 👤 Author

**Sujal**
- GitHub: [@RoxxSujal7](https://github.com/RoxxSujal7)
- LinkedIn: [in/sujalroxx7](https://www.linkedin.com/in/sujalroxx7/)
- Instagram: [@roxxsujal7](https://www.instagram.com/roxxsujal7/)
- Email: [sujalsah9@gmail.com](mailto:sujalsah9@gmail.com)

---

## 📄 License

This repository is maintained for personal portfolio use under the [MIT License](LICENSE).
