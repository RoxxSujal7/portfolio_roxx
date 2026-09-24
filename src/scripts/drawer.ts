// src/scripts/drawer.ts
// Accessible Slide-Over Case Study Controller with Emil Kowalski interaction polish

export interface ProjectCaseStudy {
  kind: 'agent' | 'p2p' | 'crm' | 'systems' | 'reels' | 'site';
  title: string;
  subtitle: string;
  tag: string;
  status: string;
  problem: string;
  metrics: { value: string; label: string }[];
  flow: { node: string; desc: string }[];
  tradeoffs: string[];
  tech: string[];
  githubUrl: string;
}

export const CASE_STUDIES: Record<string, ProjectCaseStudy> = {
  agent: {
    kind: 'agent',
    title: 'Autonomous AI Assistant',
    subtitle: 'Autonomous multi-agent orchestration engine with recursive tool execution',
    tag: 'AI SYSTEMS & MULTI-AGENT',
    status: 'PRODUCTION READY',
    problem: 'Standard monolithic LLM prompts fail on multi-step reasoning, suffer context degradation, and lack durable error-recovery loops during third-party tool execution.',
    metrics: [
      { value: '< 1.2s', label: 'Median Turnaround' },
      { value: '99.2%', label: 'Tool Schema Compliance' },
      { value: '40%', label: 'Context Token Savings' },
    ],
    flow: [
      { node: 'User Prompt', desc: 'Raw instruction with intent & task constraints' },
      { node: 'Intent Classifier', desc: 'Determines tool routing, memory retrieval, and planning steps' },
      { node: 'LangChain Agent Swarm', desc: 'Coordinates domain-specialized subagents via ReAct loops' },
      { node: 'Vector Memory (Qdrant)', desc: 'Retrieves relevant historic conversation & task context' },
      { node: 'Dynamic Tool Sandbox', desc: 'Executes API calls, web searches, and data mutations safely' },
      { node: 'Synthesizer & Validator', desc: 'Cross-verifies output before streaming final answer' },
    ],
    tradeoffs: [
      'Implemented ReAct self-correction loops over rigid DAGs, allowing runtime recovery when an API returns unexpected payloads.',
      'Utilized Qdrant vector memory over in-memory stores for persistent session embeddings and high-precision metadata filtering.',
      'Applied token-budget pruning algorithms to prevent context degradation on lengthy multi-turn conversations.',
    ],
    tech: ['Python 3.11', 'LangChain', 'FastAPI', 'Qdrant Vector DB', 'Docker', 'OpenAI & Anthropic APIs'],
    githubUrl: 'https://github.com/RoxxSujal7',
  },

  p2p: {
    kind: 'p2p',
    title: 'Real-Time Collaboration Platform',
    subtitle: 'Low-latency distributed state synchronization with conflict-free concurrency',
    tag: 'DISTRIBUTED SYSTEMS',
    status: 'HIGH THROUGHPUT',
    problem: 'Multi-user collaborative document editing suffers from race conditions, laggy state updates, and severe server-side memory bottlenecks under concurrent keystrokes.',
    metrics: [
      { value: '< 15ms', label: 'Broadcast Propagation' },
      { value: '10K+', label: 'Concurrent WebSockets' },
      { value: '0%', label: 'State Overwrite Loss' },
    ],
    flow: [
      { node: 'Next.js Client', desc: 'Optimistic UI rendering with local mutation queue' },
      { node: 'WebSocket Gateway', desc: 'High-throughput bi-directional event stream' },
      { node: 'Redis Pub/Sub Bus', desc: 'Horizontally scaled room broadcaster' },
      { node: 'CRDT Conflict Engine', desc: 'Deterministic state reconciliation without central lock' },
      { node: 'PostgreSQL Store', desc: 'Asynchronous snapshot checkpoint persistence' },
    ],
    tradeoffs: [
      'Chose Conflict-Free Replicated Data Types (CRDTs) over Operational Transformation (OT) to enable seamless offline-first capability and peer-to-peer sync.',
      'Used WebSockets backed by Redis Pub/Sub instead of HTTP long-polling, dropping server connection overhead by over 70%.',
      'Batch-debounced database writes to prevent write locks on the primary Postgres instance during rapid typing.',
    ],
    tech: ['Next.js 14', 'TypeScript', 'Node.js', 'WebSockets', 'Redis', 'PostgreSQL', 'Tailwind CSS'],
    githubUrl: 'https://github.com/RoxxSujal7',
  },

  crm: {
    kind: 'crm',
    title: 'AI Analytics & SaaS Dashboard',
    subtitle: 'Full-stack telemetry ingestion pipeline with automated executive AI reporting',
    tag: 'ANALYTICS & FULL-STACK',
    status: 'PRODUCTION DEPLOYED',
    problem: 'Business operators lose hours manually collating fragmented logs and metrics across disconnected databases without real-time alerting or plain-language synthesis.',
    metrics: [
      { value: '50K+', label: 'Daily Events Ingested' },
      { value: '< 80ms', label: 'p95 Dashboard Query' },
      { value: '1-Click', label: 'AI Executive Summary' },
    ],
    flow: [
      { node: 'Event Ingestion API', desc: 'High-speed FastAPI endpoint validating incoming client telemetry' },
      { node: 'TimescaleDB Partition', desc: 'Hypertable time-series storage with automated compression' },
      { node: 'Async Celery Workers', desc: 'Background aggregation and trend anomaly detection' },
      { node: 'LLM Synthesis Agent', desc: 'Generates plain-language executive reports on weekly anomalies' },
      { node: 'React Dashboard', desc: 'Sub-60fps interactive charts and telemetry heatmaps' },
    ],
    tradeoffs: [
      'Adopted TimescaleDB hypertable partitioning on top of PostgreSQL, reducing query latency on 1M+ event records from 4.2s to 45ms.',
      'Offloaded executive AI report generation to asynchronous background worker queues so dashboard rendering remains instantaneous.',
      'Implemented optimistic UI filters on the React frontend to make slicing metrics feel native and zero-latency.',
    ],
    tech: ['React', 'FastAPI', 'PostgreSQL', 'TimescaleDB', 'Celery', 'Chart.js', 'Docker'],
    githubUrl: 'https://github.com/RoxxSujal7',
  },

  systems: {
    kind: 'systems',
    title: 'RAG & Semantic Search Engine',
    subtitle: 'High-recall document intelligence pipeline with hybrid BM25 + dense vector fusion',
    tag: 'INFORMATION RETRIEVAL',
    status: 'ENTERPRISE ACCURACY',
    problem: 'Dense vector embeddings often fail on exact technical keywords and error codes, while traditional keyword search fails to understand semantic conceptual intent.',
    metrics: [
      { value: '94.1%', label: 'Top-3 Recall Accuracy' },
      { value: '< 45ms', label: 'Hybrid Query Latency' },
      { value: '100%', label: 'Source Grounding' },
    ],
    flow: [
      { node: 'Document Parser', desc: 'Ingests unstructured PDFs, markdown docs, and code files' },
      { node: 'Recursive Chunking', desc: 'Context-aware 512-token chunks with 10% semantic sliding overlap' },
      { node: 'Dual Indexing', desc: 'Dense vector embeddings + Sparse BM25 keyword index' },
      { node: 'Reciprocal Rank Fusion', desc: 'Merges sparse and dense search rankings for optimal recall' },
      { node: 'Cross-Encoder Re-ranker', desc: 'Scores top candidate chunks to eliminate false positives' },
      { node: 'Grounded LLM Answer', desc: 'Synthesizes final answer with verbatim source attribution' },
    ],
    tradeoffs: [
      'Implemented Reciprocal Rank Fusion (RRF) combining dense vector search and BM25, outperforming pure vector search on technical code queries by 34%.',
      'Added a secondary lightweight cross-encoder re-ranking pass to drop hallucination risks to near zero before prompting the LLM.',
      'Built custom metadata filters (date, authority, repository scope) to restrict retrieval search space dynamically.',
    ],
    tech: ['Python 3.11', 'FastAPI', 'Qdrant Vector DB', 'Sentence-Transformers', 'LangChain', 'Docker'],
    githubUrl: 'https://github.com/RoxxSujal7',
  },

  reels: {
    kind: 'reels',
    title: 'Intelligent Automation Pipeline',
    subtitle: 'Resilient distributed job queue orchestrating media processing & model inference',
    tag: 'PIPELINES & CLOUD INFRA',
    status: 'FAULT TOLERANT',
    problem: 'Synchronous media processing and heavy model inference lock web server threads, causing timeouts, memory leaks, and dropped user requests.',
    metrics: [
      { value: '99.99%', label: 'Job Delivery SLA' },
      { value: '4x', label: 'Throughput Scaling' },
      { value: 'Automatic', label: 'Exponential Retry' },
    ],
    flow: [
      { node: 'Webhook Trigger', desc: 'Receives and authenticates payload from external APIs' },
      { node: 'BullMQ Task Queue', desc: 'Redis-backed job scheduler with priority leasing' },
      { node: 'Isolated Worker Pool', desc: 'Ephemeral worker processes handling heavy computation' },
      { node: 'ML Inference Model', desc: 'Runs content categorization and media transformation' },
      { node: 'Object Storage & Callback', desc: 'Persists artifacts and fires completion webhooks' },
    ],
    tradeoffs: [
      'Chose BullMQ over RabbitMQ for lighter deployment footprint and seamless native Redis shared-state utilization.',
      'Isolated machine-learning inference workers in containerized sandboxes to prevent CUDA memory fragmentation from taking down the queue.',
      'Designed dead-letter queues with automated exponential backoff to handle upstream network flickers seamlessly.',
    ],
    tech: ['Node.js', 'TypeScript', 'Redis', 'BullMQ', 'Docker', 'AWS S3', 'REST APIs'],
    githubUrl: 'https://github.com/RoxxSujal7',
  },

  site: {
    kind: 'site',
    title: 'Interactive Portfolio (sujal.dev)',
    subtitle: 'Spider-Verse illustrated engineering showcase with 60fps kinetic physics',
    tag: 'FRONTEND ARCHITECTURE',
    status: 'ACTIVE PRODUCTION',
    problem: 'Standard developer portfolios are cookie-cutter templates that fail to stand out, load slowly with heavy SPA bloat, and neglect physical interaction polish.',
    metrics: [
      { value: '100 / 100', label: 'Lighthouse Performance' },
      { value: '60 FPS', label: 'Locked Motion Budget' },
      { value: '< 1s', label: 'First Contentful Paint' },
    ],
    flow: [
      { node: 'Astro Static Generation', desc: '0-runtime JavaScript baseline with sub-second initial paint' },
      { node: 'Lenis Kinetic Scroll', desc: 'Exponential ease-out smooth anchor gliding and physics' },
      { node: 'GSAP Timelines', desc: 'Multi-plane parallax, 3D card tilt, and spring rebounds' },
      { node: 'WAAPI Radial Wipe', desc: 'Zero-layout-shift circular clip-path dark mode transition' },
      { node: 'Progressive Disclosure', desc: 'Instant in-page case study slide-over drawers' },
    ],
    tradeoffs: [
      'Used Astro static generation with selective progressive hydration over Next.js/React SPAs to guarantee zero unnecessary JS overhead.',
      'Engineered theme switching via the native Web Animations API (WAAPI) rather than heavy canvas rerenders for locked 60fps circular clip wipes.',
      'Enforced strict Emil Kowalski interaction guidelines (active press scales, custom cubic-bezier easing, zero layout thrashing).',
    ],
    tech: ['Astro 7', 'TypeScript', 'GSAP 3.15', 'Lenis 1.3', 'Vanilla CSS', 'WAAPI'],
    githubUrl: 'https://github.com/RoxxSujal7/portfolio_roxx',
  },
};

// -------------------------------------------------------------
// Drawer Controller Implementation
// -------------------------------------------------------------

let lastActiveElement: HTMLElement | null = null;
let touchStartY = 0;

export function initDrawer() {
  const dialog = document.getElementById('case-study-drawer') as HTMLDialogElement | null;
  const panel = document.getElementById('drawer-panel');
  const drawerBody = document.getElementById('drawer-body');
  const backdrop = document.getElementById('drawer-backdrop');
  const closeBtn = document.getElementById('drawer-close');
  const dismissBtn = document.getElementById('drawer-dismiss-btn');

  if (!dialog) return;

  // Click card triggers via document delegation
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement | null;
    const cardLink = target?.closest('.card-link');
    if (cardLink) {
      const card = cardLink.closest('.card');
      const kind = card?.getAttribute('data-kind');
      if (kind && CASE_STUDIES[kind]) {
        e.preventDefault();
        openDrawer(kind);
      }
    }
  });

  // Close triggers
  closeBtn?.addEventListener('click', closeDrawer);
  dismissBtn?.addEventListener('click', closeDrawer);
  backdrop?.addEventListener('click', closeDrawer);

  // Keyboard navigation & escape
  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeDrawer();
      return;
    }

    const body = document.getElementById('drawer-body');
    if (!body) return;

    // Allow scrolling via keyboard when focus is inside the dialog
    const targetTag = (e.target as HTMLElement)?.tagName?.toLowerCase();
    if (targetTag === 'input' || targetTag === 'textarea') return;

    const step = 90;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      body.scrollTop += step;
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      body.scrollTop -= step;
    } else if (e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey)) {
      e.preventDefault();
      body.scrollTop += body.clientHeight * 0.85;
    } else if (e.key === 'PageUp' || (e.key === ' ' && e.shiftKey)) {
      e.preventDefault();
      body.scrollTop -= body.clientHeight * 0.85;
    } else if (e.key === 'Home') {
      e.preventDefault();
      body.scrollTop = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      body.scrollTop = body.scrollHeight;
    }
  });

  // Universal Wheel forwarding: If wheeling anywhere over panel/head/foot/backdrop, forward directly to body
  if (panel) {
    panel.addEventListener(
      'wheel',
      (e) => {
        const body = document.getElementById('drawer-body');
        if (body && e.target !== body && !body.contains(e.target as Node)) {
          body.scrollTop += e.deltaY;
        }
      },
      { passive: true }
    );

    // Universal Touch forwarding for trackpads / touchscreens
    panel.addEventListener(
      'touchstart',
      (e) => {
        if (e.touches.length === 1) {
          touchStartY = e.touches[0].clientY;
        }
      },
      { passive: true }
    );

    panel.addEventListener(
      'touchmove',
      (e) => {
        const body = document.getElementById('drawer-body');
        if (body && e.touches.length === 1 && e.target !== body && !body.contains(e.target as Node)) {
          const deltaY = touchStartY - e.touches[0].clientY;
          touchStartY = e.touches[0].clientY;
          body.scrollTop += deltaY;
        }
      },
      { passive: true }
    );
  }

  // Check URL hash on page load (e.g. #project-agent)
  handleHashNavigation();
  window.addEventListener('hashchange', handleHashNavigation);
}

export function openDrawer(kind: string) {
  const data = CASE_STUDIES[kind];
  if (!data) return;

  const dialog = document.getElementById('case-study-drawer') as HTMLDialogElement | null;
  if (!dialog) return;

  lastActiveElement = document.activeElement as HTMLElement | null;

  // Populate data and reset scroll to top
  populateDrawerData(data);
  const drawerBody = document.getElementById('drawer-body');
  if (drawerBody) {
    drawerBody.scrollTop = 0;
  }

  // Pause Lenis smooth-scroll so window events don't conflict
  if (typeof (window as any).lenis?.stop === 'function') {
    (window as any).lenis.stop();
  }

  // Lock background scroll without destructive position:fixed
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.documentElement.classList.add('drawer-locked');
  document.body.classList.add('drawer-locked');
  if (scrollbarWidth > 0) {
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }

  // Open dialog
  if (typeof dialog.showModal === 'function') {
    dialog.showModal();
  } else {
    dialog.setAttribute('open', '');
  }

  // Set URL hash cleanly
  const currentHash = window.location.hash;
  const targetHash = `#project-${kind}`;
  if (currentHash !== targetHash) {
    history.replaceState(null, '', targetHash);
  }

  // Focus the close button for accessibility
  setTimeout(() => {
    const closeBtn = document.getElementById('drawer-close');
    closeBtn?.focus();
  }, 50);
}

export function closeDrawer() {
  const dialog = document.getElementById('case-study-drawer') as HTMLDialogElement | null;
  if (!dialog || !dialog.open) return;

  // Unlock background scroll
  document.documentElement.classList.remove('drawer-locked');
  document.body.classList.remove('drawer-locked');
  document.body.style.paddingRight = '';

  // Resume Lenis smooth scroll
  if (typeof (window as any).lenis?.start === 'function') {
    (window as any).lenis.start();
  }

  // Close dialog
  if (typeof dialog.close === 'function') {
    dialog.close();
  } else {
    dialog.removeAttribute('open');
  }

  // Clear hash cleanly if it was a project hash
  if (window.location.hash.startsWith('#project-')) {
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }

  // Restore focus to previously active element
  if (lastActiveElement) {
    lastActiveElement.focus();
  }
}

function populateDrawerData(data: ProjectCaseStudy) {
  // Title & Subtitle
  const titleEl = document.getElementById('drawer-title');
  const subtitleEl = document.getElementById('drawer-subtitle');
  const tagEl = document.getElementById('drawer-tag');
  const statusEl = document.getElementById('drawer-kind-pill');
  const problemEl = document.getElementById('drawer-problem');
  const githubLinkEl = document.getElementById('drawer-github-link') as HTMLAnchorElement | null;

  if (titleEl) titleEl.textContent = data.title;
  if (subtitleEl) subtitleEl.textContent = data.subtitle;
  if (tagEl) tagEl.textContent = data.tag;
  if (statusEl) statusEl.textContent = data.status;
  if (problemEl) problemEl.textContent = data.problem;
  if (githubLinkEl) githubLinkEl.href = data.githubUrl;

  // Metrics
  const metricsContainer = document.getElementById('drawer-metrics');
  if (metricsContainer) {
    metricsContainer.innerHTML = data.metrics
      .map(
        (m) => `
        <div class="metric-card">
          <span class="metric-value">${m.value}</span>
          <span class="metric-label">${m.label}</span>
        </div>`
      )
      .join('');
  }

  // Architecture Flow
  const flowContainer = document.getElementById('drawer-flow');
  if (flowContainer) {
    flowContainer.innerHTML = data.flow
      .map(
        (f, idx) => `
        <div class="flow-node">
          <span class="node-pill">${f.node}</span>
          <span class="node-desc">${f.desc}</span>
        </div>
        ${idx < data.flow.length - 1 ? '<div class="flow-arrow" aria-hidden="true">&#8595;</div>' : ''}
      `
      )
      .join('');
  }

  // Tradeoffs
  const tradeoffsContainer = document.getElementById('drawer-tradeoffs');
  if (tradeoffsContainer) {
    tradeoffsContainer.innerHTML = data.tradeoffs
      .map((t) => `<li class="tradeoff-item">${t}</li>`)
      .join('');
  }

  // Tech Pills
  const techContainer = document.getElementById('drawer-tech');
  if (techContainer) {
    techContainer.innerHTML = data.tech
      .map((item) => `<span class="tech-chip">${item}</span>`)
      .join('');
  }
}


function handleHashNavigation() {
  const hash = window.location.hash;
  if (hash.startsWith('#project-')) {
    const kind = hash.replace('#project-', '');
    if (CASE_STUDIES[kind]) {
      openDrawer(kind);
    }
  }
}

// Auto-initialize when DOM is ready
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDrawer);
  } else {
    initDrawer();
  }
}
