// Shared click sounds for the NAÜ site: a soft pop everywhere, a sparkle on CTAs.
(function () {
  if (window.__nqUiSound) return;
  let ac = null;
  function ctx() {
    if (ac) { if (ac.state === 'suspended') ac.resume(); return ac; }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ac = new AC();
    return ac;
  }
  function pop() {
    const c = ctx(); if (!c) return;
    const t = c.currentTime;
    const o = c.createOscillator(); o.type = 'sine';
    o.frequency.setValueAtTime(300, t);
    o.frequency.exponentialRampToValueAtTime(680, t + 0.055);
    const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 1900;
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.07, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.15);
    o.connect(lp); lp.connect(g); g.connect(c.destination);
    o.start(t); o.stop(t + 0.17);
  }
  function shimmer() {
    const c = ctx(); if (!c) return;
    const t0 = c.currentTime;
    const steps = [0, 4, 7, 12, 16, 19];
    steps.forEach((semi, i) => {
      const t = t0 + i * 0.045;
      const f = 523.25 * Math.pow(2, semi / 12);
      const o = c.createOscillator(); o.type = 'sine'; o.frequency.value = f;
      const o2 = c.createOscillator(); o2.type = 'sine'; o2.frequency.value = f * 4.01;
      const g2 = c.createGain(); g2.gain.value = 0.22;
      const g = c.createGain();
      const dur = 0.5 + Math.random() * 0.5;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.045, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      const pan = c.createStereoPanner(); pan.pan.value = (i / steps.length) * 1.2 - 0.6;
      o.connect(g); o2.connect(g2); g2.connect(g); g.connect(pan); pan.connect(c.destination);
      o.start(t); o.stop(t + dur + 0.05);
      o2.start(t); o2.stop(t + dur + 0.05);
    });
  }
  document.addEventListener('click', function (e) {
    if (window.__nqSoundOn === false) return;
    const el = e.target && e.target.closest ? e.target.closest('a,button,[data-sound]') : null;
    const kind = el && el.getAttribute('data-sound');
    if (kind === 'shimmer' || (el && el.tagName === 'A' && (el.getAttribute('href') || '').indexOf('BuildYourOwn') > -1)) shimmer();
    else pop();
  }, true);
  window.__nqUiSound = { pop: pop, shimmer: shimmer };
})();
