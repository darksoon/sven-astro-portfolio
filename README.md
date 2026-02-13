# Sven Neurath Portfolio

> Persönliche Portfolio-Website mit Blog – IT Systemintegration, Homelab & Game Development

🔗 **Live:** [sven-neurath.de](https://sven-neurath.de)

---

## 🚀 Über das Projekt

Diese Website ist mein digitales Zuhause – gebaut mit [Astro](https://astro.build/), gehostet auf meinem eigenen Server. 

Hier zeige ich:
- 🖥️ Mein **Homelab-Setup** (Unraid, Docker, 24/7 Infrastructure)
- 🎮 **GameDev-Projekte** (Godot 4.6, GDScript)
- 📝 **Blog-Posts** über Technik, Self-Hosting und meinen Weg in die IT

---

## 🛠️ Tech Stack

| Kategorie | Technologie |
|-----------|-------------|
| Framework | [Astro](https://astro.build/) 5.x |
| Sprache | TypeScript |
| Styling | Vanilla CSS (kein Framework) |
| Fonts | Lokal gehostet (Inter, JetBrains Mono) |
| Hosting | Netcup (selbstgehostet) |
| CI/CD | Manuelles Deployment |

---

## 📋 Features & Roadmap

### ✅ Implementiert
- [x] Portfolio mit Homelab-Showcase
- [x] Blog mit Markdown-Unterstützung
- [x] Bilinguale Inhalte (DE/EN Toggle)
- [x] Live-Homelab-Statistiken (via manifest.json)
- [x] Interaktive AI-Snake Demo
- [x] Dark Theme only (keine helle Seite! 🖤)

### 🚧 In Arbeit
- [ ] Content Collections für typsichere Blog-Posts
- [ ] View Transitions für flüssige Seitenwechsel
- [ ] RSS Feed
- [ ] SEO-Optimierung (Sitemap, Meta-Tags)
- [ ] Performance (Bildoptimierung, Font Loading)

### 📌 Geplant
- [ ] TinaCMS Integration (WYSIWYG Blog-Editor)
- [ ] Mehr Blog-Posts (Werdegang historysieren)
- [ ] Tag-Filter für Blog

Siehe [FEATURES.md](./FEATURES.md) für die komplette Ideen-Sammlung.

---

## 🏃‍♂️ Quick Start

```bash
# 1. Dependencies installieren
npm install

# 2. Dev-Server starten
npm run dev
# → http://localhost:4321

# 3. Produktions-Build
npm run build
# → Output in dist/
```

---

## 📁 Wichtige Dateien

```
astro.config.mjs     # Astro-Konfiguration
public/manifest.json # Live-Homelab-Daten (n8n aktualisiert)
src/pages/blog/      # Blog-Posts (Markdown)
src/layouts/         # Astro Layouts
public/scripts/      # Client-Side JS (Theme, Snake, etc.)
```

---

## 📝 Blog schreiben

Neuer Post in `src/pages/blog/dein-post.md`:

```markdown
---
layout: ../../layouts/BlogPost.astro
title: "Titel"
description: "Kurzbeschreibung"
date: "2026-02-13"
tags: ["Homelab", "Docker"]
---

Hier kommt der Inhalt...
```

---

## 🔒 Datenschutz & Legal

- **Keine Cookies** 🍪❌
- **Keine externen Tracker**
- **Keine Google Fonts** (alles lokal)
- [Impressum](https://sven-neurath.de/impressum)
- [Datenschutz](https://sven-neurath.de/datenschutz)

---

## 👤 Über mich

**Sven Neurath** – 44, dreifacher Familienvater, auf dem Weg in die IT Systemintegration.

- 🔧 10+ Jahre Linux & Self-Hosting
- 🏠 24/7 Homelab (Unraid, Docker, WireGuard)
- 🎮 GameDev-Hobbyist (Godot)
- 🌐 [GitHub](https://github.com/DarkSoon) | [Website](https://sven-neurath.de)

---

> Built with 🖤 and Astro
