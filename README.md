# Poster Portfolio (Astro)

An illustrated, poster-style one-page portfolio. A hand-drawn character swings in on a thread,
taped paper labels drop into place, a small spider dangles on its silk, and a work grid scrolls
past a giant watermark word. Built with Astro, GSAP and Lenis — no framework runtime ships to
the browser.

This is the template behind [ashmit.codes](https://ashmit.codes), published so people can see how
it is put together. Built and drawn by **Ashmit Mittal** — [@ashmit.codes](https://www.instagram.com/ashmit.codes/)
on Instagram, where the making-of reels live.

## Run

```
npm install
npm run dev        # http://localhost:4321
npm run build      # static output in dist/
npm run preview
```

## Make it yours

Almost everything you need is in the `EDIT ME` block at the top of `src/pages/index.astro`:

| What | Where |
|---|---|
| Name, site, email, social links | the constants at the top of `src/pages/index.astro` |
| Floating skill labels (and their x/y/tilt) | `labels` array |
| Tech chips in the About section | `chips` array |
| The six project cards | `work` array |
| Body copy (About, Contact, taglines) | the markup below the frontmatter |
| Colours, fonts, spacing | the `:root` tokens in `src/styles/global.css` |
| Animation timings | `src/scripts/motion.ts` |

Then swap the wordmark (`yourname.dev`), the giant hero word (`YOURNAME`), and the `<title>`
and `og:` tags in `<head>`.

## How it works

- **`src/pages/index.astro`** — the whole page. Six sections: hero, about, a "ready" band, the
  work grid, contact, footer.
- **`src/styles/global.css`** — design tokens at `:root`, then section-by-section layout. One
  `@media (max-width: 900px)` block at the bottom handles the entire mobile pass.
- **`src/scripts/motion.ts`** — Lenis smooth scroll wired into GSAP's ticker. The intro is a
  single timeline: the word rises, the swing rig arcs in and deletes itself, the character drops
  on a `back.out` ease, labels rain down. Scroll behaviour is driven by four data attributes you
  can put on any element: `data-reveal`, `data-pop`, `data-stagger`, and `.watermark` parallax.
  All of it sits behind a `prefers-reduced-motion` check.
- **`src/components/`** — `Spider` (SVG bug on a silk line), `Web` (cobweb generated with trig),
  `Note` (taped paper label), `Thumb` (per-project fallback SVG art, drawn when a work image
  is missing).

### Two things worth knowing

- **Upside-down poses.** The character hanging above the Work heading is an upright drawing
  rotated 180° in CSS (`.hang-rig .sticker`). Image generators tend to refuse "upside down on a
  thread" prompts, so generate upright and flip it.
- **The sticker cut-out edge** is four stacked white `drop-shadow()` filters plus one soft real
  shadow (`.sticker img` in `global.css`). No masking, no cut-out PNGs needed.

## Deploy

Static output, so anywhere works. `vercel.json` is set up for Vercel; delete it for anything else.

## Licence

- **Code** — MIT, see `LICENSE`. Use it, change it, ship it, no attribution needed.
- **Illustrations** (`src/assets/`) — © Ashmit Mittal. They are a caricature of him, included so
  the template renders as designed. Please replace them with your own artwork before you put your
  site online. See `src/assets/README.md`.

Credit is not required, but if this template is useful to you, a link back to
[@ashmit.codes](https://www.instagram.com/ashmit.codes/) is always welcome.
