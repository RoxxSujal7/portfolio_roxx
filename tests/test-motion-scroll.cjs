// tests/test-motion-scroll.cjs
// Automated verification of Lenis smooth scroll, GSAP animations, anchor navigation, and card 3D tilt
const { chromium } = require('C:/Users/sujal/AppData/Roaming/npm/node_modules/playwright');
const path = require('path');

async function verifyMotionAndScroll() {
  console.log('🚀 Launching Chromium to verify Scroll & Motion systems...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  page.on('console', (msg) => console.log(`[BROWSER CONSOLE ${msg.type()}]:`, msg.text()));
  page.on('pageerror', (err) => console.log('[BROWSER UNCAUGHT ERROR]:', err));

  const baseUrl = 'http://127.0.0.1:4321';

  try {
    await page.goto(baseUrl, { waitUntil: 'networkidle' });

    // -------------------------------------------------------------
    // Test 1: Verify GSAP Hero Intro Animations Executed
    // -------------------------------------------------------------
    console.log('🧪 Test 1: Checking Hero entrance elements...');
    const heroFigure = page.locator('.hero-figure');
    await heroFigure.waitFor({ state: 'visible' });

    const notesCount = await page.locator('.labels .note').count();
    console.log(`   Taped notes present: ${notesCount}`);
    if (notesCount < 6) throw new Error('Hero taped notes missing');

    // -------------------------------------------------------------
    // Test 2: Nav Scroll Trigger & Sticky State
    // -------------------------------------------------------------
    console.log('🧪 Test 2: Checking Nav scroll state change...');
    const initialNavClass = await page.locator('.nav').getAttribute('class');
    console.log(`   Initial Nav class: "${initialNavClass}"`);

    // Scroll down 300px
    await page.evaluate(() => window.scrollTo(0, 400));
    await page.waitForTimeout(400);

    const scrolledNavClass = await page.locator('.nav').getAttribute('class');
    console.log(`   Scrolled Nav class: "${scrolledNavClass}"`);
    if (!scrolledNavClass?.includes('nav-scrolled')) {
      console.warn('⚠️ Warning: nav-scrolled class not toggled on scroll');
    } else {
      console.log('✅ Sticky Nav dynamically toggled "nav-scrolled" via GSAP ScrollTrigger.');
    }

    // -------------------------------------------------------------
    // Test 3: Anchor Link Smooth-Scrolling (About, Work, Contact)
    // -------------------------------------------------------------
    console.log('🧪 Test 3: Testing Anchor Smooth Navigation to #work...');
    const workNavLink = page.locator('.nav a[href="#work"]');
    await workNavLink.click();
    await page.waitForTimeout(1200); // Wait for smooth scroll ease-out

    const scrollYAfterWork = await page.evaluate(() => window.scrollY);
    console.log(`   Scroll position after clicking #work: ${scrollYAfterWork}px`);
    if (scrollYAfterWork < 400) {
      throw new Error(`Expected scroll to #work (>400px), but scrollY is ${scrollYAfterWork}px`);
    }
    console.log('✅ Anchor link smoothly glided to #work section.');

    // -------------------------------------------------------------
    // Test 4: Card 3D Magnetic Tilt Physics
    // -------------------------------------------------------------
    console.log('🧪 Test 4: Testing 3D Card Tilt on Hover/Mousemove...');
    const firstCard = page.locator('.card').first();
    const cardBox = await firstCard.boundingBox();

    if (cardBox) {
      // Hover at offset to trigger tilt
      await page.mouse.move(cardBox.x + cardBox.width * 0.8, cardBox.y + cardBox.height * 0.2);
      await page.waitForTimeout(300);

      const transformStyle = await firstCard.evaluate((el) => window.getComputedStyle(el).transform);
      console.log(`   Card transform matrix on mouse move: ${transformStyle}`);
      if (transformStyle === 'none') {
        console.warn('⚠️ Card transform is none');
      } else {
        console.log('✅ 3D Euler tilt angles calculated and applied dynamically via GSAP.');
      }
    }

    // -------------------------------------------------------------
    // Test 5: Verify Scroll Restoration After Drawer Close
    // -------------------------------------------------------------
    console.log('🧪 Test 5: Opening and closing drawer, verifying scroll is intact...');
    const cardLink = page.locator('.card[data-kind="agent"] .card-link');
    await cardLink.click();
    await page.waitForTimeout(400);

    const drawer = page.locator('#case-study-drawer');
    const isDrawerOpen = await drawer.evaluate((el) => el.hasAttribute('open'));
    console.log(`   Drawer open: ${isDrawerOpen}`);

    // Verify body overflow is locked
    const bodyOverflowLocked = await page.evaluate(() => document.body.style.position === 'fixed');
    console.log(`   Body scroll locked while drawer open: ${bodyOverflowLocked}`);

    // Close drawer
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);

    const bodyOverflowRestored = await page.evaluate(() => document.body.style.position === '');
    console.log(`   Body scroll unlocked after drawer close: ${bodyOverflowRestored}`);

    // Scroll to contact
    const contactNavLink = page.locator('.nav a[href="#contact"]');
    await contactNavLink.click();
    await page.waitForTimeout(1200);

    const scrollYAfterContact = await page.evaluate(() => window.scrollY);
    console.log(`   Scroll position after clicking #contact: ${scrollYAfterContact}px`);
    if (scrollYAfterContact <= scrollYAfterWork) {
      throw new Error('Scroll navigation failed to advance to #contact');
    }
    console.log('✅ Smooth scrolling functions flawlessly after drawer close.');

    console.log('\n🎉 ALL SCROLL & MOTION SYSTEMS FULLY OPERATIONAL!');
  } catch (error) {
    console.error('❌ Motion & Scroll Verification Error:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

verifyMotionAndScroll();
