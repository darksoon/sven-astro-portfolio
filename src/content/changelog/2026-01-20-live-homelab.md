---
title: "Homelab wird live: Echte Daten vom Server"
date: 2026-01-20
version: "0.4.0"
category: "Feature"
---

## Das Problem

Bisher waren die Homelab-Daten statisch. "Unraid 7.2.3", "53 days uptime" - aber das war hartcodiert. Langweilig.

## Die Lösung

**Stack:**
- Unraid-Server mit API
- n8n-Workflow (läuft auf meinem Server)
- JSON-Datei, die alle 15 Minuten aktualisiert wird

**Daten:**
- OS und Uptime
- RAM-Auslastung
- Storage-Status
- Docker-Container mit Status

## Der Code

```javascript
fetch('manifest.json?t=' + Date.now())
  .then(res => res.json())
  .then(data => updateTerminal(data));
```

Der `?t=`-Parameter verhindert Caching. Wichtig!

## Lessons Learned

- Fallback-Werte sind Pflicht (wenn der Server mal down ist)
- "stats.json" als Name funktioniert nicht (Adblocker!)
- `manifest.json` ist der bessere Name

**Status:** Live-Daten funktionieren, automatisches Update alle 15 Minuten.