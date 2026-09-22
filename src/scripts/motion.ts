import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

// smooth scroll, kept in sync with ScrollTrigger
const lenis = new Lenis({ lerp: 0.1, smoothWheel: !reduce });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((t) => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);

if (!reduce) {
  // --- landing: he swings in on the line, lets go, lands into the hero pose ---
  const rig = document.querySelector<HTMLElement>('.swing-rig');
  const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
  intro
    .from('.hero-word span', { yPercent: 30, opacity: 0, duration: 1.1 }, 0)
    .fromTo('.hero .web', { opacity: 0 }, { opacity: 1, duration: 1.2 }, 0.2);
  if (rig) {
    intro
      .fromTo(rig, { rotation: 62 }, { rotation: -9, duration: 1.35, ease: 'power2.inOut' }, 0.15)
      .to(rig, { rotation: 2, duration: 0.45, ease: 'power2.inOut' })
      .to(rig, { opacity: 0, duration: 0.2 }, '-=0.1')
      .to(rig, { display: 'none' });
  }
  intro
    .fromTo('.hero-figure', { opacity: 0, y: -70, scaleY: 1.08, transformOrigin: 'bottom center' },
      { opacity: 1, y: 0, scaleY: 1, duration: 0.6, ease: 'back.out(2.2)' }, rig ? '-=0.35' : 0.4)
    .from('.labels .note', { y: -60, opacity: 0, rotation: () => gsap.utils.random(-18, 18), duration: 0.65, ease: 'back.out(1.8)', stagger: 0.08 }, '-=0.25')
    .from('.tagline', { opacity: 0, y: 14, duration: 0.5 }, '-=0.4')
    .from('.hero-cta li', { opacity: 0, y: 10, stagger: 0.08, duration: 0.4 }, '-=0.3')
    .fromTo('.spider-hero', { y: -180 }, { y: 0, duration: 1.3, ease: 'bounce.out' }, '-=0.9');

  // red thread draws itself
  document.querySelectorAll<SVGPathElement>('.thread path').forEach((p) => {
    const len = p.getTotalLength();
    gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
    intro.to(p, { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut' }, 0.9);
  });

  // spiders bob on their silk
  document.querySelectorAll<SVGGElement>('.spider .rig').forEach((g, i) => {
    gsap.to(g, { y: 10, duration: 1.6 + i * 0.3, yoyo: true, repeat: -1, ease: 'sine.inOut' });
    const silk = g.parentElement?.querySelector('.silk');
    if (silk) gsap.to(silk, { attr: { y2: '+=10' }, duration: 1.6 + i * 0.3, yoyo: true, repeat: -1, ease: 'sine.inOut' });
  });

  // upside-down sticker swings gently
  gsap.fromTo('.hang-rig', { rotation: -5 }, { rotation: 5, duration: 2.6, yoyo: true, repeat: -1, ease: 'sine.inOut' });

  // --- on scroll ---
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
    gsap.from(el, { opacity: 0, y: 44, duration: 0.85, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 86%' } });
  });
  gsap.utils.toArray<HTMLElement>('[data-pop]').forEach((el) => {
    gsap.from(el, { opacity: 0, scale: 0.82, rotation: -5, duration: 0.9, ease: 'back.out(1.6)', transformOrigin: 'bottom center', scrollTrigger: { trigger: el, start: 'top 88%' } });
  });
  gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach((el) => {
    gsap.from(el.children, { opacity: 0, y: 36, duration: 0.7, ease: 'power3.out', stagger: 0.09, scrollTrigger: { trigger: el, start: 'top 85%' } });
  });
  gsap.utils.toArray<HTMLElement>('.watermark').forEach((el) => {
    gsap.fromTo(el, { xPercent: -47 }, { xPercent: -53, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
  });
}
