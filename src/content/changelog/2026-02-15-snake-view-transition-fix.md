---
title: "Snake Bugfix: Endlich nach View Transitions"
date: 2026-02-15
version: "1.7.1"
category: "Fix"
---

## Das Problem

Snake hat nach Navigation via View Transitions nicht mehr funktioniert. Erst nach Reload ging es wieder.

## Ursache

Das Canvas-Element und die DOM-Referenzen werden bei View Transitions ersetzt, aber das Script behielt alte Referenzen.

## Lösung

Kompletter Rewrite mit:
- Frischem DOM-Lookup bei jedem Frame
- Verzögertem Start nach `astro:page-load`
- Rigoroser Cleanup alter Timer

**Status:** Snake läuft jetzt auch nach Navigation!
