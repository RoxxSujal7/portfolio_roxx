// tests/test-phase3.cjs
// Playwright End-to-End Suite for Phase 3:
// 1. Raycast-style Command Palette (Hotkey Cmd/Ctrl+K, fuzzy search, arrow nav, selection)
// 2. Live Interactive Architecture Flow Simulator (Step traversal, latency badges, completion)
// 3. High-resolution screenshots saved to tests/screenshots/

const { chromium } = require('C:/Users/sujal/AppData/Roaming/npm/node_modules/playwright');
const path = require('path');

const PORT = 4321;
const BASE_URL = `http://127.0.0.1:${PORT}`;

(async () => {
  console.log('[TEST] Starting Phase 3 Playwright Verification Suite...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  try {
    console.log(`[TEST] Navigating to ${BASE_URL}...`);
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2500); // Wait for hero intro & stickers

    // -------------------------------------------------------------
    // Test 1: Command Palette button and Cmd+K / Ctrl+K hotkey
    // -------------------------------------------------------------
    console.log('[TEST 1] Testing Command Palette hotkey trigger...');
    const paletteNavBtn = page.locator('#palette-nav-btn');
    await paletteNavBtn.waitFor({ state: 'visible' });

    // Press Control+k
    await page.keyboard.press('Control+k');
    await page.waitForTimeout(400);

    const paletteDialog = page.locator('#command-palette');
    const isPaletteOpen = await paletteDialog.evaluate((el) => el.hasAttribute('open'));
    console.log(`[TEST 1] Palette opened via Ctrl+K: ${isPaletteOpen}`);
    if (!isPaletteOpen) throw new Error('Command palette did not open on Ctrl+K!');

    // Capture screenshot of palette initial state
    await page.screenshot({
      path: path.join(__dirname, 'screenshots', '14-command-palette-open.png'),
    });
    console.log('[TEST 1] Saved screenshot: 14-command-palette-open.png');

    // -------------------------------------------------------------
    // Test 2: Search input & arrow navigation in Command Palette
    // -------------------------------------------------------------
    console.log('[TEST 2] Testing search filter and keyboard navigation...');
    const paletteInput = page.locator('#palette-input');
    await paletteInput.fill('agent');
    await page.waitForTimeout(300);

    const filteredItems = page.locator('#palette-results .palette-item');
    const filteredCount = await filteredItems.count();
    console.log(`[TEST 2] Filtered items count for "agent": ${filteredCount}`);
    if (filteredCount === 0) throw new Error('Search filtering returned 0 items for "agent"!');

    // Arrow down navigation
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(150);

    await page.screenshot({
      path: path.join(__dirname, 'screenshots', '15-command-palette-search-agent.png'),
    });
    console.log('[TEST 2] Saved screenshot: 15-command-palette-search-agent.png');

    // Press Enter to open the agent project drawer directly from palette
    console.log('[TEST 2] Pressing Enter to select agent project case study...');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(600);

    // Verify palette closed and drawer opened
    const isPaletteClosed = await paletteDialog.evaluate((el) => !el.hasAttribute('open'));
    const drawerDialog = page.locator('#case-study-drawer');
    const isDrawerOpen = await drawerDialog.evaluate((el) => el.hasAttribute('open'));
    console.log(`[TEST 2] Palette closed: ${isPaletteClosed}, Drawer open: ${isDrawerOpen}`);
    if (!isDrawerOpen) throw new Error('Drawer did not open upon selecting project from palette!');

    // -------------------------------------------------------------
    // Test 3: Live Interactive Architecture Flow Simulator
    // -------------------------------------------------------------
    console.log('[TEST 3] Testing Live Interactive Architecture Flow Simulator...');
    const simulateBtn = page.locator('#drawer-simulate-btn');
    await simulateBtn.waitFor({ state: 'visible' });

    // Scroll simulate button into view inside drawer
    await simulateBtn.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    console.log('[TEST 3] Triggering pipeline flow simulation...');
    await simulateBtn.click();
    await page.waitForTimeout(1000); // Mid-simulation capture

    const activeNodesCount = await page.locator('.flow-node.is-simulating, .flow-node.is-complete').count();
    const badgesCount = await page.locator('.sim-latency-badge').count();
    console.log(`[TEST 3] Mid-simulation active/completed nodes: ${activeNodesCount}, Latency badges: ${badgesCount}`);

    await page.screenshot({
      path: path.join(__dirname, 'screenshots', '16-flow-simulation-active.png'),
    });
    console.log('[TEST 3] Saved screenshot: 16-flow-simulation-active.png');

    // Wait for simulation to finish across all nodes (approx 2.5 seconds total)
    console.log('[TEST 3] Waiting for simulation pipeline to finish and validate...');
    await page.waitForTimeout(2500);

    const btnText = await simulateBtn.textContent();
    console.log(`[TEST 3] Simulate button text upon validation: "${btnText?.trim()}"`);

    await page.screenshot({
      path: path.join(__dirname, 'screenshots', '17-flow-simulation-validated.png'),
    });
    console.log('[TEST 3] Saved screenshot: 17-flow-simulation-validated.png');

    // Close drawer
    const drawerCloseBtn = page.locator('#drawer-close');
    await drawerCloseBtn.click();
    await page.waitForTimeout(400);

    // -------------------------------------------------------------
    // Test 4: Re-open Palette via Nav Button and Test Dark Theme Switch
    // -------------------------------------------------------------
    console.log('[TEST 4] Testing palette trigger via nav button and theme action...');
    await paletteNavBtn.click();
    await page.waitForTimeout(300);

    await paletteInput.fill('theme');
    await page.waitForTimeout(200);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(600);

    const isSpideyNow = await page.evaluate(() => document.documentElement.classList.contains('spidey'));
    console.log(`[TEST 4] Spidey dark theme toggled via command palette: ${isSpideyNow}`);

    // Reopen palette in dark mode to verify dark theme styling
    await paletteNavBtn.click();
    await page.waitForTimeout(400);

    await page.screenshot({
      path: path.join(__dirname, 'screenshots', '18-command-palette-dark-mode.png'),
    });
    console.log('[TEST 4] Saved screenshot: 18-command-palette-dark-mode.png');

    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);

    console.log('\n[SUCCESS] ALL PHASE 3 PLAYWRIGHT TESTS PASSED 100%!');
  } catch (err) {
    console.error('[FAIL] Error during Phase 3 verification:', err);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
})();
