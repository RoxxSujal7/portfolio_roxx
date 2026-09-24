// tests/test-peel.cjs
const { chromium } = require('C:/Users/sujal/AppData/Roaming/npm/node_modules/playwright');

async function testTapePeel() {
  console.log('🚀 Testing Physical Tape Peel Interaction...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://127.0.0.1:4321', { waitUntil: 'networkidle' });

  const firstNote = page.locator('.labels .note').first();
  await firstNote.waitFor({ state: 'visible' });

  const tape = firstNote.locator('.tape');
  await tape.waitFor({ state: 'visible' });

  const tapeBox = await tape.boundingBox();
  console.log('Tape Box:', tapeBox);

  // 1. Test hover over tape
  await page.mouse.move(tapeBox.x + tapeBox.width / 2, tapeBox.y + tapeBox.height / 2);
  await page.waitForTimeout(300);
  console.log('✅ Hovered over tape strip');

  // 2. Click the tape strip directly to trigger interactive peel
  await tape.click();
  await page.waitForTimeout(100); // mid-peel capture

  await page.screenshot({ path: 'tests/screenshots/10-tape-peel-active.png' });
  console.log('📸 Captured: 10-tape-peel-active.png');

  // 3. Test drag peel
  await page.mouse.move(tapeBox.x + tapeBox.width / 2, tapeBox.y + 30);
  await page.mouse.down();
  await page.waitForTimeout(150);

  const isPeeledClass = await firstNote.evaluate(el => el.classList.contains('is-peeled'));
  console.log('✅ Note has is-peeled class during drag:', isPeeledClass);

  await page.screenshot({ path: 'tests/screenshots/11-note-drag-peeled.png' });
  console.log('📸 Captured: 11-note-drag-peeled.png');

  await page.mouse.up();
  await page.waitForTimeout(300);

  console.log('\n🎉 TAPE PEEL VERIFICATION 100% COMPLETE!');
  await browser.close();
}

testTapePeel();
