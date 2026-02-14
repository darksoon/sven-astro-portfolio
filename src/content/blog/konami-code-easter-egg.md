---
title: "Ich bin Nerd und stehe dazu: Wie ich den Konami Code in mein Portfolio baute"
description: "Warum ich einen 30 Jahre alten Cheat Code in meine Website eingebaut habe – und wie ich dabei Canvas, Key Events und meine Kindheit wiederentdeckte."
date: 2026-02-15
tags: ["JavaScript", "Easter Egg", "Konami Code", "Canvas"]
category: Website
---

## Disclaimer: Ich bin ein Nerd

Nicht der coolere Hacker-Nerd aus Serien. Der andere. Der, der alte Videospiel-Codes kennt, die niemand mehr braucht. Der, der bei der Konami-Logo-Animation nostalgisch wird. Der, der denkt: "Eine Website ohne Easter Egg ist wie ein Mario ohne geheime Warp-Röhren."

Ich bin dieser Nerd. Und ja, ich habe den Konami Code in mein Portfolio eingebaut.

## Warum? (Außer „weil ich's kann")

Ehrlich: Es gab keinen rationalen Grund. Mein Portfolio ist eine professionelle Seite für potenzielle Arbeitgeber. Da sollte man seriös wirken, oder?

Aber dann dachte ich: **Wenn jemand den Konami Code auf meiner Seite eingibt, ist das mein Mensch.** Das ist der Kollege, der versteht warum man `font-display: swap` nutzt UND warum Metal Gear Solid ein Meisterwerk ist.

Außerdem: Die Seite hat bereits ein Terminal-Widget, Snake, und einen sarkastischen 404-Fehler. Ein Easter Egg passt zum Vibe.

## Der Plan

Die Idee war simpel:
1. User gibt ↑↑↓↓←→←→BA ein
2. 10 Sekunden Matrix-Digital-Rain-Effekt über die ganze Seite
3. Zurück zum Normalbetrieb

Klingt einfach. War es auch – fast.

## Die Umsetzung

### Schritt 1: Den Code abfangen

Ich brauchte einen Listener für Tastendrücke und ein Array mit der korrekten Sequenz:

```javascript
const konamiCode = [
  'ArrowUp', 'ArrowUp', 
  'ArrowDown', 'ArrowDown', 
  'ArrowLeft', 'ArrowRight', 
  'ArrowLeft', 'ArrowRight', 
  'b', 'a'
];

let index = 0;

document.addEventListener('keydown', (e) => {
  if (e.key === konamiCode[index]) {
    index++;
    if (index === konamiCode.length) {
      activateMatrix();
      index = 0;
    }
  } else {
    index = 0; // Fehler = zurück an den Start
  }
});
```

**Was ich lernte:** Die Reihenfolge muss pixelgenau sein. Wenn der User zwischendurch irgendwohin klickt oder eine andere Taste drückt, fängt er von vorne an. Das ist nervig beim Testen, aber fair.

### Schritt 2: Canvas erstellen

Der Matrix-Effekt braucht ein Fullscreen-Canvas über allem:

```javascript
const canvas = document.createElement('canvas');
canvas.style.cssText = 
  'position:fixed;top:0;left:0;width:100%;height:100%;z-index:9999;pointer-events:none;';
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
```

**Was ich lernte:** `pointer-events: none` ist wichtig. Sonst blockiert das Canvas alle Klicks auf der Seite für 10 Sekunden. Das wäre uncool.

### Schritt 3: Die Matrix-Schrift

Ich wollte nicht nur Zahlen. Ich wollte das echte Gefühl. Also habe ich Katakana-Zeichen aus dem Unicode genommen:

```javascript
const chars = '01アイウエオカキクケコ...';
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = [];

// Jede Spalte startet an einer zufälligen Höhe
for (let i = 0; i < columns; i++) {
  drops[i] = Math.random() * -100;
}
```

**Was ich lernte:** Canvas-Performance ist ein Thema für sich. Bei Fullscreen und 60fps sollte man nicht zu viele Operationen pro Frame machen. Aber für 10 Sekunden reicht's.

### Schritt 4: Die Animation

```javascript
function draw() {
  // Halbtransparenter Overlay für den Trail-Effekt
  ctx.fillStyle = 'rgba(26, 26, 37, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = '#00ff41'; // Matrix-Grün
  ctx.font = fontSize + 'px monospace';
  
  for (let i = 0; i < drops.length; i++) {
    const text = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    
    // Reset wenn unten angekommen (mit Zufall)
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
  
  requestAnimationFrame(draw);
}
```

**Was ich lernte:** Der `rgba(26, 26, 37, 0.05)`-Trick ist genial. Statt den Canvas zu löschen, malt man einen fast-transparenten Hintergrund. Das lässt alte Frames durchscheinen und erzeugt diesen typischen "Trail"-Effekt.

### Schritt 5: Aufräumen

Nach 10 Sekunden muss das Canvas wieder weg:

```javascript
let frameCount = 0;
const maxFrames = 10 * 60; // 10 Sekunden bei 60fps

function draw() {
  if (frameCount >= maxFrames) {
    canvas.remove();
    return;
  }
  // ... Zeichnen ...
  frameCount++;
  requestAnimationFrame(draw);
}
```

## Der Hinweis

Ich habe unter meinem Terminal-Widget einen dezenten Hinweis eingebaut:

> *ob der konami code noch funktioniert?*

Nicht zu offensichtlich. Wer es weiß, kichert. Wer es nicht weiß, googelt es vielleicht. Oder eben nicht. Das ist das Schöne an Easter Eggs – sie sind für die, die sie finden.

## Was ich daraus mitnehme

1. **Easter Eggs sind Marketing.** Nicht im klassischen Sinne, aber wenn jemand den Code eingibt und lächelt, wird er sich meine Seite länger merken.

2. **Canvas ist mächtig.** Ich habe bisher nur `ctx.fillRect()` für Snake genutzt. Jetzt weiß ich, dass ich damit auch Partikeleffekte, Animationen, Spiele machen kann.

3. **Ich bin nicht zu alt für sowas.** Mit 44 Jahren den Konami Code einzubauen ist vielleicht kindisch. Aber es macht Spaß. Und wer seine Arbeit nicht mit Spaß verbindet, hat verloren.

## Fazit

Mein Portfolio hat jetzt einen Matrix-Effekt. Ist das professionell? Egal. Ist es cool? Absolut.

Wenn du den Code lesen willst: `src/pages/index.astro`, ganz unten. Oder probier's aus. Du weißt ja, welche Tasten du drücken musst.

↑↑↓↓←→←→BA

---

*Falls du das hier liest und den Code eingegeben hast: Du bist mein Mensch. Schreib mir auf Discord, wir sollten uns unterhalten.*
