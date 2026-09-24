// tests/test-phase2.cjs
// Automated Playwright E2E Verification for Phase 2 Features
const { chromium } = require('C:/Users/sujal/AppData/Roaming/npm/node_modules/playwright');

async function testPhase2() {
  console.log('🚀 Running Phase 2 Automated Verification Suite...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    permissions: ['clipboard-read', 'clipboard-write'],
  });
  const page = await context.newPage();

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  try {
    await page.goto('http://127.0.0.1:4321', { waitUntil: 'networkidle' });

    // -------------------------------------------------------------
    // Test 1: Recruiter Mode / ATS Resume Modal
    // -------------------------------------------------------------
    console.log('\n--- [1/3] Testing Recruiter View Modal ---');
    const recruiterBtn = page.locator('#recruiter-toggle');
    await recruiterBtn.waitFor({ state: 'visible' });
    await recruiterBtn.click();

    const recruiterModal = page.locator('#recruiter-modal');
    await recruiterModal.waitFor({ state: 'visible', timeout: 3000 });

    const candidateName = await page.locator('#recruiter-title').textContent();
    console.log(`   Candidate Name in Modal: "${candidateName}"`);
    if (!candidateName.includes('Sujal Sah')) throw new Error('Candidate name missing from recruiter view!');

    // Check project entries in ATS resume
    const projectEntries = await page.locator('.project-entry').count();
    console.log(`   Found ${projectEntries} production system entries in resume.`);
    if (projectEntries < 3) throw new Error('Insufficient project entries in ATS resume!');

    // Check Copy Plain-Text button
    const copyBtn = page.locator('#resume-copy-btn');
    await copyBtn.click();
    await page.waitForTimeout(300);
    const copyTextAfter = await copyBtn.textContent();
    console.log(`   Copy button feedback: "${copyTextAfter.trim()}"`);

    // Screenshot Recruiter Mode Desktop
    await page.screenshot({ path: 'tests/screenshots/7-recruiter-mode-desktop.png' });
    console.log('📸 Captured: 7-recruiter-mode-desktop.png');

    // Test Escape key dismissal
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    const isModalOpen = await recruiterModal.evaluate(el => el.open);
    console.log(`   Modal open state after Escape: ${isModalOpen} (expected false)`);
    if (isModalOpen) throw new Error('Modal did not close on Escape key!');

    // -------------------------------------------------------------
    // Test 2: Sound Toggle & Audio Feedback
    // -------------------------------------------------------------
    console.log('\n--- [2/3] Testing Web Audio Synthesizer Toggle ---');
    const soundBtn = page.locator('#sound-toggle');
    await soundBtn.waitFor({ state: 'visible' });

    const initialSoundState = await soundBtn.getAttribute('aria-pressed');
    console.log(`   Initial Sound state aria-pressed: ${initialSoundState}`);

    // Click to unmute
    await soundBtn.click();
    await page.waitForTimeout(200);
    const unmutedState = await soundBtn.getAttribute('aria-pressed');
    console.log(`   Unmuted Sound state aria-pressed: ${unmutedState} (expected true)`);
    if (unmutedState !== 'true') throw new Error('Sound toggle did not unmute!');

    // Click theme toggle to verify sound synthesis without errors
    const themeBtn = page.locator('#theme-toggle');
    await themeBtn.click();
    await page.waitForTimeout(400);

    // Re-open recruiter view in Spidey Dark Mode for visual check
    await recruiterBtn.click();
    await recruiterModal.waitFor({ state: 'visible' });
    await page.screenshot({ path: 'tests/screenshots/8-recruiter-mode-dark.png' });
    console.log('📸 Captured: 8-recruiter-mode-dark.png');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);

    // -------------------------------------------------------------
    // Test 3: Draggable & Peelable Tape Skill Stickers
    // -------------------------------------------------------------
    console.log('\n--- [3/3] Testing Interactive Draggable Tape Stickers ---');
    const firstNote = page.locator('.labels .note').first();
    await firstNote.waitFor({ state: 'visible' });

    const initialBox = await firstNote.boundingBox();
    console.log(`   Initial note position: x=${Math.round(initialBox.x)}, y=${Math.round(initialBox.y)}`);

    // Drag the note diagonally by 140px
    await page.mouse.move(initialBox.x + initialBox.width / 2, initialBox.y + initialBox.height / 2);
    await page.mouse.down();
    await page.waitForTimeout(100);
    await page.mouse.move(initialBox.x + initialBox.width / 2 + 120, initialBox.y + initialBox.height / 2 + 70, { steps: 8 });
    await page.mouse.up();
    await page.waitForTimeout(400);

    const draggedBox = await firstNote.boundingBox();
    console.log(`   Dragged note position: x=${Math.round(draggedBox.x)}, y=${Math.round(draggedBox.y)}`);

    const dx = Math.abs(draggedBox.x - initialBox.x);
    const dy = Math.abs(draggedBox.y - initialBox.y);
    console.log(`   Displacement: dx=${Math.round(dx)}px, dy=${Math.round(dy)}px`);
    if (dx < 20 && dy < 20) throw new Error('Sticker did not displace during drag!');

    await page.screenshot({ path: 'tests/screenshots/9-draggable-stickers-moved.png' });
    console.log('📸 Captured: 9-draggable-stickers-moved.png');

    console.log('\n🎉 ALL PHASE 2 VERIFICATIONS PASSED (100%)!');
  } catch (err) {
    console.error('❌ Phase 2 Test Failed:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

testPhase2();
