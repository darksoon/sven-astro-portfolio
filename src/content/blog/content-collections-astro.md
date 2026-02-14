---
title: "Content Collections in Astro: Mein Weg zu typsicheren Blog-Posts"
description: "Wie ich von Astro.glob() zu Content Collections gewechselt bin – und warum mir Zod-Validierung das Leben erleichtert."
date: 2026-02-14
tags: ["Astro", "TypeScript", "Content Collections", "Blog"]
category: Website
draft: true
---

## Das Problem mit Astro.glob()

Als ich den Blog aufgesetzt habe, habe ich wie jeder andere Anfänger `Astro.glob()` benutzt, um die Blog-Posts zu laden:

```astro
const posts = await Astro.glob('./blog/*.md');
```

Hat funktioniert, aber irgendwann habe ich gemerkt: **Ich habe keine Autocomplete-Unterstützung für die Frontmatter-Daten.** Wenn ich `post.frontmatter.titel` statt `post.frontmatter.title` schreibe, merke ich das erst beim Build – oder gar nicht, wenn ich keinen TypeScript-Fehler bekomme.

Außerdem: Was ist, wenn ich mal ein Pflichtfeld vergesse? Oder ein Datum falsch formatiere? Keine Validierung, keine Sicherheit.

## Content Collections: Der bessere Weg

Astro hat Content Collections eingeführt – und ich habe beschlossen, umzusteigen. Die Idee: Statt Markdown-Dateien irgendwo im `pages/`-Ordner zu haben, liegen sie jetzt in `src/content/blog/` und werden durch ein **Zod-Schema** validiert.

### Das Schema

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.date(),
        tags: z.array(z.string()),
        category: z.enum(['Homelab', 'Website', 'GameDev']),
        draft: z.boolean().optional().default(false),
    }),
});
```

Was macht das?
- `title` muss ein String sein – sonst Error beim Build
- `date` wird automatisch zu einem Date-Objekt geparst
- `draft` ist optional, default ist `false`
- `category` darf nur die drei definierten Werte haben

### Die neue Lade-Logik

Statt `Astro.glob()`:

```typescript
import { getCollection } from 'astro:content';

const posts = await getCollection('blog', ({ data }) => {
    return data.draft !== true;  // Filtere Drafts aus
});
```

**Der Unterschied:** `posts` ist jetzt typisiert. Wenn ich auf `post.data.` tippe, zeigt mir VS Code genau, welche Felder verfügbar sind. Keine Tippfehler mehr, keine vergessenen Pflichtfelder.

## Drafts: Unfertige Posts verstecken

Eine Sache, die mich richtig nervt: Wenn ich an einem Blog-Post schreibe, will ich ihn nicht sofort veröffentlichen. Aber ich will ihn lokal testen können.

Mit Content Collections geht das:

```yaml
---
title: "Mein unfertiger Post"
draft: true
---
```

Im Development-Modus (`npm run dev`) wird der Post angezeigt – im Production-Build (`npm run build`) nicht. Perfekt für Work-in-Progress.

## Migration: Einfacher als gedacht

Die Umstellung war eigentlich nur drei Schritte:

1. **Schema erstellen** – 15 Minuten
2. **Posts verschieben** – von `src/pages/blog/` nach `src/content/blog/`
3. **Imports anpassen** – `Astro.glob()` durch `getCollection()` ersetzen

Die URLs sind gleich geblieben (`/blog/post-name`), weil ich eine dynamische Route `[...slug].astro` erstellt habe.

## Was ich gelernt habe

- **Validation ist Gold wert** – Ich habe schon zweimal ein Datum falsch formatiert. Das Schema fängt das ab.
- **Drafts sind praktisch** – Endlich kann ich Posts schreiben, ohne sie sofort zu veröffentlichen.
- **TypeScript-Autocomplete** – Klingt klein, aber macht den Workflow so viel angenehmer.

## Was kommt als Nächstes?

Ich überlege, noch mehr Collections anzulegen – vielleicht für GameDev-Projekte oder ein Resource-Verzeichnis. Das Schema-System ist flexibel genug, um später weitere Felder hinzuzufügen.

---

*Content Collections waren für mich ein Game-Changer. Falls du auch mit Astro arbeitest: Probier's aus. Die Dokumentation ist gut, und die Zeit investiert sich schnell wieder raus.*
