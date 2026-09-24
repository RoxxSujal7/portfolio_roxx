// tests/test-composed.cjs
const { chromium } = require('C:/Users/sujal/AppData/Roaming/npm/node_modules/playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://127.0.0.1:4321');
  await page.click('.card[data-kind="agent"] .card-link');
  await page.waitForSelector('#case-study-drawer[open]');

  const pathInfo = await page.evaluate(() => {
    return new Promise((resolve) => {
      window.addEventListener('wheel', (e) => {
        const root = document.documentElement;
        const path = e.composedPath();
        const rootIdx = path.indexOf(root);
        const sliced = path.slice(0, rootIdx);
        const hasPrevent = sliced.some(n => n instanceof HTMLElement && n.hasAttribute('data-lenis-prevent'));
        resolve({
          target: (e.target.tagName || '') + '#' + (e.target.id || '') + '.' + (e.target.className || ''),
          rootIdx,
          pathLength: path.length,
          slicedLength: sliced.length,
          hasPrevent,
          isStopped: window.lenis?.isStopped,
          defaultPrevented: e.defaultPrevented,
        });
      }, { once: true, capture: false });

      // Dispatch wheel on drawer body
      const body = document.getElementById('drawer-body');
      body.dispatchEvent(new WheelEvent('wheel', { bubbles: true, cancelable: true, clientX: 1000, clientY: 400, deltaY: 100 }));
    });
  });

  console.log('Path info:', JSON.stringify(pathInfo, null, 2));
  await browser.close();
})();
