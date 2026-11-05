// Generador de OG images (1200x630) con la identidad del sitio:
// agujero negro del hero de fondo, Syne para títulos, Instrument Serif para el nombre y mono para etiquetas.
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { COVER_VARIANTS } from './post-cover.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '../..');

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

const C = {
  bg: '#0a0a0f',
  surface: '#12121a',
  border: '#1e1e2e',
  text: '#e4e4e7',
  muted: '#a1a1aa',
  accent: '#00ff88',
};

type Node = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, children?: unknown, extra: Record<string, unknown> = {}): Node => ({
  type,
  props: { style: { display: 'flex', ...style }, children, ...extra },
});

let assets: Awaited<ReturnType<typeof loadAssets>> | undefined;

async function loadAssets() {
  const font = (pkg: string, file: string) => fs.readFile(path.join(root, 'node_modules/@fontsource', pkg, 'files', file));
  const [syne700, syne800, serif, serifItalic, mono, inter400, inter600, ...backgrounds] = await Promise.all([
    font('syne', 'syne-latin-700-normal.woff'),
    font('syne', 'syne-latin-800-normal.woff'),
    font('instrument-serif', 'instrument-serif-latin-400-normal.woff'),
    font('instrument-serif', 'instrument-serif-latin-400-italic.woff'),
    font('share-tech-mono', 'share-tech-mono-latin-400-normal.woff'),
    font('inter', 'inter-latin-400-normal.woff'),
    font('inter', 'inter-latin-600-normal.woff'),
    ...Array.from({ length: COVER_VARIANTS }, (_, i) => fs.readFile(path.join(root, `public/covers/bh-${i}.jpg`))),
  ]);
  return {
    fonts: [
      { name: 'Syne', data: syne700, weight: 700 as const, style: 'normal' as const },
      { name: 'Syne', data: syne800, weight: 800 as const, style: 'normal' as const },
      { name: 'Instrument Serif', data: serif, weight: 400 as const, style: 'normal' as const },
      { name: 'Instrument Serif', data: serifItalic, weight: 400 as const, style: 'italic' as const },
      { name: 'Share Tech Mono', data: mono, weight: 400 as const, style: 'normal' as const },
      { name: 'Inter', data: inter400, weight: 400 as const, style: 'normal' as const },
      { name: 'Inter', data: inter600, weight: 600 as const, style: 'normal' as const },
    ],
    backgrounds: backgrounds.map((bg) => `data:image/jpeg;base64,${bg.toString('base64')}`),
  };
}

async function render(tree: Node) {
  assets ??= await loadAssets();
  const svg = await satori(tree as never, { width: OG_WIDTH, height: OG_HEIGHT, fonts: assets.fonts });
  return new Resvg(svg, { fitTo: { mode: 'width', value: OG_WIDTH } }).render().asPng();
}

/** Fondo: el agujero negro desplazado (x) + un velo para que el texto lea bien */
function backdrop(offsetX: number, veil: string, variant = 0) {
  return [
    h('img', { position: 'absolute', left: offsetX, top: 0, width: OG_WIDTH, height: OG_HEIGHT }, undefined, {
      src: assets!.backgrounds[variant % assets!.backgrounds.length],
      width: OG_WIDTH,
      height: OG_HEIGHT,
    }),
    h('div', { position: 'absolute', inset: 0, backgroundImage: veil }),
  ];
}

const mono = (text: string, style: Record<string, unknown> = {}) =>
  h('span', { fontFamily: 'Share Tech Mono', fontSize: 22, letterSpacing: 3, textTransform: 'uppercase', color: C.muted, ...style }, text);

const logo = h('div', { alignItems: 'center', gap: 18 }, [
  h('div', { fontFamily: 'Syne', fontWeight: 800, fontSize: 40, letterSpacing: -2 }, [
    h('span', { color: C.accent }, 'N'),
    h('span', { color: C.text }, 'T'),
  ]),
]);

/** Ajuste del tamaño del título según su largo */
function titleSize(title: string) {
  if (title.length > 90) return 52;
  if (title.length > 70) return 58;
  if (title.length > 50) return 64;
  return 72;
}

export interface PostOgOptions {
  title: string;
  category?: string;
  /** Variante del agujero negro (fija por slug) */
  variant?: number;
  /** Captura del post ya convertida a PNG/JPEG */
  screenshot?: { data: Buffer; mime: string; width: number; height: number };
}

/**
 * OG de un post: logo, categoría y título. Nada más.
 * Si el post tiene captura, va a la derecha como una "ventana" inclinada; si no, el agujero negro ocupa ese lugar.
 */
export async function generateOgImage(options: PostOgOptions): Promise<Buffer> {
  assets ??= await loadAssets();
  const { title, category, variant = 0, screenshot } = options;
  const withShot = Boolean(screenshot);
  const size = withShot ? Math.min(titleSize(title), 64) - 4 : titleSize(title) + 6;

  const shotWidth = 600;
  const shotHeight = screenshot ? Math.round((shotWidth * screenshot.height) / screenshot.width) : 0;

  return render(
    h('div', { position: 'relative', width: '100%', height: '100%', backgroundColor: '#000', overflow: 'hidden' }, [
      ...backdrop(
        withShot ? 260 : 380,
        withShot
          ? 'linear-gradient(90deg, #000 0%, rgba(0,0,0,0.92) 45%, rgba(0,0,0,0.55) 100%)'
          : 'linear-gradient(90deg, #000 0%, rgba(0,0,0,0.9) 40%, rgba(0,0,0,0.15) 100%)',
        variant
      ),
      screenshot
        ? h(
            'div',
            {
              position: 'absolute',
              left: 640,
              top: 120,
              width: shotWidth,
              height: Math.min(shotHeight, 560),
              borderRadius: 18,
              overflow: 'hidden',
              // boxShadow + rotate hace crashear a resvg: el borde con un toque de acento da la separación
              border: '2px solid rgba(0,255,136,0.25)',
              transform: 'rotate(-4deg)',
            },
            h('img', { width: shotWidth, height: shotHeight, objectFit: 'cover' }, undefined, {
              src: `data:${screenshot.mime};base64,${screenshot.data.toString('base64')}`,
              width: shotWidth,
              height: shotHeight,
            })
          )
        : h('div', {}),
      h('div', { position: 'relative', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%', padding: '60px 64px' }, [
        h('div', { alignItems: 'center', gap: 20 }, [
          logo,
          category ? h('div', { width: 2, height: 30, backgroundColor: C.border }) : h('div', {}),
          category ? mono(category, { color: C.accent }) : h('div', {}),
        ]),
        h(
          'div',
          {
            fontFamily: 'Syne',
            fontWeight: 700,
            fontSize: size,
            lineHeight: 1.04,
            letterSpacing: -2,
            color: C.text,
            maxWidth: withShot ? 560 : 900,
          },
          title
        ),
        mono('nicotomasin.com.ar/blog', { fontSize: 20 }),
      ]),
    ])
  );
}

export interface ProfileOgOptions {
  kicker: string;
  tagline: string;
  status: string;
  footer: string;
}

/** OG de la landing: el nombre como en el hero, sobre el agujero negro */
export async function generateProfileOgImage(options: ProfileOgOptions): Promise<Buffer> {
  assets ??= await loadAssets();
  const { kicker, tagline, status, footer } = options;

  return render(
    h('div', { position: 'relative', width: '100%', height: '100%', backgroundColor: '#000', overflow: 'hidden' }, [
      ...backdrop(
        300,
        'linear-gradient(90deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.6) 45%, rgba(0,0,0,0.05) 100%), linear-gradient(0deg, rgba(0,0,0,0.85) 0%, transparent 40%)'
      ),
      h('div', { position: 'relative', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%', padding: '56px 64px' }, [
        h('div', { alignItems: 'center', gap: 22 }, [
          mono(kicker, { color: C.text }),
          h(
            'div',
            { alignItems: 'center', gap: 10, padding: '6px 16px', border: '1px solid rgba(0,255,136,0.45)', borderRadius: 999 },
            [h('div', { width: 10, height: 10, borderRadius: 999, backgroundColor: C.accent }), mono(status, { color: C.accent, fontSize: 18 })]
          ),
        ]),
        h('div', { flexDirection: 'column', marginTop: -10 }, [
          h('div', { fontFamily: 'Instrument Serif', fontSize: 190, lineHeight: 0.86, letterSpacing: -5, color: C.text }, 'Nico'),
          h(
            'div',
            { fontFamily: 'Instrument Serif', fontStyle: 'italic', fontSize: 190, lineHeight: 0.86, letterSpacing: -5, color: C.accent, paddingLeft: 120 },
            'Tomasin'
          ),
        ]),
        h('div', { alignItems: 'flex-end', justifyContent: 'space-between', gap: 40 }, [
          h('div', { fontFamily: 'Inter', fontSize: 27, lineHeight: 1.4, color: C.text, maxWidth: 700 }, tagline),
          mono(footer, { fontSize: 20 }),
        ]),
      ]),
    ])
  );
}

export interface PageOgOptions {
  kicker: string;
  title: string;
  accent: string;
  description: string;
  variant?: number;
}

/** OG genérica de página (índice del blog) */
export async function generatePageOgImage(options: PageOgOptions): Promise<Buffer> {
  assets ??= await loadAssets();
  const { kicker, title, accent, description, variant = 0 } = options;
  return render(
    h('div', { position: 'relative', width: '100%', height: '100%', backgroundColor: '#000', overflow: 'hidden' }, [
      ...backdrop(380, 'linear-gradient(90deg, #000 0%, rgba(0,0,0,0.9) 45%, rgba(0,0,0,0.2) 100%)', variant),
      h('div', { position: 'relative', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%', padding: '56px 64px' }, [
        h('div', { alignItems: 'center', gap: 20 }, [logo, h('div', { width: 2, height: 30, backgroundColor: C.border }), mono(kicker)]),
        h('div', { flexDirection: 'column', gap: 24 }, [
          h('div', { flexDirection: 'column' }, [
            h('div', { fontFamily: 'Syne', fontWeight: 700, fontSize: 92, lineHeight: 0.98, letterSpacing: -4, color: C.text }, title),
            h('div', { fontFamily: 'Instrument Serif', fontStyle: 'italic', fontSize: 100, lineHeight: 1, color: C.accent }, accent),
          ]),
          h('div', { fontFamily: 'Inter', fontSize: 26, lineHeight: 1.45, color: C.muted, maxWidth: 720 }, description),
        ]),
        mono('Nico Tomasin  ·  nicotomasin.com.ar/blog', { color: C.text, fontSize: 20 }),
      ]),
    ])
  );
}
