---
title: "View Transitions: Flüssige Seitenwechsel"
date: 2026-02-14
version: "1.2.0"
category: "Feature"
---

## Die Idee

Seitenwechsel sollen sich anfühlen wie eine App, nicht wie klassisches Website-Herumgeklicke. Astro hat dafür ein experimentelles Feature: View Transitions.

## Implementierung

**Einfacher als gedacht:**
```astro
<head>
  <ViewTransitions />
</head>
```

**Optimierungen:**
- Navigation bleibt mit `transition:persist` stehen (kein Flackern)
- Main-Content gleitet mit `transition:animate="slide"`
- Blog-Posts haben eigenen Animation-Style

## Bugfix

Problem: JavaScript-Event-Listener funktionierten nicht nach Transition.
Lösung: `astro:page-load` Event nutzen statt nur `DOMContentLoaded`.

**Ergebnis:** Die Seite fühlt sich deutlich flüssiger an.