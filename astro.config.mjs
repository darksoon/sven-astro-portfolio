import { defineConfig } from 'astro/config';
import { siteConfig } from './src/config/site.ts';

export default defineConfig({
  site: siteConfig.url,
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  markdown: {
    shikiConfig: {
      // Dracula Theme passt gut zum Dark Design der Seite
      theme: 'dracula',
      // Zeilen umbrechen, wenn nötig
      wrap: true,
      // Sprachen explizit laden für bessere Performance
      langs: ['bash', 'yaml', 'json', 'javascript', 'typescript', 'python', 'dockerfile'],
    },
  },
});
