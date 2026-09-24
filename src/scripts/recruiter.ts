// src/scripts/recruiter.ts
// Recruiter Mode Controller: ATS Resume Modal, Print Trigger & Plain-Text Clipboard Export

let lastActiveEl: HTMLElement | null = null;

const RAW_RESUME_TEXT = `SUJAL SAH
Full Stack & AI Systems Engineer
Contact: sujalsah9@gmail.com | github.com/RoxxSujal7 | linkedin.com/in/sujalroxx7
Location: Remote / Global

EXECUTIVE SUMMARY
Full Stack & Autonomous AI Systems Engineer specializing in distributed real-time systems, multi-agent LLM orchestration, and high-performance frontend engineering. Proven track record building resilient, production-ready systems including vector memory pipelines, WebSocket collaboration engines, and hybrid RAG search architectures.

CORE COMPETENCIES & TECHNICAL STACK
• AI & Intelligent Systems: LangChain, Multi-Agent Swarms, ReAct Loops, Qdrant Vector DB, Hybrid RAG (BM25 + Dense Fusion), Cross-Encoders, Sentence-Transformers, OpenAI/Anthropic APIs.
• Backend & Distributed Architecture: Python 3.11+, FastAPI, Node.js, Next.js, Redis (Pub/Sub & BullMQ), WebSockets, PostgreSQL, TimescaleDB, Docker.
• Frontend Architecture & Motion: TypeScript, Astro, React, GSAP 3.15, Lenis Smooth Scroll, Web Animations API (WAAPI), Semantic HTML5, Vanilla CSS Design Systems, WCAG 2.1 AA.
• DevOps & Testing: Docker containerization, Git workflows, Playwright E2E automated test suites, CI/CD automated gates, token-budget optimization.

FEATURED PRODUCTION SYSTEMS
1. Autonomous AI Assistant & Orchestration Swarm (< 1.2s Turnaround • 40% Token Savings)
   Stack: Python, FastAPI, LangChain, Qdrant Vector DB, Docker
   - Architected multi-agent swarm orchestrating specialized subagents via dynamic ReAct loops with runtime error recovery.
   - Integrated persistent vector memory using Qdrant with hybrid semantic retrieval and automated token pruning algorithms.
   - Enforced strict schema validation on tool calls, reaching 99.2% tool compliance.

2. Real-Time Distributed Collaboration Platform (10K+ WebSockets • < 15ms Broadcast)
   Stack: Next.js 14, TypeScript, Node.js, WebSockets, Redis, PostgreSQL
   - Engineered optimistic mutation pipeline supporting 10,000+ simultaneous WebSockets synchronized across horizontal Redis Pub/Sub channels.
   - Implemented Conflict-Free Replicated Data Types (CRDTs) to ensure deterministic document state reconciliation without centralized locking.
   - Debounced database write snapshots, decreasing primary database connection overhead by over 70%.

3. Hybrid RAG & Semantic Retrieval Engine (94.1% Recall • 100% Grounding)
   Stack: Python 3.11, Qdrant, BM25, Sentence-Transformers, Docker
   - Formulated hybrid Reciprocal Rank Fusion (RRF) pipeline combining sparse BM25 keyword search with dense vector embeddings.
   - Embedded cross-encoder re-ranking to filter false positives, boosting recall on technical queries by 34%.

4. Intelligent Automation Queue & Media Pipeline (99.99% Delivery SLA • 4x Scaling)
   Stack: Node.js, TypeScript, BullMQ, Redis, Docker, REST APIs
   - Designed fault-tolerant job scheduler orchestrating asynchronous media transformation and machine learning inference.

EDUCATION
Bachelor of Technology / Computer Engineering — Active Practitioner
`;

export function initRecruiter() {
  const toggleBtn = document.getElementById('recruiter-toggle');
  const modal = document.getElementById('recruiter-modal') as HTMLDialogElement | null;
  const backdrop = document.getElementById('recruiter-backdrop');
  const closeBtn = document.getElementById('recruiter-close-btn');
  const printBtn = document.getElementById('resume-print-btn');
  const copyBtn = document.getElementById('resume-copy-btn');

  if (!modal) return;

  toggleBtn?.addEventListener('click', () => {
    openRecruiter();
  });

  closeBtn?.addEventListener('click', () => {
    closeRecruiter();
  });

  backdrop?.addEventListener('click', () => {
    closeRecruiter();
  });

  modal.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeRecruiter();
    }
  });

  printBtn?.addEventListener('click', () => {
    window.print();
  });

  copyBtn?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(RAW_RESUME_TEXT);
      const originalText = copyBtn.innerHTML;
      copyBtn.innerHTML = `<span>Copied! ✓</span>`;
      setTimeout(() => {
        copyBtn.innerHTML = originalText;
      }, 2000);
    } catch {
      // Fallback
      window.prompt('Copy resume text:', RAW_RESUME_TEXT);
    }
  });
}

export function openRecruiter() {
  const modal = document.getElementById('recruiter-modal') as HTMLDialogElement | null;
  if (!modal) return;

  lastActiveEl = document.activeElement as HTMLElement | null;

  document.documentElement.classList.add('drawer-locked');
  document.body.classList.add('drawer-locked');

  if (typeof (window as any).lenis?.stop === 'function') {
    (window as any).lenis.stop();
  }

  if (typeof modal.showModal === 'function') {
    modal.showModal();
  } else {
    modal.setAttribute('open', '');
  }

  // Focus close button
  setTimeout(() => {
    document.getElementById('recruiter-close-btn')?.focus();
  }, 60);
}

export function closeRecruiter() {
  const modal = document.getElementById('recruiter-modal') as HTMLDialogElement | null;
  if (!modal || !modal.open) return;

  document.documentElement.classList.remove('drawer-locked');
  document.body.classList.remove('drawer-locked');

  if (typeof (window as any).lenis?.start === 'function') {
    (window as any).lenis.start();
  }

  if (typeof modal.close === 'function') {
    modal.close();
  } else {
    modal.removeAttribute('open');
  }

  if (lastActiveEl) {
    lastActiveEl.focus();
  }
}

// Auto-init
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRecruiter);
  } else {
    initRecruiter();
  }
}
