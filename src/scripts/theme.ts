// ponytail: dropped GSAP dep — clip-path wipe uses WAAPI (already available,
// zero extra import). Button bounce uses CSS class instead of gsap.to().

const STORAGE_KEY = 'sujal-theme';
const html        = document.documentElement;
const btn         = document.getElementById('theme-toggle') as HTMLButtonElement | null;

// Restore saved preference before first paint
if (localStorage.getItem(STORAGE_KEY) === 'spidey') html.classList.add('spidey');

const createWipe = (cx: number, cy: number, dark: boolean) => {
  const el = Object.assign(document.createElement('div'), {
    style: `position:fixed;inset:0;z-index:9999;pointer-events:none;background:${dark ? '#0a0608' : '#faf8f3'};clip-path:circle(0% at ${cx}px ${cy}px)`,
  });
  document.body.appendChild(el);

  // WAAPI: runs off main thread, no library needed
  const anim = el.animate(
    [{ clipPath: `circle(0% at ${cx}px ${cy}px)` }, { clipPath: `circle(150% at ${cx}px ${cy}px)` }],
    { duration: 700, easing: 'cubic-bezier(0.77,0,0.175,1)', fill: 'forwards' },
  );
  anim.onfinish = () => el.remove();

  // Swap class at midpoint of wipe
  setTimeout(() => {
    html.classList.toggle('spidey', dark);
    localStorage.setItem(STORAGE_KEY, dark ? 'spidey' : 'paper');
    btn?.setAttribute('aria-pressed', String(dark));
  }, 350);
};

btn?.addEventListener('click', () => {
  if (!btn) return;
  const { left, top, width, height } = btn.getBoundingClientRect();
  createWipe(Math.round(left + width / 2), Math.round(top + height / 2), !html.classList.contains('spidey'));
  // CSS handles button bounce via class toggle (no JS animation lib needed)
  btn.classList.add('bounce');
  btn.addEventListener('animationend', () => btn.classList.remove('bounce'), { once: true });
});
