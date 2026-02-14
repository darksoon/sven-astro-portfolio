# Änderungen & Offene Punkte

> Letzte Aktualisierung: 14.02.2026

---

## Phase 1: Foundation — 14.02.2026

### 1. Import Aliases eingerichtet

**Problem:** Tiefe relative Import-Pfade (`../../../components`) waren unübersichtlich und fehleranfällig.

**Lösung:** TypeScript Path Mappings in `tsconfig.json`:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/components/*": ["src/components/*"],
      "@/layouts/*": ["src/layouts/*"],
      "@/pages/*": ["src/pages/*"],
      "@/config/*": ["src/config/*"]
    }
  }
}
```

**Betroffene Dateien:** 9 Astro-Komponenten aktualisiert
- Alle Layouts: `@/layouts/BaseLayout.astro`, `@/components/Nav.astro`
- Alle Pages: `@/layouts/PortfolioLayout.astro`

---

### 2. Site-Config zentralisiert

**Neue Datei:** `src/config/site.ts`

**Enthält:**
- Site-URL, Name (DE/EN), Meta-Beschreibungen
- Autor-Informationen (Name, Email, GitHub, etc.)
- Social Links (GitHub, Discord, Itch.io, Email)
- Copyright-Info, Default-Sprache
- Helper-Funktionen: `getPageTitle()`, `getMetaDescription()`

**Betroffene Dateien:**
- `astro.config.mjs` — nutzt `siteConfig.url`
- `src/layouts/BaseLayout.astro` — Meta-Tags, Open Graph, Canonical URL
- `src/layouts/PortfolioLayout.astro` — Description-Handling
- `src/layouts/PageLayout.astro` — Copyright, bilinguale Footer-Texte
- `src/layouts/BlogPost.astro` — Dynamische Seitentitel
- `src/components/Footer.astro` — Dynamisches Copyright-Jahr
- `src/pages/index.astro` — Social Links, Manifest URL
- `src/pages/blog.astro` — Blog-Titel/Beschreibung
- `src/pages/impressum.astro` — Autor-Daten
- `src/pages/datenschutz.astro` — Autor-Daten
- `src/pages/snake.astro` — Branding-Texte

---

### 3. Content Collections für Blog

**Problem:** `Astro.glob()` ist veraltet und typsicher.

**Lösung:** Astro Content Collections mit Zod-Validierung

**Neue Dateien:**
- `src/content/config.ts` — Zod-Schema für Blog-Posts
- `src/content/blog/*.md` — Blog-Posts (verschoben von `src/pages/blog/`)
- `src/pages/blog/[...slug].astro` — Dynamische Route für einzelne Posts

**Schema (Zod):**
```typescript
{
  title: z.string(),
  description: z.string(),
  date: z.date(),
  tags: z.array(z.string()),
  image: z.string().optional(),
  draft: z.boolean().optional().default(false)
}
```

**Geänderte Dateien:**
- `src/pages/blog.astro` — Nutzt `getCollection('blog')` statt `Astro.glob()`
- `src/layouts/BlogPost.astro` — Props angepasst für `CollectionEntry<'blog'>`

**Entfernte Dateien:**
- `src/pages/blog/live-homelab-daten.md` → `src/content/blog/`
- `src/pages/blog/von-html-zu-astro.md` → `src/content/blog/`

**URLs bleiben gleich:** `/blog/post-name`

**Neue Features:**
- Typsichere Blog-Posts mit IntelliSense
- Draft-System bereit (Posts mit `draft: true` werden gefiltert)
- Erweiterbar für weitere Collections (z.B. Projekte)

---

## Test-Checkliste Phase 1

- [x] Build erfolgreich (`npm run build`)
- [x] Alle 7 Seiten generiert
- [ ] Deploy auf Server
- [ ] Startseite lädt korrekt
- [ ] Blog-Übersicht zeigt alle Posts
- [ ] Einzelne Blog-Posts erreichbar (`/blog/post-name`)
- [ ] Navigation funktioniert
- [ ] Sprachwechsel (DE/EN) klappt
- [ ] Keine 404-Fehler

---

## Alte Änderungen

---

## Problem: Live-Stats wurden nicht geladen

**Symptom:** Die Homelab-Statistiken wurden dauerhaft als "Statisch" angezeigt, obwohl die `stats.json` aktualisiert wurde.

**Ursache:** uBlock Origin (Adblocker) blockiert:
- URLs mit "stats" im Namen
- JavaScript-Dateien mit "stats" im Namen

---

## Durchgeführte Änderungen

### 1. Dateien umbenannt

| Datei | Alter Name | Neuer Name |
|-------|-----------|------------|
| JSON Daten | `stats.json` | `manifest.json` |
| JavaScript | `livestats.js` | `term.js` |

### 2. Code-Anpassungen

**`public/scripts/term.js`** (vorher `livestats.js`):
```javascript
// Geändert von:
statsUrl: 'stats.json',

// Auf:
statsUrl: '/manifest.json',
```

**`src/pages/index.astro`**:
```javascript
// Geändert von:
const res = await fetch('https://sven-neurath.de/stats.json');
<script is:inline src="/scripts/livestats.js"></script>

// Auf:
const res = await fetch('https://sven-neurath.de/manifest.json');
<script is:inline src="/scripts/term.js"></script>
```

### 3. Dokumentation aktualisiert

- `AGENTS.md` aktualisiert mit neuen Dateinamen

---

## Noch zu erledigen

### n8n Workflow anpassen

In n8n muss der **Output-Dateiname** geändert werden:

- **Von:** `stats.json`
- **Auf:** `manifest.json`

Das File wird weiterhin alle 15 Minuten via n8n aktualisiert, aber jetzt unter dem neuen Namen hochgeladen.

---

## Test-Checkliste

- [x] Lokal mit deaktiviertem Adblocker getestet
- [x] Build erfolgreich (`npm run build`)
- [ ] Deploy auf Server
- [ ] n8n Workflow angepasst (Dateiname)
- [ ] Mit aktivem uBlock Origin testen

---

## Dateien im dist/-Ordner

Nach dem Build müssen diese Dateien vorhanden sein:
```
dist/
├── manifest.json          ← Homelab-Daten (wird von n8n aktualisiert)
├── scripts/
│   └── term.js            ← Stats-Loader Script
└── ... (restliche Dateien)
```

---

## Wichtige Hinweise für später

1. **Nie wieder "stats" im Dateinamen verwenden** - uBlock Origin blockiert das
2. Die JSON-Datei muss im `public/`-Ordner bleiben (wird 1:1 kopiert)
3. Pfad im JavaScript ist absolut: `/manifest.json` (nicht relativ)

---

## Falls später Probleme auftreten

### Debugging im Browser:
1. F12 → Console öffnen
2. Seite neu laden
3. Nach Fehlern wie `ERR_BLOCKED_BY_CLIENT` suchen
4. Im Network-Tab prüfen ob `manifest.json` geladen wird (Status 200)

### Mögliche alternative Dateinamen (falls nötig):
- `version.json`
- `config.json`
- `data.json` (Vorsicht: könnte auch blockiert werden)
- `info.json`
