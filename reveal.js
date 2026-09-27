const EASE = 'opacity .4s cubic-bezier(.2,.7,.2,1), transform .4s cubic-bezier(.2,.7,.2,1)';

function show(el) {
  if (el.dataset.revealed === '1') return;
  el.dataset.revealed = '1';
  el.style.transitionDelay = Math.min(parseInt(el.getAttribute('data-reveal-delay') || '0', 10), 120) + 'ms';
  el.style.opacity = '1';
  el.style.transform = 'none';
}

function scan() {
  const els = document.querySelectorAll('[data-reveal]');
  for (const el of els) {
    if (el.dataset.revealed === '1') continue;
    const r = el.getBoundingClientRect();
    const seen = r.top < window.innerHeight * 0.94 && r.bottom > -40;
    if (seen) {
      show(el);
    } else if (el.dataset.revealPrimed !== '1') {
      el.dataset.revealPrimed = '1';
      el.style.opacity = '0';
      el.style.transform = 'translateY(12px)';
      el.style.transition = EASE;
    }
  }
}

// Monotonic + fail-open: state lives on the elements, the driver is registered
// once per document, and nothing is ever hidden after being revealed.
export function initReveal() {
  if (!window.__nqReveal) {
    window.__nqReveal = true;
    scan();
    addEventListener('scroll', scan, { passive: true });
    addEventListener('resize', scan);
    setInterval(scan, 300);
    setTimeout(() => document.querySelectorAll('[data-reveal]').forEach(show), 3000);
  } else {
    scan();
  }
  return () => {};
}
