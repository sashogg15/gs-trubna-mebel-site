import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// Static output only — the site is deployed as plain files over FTP to
// cPanel shared hosting (Apache). No SSR, no adapters, no runtime code.
export default defineConfig({
  site: 'https://gstrubnamebel.eu',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [tailwind(), sitemap()],
  build: {
    // Emit /page/index.html so Apache serves clean URLs without rewrites.
    format: 'directory',
  },
});
