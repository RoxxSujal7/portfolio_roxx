// tests/test-debug.cjs
const { chromium } = require('C:/Users/sujal/AppData/Roaming/npm/node_modules/playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://127.0.0.1:4321');
  await page.click('.card[data-kind="agent"] .card-link');
  await page.waitForSelector('#case-study-drawer[open]');

  await page.evaluate(() => {
    window.wheelLog = [];
    window.addEventListener('wheel', (e) => {
      window.wheelLog.push({
        target: e.target.tagName + (e.target.id ? '#' + e.target.id : '') + (e.target.className ? '.' + e.target.className : ''),
        defaultPrevented: e.defaultPrevented,
        deltaY: e.deltaY,
      });
    }, { capture: true, passive: false });
  });

  const problemBox = await page.locator('#drawer-problem').boundingBox();
  console.log('Problem box:', problemBox);

  await page.mouse.move(problemBox.x + 10, problemBox.y + 10);
  await page.mouse.wheel(0, 100);
  await page.waitForTimeout(200);

  const logs1 = await page.evaluate(() => window.wheelLog);
  console.log('Wheel logs on problem:', logs1);
  const st1 = await page.$eval('#drawer-body', el => el.scrollTop);
  console.log('ScrollTop after problem wheel:', st1);

  // Now move 200px further down inside drawer-body
  await page.mouse.move(problemBox.x + 10, problemBox.y + 150);
  await page.mouse.wheel(0, 200);
  await page.waitForTimeout(200);

  const logs2 = await page.evaluate(() => window.wheelLog);
  console.log('Wheel logs 2:', logs2.slice(-1));
  const st2 = await page.$eval('#drawer-body', el => el.scrollTop);
  console.log('ScrollTop after wheel 2:', st2);

  await browser.close();
})();
