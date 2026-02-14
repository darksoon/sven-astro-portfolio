---
title: "Live-Daten vom Homelab auf die Website"
description: "Wie ich mit n8n, Unraid und einer einfachen JSON-Datei echte Server-Statistiken auf meine Portfolio-Seite bringe."
date: 2026-01-20
tags: ["Homelab", "n8n", "Unraid", "Automation"]
category: Homelab
---

## Die Idee

Jeder kann auf seine Website schreiben "Ich betreibe ein Homelab". Aber was, wenn die Website selbst beweist, dass der Server läuft? Genau das wollte ich umsetzen: **echte Live-Daten meines Unraid-Servers direkt auf der Portfolio-Seite**.

## Der Stack

Mein Setup besteht aus drei Komponenten:

- **Unraid-Server** – läuft 24/7 mit 10 Docker-Containern
- **n8n** – Workflow-Automation, ebenfalls als Docker-Container
- **stats.json** – eine einfache JSON-Datei, die auf dem Webserver liegt

## Wie funktioniert es?

### 1. Daten sammeln

Ein n8n-Workflow läuft alle 15 Minuten und sammelt die aktuellen Daten vom Unraid-Server:

- OS-Version und Uptime
- Speicherauslastung (RAM und Storage)
- Laufende Docker-Container mit Status und Uptime

### 2. JSON generieren

n8n formatiert die Daten in eine saubere JSON-Struktur:

```json
{
  "timestamp": "2026-02-13T19:00:00Z",
  "system": {
    "os": "Unraid 7.2.3",
    "uptime": "53 days",
    "storage_total": "6.4TB",
    "storage_percent": 54,
    "ram_used": "12GB",
    "ram_percent": 76,
    "containers_running": 10,
    "containers_total": 10
  },
  "containers": [
    { "name": "jellyfin", "status": "running", "uptime": "Up 2d" },
    ...
  ]
}
```

### 3. Auf die Website bringen

Die Website fetcht beim Laden die `stats.json` und aktualisiert das Terminal-Widget dynamisch. Wenn die Datei nicht erreichbar ist, werden einfach die statischen Fallback-Werte angezeigt.

```javascript
const res = await fetch('stats.json?t=' + Date.now());
if (res.ok) {
    const data = await res.json();
    updateTerminal(data);
}
```

Der `?t=`-Parameter verhindert, dass der Browser eine gecachte Version lädt.

## Das Ergebnis

Auf meiner Startseite sieht man jetzt ein Terminal-Widget, das die echten Daten meines Servers zeigt – inklusive "Live"-Indikator, der anzeigt, wie aktuell die Daten sind. Wenn alle Container laufen, leuchtet es grün.

## Lessons Learned

- **Keep it simple** – Eine JSON-Datei ist robuster als eine eigene API
- **Fallback-Werte sind Pflicht** – Wenn der Server mal down ist, soll die Website trotzdem gut aussehen
- **Cache-Busting nicht vergessen** – Sonst sieht der Besucher stundenlang die gleichen Werte

## Was kommt als Nächstes?

Ich überlege, historische Daten zu sammeln und eine kleine Uptime-Grafik einzubauen. Aber erstmal läuft das Setup stabil – und das ist das Wichtigste.

---

*Fragen zum Setup? Schreib mir auf [Discord](https://discord.com/users/213665789952131073) oder per [E-Mail](mailto:info@sven-neurath.de).*
