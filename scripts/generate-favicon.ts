// Genera public/favicon.svg: el monograma "NT" en Instrument Serif itálica convertido a trazos
// (un favicon no puede depender de una webfont). Correr con: bun scripts/generate-favicon.ts
import satori from 'satori';
import fs from 'node:fs/promises';

const font = (file: string) => fs.readFile(`node_modules/@fontsource/instrument-serif/files/${file}`);

const SIZE = 64;
const [italic] = await Promise.all([font('instrument-serif-latin-400-italic.woff')]);

const svg = await satori(
  {
    type: 'div',
    props: {
      style: {
        width: SIZE,
        height: SIZE,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0a0a0f',
        borderRadius: 14,
        fontFamily: 'Instrument Serif',
        fontStyle: 'italic',
        fontSize: 50,
        letterSpacing: -2,
        paddingTop: 4,
        paddingRight: 3,
      },
      children: [
        { type: 'span', props: { style: { color: '#e4e4e7' }, children: 'N' } },
        { type: 'span', props: { style: { color: '#00ff88' }, children: 'T' } },
      ],
    },
  } as never,
  {
    width: SIZE,
    height: SIZE,
    fonts: [{ name: 'Instrument Serif', data: italic, weight: 400, style: 'italic' }],
  }
);

// La Instrument Serif es fina: a 16px se pierde. Un trazo del mismo color engrosa los glifos.
// (solo las letras: el fondo #0a0a0f queda igual)
const thickened = svg.replace(/<path([^>]*?)fill="(#(?:e4e4e7|00ff88))"/gi, '<path$1fill="$2" stroke="$2" stroke-width="1.6" stroke-linejoin="round"');

await fs.writeFile('public/favicon.svg', thickened);
console.log('public/favicon.svg', thickened.length, 'bytes');
