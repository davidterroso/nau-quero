// NAU QUERO splash: interactive gelato swirl + generative sound.
const SAND = '#690A20';
const COLORS = ['#E85D6B', '#ACC048', '#FFA6A5', '#F3E9D2'];

export function initSwirl(host) {
  // only ever one swirl (and one audio graph) alive per page
  if (window.__nqSwirl) { try { window.__nqSwirl.destroy(); } catch (e) {} window.__nqSwirl = null; }
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute; inset:0; width:100%; height:100%; display:block;';
  host.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
  function resize() {
    const r = host.getBoundingClientRect();
    w = Math.max(r.width, 1); h = Math.max(r.height, 1);
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  const ro = new ResizeObserver(resize); ro.observe(host);

  const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, active: false };
  let spin = 0, speed = 0.16, energy = 0, lastMove = 0;
  const blobs = [];


  // ---------- sound ----------
  let ac = null, master = null, soundOn = false, droneNodes = [], loopTimer = null;
  const SCALE = [0, 3, 5, 7, 10, 12, 15];
  function ensureCtx() {
    if (ac) return ac;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ac = new AC();
    master = ac.createGain(); master.gain.value = 0; master.connect(ac.destination);
    const conv = ac.createBiquadFilter(); conv.type = 'lowpass'; conv.frequency.value = 780; conv.Q.value = 0.3;
    conv.connect(master); master._bus = conv;
    return ac;
  }
  // shimmer: airy pad + irregular glass sparkles
  const SPARK = [24, 26, 28, 31, 33, 36, 38, 40, 43, 45, 48];
  function sparkle() {
    const t = ac.currentTime;
    const semi = SPARK[(Math.random() * SPARK.length) | 0];
    const f = 98.0 * Math.pow(2, semi / 12);
    const o = ac.createOscillator(); o.type = 'sine'; o.frequency.value = f;
    const o2 = ac.createOscillator(); o2.type = 'sine'; o2.frequency.value = f * 2.01;
    const dur = 1.6 + Math.random() * 2.2;
    const g = ac.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.026 + Math.random() * 0.014, t + 0.35);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    const g2 = ac.createGain(); g2.gain.value = 0.035;
    const pan = ac.createStereoPanner(); pan.pan.value = Math.random() * 1.6 - 0.8;
    o.connect(g); o2.connect(g2); g2.connect(g); g.connect(pan); pan.connect(master._bus);
    o.start(t); o2.start(t); o.stop(t + dur + 0.05); o2.stop(t + dur + 0.05);
  }
  function startDrone() {
    const bus = master._bus;
    // airy pad, slow breathing
    [164.81, 246.94, 293.66, 369.99].forEach((f, i) => {
      const o = ac.createOscillator(); o.type = 'sine'; o.frequency.value = f;
      const g = ac.createGain(); g.gain.value = 0.014 + i * 0.004;
      const lfo = ac.createOscillator(); lfo.frequency.value = 0.04 + i * 0.017;
      const lg = ac.createGain(); lg.gain.value = 0.9 + i * 0.4;
      lfo.connect(lg); lg.connect(o.frequency); lfo.start();
      const amp = ac.createOscillator(); amp.frequency.value = 0.07 + i * 0.03;
      const ag = ac.createGain(); ag.gain.value = 0.008;
      amp.connect(ag); ag.connect(g.gain); amp.start();
      o.connect(g); g.connect(bus); o.start();
      droneNodes.push(o, lfo, amp);
    });
    const tick = () => {
      if (!ac) return;
      if (soundOn) sparkle();
      loopTimer = setTimeout(tick, 260 + Math.random() * 620);
    };
    loopTimer = setTimeout(tick, 200);
  }
  function note(semi, gainAmt, type, dur) {
    if (!soundOn || !ac) return;
    const t = ac.currentTime;
    const o = ac.createOscillator(); o.type = type || 'sine';
    o.frequency.value = 220 * Math.pow(2, semi / 12);
    const g = ac.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(gainAmt, t + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, t + (dur || 1.1));
    o.connect(g); g.connect(master._bus); o.start(t); o.stop(t + (dur || 1.1) + 0.05);
  }
  function setSound(on) {
    soundOn = on;
    if (!on) { if (master && ac) master.gain.linearRampToValueAtTime(0, ac.currentTime + 0.3); return; }
    if (!ensureCtx()) { soundOn = false; return; }
    if (ac.state === 'suspended') ac.resume();
    if (!loopTimer) startDrone();
    master.gain.linearRampToValueAtTime(0.32, ac.currentTime + 0.6);
  }

  function killAudio() {
    soundOn = false;
    if (loopTimer) { clearTimeout(loopTimer); loopTimer = null; }
    droneNodes.forEach(n => { try { n.stop(); } catch (e) {} });
    droneNodes.length = 0;
    if (ac) {
      try { master.gain.cancelScheduledValues(ac.currentTime); master.gain.value = 0; } catch (e) {}
      const c = ac; ac = null;
      setTimeout(() => { try { c.close(); } catch (e) {} }, 60);
    }
  }
  window.addEventListener('pagehide', killAudio);
  document.addEventListener('visibilitychange', () => {
    if (!ac) return;
    if (document.hidden) { try { ac.suspend(); } catch (e) {} }
    else if (soundOn) { try { ac.resume(); } catch (e) {} }
  });
  // rAF stops in hidden/detached frames — if no frame arrives, the page is not on screen
  let lastFrame = performance.now();
  const watchdog = setInterval(() => {
    if (!ac) return;
    const stale = performance.now() - lastFrame > 600;
    if (stale && ac.state === 'running') { try { ac.suspend(); } catch (e) {} }
    else if (!stale && soundOn && ac.state === 'suspended') { try { ac.resume(); } catch (e) {} }
  }, 400);

  // ---------- render ----------
  let raf = 0, prev = performance.now(), dive = -1, diveDone = null, flow = 0, breath = 0;
  function frame(now) {
    const dt = Math.min((now - prev) / 1000, 0.05); prev = now; lastFrame = now;
    if (dive >= 0) {
      dive += dt / 1.7;
      if (dive >= 1 && diveDone) { const cb = diveDone; diveDone = null; cb(); }
    }
    const dv = dive < 0 ? 0 : Math.min(dive, 1);
    const ease = dv * dv;
    spin += (speed + ease * 9) * dt;
    flow = (flow + dt * (0.11 + ease * 1.2)) % 1;
    breath += dt / 22;

    ctx.fillStyle = SAND; ctx.fillRect(0, 0, w, h);

    const cx = w * 0.5;
    const cy = h * 0.5;
    const swell = 0.8 + 0.32 * (0.5 - 0.5 * Math.cos(breath * Math.PI * 2));
    const baseR = Math.min(w, h * 1.15) * 0.3 * swell;
    const maxR = baseR * (1 + ease * 6);
    const arms = 9, turns = 2.1 + energy * 0.5;

    ctx.lineCap = 'round';
    for (let a = 0; a < arms; a++) {
      const col = COLORS[a % COLORS.length];
      const off = (a / arms) * Math.PI * 2 + spin;
      // each ribbon grows out from the centre, staggered, then starts again
      const grow = ((a / arms) + flow) % 1;
      const reach = 0.12 + Math.pow(grow, 0.7) * 0.88;
      ctx.beginPath();
      const steps = 90;
      for (let s = 0; s <= steps; s++) {
        const t = (s / steps) * reach;
        const r = Math.pow(t, 0.82) * maxR;
        const wob = Math.sin(t * 7 + spin * 1.5 + a) * (0.06 + energy * 0.1);
        const th = off + t * turns * Math.PI * 2 + wob;
        const x = cx + Math.cos(th) * r, y = cy + Math.sin(th) * r * 0.94;
        if (s === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = col;
      ctx.globalAlpha = 0.9 * Math.min(1, (1 - grow) * 4.5);
      ctx.lineWidth = maxR * (0.1 + energy * 0.04);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // sand ground: the swirl stays a centred medallion
    const vg = ctx.createRadialGradient(cx, cy, maxR * (0.78 + ease * 0.5), cx, cy, maxR * (1.12 + ease * 1.4));
    vg.addColorStop(0, 'rgba(105,10,32,0)');
    vg.addColorStop(0.55, 'rgba(105,10,32,' + (0.85 * (1 - dv)) + ')');
    vg.addColorStop(1, 'rgba(105,10,32,' + (1 - dv) + ')');
    ctx.fillStyle = vg; ctx.fillRect(0, 0, w, h);

    if (dv > 0) drawTunnel(cx, cy, dv);

    const gl = ctx.createRadialGradient(cx, cy, 0, cx, cy, baseR * 0.3);
    gl.addColorStop(0, 'rgba(105,10,32,' + (0.9 * (1 - dv)) + ')');
    gl.addColorStop(1, 'rgba(105,10,32,0)');
    ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(cx, cy, baseR * 0.3, 0, Math.PI * 2); ctx.fill();

    for (let i = blobs.length - 1; i >= 0; i--) {
      const b = blobs[i];
      b.r += (Math.max(w, h) * 0.5 - b.r) * 0.06;
      b.life -= dt * 0.55;
      if (b.life <= 0) { blobs.splice(i, 1); continue; }
      ctx.globalAlpha = b.life * 0.35;
      ctx.strokeStyle = b.c; ctx.lineWidth = 3 + (1 - b.life) * 10;
      ctx.beginPath(); ctx.arc(b.x * w, b.y * h, b.r, 0, Math.PI * 2); ctx.stroke();
    }
    ctx.globalAlpha = 1;

    raf = requestAnimationFrame(frame);
  }
  raf = requestAnimationFrame(frame);

  function drawTunnel(cx, cy, dv) {
    const R = Math.hypot(w, h) * (0.62 + dv * 0.5);
    const rings = 16;
    ctx.lineCap = 'butt';
    for (let k = 0; k < rings; k++) {
      const u = ((k / rings) + dv * 2.4) % 1;
      const r = R * Math.pow(u, 2.6);
      if (r < 2) continue;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = COLORS[k % COLORS.length];
      ctx.globalAlpha = Math.min(1, dv * 1.6) * (1 - Math.pow(u, 3)) * 0.95;
      ctx.lineWidth = Math.max(2, r * 0.22);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    ctx.lineCap = 'round';
  }

  const api = {
    setSound,
    dive(onDone) {
      if (dive >= 0) return;
      dive = 0; diveDone = onDone;
      if (soundOn && ac) {
        const t = ac.currentTime;
        const bus = master._bus;
        // open the bus so the tunnel can be felt
        bus.frequency.cancelScheduledValues(t);
        bus.frequency.setValueAtTime(1500, t);
        bus.frequency.linearRampToValueAtTime(3200, t + 0.9);

        // --- tunnel: filtered noise rushing past ---
        const len = Math.floor(ac.sampleRate * 3);
        const buf = ac.createBuffer(1, len, ac.sampleRate);
        const d = buf.getChannelData(0);
        let last = 0;
        for (let i = 0; i < len; i++) { last = (last * 0.86) + (Math.random() * 2 - 1) * 0.14; d[i] = last; }
        const src = ac.createBufferSource(); src.buffer = buf;
        const bp = ac.createBiquadFilter(); bp.type = 'bandpass'; bp.Q.value = 3.2;
        bp.frequency.setValueAtTime(140, t);
        bp.frequency.exponentialRampToValueAtTime(1400, t + 0.75);
        bp.frequency.exponentialRampToValueAtTime(280, t + 1.7);
        const wg = ac.createGain();
        wg.gain.setValueAtTime(0.0001, t);
        wg.gain.exponentialRampToValueAtTime(0.5, t + 0.7);
        wg.gain.exponentialRampToValueAtTime(0.1, t + 1.25);
        wg.gain.exponentialRampToValueAtTime(0.0001, t + 2.2);
        src.connect(bp); bp.connect(wg); wg.connect(master);
        src.start(t); src.stop(t + 3);

        // --- low pressure drop, doppler-style ---
        const sub = ac.createOscillator(); sub.type = 'sine';
        sub.frequency.setValueAtTime(70, t);
        sub.frequency.exponentialRampToValueAtTime(150, t + 0.7);
        sub.frequency.exponentialRampToValueAtTime(34, t + 1.6);
        const sg = ac.createGain();
        sg.gain.setValueAtTime(0.0001, t);
        sg.gain.exponentialRampToValueAtTime(0.28, t + 0.55);
        sg.gain.exponentialRampToValueAtTime(0.0001, t + 1.6);
        sub.connect(sg); sg.connect(master);
        sub.start(t); sub.stop(t + 1.7);

        // --- disintegration: the whole bed comes apart ---
        droneNodes.forEach((n, i) => {
          if (!n.frequency) return;
          const f = n.frequency.value;
          try {
            n.frequency.cancelScheduledValues(t + 0.6);
            n.frequency.setValueAtTime(f, t + 0.6);
            n.frequency.exponentialRampToValueAtTime(Math.max(12, f * (0.28 + i * 0.05)), t + 1.65);
          } catch (e) {}
        });
        bus.frequency.linearRampToValueAtTime(3200, t + 0.95);
        bus.frequency.exponentialRampToValueAtTime(160, t + 2.4);
        master.gain.cancelScheduledValues(t + 0.7);
        master.gain.setValueAtTime(0.32, t + 0.7);
        master.gain.linearRampToValueAtTime(0.22, t + 1.15);
        master.gain.linearRampToValueAtTime(0.12, t + 1.75);
        master.gain.linearRampToValueAtTime(0, t + 2.55);
        // stray glints falling away as it collapses
        for (let i = 0; i < 4; i++) setTimeout(() => { if (ac) sparkle(); }, 700 + i * 200);
        if (loopTimer) { clearTimeout(loopTimer); loopTimer = null; }
      }
    },
    destroy() {
      cancelAnimationFrame(raf); ro.disconnect(); clearInterval(watchdog);
      killAudio();
      canvas.remove();
      if (window.__nqSwirl === api) window.__nqSwirl = null;
    },
  };
  window.__nqSwirl = api;
  return api;
}
