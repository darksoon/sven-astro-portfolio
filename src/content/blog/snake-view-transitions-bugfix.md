---
title: "Der Snake-Bug: Wenn View Transitions alles kaputt machen"
description: "Wie ich drei Stunden damit verbracht habe zu verstehen, warum mein Snake-Game nach der Navigation nicht mehr läuft – und warum DOM-Referenzen tückisch sein können."
date: 2026-02-15
tags: ["JavaScript", "Astro", "Bugfixing", "View Transitions"]
category: "Website"
---

## Es läuft! Oder doch nicht?

Mein Snake-Game war fertig. Die AI funktionierte, die Effekte sahen cool aus, alles perfekt. Dann habe ich View Transitions aktiviert für flüssige Seitenwechsel.

**Das Szenario:**
1. Startseite öffnen → Snake läuft ✓
2. Auf Blog klicken → View Transition ✓
3. Zurück zur Startseite → Snake ist tot ✗
4. F5 drücken → Snake läuft wieder ✓

## Die Suche

Ich habe alles Mögliche ausprobiert. Event-Listener auf `astro:page-load` gesetzt, Verschiedene Init-Methoden, gar nichts hat funktioniert.

Der Canvas war da. Das Script war da. Aber die Schlange bewegte sich nicht.

## Der Moment der Erleuchtung

Nach viel Debuggen fiel es mir auf: Das Script behielt eine Referenz zum **alten** Canvas-Element. Bei View Transitions ersetzt Astro das DOM, aber mein Script sprach immer noch mit dem ersetzten Canvas!

```javascript
// SO NICHT:
const canvas = document.getElementById('snakeCanvas'); // Altes Element
// ... später nach View Transition ...
// canvas referenziert immer noch das alte, nicht mehr existierende Element
```

## Die Lösung

Kompletter Rewrite. Statt globale Referenzen, frisch beim Start:

```javascript
function getElements() {
  return {
    canvas: document.getElementById('snakeCanvas'),
    // ... andere Elemente
  };
}

function initGame() {
  const el = getElements(); // Immer frisch!
  if (!el.canvas) return false;
  // ...
}
```

Und beim `astro:page-load` Event eine kleine Verzögerung:

```javascript
document.addEventListener('astro:page-load', () => {
  setTimeout(() => {
    if (document.getElementById('snakeCanvas')) {
      initGame();
    }
  }, 50); // DOM muss bereit sein
});
```

## Was ich gelernt habe

- **View Transitions sind cool**, aber sie ersetzen das DOM
- **Alte Referenzen sind Gift** – immer frisch nachschauen
- **setTimeout kann helfen** – manchmal braucht das DOM einen Moment
- **Konsolen-Logging allein reicht nicht** – die Elemente existieren, sind nur nicht mehr im DOM

## Fazit

Drei Stunden Debugging für einen Bug, der am Ende an einer einzigen Zeile lag. Aber jetzt läuft Snake auch nach jeder Navigation. Und ich habe wieder was gelernt.

↑↑↓↓←→←→BA

---

*Manchmal ist der Bug nicht im Code, sondern in den Annahmen über den Code.*
