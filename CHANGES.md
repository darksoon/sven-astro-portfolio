# Änderungen & Offene Punkte

> Letzte Aktualisierung: 13.02.2026

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
