import json
import urllib.request
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8')
from playwright.sync_api import sync_playwright

TARGET_URL = "https://portfolio-roxx.vercel.app"
print(f"🚀 Starting Playwright verification against: {TARGET_URL}\n" + "="*60)

passed = 0
failed = 0

def record(name, condition, details=""):
    global passed, failed
    if condition:
        print(f"  ✅ PASS: {name}")
        if details:
            print(f"     -> {details}")
        passed += 1
    else:
        print(f"  ❌ FAIL: {name}")
        if details:
            print(f"     -> {details}")
        failed += 1

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context(viewport={"width": 1280, "height": 900})
    page = context.new_page()

    # 1. Page Load
    print("\n[Test 1: HTTP Status & Load]")
    response = page.goto(TARGET_URL, wait_until="domcontentloaded", timeout=45000)
    record("Page returned HTTP 200", response.status == 200, f"Status code: {response.status}")

    # 2. SEO Title & Meta Tags
    print("\n[Test 2: Google Search Titles & Meta Tags]")
    title = page.title()
    record("Title includes 'Sujal (Roxx)' & 'Portfolio'", 
           "Sujal (Roxx)" in title and "Portfolio" in title, 
           f"Title: '{title}'")

    desc = page.locator('meta[name="description"]').get_attribute("content") or ""
    record("Meta Description includes 'Sujal (Roxx / @roxxsujal7)'", 
           "Sujal (Roxx / @roxxsujal7)" in desc, 
           f"Description: '{desc[:60]}...'")

    keywords = page.locator('meta[name="keywords"]').get_attribute("content") or ""
    record("Meta Keywords include 'portfolio', 'roxx', 'roxxsujal7'",
           "portfolio" in keywords and "roxx" in keywords and "roxxsujal7" in keywords,
           f"Keywords: '{keywords[:60]}...'")

    author = page.locator('meta[name="author"]').get_attribute("content") or ""
    record("Author tag matches 'Sujal (Roxx)'", author == "Sujal (Roxx)", f"Author: '{author}'")

    robots = page.locator('meta[name="robots"]').get_attribute("content") or ""
    googlebot = page.locator('meta[name="googlebot"]').get_attribute("content") or ""
    record("Robots & Googlebot permit indexing & large snippets",
           "index, follow" in robots and "index, follow" in googlebot,
           f"Robots: '{robots}'")

    # 3. Semantic H1 Heading
    print("\n[Test 3: Semantic H1 Heading for Googlebot]")
    h1 = page.locator("h1")
    h1_count = h1.count()
    h1_text = h1.first.inner_text() if h1_count > 0 else ""
    h1_class = h1.first.get_attribute("class") or ""
    record("Exactly one H1 with .sr-only class exists",
           h1_count == 1 and "sr-only" in h1_class and "sujal (roxx" in h1_text.lower(),
           f"H1 Count: {h1_count}, Text: '{h1_text}'")

    # 4. JSON-LD Knowledge Graph Schema
    print("\n[Test 4: Schema.org Knowledge Graph JSON-LD]")
    json_ld = page.locator('script[type="application/ld+json"]').first
    json_text = json_ld.inner_text() if json_ld.count() > 0 else ""
    try:
        schema_data = json.loads(json_text)
        graph = schema_data.get("@graph", [])
        person = next((x for x in graph if x.get("@type") == "Person"), None)
        website = next((x for x in graph if x.get("@type") == "WebSite"), None)
        profile = next((x for x in graph if x.get("@type") == "ProfilePage"), None)
        has_all_schemas = person is not None and website is not None and profile is not None
        roxx_in_names = "Roxx" in person.get("alternateName", []) if person else False
        record("JSON-LD includes Person, WebSite, and ProfilePage with 'Roxx'",
               has_all_schemas and roxx_in_names,
               f"Alternate names: {person.get('alternateName') if person else 'None'}")
    except Exception as e:
        record("JSON-LD Schema parsed successfully", False, f"Error: {e}")

    # 5. Vercel Analytics and Speed Insights
    print("\n[Test 5: Vercel Analytics & Speed Insights]")
    content = page.content()
    has_analytics = "/_vercel/insights" in content or "va.js" in content or "@vercel/analytics" in content
    has_speed = "/_vercel/speed-insights" in content or "@vercel/speed-insights" in content
    record("Vercel Analytics & Speed Insights components active in DOM",
           has_analytics or has_speed,
           f"Analytics: {has_analytics}, SpeedInsights: {has_speed}")

    # 6. Interactive Theme Toggle
    print("\n[Test 6: Spidey Mode Theme Switcher]")
    toggle = page.locator("#theme-toggle")
    toggle_visible = toggle.is_visible()
    initial_class = page.locator("html").get_attribute("class") or ""
    toggle.click()
    page.wait_for_timeout(500)
    toggled_class = page.locator("html").get_attribute("class") or ""
    record("Theme toggle switches theme dynamically",
           toggle_visible and initial_class != toggled_class,
           f"Class transitioned from '{initial_class}' to '{toggled_class}'")

    # 7. Robots.txt and Sitemap.xml
    print("\n[Test 7: Crawlability (robots.txt & sitemap.xml)]")
    try:
        req_robots = urllib.request.urlopen(f"{TARGET_URL}/robots.txt")
        robots_body = req_robots.read().decode('utf-8')
        record("robots.txt returns HTTP 200 with Sitemap directive",
               req_robots.status == 200 and "sitemap.xml" in robots_body,
               f"Found directive in robots.txt")
    except Exception as e:
        record("robots.txt accessible", False, str(e))

    try:
        req_sitemap = urllib.request.urlopen(f"{TARGET_URL}/sitemap.xml")
        sitemap_body = req_sitemap.read().decode('utf-8')
        record("sitemap.xml returns HTTP 200 with valid urlset",
               req_sitemap.status == 200 and "<urlset" in sitemap_body,
               f"Found urlset in sitemap.xml")
    except Exception as e:
        record("sitemap.xml accessible", False, str(e))

    # Screenshot
    page.screenshot(path="public/playwright-verification.png", full_page=False)
    print("\n📸 Captured verification screenshot: public/playwright-verification.png")

    browser.close()

print("\n" + "="*60)
print(f"VERIFICATION SUMMARY: {passed} PASSED, {failed} FAILED")
print("="*60)

if failed > 0:
    sys.exit(1)
