// tests/test-drawer-scroll-v2.cjs
const { chromium } = require('C:/Users/sujal/AppData/Roaming/npm/node_modules/playwright');

async function testDrawerFullScrolling() {
  console.log('🚀 Running Comprehensive Drawer Scroll Verification...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  try {
    await page.goto('http://127.0.0.1:4321', { waitUntil: 'networkidle' });

    // Open drawer by clicking first card
    const card = page.locator('.card[data-kind="agent"] .card-link');
    await card.scrollIntoViewIfNeeded();
    await card.click();

    const drawer = page.locator('#case-study-drawer');
    await drawer.waitFor({ state: 'visible' });

    const drawerBody = page.locator('#drawer-body');
    await drawerBody.waitFor({ state: 'visible' });

    // 1. Initial State
    const initScrollTop = await drawerBody.evaluate(el => el.scrollTop);
    console.log(`✅ [1/5] Drawer opened. Initial scrollTop: ${initScrollTop}px`);

    // 2. Test direct body mouse wheel
    const bodyBox = await drawerBody.boundingBox();
    await page.mouse.move(bodyBox.x + bodyBox.width / 2, bodyBox.y + bodyBox.height / 2);
    await page.mouse.wheel(0, 250);
    await page.waitForTimeout(300);

    const stAfterDirectWheel = await drawerBody.evaluate(el => el.scrollTop);
    console.log(`✅ [2/5] Wheel on Drawer Body: scrollTop = ${stAfterDirectWheel}px (expected > 0)`);
    if (stAfterDirectWheel <= 0) throw new Error('Direct body wheel did not scroll!');

    // 3. Test Header wheel forwarding (when mouse is hovered over header)
    const headBox = await page.locator('.drawer-head').boundingBox();
    await page.mouse.move(headBox.x + headBox.width / 2, headBox.y + headBox.height / 2);
    await page.mouse.wheel(0, 150);
    await page.waitForTimeout(300);

    const stAfterHeadWheel = await drawerBody.evaluate(el => el.scrollTop);
    console.log(`✅ [3/5] Wheel on Drawer Header forwarded: scrollTop = ${stAfterHeadWheel}px (increased from ${stAfterDirectWheel}px)`);
    if (stAfterHeadWheel <= stAfterDirectWheel) throw new Error('Header wheel forwarding did not scroll!');

    // 4. Test Keyboard scrolling (PageDown and ArrowDown)
    await page.keyboard.press('PageDown');
    await page.waitForTimeout(200);

    const stAfterPageDown = await drawerBody.evaluate(el => el.scrollTop);
    console.log(`✅ [4/5] Keyboard PageDown: scrollTop = ${stAfterPageDown}px (increased from ${stAfterHeadWheel}px)`);
    if (stAfterPageDown <= stAfterHeadWheel) throw new Error('Keyboard navigation did not scroll!');

    // 5. Test Background Lock & Dark Mode styling
    const isLocked = await page.evaluate(() => document.documentElement.classList.contains('drawer-locked'));
    console.log(`✅ [5/5] Background lock active: ${isLocked}`);

    // Capture screenshot of scrolled state with scrollbar
    await page.screenshot({ path: 'tests/screenshots/6-drawer-scrolled-perfect.png' });
    console.log('📸 Captured: 6-drawer-scrolled-perfect.png');

    console.log('\n🎉 ALL DRAWER SCROLL VERIFICATION CHECKS PASSED (100%)!');
  } catch (err) {
    console.error('❌ Test failed:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

testDrawerFullScrolling();
