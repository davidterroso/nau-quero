// Shared custom cursor for NAU QUERO pages. Plain JS, no exports beyond initCursor.
export function initCursor(root) {
  root = root || document;
  if (typeof window === 'undefined') return () => {};
  const supportsHover = !window.matchMedia || window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!supportsHover) {
    document.body.style.cursor = 'auto';
    document.querySelectorAll('[style*="cursor:none"]').forEach((el) => { el.style.cursor = 'auto'; });
    return () => {};
  }
  const label = document.createElement('div');
  const star = document.createElement('div');
  star.textContent = '✦';
  Object.assign(star.style, {
    position: 'fixed', left: '0', top: '0', pointerEvents: 'none', zIndex: 999999,
    fontSize: '26px', color: '#E85D6B', transform: 'translate(-50%,-50%) rotate(0deg) scale(1)',
    transition: 'transform .25s cubic-bezier(.2,.8,.2,1), font-size .25s ease',
    textShadow: '0 1px 3px rgba(57,29,1,0.35)',
  });
  Object.assign(label.style, {
    position: 'fixed', left: '0', top: '0', pointerEvents: 'none', zIndex: 999999,
    fontFamily: 'DM Sans, sans-serif', fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase',
    color: '#391D01', background: '#E85D6B', padding: '6px 12px', borderRadius: '999px',
    transform: 'translate(-50%, 22px)', opacity: '0', transition: 'opacity .18s ease, transform .18s ease',
    whiteSpace: 'nowrap',
  });
  document.body.appendChild(star);
  document.body.appendChild(label);
  document.body.style.cursor = 'none';
  let raf = null, mx = 0, my = 0, hovering = false, angle = 0, spinRaf = null;
  const trail = [];
  const TRAIL_LEN = 6;
  for (let i = 0; i < TRAIL_LEN; i++) {
    const t = document.createElement('div');
    t.textContent = '✦';
    Object.assign(t.style, {
      position: 'fixed', left: '0', top: '0', pointerEvents: 'none', zIndex: 999998,
      fontSize: (10 - i) + 'px', color: '#E85D6B', opacity: String(0.32 - i * 0.045),
      transform: 'translate(-50%,-50%)', transition: 'opacity .3s ease',
    });
    document.body.appendChild(t);
    trail.push({ el: t, x: mx, y: my });
  }
  function spin() {
    angle = (angle + (hovering ? 0 : 0.6)) % 360;
    star.style.transform = hovering
      ? 'translate(-50%,-50%) rotate(90deg) scale(1)'
      : `translate(-50%,-50%) rotate(${angle}deg) scale(1)`;
    spinRaf = requestAnimationFrame(spin);
  }
  spinRaf = requestAnimationFrame(spin);
  function move(e) {
    mx = e.clientX; my = e.clientY;
    if (raf) return;
    raf = requestAnimationFrame(() => {
      star.style.left = mx + 'px'; star.style.top = my + 'px';
      label.style.left = mx + 'px'; label.style.top = my + 'px';
      let px = mx, py = my;
      trail.forEach((t) => {
        const cx = parseFloat(t.el.style.left) || px, cy = parseFloat(t.el.style.top) || py;
        const nx = cx + (px - cx) * 0.5, ny = cy + (py - cy) * 0.5;
        t.el.style.left = nx + 'px'; t.el.style.top = ny + 'px';
        px = nx; py = ny;
      });
      raf = null;
    });
  }
  function over(e) {
    const el = e.target.closest && e.target.closest('[data-cursor]');
    if (!el) return;
    hovering = true;
    const txt = el.getAttribute('data-cursor');
    star.style.fontSize = '38px';
    if (txt) { label.textContent = txt; label.style.opacity = '1'; }
  }
  function out(e) {
    const el = e.target.closest && e.target.closest('[data-cursor]');
    if (!el) return;
    hovering = false;
    star.style.fontSize = '26px';
    label.style.opacity = '0';
  }
  function playPop() {
    if (window.__nqSoundOn === false) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.12, now + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.18);
    } catch (e) {}
  }
  function burst(e) {
    for (let i = 0; i < 8; i++) {
      const p = document.createElement('div');
      p.textContent = '✦';
      const a = (Math.PI * 2 * i) / 8;
      Object.assign(p.style, {
        position: 'fixed', left: e.clientX + 'px', top: e.clientY + 'px', pointerEvents: 'none', zIndex: 999999,
        fontSize: '12px', color: i % 2 ? '#E85D6B' : '#ACC048', transform: 'translate(-50%,-50%)',
        transition: 'transform .5s cubic-bezier(.2,.8,.2,1), opacity .5s ease', opacity: '1',
      });
      document.body.appendChild(p);
      requestAnimationFrame(() => {
        const dist = 34 + Math.random() * 18;
        p.style.transform = `translate(-50%,-50%) translate(${Math.cos(a) * dist}px, ${Math.sin(a) * dist}px) rotate(120deg)`;
        p.style.opacity = '0';
      });
      setTimeout(() => p.remove(), 550);
    }
    star.style.transform += ' scale(0.8)';
    setTimeout(() => { star.style.fontSize = hovering ? '38px' : '26px'; }, 120);
  }
  document.addEventListener('mousemove', move);
  document.addEventListener('mouseover', over);
  document.addEventListener('mouseout', out);
  document.addEventListener('click', burst);
  return function destroy() {
    document.removeEventListener('mousemove', move);
    document.removeEventListener('mouseover', over);
    document.removeEventListener('mouseout', out);
    document.removeEventListener('click', burst);
    if (spinRaf) cancelAnimationFrame(spinRaf);
    star.remove(); label.remove();
    trail.forEach((t) => t.el.remove());
    document.body.style.cursor = '';
  };
}

export function goTo(href) {
  const overlay = document.createElement('div');
  Object.assign(overlay.style, {
    position: 'fixed', inset: '0', background: '#690A20', zIndex: 9999999,
    opacity: '0', transition: 'opacity .42s cubic-bezier(.4,0,.2,1)', pointerEvents: 'none',
  });
  document.body.appendChild(overlay);
  requestAnimationFrame(() => { overlay.style.opacity = '1'; });
  setTimeout(() => { window.location.href = href; }, 440);
}
