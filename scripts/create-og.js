import sharp from 'sharp';
import path from 'path';

const bgPath = 'C:/Users/sujal/.gemini/antigravity-ide/brain/94da7efc-375f-41db-b985-eedcab60bd04/og_banner_art_1790159703258.jpg';
const outputPath = path.resolve('public/og-image.png');

const svgOverlay = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#120c0e" stop-opacity="0.94"/>
      <stop offset="100%" stop-color="#1f1d3a" stop-opacity="0.92"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="16" flood-color="#d8402f" flood-opacity="0.35"/>
    </filter>
  </defs>

  <!-- Vignette / dark overlay -->
  <rect x="0" y="0" width="1200" height="630" fill="rgba(10, 8, 16, 0.45)"/>

  <!-- Centered Card Container -->
  <rect x="80" y="65" width="1040" height="500" rx="20" fill="url(#cardGrad)" stroke="#d8402f" stroke-width="2.5" filter="url(#glow)"/>

  <!-- Inner border accent -->
  <rect x="92" y="77" width="1016" height="476" rx="14" fill="none" stroke="rgba(255, 255, 255, 0.08)" stroke-width="1"/>

  <!-- Eyebrow Badge -->
  <g transform="translate(130, 115)">
    <rect x="0" y="0" width="230" height="34" rx="17" fill="#d8402f"/>
    <text x="115" y="22" font-family="Montserrat, -apple-system, sans-serif" font-size="13" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="1.5">FULL STACK &amp; AI</text>
  </g>

  <!-- Domain & Handle -->
  <text x="1070" y="138" font-family="Montserrat, -apple-system, sans-serif" font-size="16" font-weight="700" fill="rgba(255, 255, 255, 0.65)" text-anchor="end" letter-spacing="1">SUJAL.DEV · @ROXXSUJAL7</text>

  <!-- Main Headline -->
  <text x="130" y="240" font-family="Montserrat, -apple-system, sans-serif" font-size="82" font-weight="900" fill="#ffffff" letter-spacing="-1">SUJAL</text>
  <text x="430" y="240" font-family="'Kaushan Script', cursive, sans-serif" font-size="54" font-weight="400" fill="#d8402f">.dev</text>

  <!-- Subtitle -->
  <text x="130" y="305" font-family="Montserrat, -apple-system, sans-serif" font-size="28" font-weight="800" fill="#ffffff" letter-spacing="0.5">Software Engineer &amp; AI Systems Architect</text>

  <!-- Description Prose -->
  <text x="130" y="360" font-family="-apple-system, Nunito, sans-serif" font-size="20" font-weight="400" fill="rgba(255, 255, 255, 0.78)">
    Building high-performance web apps, autonomous LLM agents, and distributed backend systems.
  </text>

  <!-- Tech Chips / Pills -->
  <g transform="translate(130, 420)">
    <!-- Chip 1 -->
    <rect x="0" y="0" width="105" height="38" rx="8" fill="rgba(255, 255, 255, 0.08)" stroke="rgba(255, 255, 255, 0.15)"/>
    <text x="52.5" y="24" font-family="-apple-system, Nunito, sans-serif" font-size="15" font-weight="700" fill="#ffffff" text-anchor="middle">Next.js</text>

    <!-- Chip 2 -->
    <rect x="120" y="0" width="105" height="38" rx="8" fill="rgba(255, 255, 255, 0.08)" stroke="rgba(255, 255, 255, 0.15)"/>
    <text x="172.5" y="24" font-family="-apple-system, Nunito, sans-serif" font-size="15" font-weight="700" fill="#ffffff" text-anchor="middle">React</text>

    <!-- Chip 3 -->
    <rect x="240" y="0" width="115" height="38" rx="8" fill="rgba(255, 255, 255, 0.08)" stroke="rgba(255, 255, 255, 0.15)"/>
    <text x="297.5" y="24" font-family="-apple-system, Nunito, sans-serif" font-size="15" font-weight="700" fill="#ffffff" text-anchor="middle">Python</text>

    <!-- Chip 4 -->
    <rect x="370" y="0" width="115" height="38" rx="8" fill="rgba(255, 255, 255, 0.08)" stroke="rgba(255, 255, 255, 0.15)"/>
    <text x="427.5" y="24" font-family="-apple-system, Nunito, sans-serif" font-size="15" font-weight="700" fill="#ffffff" text-anchor="middle">FastAPI</text>

    <!-- Chip 5 -->
    <rect x="500" y="0" width="140" height="38" rx="8" fill="rgba(255, 255, 255, 0.08)" stroke="rgba(255, 255, 255, 0.15)"/>
    <text x="570" y="24" font-family="-apple-system, Nunito, sans-serif" font-size="15" font-weight="700" fill="#ffffff" text-anchor="middle">LLM Agents</text>

    <!-- Chip 6 -->
    <rect x="655" y="0" width="135" height="38" rx="8" fill="rgba(255, 255, 255, 0.08)" stroke="rgba(255, 255, 255, 0.15)"/>
    <text x="722.5" y="24" font-family="-apple-system, Nunito, sans-serif" font-size="15" font-weight="700" fill="#ffffff" text-anchor="middle">PostgreSQL</text>

    <!-- Chip 7 Highlight -->
    <rect x="805" y="0" width="135" height="38" rx="8" fill="#d8402f"/>
    <text x="872.5" y="24" font-family="-apple-system, Nunito, sans-serif" font-size="15" font-weight="800" fill="#ffffff" text-anchor="middle">Spider-Verse UI</text>
  </g>

  <!-- Bottom status row -->
  <text x="130" y="525" font-family="-apple-system, sans-serif" font-size="15" font-weight="600" fill="#ffb3a8">⚡ Explore projects, architecture, and live demos</text>
  <text x="1070" y="525" font-family="-apple-system, sans-serif" font-size="15" font-weight="600" fill="rgba(255, 255, 255, 0.45)" text-anchor="end">github.com/RoxxSujal7</text>
</svg>
`;

async function generate() {
  const overlayBuffer = Buffer.from(svgOverlay);

  await sharp(bgPath)
    .resize(1200, 630, { fit: 'cover', position: 'center' })
    .composite([
      {
        input: overlayBuffer,
        top: 0,
        left: 0
      }
    ])
    .png({ quality: 90 })
    .toFile(outputPath);

  console.log('Successfully generated Open Graph banner at:', outputPath);
}

generate().catch(err => {
  console.error('Error generating banner:', err);
  process.exit(1);
});
