---
title: "Performance-Tuning: Schneller Laden"
date: 2026-02-14
version: "1.4.0"
category: "Refactor"
---

## Schriften optimieren

**font-display: swap**
Alle 10 Schriftarten bekommen `font-display: swap`. Text erscheint sofort mit Fallback-Font, wird dann zum Custom Font getauscht.

**Ergebnis:** Kein "Invisible Text" mehr beim Laden.

## Bilder optimieren

**Hero-Avatar:** `fetchpriority="high"` für schnellen LCP (Largest Contentful Paint)
**Blog-Bilder:** Automatisches Lazy Loading
**Idle City Screenshot:** Lazy loaded mit Hover-Zoom-Effekt

## Prefetching

Aktiviert: Seiten werden beim Hovern über Links im Hintergrund geladen.

**Ergebnis:** Die Seite lädt spürbar schneller, besonders auf langsamen Verbindungen.