---
title: "Wenn der Klick nicht klickt: Debugging View Transitions in Astro"
description: "Meine Kategorie-Filter funktionierten nur nach einem Reload. Der Grund: Ich hatte DOMContentLoaded vergessen. Oder besser: Ich wusste nicht, dass View Transitions ein eigenes Event haben."
date: 2026-02-15
tags: ["Astro", "JavaScript", "Bugfixing", "View Transitions"]
category: Website
---

## Das Problem

Die Blog-Seite hat Kategorie-Filter (Alle | Homelab | Website | GameDev). Getestet im Dev-Modus – funktionierte perfekt. Online gegangen. Dann wollte ich es jemandem zeigen:

1. Auf Blog klicken → Filter werden angezeigt
2. Auf "Homelab" klicken → **Nichts passiert**
3. F5 drücken → Jetzt geht's

Aber: Wenn ich von der Startseite auf Blog klicke, oder von einem Post zurück zur Übersicht gehe – tote Hose. Erst nach Reload.

## Die Suche

Ich habe ins Script geschaut:

```javascript
document.addEventListener('DOMContentLoaded', () => {
    // Filter-Logik hier
});
```

Sieht korrekt aus. Funktioniert ja auch nach dem Reload. Aber warum nicht beim Navigation?

Dann fiel mir ein: Ich hatte vor Kurzem **View Transitions** aktiviert. Die flüssigen Übergänge zwischen Seiten. Die ersetzen das DOM, ohne die Seite komplett neu zu laden.

Und da ist der Haken: `DOMContentLoaded` feuert nur beim **initialen** Laden der Seite. Wenn Astro die Seite via View Transition wechselt, bleibt das Document gleich – nur der Inhalt wird ersetzt.

## Die Lösung

Astro hat für View Transitions ein eigenes Event: `astro:page-load`

Das feuert bei **jeder** Seitennavigation – egal ob initial oder via Transition:

```javascript
function initCategoryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    // ... Logik ...
}

// Beim ersten Laden
document.addEventListener('DOMContentLoaded', initCategoryFilter);

// Bei jeder View Transition (wichtig!)
document.addEventListener('astro:page-load', initCategoryFilter);
```

## Was ich gelernt habe

- **View Transitions sind cool**, aber sie ändern das Event-Modell
- **DOMContentLoaded** ist nicht mehr genug, wenn du clientseitige JS-Logik hast
- **astro:page-load** ist der zuverlässige Event-Listener für Astro-Apps mit View Transitions
- **Testen** nicht nur im Dev-Modus, sondern auch die Navigation zwischen Seiten

Noch ein Tipp: Wenn du Listener neu registrierst bei jedem Page-Load, entferne die alten vorher, sonst hast du Duplikate:

```javascript
button.removeEventListener('click', handleClick);
button.addEventListener('click', handleClick);
```

---

*Kleiner Bug, große Lektion. Jetzt weiß ich, warum meine Filter manchmal streiken. Falls dir ähnliche Probleme begegnen: Check, ob du View Transitions nutzt – und wenn ja, auf das richtige Event hören.*
