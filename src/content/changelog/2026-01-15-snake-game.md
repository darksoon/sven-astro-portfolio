---
title: "Snake-Game: Erstes Easter Egg integriert"
date: 2026-01-15
version: "0.3.0"
category: "Feature"
---

## Die Idee

Jede Portfolio-Seite braucht einen Clou. Meiner sollte ein Spiel sein. Nicht irgendeins - Snake. Klassisch, retro, passend zum Terminal-Look.

## Implementierung

**Technik:**
- Canvas-Element
- BFS-Pathfinding für die AI (die Schlange spielt sich selbst)
- Retro CRT-Look mit Scanlines und Glitch-Effekt

**Herausforderungen:**
- Die AI war zu gut, musste langsam gemacht werden
- Mobile-Version brauchte eigenen Screen (zu klein für Widget)
- Performance-Optimierung (Raf-Loops sind tricky)

## Desktop vs Mobile

**Desktop:** Snake als Widget direkt auf der Hauptseite, embedded im Terminal-Look
**Mobile:** Link zu `/snake` mit Vollbild-Version

**Status:** Spielbar, AI funktioniert, sieht cool aus.