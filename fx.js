// Shared interaction layer for NAU QUERO pages: word-by-word reveal, pointer tilt,
// animated counters, page-in curtain and a global sound toggle.
// Attribute driven so templates stay plain markup:
//   data-words              -> reveal text word by word when scrolled into view
//   data-tilt               -> element reacts to the pointer (parallax tilt)
//   data-tilt="8"           -> custom max degrees
//   data-count="13"         -> animated counter (optional data-count-suffix)

const SOUND_KEY = 'nq-sound';

export function soundOn() {
  try {
    const v = localStorage.getItem(SOUND_KEY);
    return v === null ? true : v === '1';
  } catch (e) { return true; }
}
export function setSound(on) {
  try { localStorage.setItem(SOUND_KEY, on ? '1' : '0'); } catch (e) {}
  window.__nqSoundOn = on;
  document.querySelectorAll('[data-nq-sound-label]').forEach(el => { el.textContent = on ? 'ON' : 'OFF'; });
}

const REDUCED = typeof window !== 'undefined' && window.matchMedia
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initFx(opts) {
  opts = opts || {};
  if (typeof window === 'undefined') return { refresh() {}, destroy() {} };
  window.__nqSoundOn = soundOn();

  const cleanups = [];

  // ---- page-in curtain -------------------------------------------------
  if (opts.pageBg && !REDUCED) {
    const curtain = document.createElement('div');
    Object.assign(curtain.style, {
      position: 'fixed', inset: '0', background: opts.pageBg, zIndex: '9999998',
      pointerEvents: 'none', opacity: '1', transition: 'opacity .7s cubic-bezier(.4,0,.2,1)',
    });
    document.body.appendChild(curtain);
    requestAnimationFrame(() => { curtain.style.opacity = '0'; });
    setTimeout(() => curtain.remove(), 900);
  }

  // ---- sound toggle ----------------------------------------------------
  if (opts.soundToggle !== false) {
    const pill = document.createElement('button');
    pill.type = 'button';
    pill.setAttribute('data-cursor', 'som');
    pill.innerHTML = '<span style="letter-spacing:0.14em">SOM</span> <span data-nq-sound-label style="opacity:.7">'
      + (window.__nqSoundOn ? 'ON' : 'OFF') + '</span>';
    Object.assign(pill.style, {
      position: 'fixed', left: '20px', bottom: '20px', zIndex: '9999',
      display: 'flex', gap: '8px', alignItems: 'center',
      fontFamily: 'DM Sans, sans-serif', fontSize: '10.5px', textTransform: 'uppercase',
      color: opts.soundFg || '#391D01', background: opts.soundBg || 'rgba(243,233,210,0.82)',
      border: '1px solid ' + (opts.soundBorder || 'rgba(57,29,1,0.2)'),
      borderRadius: '999px', padding: '9px 15px', cursor: 'none',
      backdropFilter: 'blur(6px)', transition: 'opacity .25s ease',
    });
    pill.addEventListener('click', (e) => { e.stopPropagation(); setSound(!window.__nqSoundOn); });
    document.body.appendChild(pill);
    cleanups.push(() => pill.remove());
  }

  // ---- word reveal -----------------------------------------------------
  const wordIO = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      revealWords(en.target);
      wordIO.unobserve(en.target);
    });
  }, { threshold: 0.2 });

  function splitWords(el) {
    if (el.querySelector('[data-fxw]')) return true;
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    if (!nodes.length) return false;
    let i = 0;
    nodes.forEach(node => {
      const parts = node.nodeValue.split(/(\s+)/);
      const frag = document.createDocumentFragment();
      parts.forEach(part => {
        if (!part) return;
        if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
        const s = document.createElement('span');
        s.setAttribute('data-fxw', String(i));
        s.textContent = part;
        s.style.display = 'inline-block';
        s.style.opacity = '0';
        s.style.transform = 'translateY(0.5em)';
        s.style.transition = 'opacity .55s ease ' + (i * 0.045).toFixed(2) + 's, transform .65s cubic-bezier(.2,.8,.2,1) ' + (i * 0.045).toFixed(2) + 's';
        i++;
        frag.appendChild(s);
      });
      node.parentNode.replaceChild(frag, node);
    });
    return true;
  }
  function revealWords(el) {
    el.querySelectorAll('[data-fxw]').forEach(s => { s.style.opacity = '1'; s.style.transform = 'none'; });
    el.dataset.fxRevealed = '1';
  }

  // ---- counters --------------------------------------------------------
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target;
      countIO.unobserve(el);
      const target = parseFloat(el.getAttribute('data-count')) || 0;
      const suffix = el.getAttribute('data-count-suffix') || '';
      const dur = 1100;
      const t0 = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = target % 1 ? (target * eased).toFixed(1) : Math.round(target * eased);
        el.textContent = val + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.4 });

  // ---- tilt ------------------------------------------------------------
  function bindTilt(el) {
    if (el.dataset.fxTilt === '1') return;
    el.dataset.fxTilt = '1';
    const max = parseFloat(el.getAttribute('data-tilt')) || 7;
    const lift = parseFloat(el.getAttribute('data-tilt-lift'));
    const dy = isNaN(lift) ? 6 : lift;
    let raf = null;
    const move = (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = 'perspective(1000px) rotateX(' + (-py * max).toFixed(2) + 'deg) rotateY('
          + (px * max).toFixed(2) + 'deg) translateY(-' + dy + 'px)';
        raf = null;
      });
    };
    const leave = () => { el.style.transform = ''; };
    el.style.willChange = 'transform';
    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', leave);
    cleanups.push(() => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', leave); });
  }

  function refresh() {
    document.querySelectorAll('[data-count]').forEach(el => {
      if (el.dataset.fxCount === '1') return;
      const raw = el.getAttribute('data-count');
      if (!raw || isNaN(parseFloat(raw))) return;
      el.dataset.fxCount = '1';
      countIO.observe(el);
    });
    document.querySelectorAll('[data-words]').forEach(el => {
      const had = el.dataset.fxRevealed === '1';
      if (!splitWords(el)) return;
      if (had) revealWords(el);
      else if (REDUCED) revealWords(el);
      else if (!el.dataset.fxObserved) { el.dataset.fxObserved = '1'; wordIO.observe(el); }
    });
    if (!REDUCED && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      document.querySelectorAll('[data-tilt]').forEach(bindTilt);
    }
  }

  // ---- keep up with the live DOM ---------------------------------------
  let busy = false;
  let pending = null;
  function safeRefresh() {
    if (busy) return;
    busy = true;
    try { refresh(); } finally { setTimeout(() => { busy = false; }, 0); }
  }
  function scheduleRefresh() {
    if (pending) return;
    pending = setTimeout(() => { pending = null; safeRefresh(); }, 120);
  }

  const mo = new MutationObserver((records) => {
    if (busy) return;
    const relevant = records.some(r => {
      if (r.type !== 'childList') return true;
      const added = Array.from(r.addedNodes);
      if (!added.length) return false;
      return added.some(n => !(n.nodeType === 1 && n.hasAttribute('data-fxw')));
    });
    if (relevant) scheduleRefresh();
  });
  mo.observe(document.body, { childList: true, subtree: true, characterData: true });
  cleanups.push(() => mo.disconnect());

  requestAnimationFrame(safeRefresh);
  [150, 400, 900, 1800].forEach(ms => {
    const t = setTimeout(safeRefresh, ms);
    cleanups.push(() => clearTimeout(t));
  });

  return {
    refresh: safeRefresh,
    destroy() {
      if (pending) clearTimeout(pending);
      wordIO.disconnect();
      countIO.disconnect();
      cleanups.forEach(fn => fn());
    },
  };
}
