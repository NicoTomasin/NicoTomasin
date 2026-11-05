// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import ogImagesIntegration from './src/integrations/og-images';
import { remarkCallouts } from './src/lib/remark-callouts';
import { remarkMermaid } from './src/lib/remark-mermaid';
import { remarkCodeTitles } from './src/lib/remark-code-titles';

export default defineConfig({
  site: 'https://nicotomasin.com.ar',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'es', locales: { es: 'es-AR', en: 'en-US' } },
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
