// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import ogImagesIntegration from './src/integrations/og-images';

export default defineConfig({
  site: 'https://nicotomasin.com.ar',
  integrations: [sitemap(), ogImagesIntegration()],
});
