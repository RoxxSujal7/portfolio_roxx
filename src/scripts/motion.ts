import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// NOTE: We intentionally do NOT gate base animations on prefers-reduced-motion.
// The design always plays the intro; the swing-rig is suppressed by CSS when
// reduced-motion is on (see global.css).
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// --- Smooth scroll, kept in sync with ScrollTrigger ---
const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((t) => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);

// --- Smooth animated scrolling for internal anchor links (About, Work, Contact, Hero CTAs) ---
document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
  if (anchor.classList.contains('skip-link')) return; // allow screen readers / keyboard to jump immediately
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (!href || href === '#') return;
    const targetEl = document.querySelector<HTMLElement>(href);
    if (targetEl) {
      e.preventDefault();
      lenis.scrollTo(targetEl, {
        offset: -70,
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
      history.pushState(null, '', href);
    }
  });
});

// --- Landing timeline: Spidey swings in on the line, lands into hero pose ---
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
  .fromTo(
    '.hero-figure',
    { opacity: 0, y: -70, scaleY: 1.08, transformOrigin: 'bottom center' },
    { opacity: 1, y: 0, scaleY: 1, duration: 0.6, ease: 'back.out(2.2)' },
    rig ? '-=0.35' : 0.4
  )
  .from(
    '.labels .note',
    { y: -60, opacity: 0, rotation: () => gsap.utils.random(-18, 18), duration: 0.65, ease: 'back.out(1.8)', stagger: 0.08 },
    '-=0.25'
  )
  .from('.tagline', { opacity: 0, y: 14, duration: 0.5 }, '-=0.4')
  .from('.hero-cta li', { opacity: 0, y: 10, stagger: 0.08, duration: 0.4 }, '-=0.3')
  .fromTo('.spider-hero', { y: -180 }, { y: 0, duration: 1.3, ease: 'bounce.out' }, '-=0.9');

// Red thread draws itself
document.querySelectorAll<SVGPathElement>('.thread path').forEach((p) => {
  const len = p.getTotalLength();
  gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
  intro.to(p, { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut' }, 0.9);
});

// --- Organic floating idle on hero sticky notes ---
if (!prefersReduced) {
  document.querySelectorAll<HTMLElement>('.labels .note').forEach((note, i) => {
    gsap.to(note, {
      y: '+=5',
      rotation: '+=1.6',
      duration: 2.2 + (i % 3) * 0.45,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
      delay: 1.8 + i * 0.12
    });
  });
}

// --- Interactive Spider Silk Physics & Elastic Snap ---
document.querySelectorAll<SVGSVGElement>('.spider').forEach((svg, i) => {
  const spiderRig = svg.querySelector<SVGGElement>('.rig');
  const silk = svg.querySelector<SVGLineElement>('.silk');
  if (!spiderRig || !silk) return;

  const baseSilkY = parseFloat(silk.getAttribute('y2') || '70');

  // Idle vertical bobbing
  const bobTween = gsap.to(spiderRig, {
    y: 10,
    duration: 1.6 + i * 0.3,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut'
  });
  const silkTween = gsap.to(silk, {
    attr: { y2: baseSilkY + 10 },
    duration: 1.6 + i * 0.3,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut'
  });

  // Elastic stretch on hover / drag
  svg.addEventListener('mouseenter', () => {
    bobTween.pause();
    silkTween.pause();
    gsap.to(spiderRig, {
      y: 28,
      duration: 0.65,
      ease: 'elastic.out(1.2, 0.35)',
      overwrite: 'auto'
    });
    gsap.to(silk, {
      attr: { y2: baseSilkY + 28 },
      duration: 0.65,
      ease: 'elastic.out(1.2, 0.35)',
      overwrite: 'auto'
    });
  });

  svg.addEventListener('mouseleave', () => {
    gsap.to(spiderRig, {
      y: 0,
      duration: 0.85,
      ease: 'elastic.out(1.4, 0.3)',
      overwrite: 'auto',
      onComplete: () => {
        bobTween.restart();
        silkTween.restart();
      }
    });
    gsap.to(silk, {
      attr: { y2: baseSilkY },
      duration: 0.85,
      ease: 'elastic.out(1.4, 0.3)',
      overwrite: 'auto'
    });
  });
});

// --- Upside-down hanging sticker with scroll velocity impulse ---
const idleHang = gsap.fromTo(
  '.hang-rig',
  { rotation: -5 },
  { rotation: 5, duration: 2.6, yoyo: true, repeat: -1, ease: 'sine.inOut' }
);

if (!prefersReduced) {
  ScrollTrigger.create({
    trigger: '.work-head',
    start: 'top bottom',
    end: 'bottom top',
    onUpdate: (self) => {
      const vel = self.getVelocity();
      if (Math.abs(vel) > 150) {
        const impulse = gsap.utils.clamp(-18, 18, vel / 90);
        idleHang.pause();
        gsap.to('.hang-rig', {
          rotation: impulse,
          duration: 0.45,
          ease: 'power2.out',
          overwrite: 'auto',
          onComplete: () => {
            idleHang.resume();
          }
        });
      }
    }
  });
}

// --- Click hero or spider to replay from top ---
const replayIntro = () => {
  lenis.scrollTo(0, { immediate: true });
  intro.restart();
};
const heroFigure = document.querySelector<HTMLElement>('.hero-figure');
const spiderHero = document.querySelector<HTMLElement>('.spider-hero');
if (heroFigure) {
  heroFigure.style.cursor = 'pointer';
  heroFigure.addEventListener('click', replayIntro);
}
if (spiderHero) {
  spiderHero.addEventListener('click', replayIntro);
}

// --- Cinematic Parallax on Scroll ---
if (!prefersReduced) {
  gsap.to('.hero-word span', {
    yPercent: 32,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 0.6
    }
  });

  gsap.to('.web-hero-left', {
    yPercent: -20,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    }
  });

  gsap.to('.web-hero-right', {
    yPercent: -24,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    }
  });
}

// --- 3D Magnetic Cursor Tilt on Project Cards ---
if (!prefersReduced && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  const cards = document.querySelectorAll<HTMLElement>('.card');
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -4;
      const rotY = ((x - cx) / cx) * 5;
      gsap.to(card, {
        rotateX: rotX,
        rotateY: rotY,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.65,
        ease: 'elastic.out(1, 0.4)',
        overwrite: 'auto'
      });
    });
  });
}

// --- Sticky Nav Dynamic Scroll State ---
const nav = document.querySelector<HTMLElement>('.nav');
if (nav) {
  ScrollTrigger.create({
    start: 'top -40',
    onUpdate: (self) => {
      if (self.progress > 0) {
        nav.classList.add('nav-scrolled');
      } else {
        nav.classList.remove('nav-scrolled');
      }
    }
  });
}

// --- On scroll reveals ---
gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
  gsap.from(el, {
    opacity: 0,
    y: 44,
    duration: 0.85,
    ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 86%' }
  });
});

gsap.utils.toArray<HTMLElement>('[data-pop]').forEach((el) => {
  gsap.from(el, {
    opacity: 0,
    scale: 0.82,
    rotation: -5,
    duration: 0.9,
    ease: 'back.out(1.6)',
    transformOrigin: 'bottom center',
    scrollTrigger: { trigger: el, start: 'top 88%' }
  });
});

gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach((el) => {
  gsap.from(el.children, {
    opacity: 0,
    y: 36,
    duration: 0.7,
    ease: 'power3.out',
    stagger: 0.09,
    scrollTrigger: { trigger: el, start: 'top 85%' }
  });
});

gsap.utils.toArray<HTMLElement>('.watermark').forEach((el) => {
  gsap.fromTo(el, { xPercent: -47 }, {
    xPercent: -53,
    ease: 'none',
    scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true }
  });
});
