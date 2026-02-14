// src/pages/sitemap.xml.ts
// XML-Sitemap für SEO

import { getCollection } from 'astro:content';
import { siteConfig } from '@/config/site';

// Sitemap-Eintrag-Interface
interface SitemapEntry {
    loc: string;
    lastmod: string;
    changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    priority: number;
}

// Datum im ISO-Format formatieren (YYYY-MM-DD)
function formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
}

// Aktuelles Datum für statische Seiten
const today = formatDate(new Date());

export async function GET() {
    // Blog-Posts laden, Drafts filtern
    const posts = await getCollection('blog', ({ data }) => {
        return data.draft !== true;
    });

    // Sitemap-Einträge erstellen
    const entries: SitemapEntry[] = [];

    // 1. Homepage
    entries.push({
        loc: siteConfig.url,
        lastmod: today,
        changefreq: 'monthly',
        priority: 1.0,
    });

    // 2. Blog-Übersicht
    entries.push({
        loc: `${siteConfig.url}/blog`,
        lastmod: today,
        changefreq: 'weekly',
        priority: 0.8,
    });

    // 3. Blog-Posts
    posts.forEach((post) => {
        entries.push({
            loc: `${siteConfig.url}/blog/${post.slug}/`,
            lastmod: formatDate(post.data.date),
            changefreq: 'weekly',
            priority: 0.8,
        });
    });

    // 4. Snake-Game
    entries.push({
        loc: `${siteConfig.url}/snake`,
        lastmod: today,
        changefreq: 'monthly',
        priority: 0.6,
    });

    // 5. Impressum
    entries.push({
        loc: `${siteConfig.url}/impressum`,
        lastmod: today,
        changefreq: 'monthly',
        priority: 0.6,
    });

    // 6. Datenschutz
    entries.push({
        loc: `${siteConfig.url}/datenschutz`,
        lastmod: today,
        changefreq: 'monthly',
        priority: 0.6,
    });

    // XML-Sitemap generieren
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map((entry) => `    <url>
        <loc>${entry.loc}</loc>
        <lastmod>${entry.lastmod}</lastmod>
        <changefreq>${entry.changefreq}</changefreq>
        <priority>${entry.priority.toFixed(1)}</priority>
    </url>`).join('\n')}
</urlset>`;

    return new Response(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}
