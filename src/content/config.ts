// src/content/config.ts
// Content Collection Konfiguration mit Zod-Schema

import { defineCollection, z } from 'astro:content';

// Blog-Posts Collection
const blogCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.date(),
        tags: z.array(z.string()),
        category: z.enum(['Homelab', 'Website', 'GameDev']).default('Website'),
        image: z.string().optional(),
        draft: z.boolean().optional().default(false),
    }),
});

// Changelog Collection (manuell gepflegt)
const changelogCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        date: z.date(),
        version: z.string().optional(),
        category: z.enum(['Feature', 'Fix', 'Refactor', 'Docs', 'Info']).default('Feature'),
    }),
});

export const collections = {
    blog: blogCollection,
    changelog: changelogCollection,
};
