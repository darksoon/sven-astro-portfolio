# Projekt-Todo

> Aktive Aufgabenliste für die Portfolio-Website.
> Wird nach jeder Phase aktualisiert.

---

## 📦 PHASE 1: Foundation

- [x] Import Aliases (@/components statt ../../)
- [x] Site-Config zentralisiert
- [x] Content Collections (typsichere Blog-Posts)

**Status:** ✅ Bereit zum Deploy — Siehe `CHANGES.md` für Details

**Commit-Vorschlag:**
```
feat: Phase 1 Foundation - Import Aliases, Site-Config, Content Collections

- Add TypeScript path mappings (@/* aliases)
- Create centralized site config (src/config/site.ts)
- Migrate blog from Astro.glob() to Content Collections
- Update all imports to use new aliases
- Add Zod schema for type-safe blog posts
```

---

## 🚀 PHASE 2: Core Features

- [x] View Transitions (flüssige Seitenwechsel)
- [x] Prefetching (Seiten im Hintergrund laden)
- [x] RSS Feed generieren
- [x] Drafts System (für unfertige Posts)

**Status:** ✅ Live auf Vercel

---

## 🔍 PHASE 3: SEO

- [x] Sitemap + robots.txt
- [x] Meta-Tags erweitern (Open Graph, Twitter, Canonical)
- [x] Structured Data JSON-LD (Person, BlogPosting)

**Status:** ✅ Live

---

## ⚡ PHASE 4: Performance

- [x] Font Loading optimieren (font-display: swap)
- [x] Bildoptimierung (Lazy Loading, fetchpriority)

**Status:** ✅ Live - "fucking fast"

---

## 🎨 PHASE 5: UX Polish

- [x] Light Theme komplett entfernen (nur Dark Side)
- [x] 404-Fehlerseite mit zufälligem Sarkasmus
- [x] "Zurück nach oben" Button
- [x] Code-Snippets/Syntax-Highlighting für Blog

**Status:** ✅ Live

---

## 🔧 PHASE 6: Advanced

- [ ] Pagination für Blog (viele Posts geplant)
- [ ] Redirects (für zukünftige URL-Änderungen)
- [ ] Git-based Last Modified

**Status:** ⏳ Wartet auf Phase 5

---

## ✅ PHASE 7: Quality

- [ ] HTML-Validierung fixen
- [ ] Accessibility verbessern

**Status:** ⏳ Wartet auf Phase 6

---

## 🔧 PHASE 6: Advanced (Next Level)

- [ ] Erweiterte Homelab-Status-Seite (/status oder /homelab)
  - Live-Graphen (CPU, RAM über Zeit)
  - Container-Status als visuelle Grid-View
  - Uptime-History
  - Datenrate: Alle 15 Min (wie jetzt) oder 1x pro Stunde?
- [ ] GameDev: Ladebalken für Idle City Tycoon (ca. 21% Fortschritt)
- [ ] Timeline/Changelog auf der Seite (aus Git-History oder manuell)
- [ ] Blog-Posts: Gleiches Layout wie Hauptseite (Nav + Footer + Background)
  - Soll wie Single-Page wirken, nicht wie separate Seiten

**Status:** ⏳ Brainstorming

## 📌 LATER

- [ ] Apple Touch Icon (für "Zum Home-Bildschirm")
- [ ] Web App Manifest (für "Installieren als App")
- [ ] Kommentare (Giscus)
- [ ] Newsletter

**Status:** ⏳ Irgendwann mal

---

## 📝 Changelog

| Datum | Phase | Was gemacht |
|-------|-------|-------------|
| 14.02.2026 | 1-5 | Foundation, Core Features, SEO, Performance, UX Polish |
| 14.02.2026 | Blog | 6 neue Posts, Kategorien, Bugfix View Transitions |

---

*Letzte Aktualisierung: siehe Git History*
