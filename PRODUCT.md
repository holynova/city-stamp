# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

delegated: React + Vite for a lightweight static site that can be published to GitHub Pages; browser localStorage is used for the first prototype's check-in record.

## Users

People visiting Shanghai, Suzhou, or Beijing who want to turn landmark visits into a personal, collectible travel record.

## Product Purpose

The product turns a city's key landmarks into a set of collectible hexagonal achievement badges. A visitor browses by city, checks in at a landmark, and sees when that visit was recorded. Success means a first-time visitor can understand the collection, find a landmark, and complete a check-in in a few seconds.

## Positioning

The meaningful mechanism is a visual city archive: every visit becomes a dated, illuminated badge in one coherent personal collection rather than an unstructured list of places.

## Operating Context

The site is used on a phone while traveling and on a desktop when planning or reminiscing. Users move between three city collections and return later to see the same check-in state. The first version is self-contained and does not require an account, GPS, maps, or a server.

## Capabilities and Constraints

- Three starting collections: Shanghai, Suzhou, and Beijing.
- Exactly 10 landmark badges per city.
- Every landmark badge uses a generated transparent landmark artwork inside the hexagon; the text label remains in the archive metadata below it.
- Each badge starts locked and grayscale, then records a local check-in time and changes to a vivid, luminous unlocked state.
- A check-in wall arranges every unlocked badge into a zoomable, interlocking hexagonal mosaic with a focused detail inspector.
- City tabs, collection progress, landmark detail, and reset/check-in actions are part of the core experience.
- The reference image establishes a hexagonal achievement / heraldic motif; it is a binding visual reference, not a source for factual landmark imagery.
- Persistence is browser-local for this prototype. Login, sync, GPS verification, maps, and social sharing remain undecided.

## Brand Commitments

- Product working name: City Stamp / 城市印记.
- The supplied reference image is the visual anchor for the achievement language: black poster ground, warm metallic rules, geometric hexagonal emblems, and restrained but celebratory unlock moments.

## Evidence on Hand

- Visual reference: `/Users/sym/.codex/attachments/8bc08ff3-0f9b-42d4-89c5-404841051860/image-1.png`.
- Landmark names are authored illustrative collection content for the prototype; no external endorsement, attendance verification, or commercial claim is implied.

## Product Principles

- Make the collection legible before making it decorative.
- Reward the visit with a visible change of state, not a hidden confirmation.
- Keep the archive personal and lightweight: no account or location permission is needed to begin.
- Let each city have a distinct character while keeping the collection system coherent.

## Accessibility & Inclusion

Core actions must be keyboard reachable, have visible focus states, expose unlocked state and recorded time in text (not color alone), and respect reduced-motion preferences. The layout must remain usable on narrow mobile screens and larger desktop viewports.
