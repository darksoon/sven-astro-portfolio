---
title: "Mein Portfolio-Upgrade: Von chaotic gut zu strukturiert besser"
description: "Wie ich meine Astro-Website in fünf Phasen aufgeräumt habe – mit Import-Aliases, SEO und einer Menge 'Hätte ich das nicht früher machen können?'"
date: 2026-02-14
tags: ["Astro", "Refactoring", "Webentwicklung", "SEO"]
category: Website
---

## Ausgangslage: Es funktioniert, aber...

Mein Portfolio lief. Die Seite war online, der Blog ging, die Homelab-Daten wurden angezeigt. Aber wenn ich ehrlich bin: Der Code war ein bisschen... chaotisch.

- Relative Import-Pfade wie `../../../components/Footer.astro`
- Hartcodierte Strings überall (Titel, Email, Social Links)
- Keine Sitemap, keine ordentlichen Meta-Tags
- Kein Plan, wie ich das alles wartbar halten soll

Ich habe beschlossen, das Ganze mal strukturiert anzugehen. In fünf Phasen.

## Phase 1: Foundation (Die Basics geradeziehen)

### Import-Aliases statt `./../../../`

Das nervt mich am meisten: Wenn ich eine Komponente verschiebe, müssen alle Imports angepasst werden. Die Lösung: TypeScript Path-Mappings.

```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

Jetzt kann ich überall schreiben:

```astro
import Footer from '@/components/Footer.astro';
import PortfolioLayout from '@/layouts/PortfolioLayout.astro';
```

Egal, wo die Datei liegt. Das ist so viel angenehmer.

### Zentrale Config

Statt überall `info@sven-neurath.de` zu schreiben, gibt es jetzt eine Datei:

```typescript
// src/config/site.ts
export const siteConfig = {
  url: 'https://sven-neurath.de',
  author: {
    name: 'Sven Neurath',
    email: 'info@sven-neurath.de',
  },
  // ...
};
```

Will ich die Email ändern? Eine Zeile. Ein Ort.

## Phase 2: Core Features (Das coole Zeug)

### View Transitions

Astro hat ein Experimentelles Feature: View Transitions. Flüssige Übergänge zwischen Seiten, ohne dass die Navigation neu lädt.

```astro
<!-- BaseLayout.astro -->
<head>
  <ViewTransitions />
</head>
```

Dazu `transition:persist` auf Nav und Footer, damit sie nicht flackern. Das Ergebnis: Die Seite fühlt sich an wie eine App, nicht wie eine klassische Website.

### RSS Feed

Warum nicht? Ein paar Zeilen Code:

```typescript
// src/pages/rss.xml.ts
export const GET = () => {
  return rss({
    title: siteConfig.name,
    description: 'Blog-Posts',
    site: siteConfig.url,
    items: posts.map(post => ({
      title: post.data.title,
      link: `/blog/${post.slug}/`,
    })),
  });
};
```

Fertig. `/rss.xml` existiert.

## Phase 3: SEO (Damit Google mich findet)

Hier habe ich viel nachgelesen. Was brauche ich wirklich?

### Sitemap und robots.txt

Automatisch generiert aus allen Seiten und Blog-Posts. Google kann jetzt alles crawlen.

### Open Graph / Twitter Cards

Wenn jemand meinen Blog-Post auf Discord oder Twitter teilt, soll das schön aussehen:

```html
<meta property="og:title" content="Post-Titel">
<meta property="og:description" content="Beschreibung">
<meta property="og:image" content="https://.../avatar.png">
<meta name="twitter:card" content="summary_large_image">
```

### JSON-LD (Structured Data)

Das ist fancy: Maschinenlesbare Daten für Google, damit Rich Snippets angezeigt werden.

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Post-Titel",
  "author": { "@type": "Person", "name": "Sven Neurath" }
}
```

Keine Ahnung, ob das wirklich was bringt, aber schaden kann's nicht.

## Phase 4: Performance (Schneller machen)

### Font Loading

`font-display: swap` zu allen Schriften hinzugefügt. Jetzt wird Text sofort angezeigt, auch wenn die Custom-Font noch lädt. Kein "Invisible Text" mehr.

### Bilder optimieren

- Avatar bekommt `fetchpriority="high"` (wichtig für LCP)
- Blog-Bilder werden lazy-loaded
- Kleinigkeiten, die Lighthouse happy machen

Das Ergebnis: Die Seite lädt spürbar schneller.

## Phase 5: UX Polish (Die Details)

### Light Theme ist tot

Ich habe den Theme-Toggle entfernt. Es gibt nur noch Dark. Einfacher, weniger Code, und ehrlich gesagt: Wer will schon ein helles Portfolio?

### 404-Seite mit Sarkasmus

Eine nette 404-Seite mit Terminal-Design und zufälligen sarkastischen Nachrichten. Weil warum nicht.

### Syntax Highlighting

Code-Blöcke im Blog werden jetzt mit dem Dracula-Theme eingefärbt. Sieht viel besser aus als plain Text.

### Back-to-Top Button

Erscheint beim Scrollen. Kleines Detail, aber praktisch.

## Fazit: War sich das wert?

Absolut. Nicht wegen der Features an sich – die meisten Besucher merken den Unterschied nicht. Aber für mich als Entwickler ist das jetzt ein Projekt, das ich wieder anfassen kann, ohne mich zu ärgern.

Die strukturierte Herangehensweise in Phasen hat geholfen, nicht im Chaos zu versinken. Phase 1 war trocken (Aliases, Config), aber ohne das Fundament wären die späteren Features viel komplizierter geworden.

---

*Das war ein langer Abend voller Git-Commits. Aber jetzt läuft alles sauber – und ich habe endlich eine Sitemap. Falls du ähnliche Projekte hast: Fang mit der Config an, nicht mit den Features. Vertrau mir.*
