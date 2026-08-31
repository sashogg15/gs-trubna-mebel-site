import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

// Pages that exist as scaffold but wait on data being collected internally.
const BLOCKED_PAGES = ['quality', 'sustainability', 'references', 'about'];

// Build-summary integration: after every build, print the total open
// [[TODO]] count, the number of unconfirmed figures, and which pages are
// still blocked — so the distance to launch is visible on every build.
function contentReport() {
  return {
    name: 'content-report',
    hooks: {
      'astro:build:done': () => {
        const roots = ['src/content/en', 'src/data'];
        let todos = 0;
        for (const dir of roots) {
          for (const file of readdirSync(dir)) {
            if (!file.endsWith('.json')) continue;
            todos += (readFileSync(join(dir, file), 'utf8').match(/\[\[TODO/g) ?? []).length;
          }
        }
        for (const extra of ['public/contact.php', 'public/.htaccess']) {
          todos += (readFileSync(extra, 'utf8').match(/\[\[TODO/g) ?? []).length;
        }
        const company = JSON.parse(readFileSync('src/data/company.json', 'utf8'));
        const unconfirmed =
          company.machines.items.filter((m) => m.needsConfirmation).length +
          company.keyFigures.items.filter((f) => f.needsConfirmation).length;
        console.warn(
          `\n[site] Launch distance: ${todos} open [[TODO]] markers · ` +
            `${unconfirmed} unconfirmed figures · ` +
            `${BLOCKED_PAGES.length} pages blocked on internal data (${BLOCKED_PAGES.join(', ')}).\n` +
            `       Details: CONTENT-NEEDED.md · launch blockers listed at its top.\n`
        );
      },
    },
  };
}

// Static output only — the site is deployed as plain files over FTP to
// cPanel shared hosting (Apache). No SSR, no adapters, no runtime code.
export default defineConfig({
  site: 'https://gstrubnamebel.eu',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [tailwind(), sitemap(), contentReport()],
  build: {
    // Emit /page/index.html so Apache serves clean URLs without rewrites.
    format: 'directory',
  },
});
