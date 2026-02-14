// src/pages/rss.xml.ts
// RSS Feed für Blog-Posts

import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { siteConfig } from '@/config/site';

export async function GET(context: { site: string | URL }) {
    // Blog-Posts laden, Drafts filtern und nach Datum sortieren (neueste zuerst)
    const posts = await getCollection('blog', ({ data }) => {
        return data.draft !== true;
    });
    posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

    return rss({
        // RSS Feed Metadaten aus siteConfig
        title: siteConfig.name.de,
        description: siteConfig.blog.description.de,
        site: context.site,

        // RSS Items aus Blog-Posts
        items: posts.map((post) => ({
            title: post.data.title,
            description: post.data.description,
            link: `/blog/${post.slug}/`,
            pubDate: post.data.date,
        })),

        // Zusätzliche RSS-Metadaten
        customData: `<language>de</language>`,
    });
}
