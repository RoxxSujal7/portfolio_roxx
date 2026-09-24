// tests/ux-features.spec.js
import { test, expect } from '@playwright/test';

test.describe('Phase 1 UX Enhancements Verification', () => {
  const baseUrl = 'http://127.0.0.1:4321';

  test('1. Project Card Click opens Case Study Slide-Over Drawer with architecture flow', async ({ page }) => {
    await page.goto(baseUrl, { waitUntil: 'networkidle' });

    // Scroll to work section and click first card
    const agentCard = page.locator('.card[data-kind="agent"] .card-link');
    await agentCard.scrollIntoViewIfNeeded();
    await agentCard.click();

    // Verify drawer opened
    const drawer = page.locator('#case-study-drawer');
    await expect(drawer).toBeVisible();

    // Verify dynamic content injected correctly
    const title = page.locator('#drawer-title');
    await expect(title).toHaveText('Autonomous AI Assistant');

    const metrics = page.locator('#drawer-metrics .metric-card');
    await expect(metrics).toHaveCount(3);

    const flowNodes = page.locator('#drawer-flow .flow-node');
    await expect(flowNodes).toHaveCount(6);

    const githubLink = page.locator('#drawer-github-link');
    await expect(githubLink).toHaveAttribute('href', 'https://github.com/RoxxSujal7');

    await page.screenshot({ path: 'tests/screenshots/1-drawer-open.png' });

    // Verify Escape key closes drawer
    await page.keyboard.press('Escape');
    await expect(drawer).not.toHaveAttribute('open', '');
  });

  test('2. Deep-Link Navigation opens corresponding Case Study directly', async ({ page }) => {
    await page.goto(`${baseUrl}/#project-systems`, { waitUntil: 'networkidle' });

    const drawer = page.locator('#case-study-drawer');
    await expect(drawer).toBeVisible();

    const title = page.locator('#drawer-title');
    await expect(title).toHaveText('RAG & Semantic Search Engine');

    await page.screenshot({ path: 'tests/screenshots/2-deep-link-systems.png' });

    // Close via close button
    const closeBtn = page.locator('#drawer-close');
    await closeBtn.click();
    await expect(drawer).not.toHaveAttribute('open', '');
  });

  test('3. Spidey Dark Mode Theme renders drawer seamlessly', async ({ page }) => {
    await page.goto(baseUrl, { waitUntil: 'networkidle' });

    // Toggle theme to Spidey mode
    const themeBtn = page.locator('#theme-toggle');
    await themeBtn.click();
    await page.waitForTimeout(400);

    // Open Real-Time Collaboration project drawer
    const p2pCard = page.locator('.card[data-kind="p2p"] .card-link');
    await p2pCard.scrollIntoViewIfNeeded();
    await p2pCard.click();

    const drawer = page.locator('#case-study-drawer');
    await expect(drawer).toBeVisible();

    const title = page.locator('#drawer-title');
    await expect(title).toHaveText('Real-Time Collaboration Platform');

    await page.screenshot({ path: 'tests/screenshots/3-drawer-dark-mode.png' });

    await page.keyboard.press('Escape');
    await expect(drawer).not.toHaveAttribute('open', '');
  });

  test('4. 1-Click Email Copy triggers tactile Toast Notification', async ({ page }) => {
    await page.goto(baseUrl, { waitUntil: 'networkidle' });

    // Click contact email
    const emailLink = page.locator('a[href^="mailto:"]').first();
    await emailLink.scrollIntoViewIfNeeded();
    await emailLink.click();

    const toastBubble = page.locator('.toast-bubble');
    await expect(toastBubble).toBeVisible();
    await expect(toastBubble).toContainText('Copied sujalsah9@gmail.com');

    await page.screenshot({ path: 'tests/screenshots/4-toast-feedback.png' });
  });
});
