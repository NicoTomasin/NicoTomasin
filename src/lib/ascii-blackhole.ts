// Agujero negro en ASCII para el hero y el header del blog.
// Canvas 2D: una grilla de caracteres monoespaciados. Cada celda evalúa un modelo simple
// (sombra + anillo de fotones + disco de acreción inclinado + halo lensado + estrellas),
// el brillo elige el carácter y la "temperatura" el color. Los glifos se pre-renderizan
// en un atlas, así cada frame son solo drawImage.

export interface BlackholeOptions {
  /** Multiplicador de brillo (1 = hero) */
  intensity?: number;
  /** Momento del frame estático cuando hay reduced motion */
  staticTime?: number;
}

// Rampa de densidad: de vacío a lleno
const RAMP = ' .,:-=+*x%#@';
const GLITCH = '01<>/\\|{}[]$&?!';
// Platillo volador que sigue al cursor. ' ' es transparente (se ve el fondo).
const UFO = ['   .---.   ', ' _/_____\\_ ', '(_o_o_o_o_)'];
const UFO_ANCHOR_ROW = 1; // fila que queda sobre el cursor
const UFO_LIGHTS = [2, 4, 6, 8]; // columnas de las luces en la fila 2
// Paleta: violeta (borde frío) → azul → teal → acento del sitio → verde pálido → blanco caliente
const PALETTE: [number, number, number][] = [
  [58, 28, 120],
  [40, 80, 220],
  [0, 180, 190],
  [0, 255, 136],
  [214, 255, 170],
  [255, 255, 255],
];
const COLOR_STEPS = 24;
const FPS = 30;

// Geometría en unidades de la escala `s` (≈ alto del canvas)
const RS = 0.15; // radio de la sombra
const R_IN = RS * 1.55; // borde interno del disco
const R_OUT = RS * 4.6; // borde externo del disco
const TILT = 0.2; // aplastamiento vertical del disco (inclinación)
const ANGLE = 0.26; // giro de todo el sistema (~15°): el disco sube hacia la derecha
const FORM_DURATION = 3.8; // segundos que tarda en formarse al cargar

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const smooth = (a: number, b: number, v: number) => {
  const t = clamp01((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const easeOut = (v: number) => 1 - Math.pow(1 - clamp01(v), 3);
const hash = (x: number, y: number) => {
  const h = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return h - Math.floor(h);
};

function paletteAt(t: number): string {
  const x = clamp01(t) * (PALETTE.length - 1);
  const i = Math.min(PALETTE.length - 2, Math.floor(x));
  const f = x - i;
  const a = PALETTE[i];
  const b = PALETTE[i + 1];
  return `rgb(${Math.round(a[0] + (b[0] - a[0]) * f)},${Math.round(a[1] + (b[1] - a[1]) * f)},${Math.round(a[2] + (b[2] - a[2]) * f)})`;
}

/** Textura turbulenta del disco: rota con velocidad kepleriana (más rápido adentro) */
function diskTexture(phi: number, rd: number, t: number) {
  const w = 0.9 * Math.pow(R_IN / rd, 1.5);
  const a = phi - w * t;
  const n = 0.5 * Math.sin(2 * a + rd * 22) + 0.3 * Math.sin(5 * a - rd * 41 + 1.7) + 0.2 * Math.sin(11 * a + rd * 63 + t * 0.4);
  return 0.62 + 0.38 * n;
}

/**
 * Evalúa el modelo en un punto (x, y) relativo al centro, en unidades de `s`, con y hacia arriba.
 * `f` es el avance de la formación (0 = vacío, 1 = formado).
 * Devuelve [brillo, temperatura, frente de formación] en 0..1.
 */
function sample(x: number, y: number, t: number, f: number, out: Float32Array) {
  const r = Math.hypot(x, y);
  let b = 0;
  let temp = 0;
  let front = 0;
  // Mientras se forma gira más rápido y después se asienta en su velocidad normal
  t += 5 * easeOut(f);
  // El disco se arma de afuera hacia adentro: radio del frente de formación
  const rf = R_IN * 0.9 + (R_OUT * 1.15 - R_IN * 0.9) * (1 - easeOut(f * 1.05));

  // Disco primario: elipse inclinada. La mitad lejana (arriba) queda tapada por la sombra.
  const dz = y / TILT;
  const rd = Math.hypot(x, dz);
  const behind = y > 0 && r < RS * 1.02 && f > 0.5;

  if (f < 1 && rd > rf * 0.8 && rd < R_OUT * 1.4 && !behind) {
    // Brazos de materia cayendo en espiral, por fuera del frente, rotos en grumos
    const phi = Math.atan2(dz, x);
    const arms = Math.pow(0.5 + 0.5 * Math.sin(3 * phi + 4 * Math.log(rd) - t * 2.5), 4);
    const clumps = 0.5 + 0.5 * Math.sin(rd * 70 - phi * 7 + t * 4) * Math.sin(phi * 17 + rd * 31);
    const fade = smooth(0, 0.12, f) * (1 - smooth(0.75, 1, f)) * smooth(rf * 0.8, rf, rd) * (1 - smooth(R_OUT * 0.9, R_OUT * 1.4, rd));
    const v = arms * clumps * fade * 0.9;
    if (v > b) {
      b = v;
      temp = 0.3 + 0.4 * Math.min(1, R_IN / rd);
    }
    // Banda brillante en el frente
    front = Math.exp(-Math.pow((rd - rf) / (RS * 0.35), 2)) * (1 - smooth(0.85, 1, f));
  }

  if (rd > Math.max(R_IN * 0.9, rf) && rd < R_OUT && !behind) {
    const grow = smooth(rf, rf + RS * 0.8, rd);
    const radial = grow * smooth(R_IN * 0.9, R_IN * 1.12, rd) * (1 - smooth(R_OUT * 0.55, R_OUT, rd)) * Math.pow(R_IN / rd, 1.3);
    const doppler = 1 - 0.55 * (x / rd); // el lado que se acerca (izquierda) brilla más
    const tex = diskTexture(Math.atan2(dz, x), rd, t);
    const v = radial * doppler * tex * 1.7;
    if (v > b) {
      b = v;
      temp = 0.12 + 0.88 * Math.pow(R_IN / rd, 1.3) * (0.7 + 0.3 * doppler);
    }
  }

  // Halo lensado: la parte de atrás del disco curvada alrededor de la sombra (más gruesa arriba)
  if (r > RS && r < RS * 2.3) {
    const top = y > 0 ? 1 : 0.45;
    const width = RS * (y > 0 ? 1.15 : 0.55);
    const u = (r - RS * 1.02) / width;
    if (u > 0 && u < 1) {
      const phi = Math.atan2(y, x);
      const prof = smooth(0, 0.08, u) * Math.pow(1 - u, 1.8);
      const doppler = 1 - 0.45 * Math.cos(phi);
      const tex = diskTexture(phi * 2, R_IN + u * (R_OUT - R_IN) * 0.4, t * 1.2);
      const v = prof * top * doppler * tex * 1.35 * smooth(0.6, 1, f);
      if (v > b) {
        b = v;
        temp = 0.35 + 0.6 * (1 - u);
      }
    }
  }

  // Anillo de fotones: línea fina y muy caliente en el borde de la sombra
  // Se enciende con un destello (más ancho y brillante) cuando el disco llega al borde interno
  const on = smooth(0.5, 0.72, f);
  const flash = Math.exp(-Math.pow((f - 0.74) / 0.06, 2));
  const ring =
    Math.exp(-Math.pow((r - RS * 1.04) / (RS * (0.13 + 0.1 * flash)), 2)) *
    (0.8 + 0.2 * Math.sin(Math.atan2(y, x) * 3 - t * 2)) *
    on *
    (1 + flash);
  if (ring > b * 0.9) {
    b = Math.max(b, ring);
    temp = Math.max(temp, 1);
  }

  // Sombra: negro absoluto (salvo el disco que pasa por delante, abajo)
  if (f > 0.5 && r < RS && !(y < 0 && rd > R_IN * 0.9 && rd < R_OUT)) b = 0;

  out[0] = b;
  out[1] = temp;
  out[2] = front;
}

/**
 * Monta el agujero negro ASCII en un canvas. Si no hay contexto 2D marca el canvas con
 * `data-fallback` (el CSS muestra un gradiente con la paleta) y no rompe nada.
 */
export function mountBlackhole(canvas: HTMLCanvasElement, options: BlackholeOptions = {}) {
  const { intensity = 1, staticTime = 6 } = options;
  const ctx = canvas.getContext('2d', { alpha: false });
  if (!ctx) return canvas.setAttribute('data-fallback', '');

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const fontFamily = getComputedStyle(document.documentElement).getPropertyValue('--font-mono').trim() || 'monospace';

  let dpr = 1;
  let cellW = 8;
  let cellH = 14;
  let cols = 0;
  let rows = 0;
  let atlas: HTMLCanvasElement | null = null;
  // Atlas: filas = pasos de color, columnas = rampa + glifos de glitch
  const glyphs = RAMP + GLITCH + "_()o'";
  const glyphIndex = new Map([...glyphs].map((ch, i) => [ch, i]));
  const ufo = { x: 0, y: 0, placed: false };
  const sampleOut = new Float32Array(3);

  const start = performance.now();
  let visible = true;
  let rafId = 0;
  let lastFrame = 0;
  const mouse = { x: -1e4, y: -1e4, active: false };

  function buildAtlas() {
    const fontSize = window.innerWidth < 640 ? 10 : 12;
    const font = `${fontSize * dpr}px ${fontFamily}`;
    const probe = document.createElement('canvas').getContext('2d')!;
    probe.font = font;
    cellW = Math.ceil(probe.measureText('M').width);
    cellH = Math.round(fontSize * 1.3 * dpr);

    atlas = document.createElement('canvas');
    atlas.width = cellW * glyphs.length;
    atlas.height = cellH * COLOR_STEPS;
    const a = atlas.getContext('2d')!;
    a.font = font;
    a.textBaseline = 'middle';
    a.textAlign = 'center';
    for (let c = 0; c < COLOR_STEPS; c++) {
      a.fillStyle = paletteAt(c / (COLOR_STEPS - 1));
      for (let g = 0; g < glyphs.length; g++) {
        a.fillText(glyphs[g], g * cellW + cellW / 2, c * cellH + cellH / 2);
      }
    }
  }

  function layout() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
    const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
    canvas.width = w;
    canvas.height = h;
    buildAtlas();
    cols = Math.ceil(w / cellW);
    rows = Math.ceil(h / cellH);
  }

  function draw(time: number, intro: number) {
    if (!atlas) return;
    const w = canvas.width;
    const h = canvas.height;
    ctx!.fillStyle = '#000';
    ctx!.fillRect(0, 0, w, h);

    // Escala: el alto manda, salvo en pantallas angostas (mobile vertical)
    const s = Math.min(h, w * 1.05);
    // En desktop un poco a la derecha, para equilibrar el nombre (abajo a la izquierda)
    const cx = w * (w / dpr >= 900 ? 0.64 : 0.5);
    const cy = h * (w / dpr >= 900 ? 0.36 : 0.4);
    const cosA = Math.cos(ANGLE);
    const sinA = Math.sin(ANGLE);
    const f = clamp01(intro / FORM_DURATION);
    const glitchSeed = Math.floor(time * 12);
    const colorAt = (v: number) => Math.min(COLOR_STEPS - 1, Math.floor(clamp01(v) * COLOR_STEPS));

    // El platillo sigue al cursor con un poco de inercia
    if (mouse.active) {
      if (!ufo.placed) Object.assign(ufo, { x: mouse.x, y: mouse.y, placed: true });
      ufo.x += (mouse.x - ufo.x) * 0.3;
      ufo.y += (mouse.y - ufo.y) * 0.3;
    } else {
      ufo.placed = false;
    }
    const ufoW = UFO[0].length;
    const ui0 = Math.round(ufo.x / cellW - 0.5) - Math.floor(ufoW / 2);
    const uj0 = Math.round(ufo.y / cellH - 0.5) - UFO_ANCHOR_ROW;
    const lightOn = Math.floor(time * 6) % UFO_LIGHTS.length;

    for (let j = 0; j < rows; j++) {
      const py = j * cellH + cellH / 2;
      const y = (cy - py) / s;
      for (let i = 0; i < cols; i++) {
        const px = i * cellW + cellW / 2;
        const x = (px - cx) / s;
        sample(x * cosA + y * sinA, -x * sinA + y * cosA, time, f, sampleOut);
        let b = sampleOut[0] * intensity;
        let temp = sampleOut[1];

        // Estrellas de fondo que titilan
        if (b < 0.04) {
          const hs = hash(i, j);
          if (hs > 0.985) {
            const appear = hash(i + 7, j) * 0.5;
            b =
              smooth(appear, appear + 0.15, f) *
              (0.12 + 0.18 * hash(j, i)) *
              (0.55 + 0.45 * Math.sin(time * (1 + hs * 3) + hs * 50)) *
              intensity;
            temp = 0.15 + 0.5 * hash(i + 3, j);
          }
        }

        let glyph = -1;

        // Platillo volador en el cursor
        if (ufo.placed) {
          const si = i - ui0;
          const sj = j - uj0;
          if (sj >= 0 && sj < UFO.length && si >= 0 && si < ufoW) {
            const ch = UFO[sj][si];
            if (ch !== ' ') {
              let v = sj === 0 ? 0.95 : 0.72;
              if (sj === 2 && ch === 'o') v = UFO_LIGHTS[lightOn] === si ? 1 : 0.5;
              const g = glyphIndex.get(ch)!;
              ctx!.drawImage(atlas, g * cellW, colorAt(v) * cellH, cellW, cellH, i * cellW, j * cellH, cellW, cellH);
              continue;
            }
          }
        }

        // Frente de formación: glifos de glitch calientes donde el disco se está armando
        const front = sampleOut[2];
        if (front > 0.05 && hash(i + glitchSeed, j) < front * 0.6) {
          glyph = RAMP.length + Math.floor(hash(j, i + glitchSeed) * GLITCH.length);
          b = Math.max(b, 0.3 + 0.5 * front);
          temp = Math.max(temp, 0.75);
        }

        if (b < 0.035) continue;
        b = clamp01(b);
        if (glyph < 0) glyph = Math.min(RAMP.length - 1, 1 + Math.floor(Math.pow(b, 0.8) * (RAMP.length - 1)));
        // El color mezcla temperatura y brillo: lo tenue se enfría
        const c = colorAt(0.7 * temp + 0.35 * b);
        ctx!.drawImage(atlas, glyph * cellW, c * cellH, cellW, cellH, i * cellW, j * cellH, cellW, cellH);
      }
    }
  }

  const now = () => (performance.now() - start) / 1000;
  const render = () => (reducedMotion.matches ? draw(staticTime, 99) : draw(now(), now()));

  function frame(ts: number) {
    rafId = visible && !reducedMotion.matches && !document.hidden ? requestAnimationFrame(frame) : 0;
    if (ts - lastFrame < 1000 / FPS - 2) return;
    lastFrame = ts;
    render();
  }

  function play() {
    if (reducedMotion.matches) return render();
    if (!rafId && visible && !document.hidden) rafId = requestAnimationFrame(frame);
  }

  // ResizeObserver en vez de window.resize: no dispara de más con la barra del navegador mobile
  let lastSize = '';
  new ResizeObserver(() => {
    const size = `${canvas.clientWidth}x${canvas.clientHeight}`;
    if (size === lastSize) return;
    lastSize = size;
    layout();
    render();
  }).observe(canvas);

  // Pausar fuera de pantalla o con la pestaña oculta
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) play();
  }).observe(canvas);
  document.addEventListener('visibilitychange', play);
  reducedMotion.addEventListener('change', play);

  // El canvas está debajo del contenido: escuchamos el puntero en la ventana
  window.addEventListener(
    'pointermove',
    (e) => {
      if (!finePointer.matches || !visible) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) * (canvas.width / rect.width);
      mouse.y = (e.clientY - rect.top) * (canvas.height / rect.height);
      mouse.active = e.clientY >= rect.top && e.clientY <= rect.bottom;
    },
    { passive: true },
  );
  document.documentElement.addEventListener('pointerleave', () => (mouse.active = false));

  // La fuente mono puede llegar después del primer frame: rearmar el atlas con la métrica real
  document.fonts?.load(`12px ${fontFamily}`).then(() => {
    layout();
    render();
  });

  layout();
  play();
}
