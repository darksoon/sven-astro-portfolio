---
layout: ../../layouts/BlogPost.astro
title: "Von statischem HTML zu Astro"
description: "Warum ich mein Portfolio von reinem HTML/CSS/JS auf Astro umgestellt habe – und was das für Blog und Projekte bedeutet."
date: "2026-02-13"
tags: ["Astro", "Webentwicklung", "Portfolio"]
---

## Ausgangslage

Meine Portfolio-Seite war pures HTML, CSS und JavaScript. Drei HTML-Dateien (Hauptseite, Impressum, Datenschutz), eine CSS-Datei, ein JavaScript-File. Simpel, schnell, keine Dependencies.

Das Problem: **Jede Änderung am Layout oder Footer musste in allen drei Dateien einzeln gemacht werden.** Und sobald ich einen Blog oder Projektseiten hinzufügen wollte, hätte ich für jeden Post eine komplette HTML-Datei bauen müssen.

## Warum Astro?

Astro hat mich aus mehreren Gründen überzeugt:

- **Null JavaScript im Output** – Astro generiert statisches HTML, genau wie vorher
- **Markdown für Blog-Posts** – Ich schreibe `.md`-Dateien und Astro macht HTML draus
- **Components** – Layout, Nav und Footer nur einmal definieren
- **Kein Client-Framework nötig** – Kein React, kein Vue, reines Astro reicht

## Was hat sich geändert?

### Vorher: 3 HTML-Dateien mit dupliziertem Code

```
index.html      (500+ Zeilen, eigenes CSS inline)
impressum.html  (100+ Zeilen, CSS dupliziert)
datenschutz.html (150+ Zeilen, CSS dupliziert)
```

### Nachher: Saubere Astro-Struktur

```
src/
  layouts/
    BaseLayout.astro      ← HTML-Grundgerüst
    PortfolioLayout.astro  ← Hauptseite mit Nav/Footer
    BlogPost.astro         ← Blog-Post Template
  components/
    Nav.astro              ← Navigation (einmal definiert)
    Footer.astro           ← Footer (einmal definiert)
  pages/
    index.astro            ← Hauptseite
    blog.astro             ← Blog-Übersicht
    blog/
      erster-post.md       ← Blog-Post als Markdown
```

## Der Build-Prozess

```bash
npm run build
```

Das generiert einen `dist/`-Ordner mit purem HTML, CSS und JS – genau wie vorher. Der Output wird auf meinen Netcup-Server deployed. Für den Besucher ändert sich nichts, die Seite ist genauso schnell wie vorher.

## Fazit

Die Migration hat sich gelohnt. Nicht wegen der Hauptseite – die war auch vorher okay. Sondern weil ich jetzt in 5 Minuten einen neuen Blog-Post schreiben kann, ohne HTML zu kopieren. Und jede Änderung am Layout automatisch überall greift.

---

*Das war übrigens mein erster Astro-Kontakt. Nächstes Projekt: i18n sauber mit Astro umsetzen statt data-Attribute.*
