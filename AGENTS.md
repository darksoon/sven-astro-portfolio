# AGENTS.md - Projekt-Dokumentation für AI-Coding-Assistenten

> Diese Datei enthält alle relevanten Informationen über das Projekt-Setup, Architektur und Entwicklungskonventionen.
> Sprache: Deutsch (wie im restlichen Projekt verwendet)

---

## Projekt-Übersicht

**Name:** Sven Neurath Portfolio  
**Typ:** Statische Portfolio-Website mit Blog-Funktionalität  
**Besitzer:** Sven Neurath - IT Systemintegration | Homelab, Docker, Linux & Game Development  
**Live-URL:** https://sven-neurath.de

### Hauptfunktionen
- Portfolio-Seite mit Homelab-Showcase und GameDev-Projekten
- Blog mit Markdown-Unterstützung (automatisch generierte Übersicht und Post-Seiten)
- Bilinguale Unterstützung (Deutsch/Englisch) mit Sprachwechsler
- Dark/Light Theme Toggle
- Live-Homelab-Statistiken via `manifest.json`
- Interaktive AI-Snake-Demo (Desktop: Widget, Mobile: Vollbild)
- Deutsche Rechtsseiten (Impressum, Datenschutz)

---

## Technologie-Stack

| Komponente | Version | Zweck |
|------------|---------|-------|
| Astro | 5.17.2 | Static Site Generator |
| TypeScript | 5.9.3 | Typsichere Entwicklung |
| @astrojs/check | 0.9.6 | Astro TypeScript Checks |

### Frontend
- Vanilla JavaScript (kein Framework)
- CSS ohne Preprocessor (natives CSS mit Custom Properties)
- Lokale Schriftarten (Inter, JetBrains Mono, Orbitron, Share Tech Mono)

### Deployment
- Build-Output: Statische HTML/CSS/JS in `dist/`
- Hosting: Netcup (selbstgehostet)
- Kein Node.js auf dem Server erforderlich

---

## Projektstruktur

```
astro-portfolio/
├── astro.config.mjs          # Astro-Konfiguration (Site-URL)
├── package.json              # Dependencies & Scripts
├── tsconfig.json             # TypeScript-Config (extends astro/tsconfigs/strict)
├── public/                   # Statische Assets (werden 1:1 kopiert)
│   ├── fonts/                # Lokale Schriftarten
│   │   ├── fonts.css         # Font-Face Definitionen
│   │   ├── inter-*.ttf       # Inter Font-Familie (300-900)
│   │   ├── jetbrains-*.ttf   # JetBrains Mono (400-600)
│   │   ├── Orbitron-*.ttf    # Orbitron (für Snake)
│   │   └── ShareTechMono-Regular.ttf
│   ├── img/
│   │   └── avatar.png        # Profilbild/Favicon
│   ├── manifest.json         # Live-Homelab-Daten (wird von n8n alle 15 Min aktualisiert)
│   ├── scripts/
│   │   ├── theme.js          # Theme & Sprach-Manager
│   │   ├── main.js           # Parallax, Scroll-Effekte, Card Tilt
│   │   ├── term.js           # Fetch & Update Homelab-Stats
│   │   └── snake.js          # AI Snake Game (Desktop-Widget)
│   └── styles/
│       └── global.css        # Haupt-Stylesheet mit CSS-Variablen
└── src/
    ├── layouts/
    │   ├── BaseLayout.astro      # HTML-Grundgerüst, Meta-Tags, Theme-Init
    │   ├── PortfolioLayout.astro # Hauptseite mit Nav, Footer, Background-FX
    │   ├── PageLayout.astro      # Unterseiten (Impressum, Datenschutz)
    │   └── BlogPost.astro        # Blog-Post Template (Markdown → HTML)
    ├── components/
    │   ├── Nav.astro             # Navigation mit Sprachwechsler
    │   └── Footer.astro          # Footer mit Links
    └── pages/
        ├── index.astro           # Hauptseite (Portfolio)
        ├── blog.astro            # Blog-Übersicht (listet alle Posts automatisch)
        ├── snake.astro           # Vollbild Snake Game (Mobile/Desktop)
        ├── impressum.astro       # Impressum (deutsches Recht)
        ├── datenschutz.astro     # Datenschutzerklärung
        └── blog/
            ├── live-homelab-daten.md   # Blog-Post 1
            └── von-html-zu-astro.md    # Blog-Post 2
```

---

## Build-Commands

```bash
# Dependencies installieren
npm install

# Development-Server starten (Hot-Reload auf http://localhost:4321)
npm run dev

# Produktions-Build erstellen (Output in dist/)
npm run build

# Gebaute Version lokal testen
npm run preview
```

---

## Code-Konventionen

### Allgemein
- **Sprache:** Alle Kommentare und Dokumentation auf Deutsch
- **Bilinguale Inhalte:** HTML-Elemente mit `data-de` und `data-en` Attributen für Übersetzungen
- **TypeScript:** Strict Mode aktiviert (via `astro/tsconfigs/strict`)

### Astro-Komponenten
```astro
---
// Kommentare im Frontmatter
import Component from './Component.astro';

interface Props {
  title: string;
  description?: string;
}

const { title, description = 'Default' } = Astro.props;
---

<!-- HTML-Template -->
<div class="klassen-namen-mit-bindestrich">{title}</div>

<style>
  /* Scoped Styles für diese Komponente */
  .klassen-namen-mit-bindestrich { }
</style>
```

### Client-Side JavaScript
- `is:inline` Direktive für Scripts, die im Browser laufen sollen
- Scripts werden in `public/scripts/` abgelegt
- LocalStorage für Theme- und Spracheinstellungen (`theme`, `lang`)
- Alle Scripts warten auf `DOMContentLoaded`

### CSS
- Kein CSS-Preprocessor (vanilla CSS)
- CSS-Variablen für Farben in `global.css` definiert
- BEM-ähnliche Namenskonventionen (keine strikte BEM)
- Scoped Styles in Astro-Komponenten verwenden

### Blog-Posts (Markdown)
Frontmatter-Schema:
```yaml
---
layout: ../../layouts/BlogPost.astro
title: "Titel des Posts"
description: "Kurzbeschreibung für die Übersicht"
date: "2026-02-13"
tags: ["Homelab", "Docker", "Tutorial"]
---
```

---

## Wichtige Implementierungsdetails

### Theme & Sprache
- Manager implementiert in `public/scripts/theme.js`
- Speichert Einstellungen in LocalStorage (`theme`, `lang`)
- Sprachwechsel via `data-de`/`data-en` Attribute auf Elementen
- Theme: `data-theme="dark"` oder `data-theme="light"` auf `<html>`
- Sprache: `lang="de"` oder `lang="en"` auf `<html>`

### Homelab Live-Stats
- `public/manifest.json` wird via n8n alle 15 Minuten aktualisiert
- **WICHTIG:** Niemals "stats" im Dateinamen verwenden - wird von uBlock Origin blockiert!
- `public/scripts/term.js` fetched die Daten client-seitig mit Cache-Busting (`?t=${Date.now()}`)
- Fallback auf statische Werte, wenn JSON nicht verfügbar
- Live-Indikator zeigt Aktualitätsstatus an

### Snake Game
- Desktop: Inline-Widget auf der Hauptseite (`index.astro`)
- Mobile: Eigene Seite `/snake` (`snake.astro`)
- AI-Algorithmus mit BFS-Pfadfindung
- Vollständig in einer Inline-`<script>` auf der Snake-Seite

---

## Testing

**Hinweis:** Das Projekt hat aktuell keine automatisierten Tests.

Manuelles Testing:
1. `npm run dev` starten
2. Auf `http://localhost:4321` testen
3. Responsive Design in DevTools prüfen
4. Sprachwechsel (DE/EN) testen
5. Blog-Posts lesbarkeit prüfen
6. Mit aktivem Adblocker testen (uBlock Origin)

---

## Deployment

### Build-Prozess
```bash
npm run build
# Output wird in dist/ geschrieben
```

### Upload auf Server
```bash
# Option 1: rsync
rsync -avz dist/ user@server:/var/www/sven-neurath.de/

# Option 2: SFTP/FTP
# dist/ Inhalt hochladen
```

**Wichtig:** `dist/` enthält reines HTML/CSS/JS - kein Node.js auf dem Server nötig.

---

## Security & Datenschutz

- Keine Cookies verwendet
- Keine externen Tracker
- Schriftarten lokal gehostet (kein Google Fonts)
- LocalStorage nur für Theme/Sprache (verlässt nicht den Browser)
- YouTube-Link erst bei Klick aktiv (Datenschutz)
- `manifest.json` (kein `stats.json` wegen Adblockern)

---

## Häufige Änderungen

### Neuen Blog-Post erstellen
1. Datei erstellen: `src/pages/blog/[name].md`
2. Frontmatter mit `layout: ../../layouts/BlogPost.astro`
3. Titel, Description, Date (ISO-Format), Tags angeben
4. Markdown-Inhalt schreiben
5. Automatisch in der Übersicht sichtbar (`blog.astro` verwendet `Astro.glob`)

### Neue Seite hinzufügen
1. Datei erstellen: `src/pages/[name].astro`
2. `PageLayout` oder `PortfolioLayout` importieren
3. Titel und Inhalt definieren
4. Bei Bedarf in `Nav.astro` verlinken

### Navigation ändern
- Datei: `src/components/Nav.astro`
- Links mit `data-de`/`data-en` für Übersetzung

---

## Bekannte Einschränkungen & Learnings

1. **Adblocker-Kompatibilität:** Dateien mit "stats" im Namen werden von uBlock Origin blockiert. Daher wurde `stats.json` zu `manifest.json` umbenannt.

2. **Cache-Busting:** Beim Fetchen der Live-Daten immer `?t=${Date.now()}` anhängen, sonst zeigt der Browser veraltete Werte.

3. **Fallback-Werte:** Immer statische Fallback-Werte im HTML haben, falls die JSON nicht ladbar ist.

4. **Font-Loading:** Alle Schriftarten sind lokal, keine externen Requests.

---

## Kontext für AI-Assistenten

Wenn du Änderungen vornimmst:
1. Halte dich an die bestehende Code-Struktur
2. Verwende deutsche Kommentare
3. Achte auf bilingualen Content (`data-de`/`data-en`)
4. Teste responsive Verhalten
5. Stelle sicher, dass der Build (`npm run build`) fehlerfrei durchläuft
6. Vermeide "stats" in Dateinamen (Adblocker-Problem)
