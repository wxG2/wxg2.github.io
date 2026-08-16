import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://wxg2.github.io',
  output: 'static',
  integrations: [sitemap()],
  trailingSlash: 'always',
});
