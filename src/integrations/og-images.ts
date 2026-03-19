import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { generateOgImage } from '../lib/og-image.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default function ogImagesIntegration() {
  return {
    name: 'og-images',
    hooks: {
      'astro:build:start': async () => {
        console.log('Generating OG images for blog posts...');

        const contentDir = path.join(__dirname, '../content/blog');
        const outputDir = path.join(__dirname, '../../public/og/blog');

        await fs.mkdir(outputDir, { recursive: true });

        try {
          const files = await fs.readdir(contentDir);
          const mdFiles = files.filter((file) => file.endsWith('.md'));

          for (const file of mdFiles) {
            const filePath = path.join(contentDir, file);
            const content = await fs.readFile(filePath, 'utf-8');

            const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
            if (!frontmatterMatch) continue;

            const frontmatter = frontmatterMatch[1];
            const titleMatch = frontmatter.match(/^title:\s*["']?(.+?)["']?\s*$/m);
            const descMatch = frontmatter.match(/^description:\s*["']?(.+?)["']?\s*$/m);
            const categoryMatch = frontmatter.match(/^category:\s*["']?(.+?)["']?\s*$/m);
            const draftMatch = frontmatter.match(/^draft:\s*(true|false)\s*$/m);

            if (draftMatch && draftMatch[1] === 'true') continue;

            const title = titleMatch ? titleMatch[1].replace(/["']/g, '') : 'Sin título';
            const description = descMatch ? descMatch[1].replace(/["']/g, '') : undefined;
            const category = categoryMatch ? categoryMatch[1].replace(/["']/g, '') : undefined;

            const slug = file.replace('.md', '');
            const outputPath = path.join(outputDir, `${slug}.png`);

            console.log(`  Generating OG image for: ${slug}`);

            try {
              const pngBuffer = await generateOgImage({ title, description, category });
              await fs.writeFile(outputPath, pngBuffer);
            } catch (error) {
              console.error(`  Error generating OG image for ${slug}:`, error.message);
            }
          }

          console.log('OG images generated successfully!');
        } catch (error) {
          console.error('Error generating OG images:', error);
        }
      },
    },
  };
}
