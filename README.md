# Sven Neurath Portfolio - Astro

Dein Portfolio, jetzt mit Astro. Blog-Support, Projekt-Seiten, saubere Struktur.

## 📁 Projektstruktur

```
astro-portfolio/
├── astro.config.mjs          ← Astro-Konfiguration
├── package.json               ← Dependencies (nur Astro!)
├── tsconfig.json
├── public/                    ← Statische Dateien (werden 1:1 kopiert)
│   ├── fonts/                 ← Deine Fonts (Inter, JetBrains Mono)
│   │   └── fonts.css
│   ├── img/                   ← Bilder (avatar.png etc.)
│   ├── scripts/
│   │   ├── theme.js           ← Theme/Language Toggle
│   │   ├── main.js            ← Parallax, Scroll, Card Tilt
│   │   ├── livestats.js       ← stats.json Fetch
│   │   └── snake.js           ← Snake AI Game
│   ├── styles/
│   │   └── global.css         ← Dein bestehendes CSS (1:1)
│   └── stats.json             ← Live-Daten vom Server
└── src/
    ├── layouts/
    │   ├── BaseLayout.astro   ← HTML-Grundgerüst (head, body)
    │   ├── PortfolioLayout.astro ← Hauptseite (Nav, BG-FX, Footer)
    │   ├── PageLayout.astro   ← Unterseiten (Impressum, Datenschutz)
    │   └── BlogPost.astro     ← Blog-Post Template (Markdown → HTML)
    ├── components/
    │   ├── Nav.astro           ← Navigation (einmal definiert!)
    │   └── Footer.astro        ← Footer (einmal definiert!)
    └── pages/
        ├── index.astro         ← Hauptseite
        ├── blog.astro          ← Blog-Übersicht
        ├── impressum.astro     ← Impressum
        ├── datenschutz.astro   ← Datenschutz
        └── blog/
            ├── live-homelab-daten.md  ← Beispiel-Post 1
            └── von-html-zu-astro.md   ← Beispiel-Post 2
```

## 🚀 Setup (auf deinem Rechner oder Server)

### 1. Node.js installieren (falls nicht vorhanden)

```bash
# Check ob Node da ist
node --version    # Braucht mindestens v18

# Falls nicht: https://nodejs.org/ (LTS Version)
```

### 2. Projekt einrichten

```bash
# In den Projektordner wechseln
cd astro-portfolio

# Dependencies installieren
npm install

# Dev-Server starten (mit Hot-Reload)
npm run dev
```

Die Seite läuft jetzt auf `http://localhost:4321`

### 3. Deine Dateien reinkopieren

**WICHTIG - Diese Dateien musst du noch manuell kopieren:**

```bash
# Deine Fonts
cp -r /pfad/zu/deinen/fonts/* public/fonts/

# Dein Avatar und Bilder
cp /pfad/zu/deinen/img/* public/img/

# Dein Snake-Code (den kompletten JS-Code)
# → In public/scripts/snake.js einfügen

# Deine stats.json (wird eh per n8n aktualisiert)
# → Liegt schon als Platzhalter in public/stats.json
```

### 4. Für Produktion bauen

```bash
# Build erstellen
npm run build

# Output liegt in dist/ - das sind pure HTML-Dateien
# Diesen Ordner auf deinen Netcup-Server hochladen
```

### 5. Preview (optional)

```bash
# Gebaute Version lokal testen
npm run preview
```

## ✍️ Neuen Blog-Post schreiben

So einfach geht's:

### 1. Neue Markdown-Datei erstellen

```bash
# Datei anlegen
touch src/pages/blog/mein-neuer-post.md
```

### 2. Frontmatter + Content schreiben

```markdown
---
layout: ../../layouts/BlogPost.astro
title: "Mein neuer Post"
description: "Kurzbeschreibung für die Blog-Übersicht"
date: "2026-02-15"
tags: ["Homelab", "Docker", "Tutorial"]
---

## Überschrift

Hier kommt dein Text. Normales Markdown.

### Code-Blöcke funktionieren

\`\`\`bash
docker ps
\`\`\`

### Bilder auch

![Beschreibung](/img/mein-bild.png)

### Links

[Mein GitHub](https://github.com/DarkSoon)
```

### 3. Fertig!

Der Post erscheint automatisch auf `/blog` und hat seine eigene Seite unter `/blog/mein-neuer-post`.

## 💡 Blog-Post Ideen

Basierend auf deinem Setup:

- ✅ "Live-Daten vom Homelab auf die Website" (schon angelegt!)
- ✅ "Von statischem HTML zu Astro" (schon angelegt!)
- 📝 "VLAN-Segmentierung im Heimnetzwerk"
- 📝 "Docker-Container richtig absichern"
- 📝 "n8n Workflows für Server-Monitoring"
- 📝 "VaultWarden self-hosten: Setup & Backup"
- 📝 "Nextcloud vs. Google Drive: 1 Jahr Self-Hosting"
- 📝 "Mein erster Godot-Prototyp: Lessons Learned"
- 📝 "Reverse Proxy mit Nginx: Basics für Anfänger"

## 🔧 Für Kimi / AI-Assistenten

Falls du Kimi Code nutzen willst um Änderungen zu machen:

**Neuen Blog-Post erstellen:**
> "Erstelle einen neuen Blog-Post in src/pages/blog/[name].md mit dem Layout ../../layouts/BlogPost.astro. Frontmatter braucht: title, description, date, tags."

**Neue Seite erstellen:**
> "Erstelle eine neue Astro-Seite in src/pages/[name].astro die das PageLayout importiert."

**Component ändern:**
> "Ändere die Navigation in src/components/Nav.astro - füge einen Link zu /projekte hinzu."

## ⚡ Deployment auf Netcup

```bash
# 1. Bauen
npm run build

# 2. dist/ Ordner auf Server kopieren (z.B. per rsync)
rsync -avz dist/ user@server:/var/www/sven-neurath.de/

# Oder per SFTP/FTP den Inhalt von dist/ hochladen
```

Der Output in `dist/` ist pures HTML/CSS/JS - genau wie vorher. Kein Node.js auf dem Server nötig.
