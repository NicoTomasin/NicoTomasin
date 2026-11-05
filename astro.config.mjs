// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import ogImagesIntegration from './src/integrations/og-images';
import { remarkCallouts } from './src/lib/remark-callouts';
import { remarkMermaid } from './src/lib/remark-mermaid';
import { remarkCodeTitles } from './src/lib/remark-code-titles';
import fs from 'node:fs';
import portfolio from './src/data/portfolio.json' with { type: 'json' };

// lastmod del sitemap: fecha de cada post (frontmatter) y del portfolio para la landing
const postDates = new Map(
  fs
    .readdirSync('./src/content/blog')
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const source = fs.readFileSync(`./src/content/blog/${file}`, 'utf-8');
      const draft = /^draft:\s*true/m.test(source);
      const date = source.match(/^date:\s*["']?([\d-]+)/m)?.[1];
      return [file.replace(/\.md$/, ''), draft ? undefined : date];
    })
);
const latestPost = [...postDates.values()].filter(Boolean).sort().at(-1);

export default defineConfig({
  site: 'https://nicotomasin.com.ar',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'es', locales: { es: 'es-AR', en: 'en' } },
      filter: (page) => !page.includes('/404'),
      serialize(item) {
        const path = new URL(item.url).pathname;
        const slug = path.match(/^\/blog\/([^/]+)\/?$/)?.[1];
        const postDate = slug ? postDates.get(slug) : undefined;
        if (postDate) {
          item.lastmod = new Date(postDate).toISOString();
        } else if (path === '/blog/' && latestPost) {
          item.lastmod = new Date(latestPost).toISOString();
        } else if (path === '/' || path === '/en/') {
          item.lastmod = new Date(portfolio.metadata.lastUpdate).toISOString();
        }
        return item;
      },
    }),
    ogImagesIntegration(),
  ],
  markdown: {
    remarkPlugins: [
      remarkCallouts,
      remarkMermaid,
      remarkCodeTitles,
    ],
    gfm: true,
  },
});
