// tests/test-peel-visual.cjs
const { chromium } = require('C:/Users/sujal/AppData/Roaming/npm/node_modules/playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://127.0.0.1:4321', { waitUntil: 'networkidle' });

  console.log('Waiting 2.8s for hero landing animation...');
  await page.waitForTimeout(2800);

  const tape = page.locator('.labels .note .tape').first();
  await tape.waitFor({ state: 'visible' });

  // Hover over the tape with force: true
  const tapeBox = await tape.boundingBox();
  console.log('Tape Box:', tapeBox);

  await page.mouse.move(tapeBox.x + tapeBox.width / 2, tapeBox.y + tapeBox.height / 2);
  await page.waitForTimeout(300);

  await page.screenshot({ path: 'tests/screenshots/12-hero-landed-peel-hover.png' });
  console.log('📸 Captured: 12-hero-landed-peel-hover.png');

  // Click the tape with force: true
  await tape.click({ force: true });
  await page.waitForTimeout(80);
  await page.screenshot({ path: 'tests/screenshots/13-tape-clicking-peel.png' });
  console.log('📸 Captured: 13-tape-clicking-peel.png');

  await browser.close();
})();
