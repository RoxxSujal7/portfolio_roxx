// tests/test-phase4.cjs
// Playwright End-to-End Suite for Phase 4:
// 1. Interactive Work Category Filter Tabs & Dynamic Count Updates
// 2. Developer CLI Terminal (sujal.sh) with ASCII banner, skills, projects, and "sudo hire" confetti

const { chromium } = require('C:/Users/sujal/AppData/Roaming/npm/node_modules/playwright');
const path = require('path');

const PORT = 4321;
const BASE_URL = `http://127.0.0.1:${PORT}`;

(async () => {
  console.log('[TEST] Starting Phase 4 Playwright Verification Suite...');
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
    // Test 1: Work Category Filter Tabs
    // -------------------------------------------------------------
    console.log('[TEST 1] Testing Work Category Filter Tabs...');
    const workSection = page.locator('#work');
    await workSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);

    const filterTabs = page.locator('.work-filter-tab');
    const tabCount = await filterTabs.count();
    console.log(`[TEST 1] Found ${tabCount} filter tabs`);
    if (tabCount !== 4) throw new Error(`Expected 4 filter tabs, found ${tabCount}`);

    // Click "AI & Agents" tab
    console.log('[TEST 1] Clicking "AI & Agents" filter tab...');
    const aiTab = page.locator('.work-filter-tab[data-filter="ai"]');
    await aiTab.click();
    await page.waitForTimeout(300);

    const visibleCards = page.locator('.grid .card:not(.is-filtered-out)');
    const visibleCount = await visibleCards.count();
    const countBadgeText = await page.locator('#work-count-badge').textContent();
    console.log(`[TEST 1] Visible cards after filtering by AI: ${visibleCount}, Badge: "${countBadgeText}"`);

    if (visibleCount !== 2) throw new Error(`Expected 2 AI projects, found ${visibleCount}`);
    if (!countBadgeText.includes('2 of 6')) throw new Error(`Badge text mismatch: ${countBadgeText}`);

    await page.screenshot({
      path: path.join(__dirname, 'screenshots', '19-work-filter-ai.png'),
    });
    console.log('[TEST 1] Saved screenshot: 19-work-filter-ai.png');

    // Click "All Projects" tab to restore
    console.log('[TEST 1] Restoring "All Projects"...');
    const allTab = page.locator('.work-filter-tab[data-filter="all"]');
    await allTab.click();
    await page.waitForTimeout(300);
    const restoredCount = await page.locator('.grid .card:not(.is-filtered-out)').count();
    console.log(`[TEST 1] Restored cards count: ${restoredCount}`);
    if (restoredCount !== 6) throw new Error(`Expected 6 cards after reset, found ${restoredCount}`);

    // -------------------------------------------------------------
    // Test 2: Developer CLI Terminal Trigger
    // -------------------------------------------------------------
    console.log('[TEST 2] Testing Developer Terminal dock trigger...');
    const dockBtn = page.locator('#terminal-dock-btn');
    await dockBtn.waitFor({ state: 'visible' });

    await dockBtn.click();
    await page.waitForTimeout(400);

    const termDialog = page.locator('#developer-terminal');
    const isTermOpen = await termDialog.evaluate((el) => el.hasAttribute('open'));
    console.log(`[TEST 2] Terminal open via dock button: ${isTermOpen}`);
    if (!isTermOpen) throw new Error('Developer terminal did not open on dock click!');

    await page.screenshot({
      path: path.join(__dirname, 'screenshots', '20-terminal-initial.png'),
    });
    console.log('[TEST 2] Saved screenshot: 20-terminal-initial.png');

    // -------------------------------------------------------------
    // Test 3: Command Execution (skills, projects, sudo hire)
    // -------------------------------------------------------------
    console.log('[TEST 3] Running terminal commands...');
    const termInput = page.locator('#terminal-input');

    // Command 1: skills
    console.log('[TEST 3] Running "skills"...');
    await termInput.fill('skills');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(300);

    const skillsBox = page.locator('.term-skills-box');
    const skillsVisible = await skillsBox.isVisible();
    console.log(`[TEST 3] Skills matrix rendered: ${skillsVisible}`);
    if (!skillsVisible) throw new Error('Skills matrix did not render!');

    // Command 2: sudo hire (celebration easter egg)
    console.log('[TEST 3] Running "sudo hire"...');
    await termInput.fill('sudo hire');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(500);

    const celebration = page.locator('.term-hire-celebration');
    const celebrationVisible = await celebration.isVisible();
    console.log(`[TEST 3] Sudo hire celebration banner rendered: ${celebrationVisible}`);
    if (!celebrationVisible) throw new Error('Celebration banner did not render!');

    await page.screenshot({
      path: path.join(__dirname, 'screenshots', '21-terminal-commands-celebration.png'),
    });
    console.log('[TEST 3] Saved screenshot: 21-terminal-commands-celebration.png');

    // Test quick pill execution
    console.log('[TEST 3] Testing quick pill execution for "projects"...');
    const projectsChip = page.locator('.term-chip[data-cmd="projects"]');
    await projectsChip.click();
    await page.waitForTimeout(300);

    const termTable = page.locator('.term-table');
    const tableVisible = await termTable.first().isVisible();
    console.log(`[TEST 3] Projects table rendered via quick pill: ${tableVisible}`);

    // Close terminal with Escape
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    const isTermClosed = await termDialog.evaluate((el) => !el.hasAttribute('open'));
    console.log(`[TEST 3] Terminal closed via Escape: ${isTermClosed}`);
    if (!isTermClosed) throw new Error('Terminal did not close upon Escape keypress!');

    console.log('\n[SUCCESS] ALL PHASE 4 PLAYWRIGHT TESTS PASSED 100%!');
  } catch (err) {
    console.error('[FAIL] Error during Phase 4 verification:', err);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
})();
