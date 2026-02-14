---
title: "SEO für Dev-Portfolios: Was ich beim Rumprobieren gelernt habe"
description: "Mein Versuch, SEO für ein Entwickler-Portfolio zu verstehen – ohne Marketing-Bullshit, dafür mit Sitemaps, Open Graph und der Erkenntnis, dass Google nicht mag, wenn man 'stats' im Dateinamen hat."
date: 2026-02-13
tags: ["SEO", "Astro", "Meta-Tags", "Google"]
category: Website
---

## Disclaimer: Ich bin kein SEO-Experte

Ganz ehrlich: Ich habe keine Ahnung, ob das alles wirklich funktioniert. Aber ich habe gelesen, dass es wichtig ist – also habe ich es implementiert. Dieser Post ist mehr "Dokumentation meiner Recherche" als "Ultimativer SEO-Guide".

## Das Problem mit stats.json

Kleiner Exkurs, bevor wir zu SEO kommen: Meine Homelab-Statistiken lagen in einer `stats.json`. Hat funktioniert, bis ich mit aktivem uBlock Origin getestet habe. Die Datei wurde geblockt.

Warum? **uBlock Origin filtert alles mit "stats" im Namen** als Tracker. Ich habe sie in `manifest.json` umbenannt – Problem gelöst. Manchmal sind SEO-Probleme einfach nur blöde Dateinamen.

## Sitemap: Die Landkarte für Crawler

Eine Sitemap ist im Grunde eine XML-Datei, die alle deine Seiten auflistet. Für Google (und andere Suchmaschinen), damit sie nichts verpassen.

```xml
<url>
  <loc>https://sven-neurath.de/blog/post-name/</loc>
  <lastmod>2026-02-14</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
</url>
```

In Astro dynamisch generiert:

```typescript
const posts = await getCollection('blog');
const pages = [
  { url: '/', priority: 1.0 },
  { url: '/blog/', priority: 0.8 },
  ...posts.map(post => ({ url: `/blog/${post.slug}/`, priority: 0.8 })),
];
```

Die Sitemap liegt unter `/sitemap.xml` und wird in der `robots.txt` referenziert:

```
User-agent: *
Allow: /
Sitemap: https://sven-neurath.de/sitemap.xml
```

Ob das wirklich was bringt? Keine Ahnung. Aber es schadet nicht, und es fühlt sich "professionell" an.

## Open Graph: Schön aussehen beim Teilen

Wenn jemand deinen Link auf Discord, Twitter oder LinkedIn postet, soll das gut aussehen. Dafür gibt es Open Graph Meta-Tags:

```html
<meta property="og:title" content="Post-Titel">
<meta property="og:description" content="Kurze Beschreibung">
<meta property="og:image" content="https://.../avatar.png">
<meta property="og:type" content="article">
```

Für Blog-Posts nutze ich `type="article"`, für die Startseite `type="website"`. Die `og:image` ist wichtig – ohne Bild sieht der Link-Preview lame aus.

### Twitter Cards

Ähnlich wie Open Graph, aber für Twitter (jetzt X, whatever):

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="...">
<meta name="twitter:description" content="...">
```

## Canonical URLs: Kein Duplicate Content

Wenn die gleiche Seite unter verschiedenen URLs erreichbar ist (z.B. mit und ohne trailing slash), sollte man Canonical URLs setzen. Das sagt Google: "Das hier ist die offizielle URL."

```html
<link rel="canonical" href="https://sven-neurath.de/blog/post-name/">
```

In Astro einfach umgesetzt:

```astro
const canonicalUrl = new URL(Astro.url.pathname, siteConfig.url).toString();
```

## JSON-LD: Structured Data für Maschinen

Das ist das nerdigste Feature: Maschinenlesbare Daten im JSON-Format, direkt im HTML. Damit kann Google Rich Snippets anzeigen.

Für die Homepage:

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Sven Neurath",
  "url": "https://sven-neurath.de",
  "jobTitle": "System Administrator & Game Developer",
  "sameAs": [
    "https://github.com/DarkSoon"
  ]
}
```

Für Blog-Posts:

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Post-Titel",
  "author": { "@type": "Person", "name": "Sven Neurath" },
  "datePublished": "2026-02-14"
}
```

Ob Google das wirklich nutzt? Keine Garantie. Aber wenn doch, könnten meine Suchergebnisse hübscher aussehen.

## Was ich nicht gemacht habe (und warum)

- **Keywords im Meta-Tag:** Angeblich ignoriert Google das eh.
- **Keyword-Dichte im Text:** Schreib für Menschen, nicht für Algorithmen.
- **Backlinks kaufen:** Das ist nicht mein Job, das ist mein Portfolio.

## Tools zum Testen

- **Google Search Console:** Zeigt, wie deine Seite bei Google aussieht
- **Lighthouse:** In Chrome DevTools eingebaut, checkt SEO-Grundlagen
- **Open Graph Debugger:** Facebook-Tool zum Testen von OG-Tags

## Fazit

SEO für ein Dev-Portfolio ist eigentlich überschaubar. Die wichtigsten Dinge:

1. **Sitemap** – damit alles gefunden wird
2. **Meta-Tags** – damit Links gut aussehen
3. **Schnelle Ladezeit** – Lighthouse hilft da
4. **Guter Content** – Der Rest ist Secondary

Ich habe das Gefühl, ich habe jetzt die Basics abgedeckt. Der Rest ist: Regelmäßig bloggen und hoffen, dass jemand meine Posts findet.

---

*Wenn du Tipps hast oder ich irgendwas falsch verstanden habe: Schreib mir. Wie gesagt, ich bin kein Experte, ich dokumentiere nur meinen Lernprozess.*
