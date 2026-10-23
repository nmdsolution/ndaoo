import { useEffect, useRef } from 'react';

// Champ gravitationnel global posé derrière la page (z-index 0, pointer-events: none).
// - Grille « espace-temps » courbée par des masses : le curseur (trou noir visible)
//   et deux masses invisibles qui dérivent lentement.
// - Clic maintenu : le trou noir grossit ; relâché : onde gravitationnelle.
// - Les éléments interactifs proches sont attirés puis repoussés par l'onde.

const VERT = `#version 300 es
in vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `#version 300 es
precision highp float;
uniform vec2 uView;
uniform float uScale;
uniform float uTime;
uniform float uScroll;
uniform vec3 uHoles[3];
uniform float uCore[3];
uniform vec4 uWaves[4];
out vec4 outColor;

mat2 rot(float a) { float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

void main() {
  vec2 px = vec2(gl_FragCoord.x, uView.y * uScale - gl_FragCoord.y) / uScale;
  vec2 q = px;
  float field = 0.0, core = 0.0, ring = 0.0, glow = 0.0;

  for (int i = 0; i < 3; i++) {
    vec3 h = uHoles[i];
    if (h.z <= 0.001) continue;
    vec2 d = q - h.xy;
    float r = length(d);
    float R = 90.0 + 55.0 * h.z;
    // Tourbillon + pincement : la grille s'enroule et converge vers la masse
    d = rot(min(1.3 * h.z, 3.0) * exp(-r / R)) * d;
    q = h.xy + d * (1.0 + min(1.1 * h.z, 2.4) * exp(-r / R));
    field += h.z * 0.6 * exp(-r / R);

    if (uCore[i] > 0.5) {
      float rs = length(px - h.xy);
      float rc = 6.0 + 5.0 * h.z;
      core = max(core, smoothstep(rc + 1.0, rc - 1.0, rs));
      float flick = 0.8 + 0.2 * sin(atan(px.y - h.y, px.x - h.x) * 3.0 + uTime * 4.0);
      ring += exp(-pow((rs - rc * 1.45) / (rc * 0.32), 2.0)) * flick;
      glow += 0.35 * h.z * exp(-rs / (rc * 4.0));
    }
  }

  // Ondes gravitationnelles
  for (int i = 0; i < 4; i++) {
    vec4 w = uWaves[i];
    float age = uTime - w.z;
    if (w.w <= 0.0 || age < 0.0 || age > 2.5) continue;
    vec2 d = px - w.xy;
    float dd = max(length(d), 1.0);
    float x = dd - age * 750.0;
    float amp = w.w * exp(-age * 1.5);
    float env = exp(-x * x / 3500.0);
    q += d / dd * sin(x * 0.06) * env * amp * 28.0;
    field += amp * env * 1.5;
  }

  // Grille (défile en parallaxe avec la page)
  vec2 g = (q + vec2(0.0, uScroll * 0.5)) / 52.0;
  vec2 gd = abs(fract(g - 0.5) - 0.5);
  vec2 fw = fwidth(g);
  vec2 l = 1.0 - smoothstep(vec2(0.0), fw * 1.3, gd);
  // Là où la grille est trop comprimée, on l'efface au lieu de produire du moiré
  float dense = 1.0 - smoothstep(0.2, 0.55, max(fw.x, fw.y));
  float line = max(l.x, l.y) * dense;
  float node = l.x * l.y * dense;
  float f = clamp(field, 0.0, 1.0);

  // Un peu plus marqué qu'avant : le calque est derrière le contenu et passe sous des fonds semi-opaques
  float aGrid = line * (0.05 + 0.35 * f) + node * 0.4 * f;
  vec3 orange = vec3(1.0, 0.41, 0.0);
  vec3 pc = orange * aGrid;
  float a = aGrid;

  pc += vec3(1.0, 0.8, 0.55) * ring * 0.9;
  a += ring * 0.9;
  pc += orange * glow * 0.5;
  a += glow * 0.5;

  pc = pc * (1.0 - core) + vec3(0.02) * core;
  a = a * (1.0 - core) + core;
  a = clamp(a, 0.0, 1.0);
  outColor = vec4(min(pc, vec3(a)), a);
}
`;

const TARGETS = '.card, .phase__circle, .topics li, .marquee__track li, .btn, .testimonial__mark, .industry, .slider-controls button';

function compile(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
  return s;
}

export default function GravityField() {
  const ref = useRef(null);

  useEffect(() => {
    if (/jsdom/i.test(navigator.userAgent)) return undefined;
    const canvas = ref.current;
    const gl = canvas.getContext('webgl2', { premultipliedAlpha: true, antialias: false });
    if (!gl) return undefined;

    let prog;
    try {
      prog = gl.createProgram();
      gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
      gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog));
    } catch (err) {
      console.error(err);
      return undefined;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'aPos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = Object.fromEntries(
      ['uView', 'uScale', 'uTime', 'uScroll', 'uHoles', 'uCore', 'uWaves'].map((n) => [n, gl.getUniformLocation(prog, n)]),
    );

    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const touch = window.matchMedia?.('(hover: none)').matches;

    // Curseur = trou noir. mass suit target avec inertie.
    const cursor = { x: -999, y: -999, sx: -999, sy: -999, mass: 0, target: 0, holding: false, holdStart: 0, hover: false };
    const waves = [];
    let scale = 1;
    let raf;
    const t0 = performance.now();

    const resize = () => {
      scale = Math.min(window.devicePixelRatio || 1, 1.5) * 0.75;
      canvas.width = Math.round(window.innerWidth * scale);
      canvas.height = Math.round(window.innerHeight * scale);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    // Éléments attirés : ressort amorti vers une cible calculée depuis le curseur
    let bodies = [];
    const collect = () => {
      const prev = new Map(bodies.map((b) => [b.el, b]));
      bodies = [...document.querySelectorAll(TARGETS)]
        .filter((el) => !el.closest('.hero__animation'))
        .map((el) => prev.get(el) || { el, ox: 0, oy: 0, vx: 0, vy: 0 });
    };

    const shock = (x, y, strength) => {
      waves.push({ x, y, t: (performance.now() - t0) / 1000, s: strength });
      if (waves.length > 4) waves.shift();
      if (reduce) return;
      for (const b of bodies) {
        const r = b.el.getBoundingClientRect();
        const dx = r.left + r.width / 2 - x;
        const dy = r.top + r.height / 2 - y;
        const d = Math.hypot(dx, dy) || 1;
        if (d > 700) continue;
        const k = strength * 26 * (1 - d / 700);
        b.vx += (dx / d) * k;
        b.vy += (dy / d) * k;
      }
    };

    const onMove = (e) => {
      cursor.x = e.clientX;
      cursor.y = e.clientY;
      if (cursor.sx < -900) { cursor.sx = cursor.x; cursor.sy = cursor.y; }
      cursor.hover = !!e.target.closest?.('a, button, input, textarea, .card, .industry');
    };
    const onLeave = () => { cursor.x = cursor.y = -999; };
    const onDown = (e) => {
      if (touch) { shock(e.clientX, e.clientY, 1); return; }
      cursor.holding = true;
      cursor.holdStart = performance.now();
    };
    const onUp = () => {
      if (!cursor.holding) return;
      cursor.holding = false;
      shock(cursor.sx, cursor.sy, Math.min(0.5 + cursor.mass / 2.5, 1.6));
    };

    const frame = (now) => {
      raf = requestAnimationFrame(frame);
      const time = (now - t0) / 1000;
      const anim = reduce ? 0 : time;

      const inside = cursor.x > -900 && !touch;
      const held = cursor.holding ? Math.min((now - cursor.holdStart) / 1500, 1) : 0;
      cursor.target = inside ? 1 + (cursor.hover ? 0.5 : 0) + held * 2.5 : 0;
      cursor.mass += (cursor.target - cursor.mass) * 0.08;
      cursor.sx += (cursor.x - cursor.sx) * 0.18;
      cursor.sy += (cursor.y - cursor.sy) * 0.18;

      const w = window.innerWidth;
      const h = window.innerHeight;
      const holes = [
        cursor.sx, cursor.sy, cursor.mass,
        w * (0.5 + 0.42 * Math.sin(anim * 0.11)), h * (0.5 + 0.38 * Math.sin(anim * 0.17 + 1)), 0.9,
        w * (0.5 + 0.4 * Math.cos(anim * 0.08 + 2)), h * (0.5 + 0.4 * Math.sin(anim * 0.13 + 4)), 0.7,
      ];

      const wv = new Float32Array(16);
      waves.forEach((v, i) => wv.set([v.x, v.y, v.t, v.s], i * 4));

      gl.uniform2f(u.uView, w, h);
      gl.uniform1f(u.uScale, scale);
      gl.uniform1f(u.uTime, time);
      gl.uniform1f(u.uScroll, window.scrollY);
      gl.uniform3fv(u.uHoles, holes);
      gl.uniform1fv(u.uCore, [1, 0, 0]);
      gl.uniform4fv(u.uWaves, wv);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      if (reduce || touch) return;
      const m = cursor.mass;
      // Toutes les lectures de position d'abord, puis toutes les écritures (pas de reflow en boucle)
      const rects = m > 0.05 ? bodies.map((b) => b.el.getBoundingClientRect()) : null;
      bodies.forEach((b, i) => {
        let tx = 0;
        let ty = 0;
        if (rects) {
          const r = rects[i];
          if (r.bottom > -100 && r.top < h + 100) {
            const dx = cursor.sx - (r.left + r.width / 2 - b.ox);
            const dy = cursor.sy - (r.top + r.height / 2 - b.oy);
            const d = Math.hypot(dx, dy) || 1;
            const R = 260 + m * 60;
            if (d < R) {
              const k = Math.min(m * 7, 22) * (1 - d / R) ** 2;
              tx = (dx / d) * k;
              ty = (dy / d) * k;
            }
          }
        }
        b.vx = (b.vx + (tx - b.ox) * 0.09) * 0.82;
        b.vy = (b.vy + (ty - b.oy) * 0.09) * 0.82;
        b.ox += b.vx;
        b.oy += b.vy;
        const settled = Math.abs(b.ox) < 0.05 && Math.abs(b.oy) < 0.05 && Math.abs(b.vx) < 0.05;
        b.el.style.translate = settled ? '' : `${b.ox.toFixed(2)}px ${b.oy.toFixed(2)}px`;
      });
    };

    resize();
    collect();
    // Certains éléments (témoignages, formulaire) sont remplacés : on rafraîchit la liste
    const recollect = setInterval(collect, 2000);
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('blur', onUp);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(recollect);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('blur', onUp);
      bodies.forEach((b) => { b.el.style.translate = ''; });
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []);

  return <canvas ref={ref} className="gravity" aria-hidden="true" />;
}
