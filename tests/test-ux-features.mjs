// tests/test-ux-features.mjs
// Automated E2E verification of Case Study Drawer and Toast notification using Playwright
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

async function runTests() {
  const screenshotsDir = path.resolve('tests/screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  console.log('🚀 Launching Chromium for UX feature verification...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    permissions: ['clipboard-read', 'clipboard-write'],
  });
  const page = await context.newPage();

  const baseUrl = 'http://127.0.0.1:4321';

  try {
    // -------------------------------------------------------------
    // Test 1: Page Load & Initial State
    // -------------------------------------------------------------
    console.log(`📡 Navigating to ${baseUrl}...`);
    await page.goto(baseUrl, { waitUntil: 'networkidle' });
    console.log('✅ Page loaded successfully.');

    // -------------------------------------------------------------
    // Test 2: Click Project Card & Verify Drawer Slide-Over
    // -------------------------------------------------------------
    console.log('🧪 Test 2: Clicking project card "Autonomous AI Assistant"...');
    const agentCardLink = page.locator('.card[data-kind="agent"] .card-link');
    await agentCardLink.scrollIntoViewIfNeeded();
    await agentCardLink.click();

    // Wait for drawer to open
    const drawer = page.locator('#case-study-drawer');
    await drawer.waitFor({ state: 'visible', timeout: 5000 });

    const drawerTitle = await page.locator('#drawer-title').textContent();
    console.log(`   Drawer title rendered: "${drawerTitle}"`);
    if (drawerTitle?.trim() !== 'Autonomous AI Assistant') {
      throw new Error(`Expected drawer title 'Autonomous AI Assistant', got '${drawerTitle}'`);
    }

    const metricsCount = await page.locator('#drawer-metrics .metric-card').count();
    console.log(`   Metrics rendered: ${metricsCount} tiles`);
    if (metricsCount !== 3) {
      throw new Error(`Expected 3 metric cards, got ${metricsCount}`);
    }

    const flowNodesCount = await page.locator('#drawer-flow .flow-node').count();
    console.log(`   Architecture flow nodes rendered: ${flowNodesCount} nodes`);
    if (flowNodesCount !== 6) {
      throw new Error(`Expected 6 flow nodes, got ${flowNodesCount}`);
    }

    await page.screenshot({ path: path.join(screenshotsDir, '1-drawer-open.png'), fullPage: false });
    console.log('📸 Captured: 1-drawer-open.png');

    // -------------------------------------------------------------
    // Test 3: Keyboard Dismissal (Escape Key)
    // -------------------------------------------------------------
    console.log('🧪 Test 3: Testing Escape key dismissal...');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);

    const isDrawerOpen = await drawer.evaluate((el) => el.hasAttribute('open'));
    console.log(`   Drawer open state after Escape: ${isDrawerOpen}`);
    if (isDrawerOpen) {
      throw new Error('Drawer did not close on Escape key');
    }
    console.log('✅ Drawer closed cleanly on Escape.');

    // -------------------------------------------------------------
    // Test 4: Deep-Link Direct Navigation (#project-systems)
    // -------------------------------------------------------------
    console.log('🧪 Test 4: Testing deep-link URL hash navigation (#project-systems)...');
    await page.goto(`${baseUrl}/#project-systems`, { waitUntil: 'networkidle' });
    await drawer.waitFor({ state: 'visible', timeout: 5000 });

    const systemsTitle = await page.locator('#drawer-title').textContent();
    console.log(`   Deep-linked title: "${systemsTitle}"`);
    if (systemsTitle?.trim() !== 'RAG & Semantic Search Engine') {
      throw new Error(`Expected 'RAG & Semantic Search Engine', got '${systemsTitle}'`);
    }

    await page.screenshot({ path: path.join(screenshotsDir, '2-deep-link-systems.png'), fullPage: false });
    console.log('📸 Captured: 2-deep-link-systems.png');

    // Close using close button (X)
    const closeBtn = page.locator('#drawer-close');
    await closeBtn.click();
    await page.waitForTimeout(300);
    console.log('✅ Drawer closed using close button.');

    // -------------------------------------------------------------
    // Test 5: Spidey Dark Mode Theme Compatibility
    // -------------------------------------------------------------
    console.log('🧪 Test 5: Testing Spidey dark mode drawer theme...');
    const themeToggle = page.locator('#theme-toggle');
    await themeToggle.scrollIntoViewIfNeeded();
    await themeToggle.click();
    await page.waitForTimeout(500);

    // Reopen drawer in dark mode
    const siteCardLink = page.locator('.card[data-kind="site"] .card-link');
    await siteCardLink.scrollIntoViewIfNeeded();
    await siteCardLink.click();
    await drawer.waitFor({ state: 'visible', timeout: 5000 });

    await page.screenshot({ path: path.join(screenshotsDir, '3-drawer-dark-mode.png'), fullPage: false });
    console.log('📸 Captured: 3-drawer-dark-mode.png');

    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);

    // -------------------------------------------------------------
    // Test 6: 1-Click Copy Email & Tactile Toast Feedback
    // -------------------------------------------------------------
    console.log('🧪 Test 6: Testing 1-click email copy & toast...');
    const emailLink = page.locator('a[href^="mailto:"]').first();
    await emailLink.scrollIntoViewIfNeeded();
    await emailLink.click();

    const toastBubble = page.locator('.toast-bubble');
    await toastBubble.waitFor({ state: 'visible', timeout: 3000 });

    const toastText = await toastBubble.textContent();
    console.log(`   Toast text: "${toastText?.trim()}"`);
    if (!toastText?.includes('Copied sujalsah9@gmail.com')) {
      throw new Error(`Toast does not contain copied email message: '${toastText}'`);
    }

    await page.screenshot({ path: path.join(screenshotsDir, '4-toast-feedback.png'), fullPage: false });
    console.log('📸 Captured: 4-toast-feedback.png');

    console.log('\n🎉 ALL PLAYWRIGHT UX VERIFICATION TESTS PASSED!');
  } catch (error) {
    console.error('❌ Playwright Test Failure:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runTests();
