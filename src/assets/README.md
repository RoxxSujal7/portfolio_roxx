# Artwork

The illustrations in `stickers/` and `work/` are a caricature of Ashmit Mittal, the author of this
template. They are here so the site renders the way it was designed, and so you can see how the
poses line up with the layout.

**Please replace them with your own artwork before publishing your site.** Someone else's face
on your portfolio is a strange look, and the character is a specific person.

## What each file is for

| File | Where it appears |
|---|---|
| `stickers/hero.png` | landing screen, the big figure |
| `stickers/swing.png` | swings in on the thread during the intro, then disappears |
| `stickers/portrait.png` | About section |
| `stickers/crouch.png` | perched on the "Get ready" band |
| `stickers/hang.png` | above the Work heading — **draw this upright**, it is rotated 180° in CSS |
| `stickers/laptop.png` | the band under the work grid |
| `stickers/wave.png` | Contact section |
| `work/*.png` | the six project cards, keyed by `kind` in `src/pages/index.astro` |

Drop in PNGs with the same names and the site picks them up — Astro converts them to webp at
build time. If you delete a file in `work/`, remove its import and the `Thumb` component draws a
simple SVG stand-in instead.

Transparent backgrounds work best: the white cut-out edge is added in CSS.
