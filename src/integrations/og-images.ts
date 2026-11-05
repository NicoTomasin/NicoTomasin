import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';
import { generateOgImage, generatePageOgImage, generateProfileOgImage } from '../lib/og-image.ts';
import sharp from 'sharp';
import { coverVariant, firstImage } from '../lib/post-cover.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '../../public');

/** Lee un campo del frontmatter (string entre comillas o valor plano) */
function field(frontmatter: string, name: string) {
  const match = frontmatter.match(new RegExp(`^${name}:\\s*(.+?)\\s*$`, 'm'));
  if (!match) return undefined;
  return match[1].replace(/^["']|["']$/g, '').replace(/\\"/g, '"');
}

async function generatePostImages() {
  const contentDir = path.join(__dirname, '../content/blog');
  const outputDir = path.join(publicDir, 'og/blog');
  await fs.mkdir(outputDir, { recursive: true });

  const files = (await fs.readdir(contentDir)).filter((file) => file.endsWith('.md'));
  for (const file of files) {
    const content = await fs.readFile(path.join(contentDir, file), 'utf-8');
    // \r?\n: en Windows git puede convertir los .md a CRLF
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
    if (!match) continue;
    const [, frontmatter, body] = match;
    if (field(frontmatter, 'draft') === 'true') continue;

    const slug = file.replace(/\.md$/, '');

    try {
      // Captura del post (webp/png/jpg en public/) → JPEG que satori/resvg puedan leer
      const shotPath = firstImage(body);
      let screenshot;
      if (shotPath) {
        const { data, info } = await sharp(path.join(publicDir, shotPath))
          .resize({ width: 1200, withoutEnlargement: true })
          .jpeg({ quality: 82 })
          .toBuffer({ resolveWithObject: true });
        screenshot = { data, mime: 'image/jpeg', width: info.width, height: info.height };
      }

      const png = await generateOgImage({
        title: field(frontmatter, 'title') ?? 'Sin título',
        category: field(frontmatter, 'category'),
        variant: coverVariant(slug),
        screenshot,
      });
      await fs.writeFile(path.join(outputDir, `${slug}.png`), png);
      console.log(`  OG: blog/${slug}`);
    } catch (error) {
      console.error(`  Error generating OG image for ${slug}:`, error instanceof Error ? error.message : error);
    }
  }
}

async function generateSiteImages() {
  // Landing en español (default) e inglés
  await fs.writeFile(
    path.join(publicDir, 'og.png'),
    await generateProfileOgImage({
      kicker: 'PM @ G2M · Buenos Aires',
      status: 'Abierto a ideas',
      tagline: 'Construyo lo que me da curiosidad: de bots en Rust a un tamagotchi con ESP32.',
      footer: 'nicotomasin.com.ar',
    })
  );
  await fs.writeFile(
    path.join(publicDir, 'og-en.png'),
    await generateProfileOgImage({
      kicker: 'PM @ G2M · Buenos Aires, AR',
      status: 'Open to ideas',
      tagline: 'I build whatever makes me curious: from Rust bots to an ESP32 tamagotchi.',
      footer: 'nicotomasin.com.ar/en',
    })
  );
  await fs.writeFile(
    path.join(publicDir, 'og/blog.png'),
    await generatePageOgImage({
      kicker: 'Blog · Build in public',
      title: 'Lo que construyo,',
      accent: 'por dentro',
      description: 'Cómo armé cada proyecto: decisiones, arquitectura, errores y lo que aprendí.',
      variant: 3,
    })
  );
  console.log('  OG: og.png, og-en.png, og/blog.png');

  // Ícono para iOS / accesos directos a partir del favicon
  const favicon = await fs.readFile(path.join(publicDir, 'favicon.svg'), 'utf-8');
  const icon = new Resvg(favicon, { fitTo: { mode: 'width', value: 180 }, background: '#0a0a0f' }).render().asPng();
  await fs.writeFile(path.join(publicDir, 'apple-touch-icon.png'), icon);
}

export default function ogImagesIntegration() {
  return {
    name: 'og-images',
    hooks: {
      'astro:build:start': async () => {
        console.log('Generating OG images...');
        try {
          await fs.mkdir(path.join(publicDir, 'og'), { recursive: true });
          await generateSiteImages();
          await generatePostImages();
          console.log('OG images generated successfully!');
        } catch (error) {
          console.error('Error generating OG images:', error);
        }
      },
    },
  };
}
