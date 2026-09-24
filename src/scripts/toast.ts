// src/scripts/toast.ts
// Accessible, tactile toast notification system with Emil Kowalski motion curves

let toastTimeout: number | undefined;

export function showToast(message: string, actionText?: string, onAction?: () => void) {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.setAttribute('role', 'status');
    toastContainer.setAttribute('aria-live', 'polite');
    document.body.appendChild(toastContainer);
  }

  // Clear existing timer
  if (toastTimeout) {
    window.clearTimeout(toastTimeout);
  }

  toastContainer.innerHTML = `
    <div class="toast-bubble" id="toast-bubble">
      <span class="toast-message">${message}</span>
      ${actionText ? `<button type="button" class="toast-action" id="toast-action-btn">${actionText}</button>` : ''}
    </div>
  `;

  const bubble = document.getElementById('toast-bubble');
  const actionBtn = document.getElementById('toast-action-btn');

  if (actionBtn && onAction) {
    actionBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      onAction();
      dismissToast();
    });
  }

  // Auto-dismiss after 2.6 seconds
  toastTimeout = window.setTimeout(dismissToast, 2600);

  // Click to dismiss
  bubble?.addEventListener('click', dismissToast);
}

export function dismissToast() {
  const bubble = document.getElementById('toast-bubble');
  if (bubble) {
    bubble.classList.add('toast-exit');
    setTimeout(() => {
      const container = document.getElementById('toast-container');
      if (container) container.innerHTML = '';
    }, 200);
  }
}

// -------------------------------------------------------------
// 1-Click Email Copy Interceptor
// -------------------------------------------------------------

export function initEmailCopy() {
  const mailLinks = document.querySelectorAll<HTMLAnchorElement>('a[href^="mailto:"]');

  mailLinks.forEach((link) => {
    link.addEventListener('click', async (e) => {
      e.preventDefault();
      const mailtoUrl = link.href;
      const email = mailtoUrl.replace('mailto:', '').split('?')[0];

      try {
        await navigator.clipboard.writeText(email);
        showToast(`Copied ${email} to clipboard! 📋`, 'Open Mail', () => {
          window.location.href = mailtoUrl;
        });
      } catch (err) {
        // Fallback to normal mail client opening if clipboard API is restricted
        window.location.href = mailtoUrl;
      }
    });
  });
}

// Auto-initialize email interceptor
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEmailCopy);
  } else {
    initEmailCopy();
  }
}
