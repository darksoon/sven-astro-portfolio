---
title: "Migration zu Astro: Der richtige Schritt"
date: 2026-02-01
version: "1.0.0"
category: "Refactor"
---

## Warum Astro?

Die HTML-Version wurde unübersichtlich. Jede Änderung am Layout musste in drei Dateien gemacht werden. Blog-Posts waren mühsam zu pflegen.

Astro verspricht:
- Komponenten (Layout einmal definieren)
- Markdown-Support für Blog
- Statischer Export (kein Server nötig)
- Kein Client-JavaScript-Framework (kein React, Vue, etc. nötig)

## Die Migration

**Aufwand:** Ein voller Tag
**Schritte:**
1. Astro-Projekt initialisieren
2. Layouts erstellen (BaseLayout, PortfolioLayout)
3. Komponenten auslagern (Nav, Footer)
4. Blog-Posts zu Markdown konvertieren
5. Styling übertragen

## Ergebnis

**Vorher:** 500+ Zeilen HTML in einer Datei
**Nachher:** Saubere Struktur mit Layouts und Komponenten

**Build:** `npm run build` → `dist/`-Ordner mit purem HTML/CSS/JS

**Fazit:** Hat sich gelohnt. Die Seite ist jetzt wartbar.