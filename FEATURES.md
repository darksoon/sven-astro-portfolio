# Features & Ideen-Sammlung

> Gesammelte Ideen für zukünftige Erweiterungen der Portfolio-Website.
> Sprache: Deutsch

---

## 🎯 CMS & Content Management

### TinaCMS Integration
- **Beschreibung:** Git-basiertes WYSIWYG-CMS für bequemeres Blog-Schreiben
- **Vorteile:** Visueller Editor, Drag & Drop Bilder, Live Preview
- **Kompatibilität:** Funktioniert mit bestehenden Markdown-Posts
- **Aufwand:** ~30 Min Setup, GitHub OAuth erforderlich
- **Priorität:** Später (erst abwarten ob Markdown nervt)

---

## 🎨 Design & UX

### CSS Modernisierung (beiläufig)
- **CSS Nesting:** Native Verschachtelung statt flacher Struktur
- **`:has()` Selektor:** Parent-Selektor für komplexere Styles
- **Container Queries:** Responsive Design basierend auf Container-Größe
- **Hinweis:** Nur umsetzen wenn wir eh an CSS-Dateien arbeiten

### OG-Bilder automatisch generieren
- **Beschreibung:** Social-Media Preview-Bilder dynamisch erstellen
- **Nutzung:** Für jeden Blog-Post ein einzigartiges Share-Bild
- **Tool:** Astro OG Image oder Satori
- **Priorität:** Nice-to-have

---

## 📊 Analytics & Monitoring

### Privacy-friendly Analytics
- **Optionen:** Plausible, Umami, oder Cloudflare Web Analytics
- **Vorteil:** Keine Cookies, DSGVO-konform
- **Hinweis:** Nur wenn du wissen willst wer deine Seite besucht

---

## 🔧 Technische Verbesserungen

### Partytown
- **Beschreibung:** Scripts (Analytics, etc.) in Web Worker auslagern
- **Nutzen:** Hauptthread bleibt frei für UI → schnellere Ladezeit
- **Priorität:** Niedrig (keine externen Scripts aktuell)

### Table of Contents (TOC)
- **Beschreibung:** Automatisches Inhaltsverzeichnis für lange Blog-Posts
- **Nutzung:** Tutorial-Posts mit vielen Abschnitten
- **Priorität:** Mittel (wenn lange Tutorials kommen)

---

## 🖥️ Homelab Advanced

### Erweiterte Status-Seite mit Graphen
- **Beschreibung:** Neue Seite `/status` oder `/homelab` mit:
  - Live-CPU/RAM-Graphen über 24h
  - Container-Status als visuelle Grid-View
  - Uptime-History
  - Storage-Trends
- **Daten:** 2 Endpunkte nötig:
  - `manifest.json` (alle 15 Min) für aktuellen Status
  - `history.json` (1x/Tag) für 24h-Graphen
- **Visualisierung:** Chart.js oder eigene Canvas-Lösung
- **Priorität:** Mittel (erst wenn mehr Daten vorhanden)

---

## 🚀 "Maybe Someday"

| Feature | Beschreibung | Warum später? |
|---------|--------------|---------------|
| Kommentare (Giscus) | GitHub-Diskussionen als Kommentare | Erst Traffic abwarten |
| Newsletter | RSS-to-Email via Buttondown | Erst regelmäßige Posts |
| Related Posts | "Ähnliche Artikel" automatisch | Erst mehr Posts |
| Suchfunktion | Fuse.js oder Algolia DocSearch | Erst viele Blog-Posts |
| Multi-Author | Falls Gäste schreiben wollen | Aktuell nicht nötig |

---

## ❌ Explizit NICHT geplant

- **Light Theme:** "Es gibt nur die dunkle Seite!"
- **SCSS/Tailwind:** Aktuelles CSS ist ausreichend
- **Externe Schriftarten:** Lokale Fonts bleiben (DSGVO/Performance)

---

## Notizen

- Features aus dieser Liste werden bei Bedarf zur Haupt-Todo hinzugefügt
- Priorisierung erfolgt nach: Impact / Aufwand / Aktueller Bedarf
- Regelmäßig reviewen ob Features noch relevant sind
