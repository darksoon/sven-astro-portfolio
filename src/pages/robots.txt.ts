// src/pages/robots.txt.ts
// Robots.txt für Webcrawler

import { siteConfig } from '@/config/site';

export async function GET() {
    const robotsTxt = `# Robots.txt für sven-neurath.de
# Erlaubt allen Crawlern den Zugriff auf alle Bereiche

User-agent: *
Allow: /

# Sitemap
Sitemap: ${siteConfig.url}/sitemap.xml
`;

    return new Response(robotsTxt, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
        },
    });
}
