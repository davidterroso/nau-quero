export function initDotCursor() {
  if (window.matchMedia && window.matchMedia('(hover: none)').matches) return () => {};
  if (window.__nqDot) return window.__nqDot.destroy;
  if (!document.getElementById('nq-dot-kf')) {
    const st = document.createElement('style');
    st.id = 'nq-dot-kf';
    st.textContent = '@keyframes nqTwinkle { 0%,100% { transform:rotate(0deg) scale(1); } 50% { transform:rotate(14deg) scale(0.9); } }';
    document.head.appendChild(st);
  }
  const dot = document.createElement('div');
  dot.style.cssText = 'position:fixed; left:0; top:0; width:20px; height:20px; margin:-10px 0 0 -10px; pointer-events:none; z-index:2147483647; opacity:0; transition:opacity .25s ease, width .2s ease, height .2s ease, margin .2s ease; filter:drop-shadow(0 0 1px #F3E9D2) drop-shadow(0 0 1px #F3E9D2);';
  const star = document.createElement('div');
  star.style.cssText = 'width:100%; height:100%; background:#4B2E2A; animation:nqTwinkle 1.1s ease-in-out infinite; clip-path:polygon(50% 0%,57% 43%,100% 50%,57% 57%,50% 100%,43% 57%,0% 50%,43% 43%);';
  dot.appendChild(star);
  document.body.appendChild(dot);
  let x = 0, y = 0, cx = 0, cy = 0, raf = null, alive = true;
  const move = (e) => {
    x = e.clientX; y = e.clientY;
    dot.style.opacity = '1';
    const t = e.target;
    const hot = t && t.closest && t.closest('a,button,input,textarea,[role="button"]');
    dot.style.width = hot ? '30px' : '20px';
    dot.style.height = hot ? '30px' : '20px';
    dot.style.margin = hot ? '-15px 0 0 -15px' : '-10px 0 0 -10px';
  };
  const leave = () => { dot.style.opacity = '0'; };
  const loop = () => {
    if (!alive) return;
    cx += (x - cx) * 0.2; cy += (y - cy) * 0.2;
    dot.style.transform = 'translate(' + cx + 'px,' + cy + 'px)';
    raf = requestAnimationFrame(loop);
  };
  window.addEventListener('pointermove', move, { passive: true });
  document.addEventListener('mouseleave', leave);
  raf = requestAnimationFrame(loop);
  const destroy = () => {
    alive = false;
    if (raf) cancelAnimationFrame(raf);
    window.removeEventListener('pointermove', move);
    document.removeEventListener('mouseleave', leave);
    dot.remove();
    window.__nqDot = null;
  };
  window.__nqDot = { destroy };
  return destroy;
}
