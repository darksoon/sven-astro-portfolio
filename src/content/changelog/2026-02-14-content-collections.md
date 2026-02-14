---
title: "Content Collections: Typsichere Blog-Posts"
date: 2026-02-14
version: "1.1.0"
category: "Refactor"
---

## Das Problem mit Astro.glob()

`Astro.glob('./blog/*.md')` hat funktioniert, aber:
- Keine Autocomplete-Unterstützung
- Keine Validierung der Frontmatter-Daten
- Keine Type-Safety

## Content Collections

Astro's Lösung: Collections mit Zod-Schema.

**Schema definiert:**
- title (string, required)
- description (string, required)
- date (date, required)
- tags (array of strings)
- category (enum: Homelab, Website, GameDev)
- draft (boolean, optional)

**Vorteil:** Wenn ich ein Pflichtfeld vergesse, gibt es einen Build-Fehler. So soll es sein.

## Draft-System

Neue Funktion: `draft: true` im Frontmatter.
- In Development sichtbar
- In Production ausgeblendet

Perfekt für Posts, an denen ich noch schreibe.