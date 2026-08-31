# Design QA · 城市印记

source visual truth: `/Users/sym/.codex/attachments/8bc08ff3-0f9b-42d4-89c5-404841051860/image-1.png`

implementation screenshots:

- `/Users/sym/code/city-stamp/qa-desktop.png` — clean, locked state; CSS viewport 1280 × 720; captured pixels 1265 × 712; device scale 1.
- `/Users/sym/code/city-stamp/qa-desktop-unlocked.png` — Shanghai / 外滩 unlocked state; CSS viewport 1280 × 720; captured pixels 1265 × 712; device scale 1.
- `/Users/sym/code/city-stamp/qa-mobile.png` — clean, locked state; CSS viewport and captured pixels 390 × 844; device scale 1.
- `/Users/sym/code/city-stamp/qa-mobile-full.png` — full responsive page; captured pixels 390 × 4309; device scale 1.

## Normalized comparison

The supplied source is 1080 × 1440. The implementation was also rendered at a 1080 × 1440 CSS viewport; the in-app browser returned a 1080 × 1373 content capture after browser chrome, so the source was cropped to 1080 × 1373 for a same-pixel comparison. The composite is `/Users/sym/code/city-stamp/qa-source-vs-build.png`; the focused hero comparison is `/Users/sym/code/city-stamp/qa-hero-vs-build.png`.

State compared: initial locked collection and post-click unlocked collection. The source's poster language was treated as the visual anchor; the web build intentionally adds navigation, filters, progress, logs, and responsive reflow so the requested check-in task is usable.

## Findings

- Typography: warm metallic display hierarchy, condensed-feeling Chinese title, mono archival labels, and clear contrast are present. IBM Plex Sans is self-hosted for Latin UI text with the local Chinese system fallback for glyph coverage.
- Spacing and layout rhythm: the page frame, hairline separators, centered hero badge, collection index, and 5/4/3/2-column responsive grid are visible and stable. The 1080 comparison keeps the title and first badge row within the same reading sequence.
- Colors and tokens: charcoal-black ground and warm gold rules match the source language; Shanghai coral, Suzhou jade, and Beijing amber are reserved for city identity and unlocked state.
- Image quality and asset fidelity: the source's cut-paper landmark scenes are implemented as 30 generated transparent PNG artworks, one for each landmark, with a shared paper-cut / screenprint direction. The CSS badge wrapper supplies the exact regular-hex silhouette while the image supplies the landmark content; the locked state desaturates it and the unlocked state restores city color and glow. The web-sized assets are resized to 640 × 640 to keep the set practical for a static site.
- Copy and content: Shanghai, Suzhou, and Beijing each contain exactly 10 authored landmark records; locked/unlocked labels, local timestamps, empty states, and reset copy are present.

## Interaction checks

- Clicking the featured 外滩 badge changes the global count from `00 / 30` to `01 / 30`, changes the badge to coral, emits the unlock flare/toast, and writes a local timestamp.
- Clicking a grid badge performs the same check-in; clicking an already archived badge reports its recorded time without duplicating the record.
- City tabs switch between Shanghai, Suzhou, and Beijing; each renders 10 badges.
- `全部`, `已点亮`, and `待发现` filters work, including the empty state when a city has no unlocked badges.
- Reload preserves records via `localStorage`; `重置档案` clears them.
- Main anchors return to the collection/journal sections; the brand anchor returns to the visible page header.
- Native buttons/links provide keyboard focus styling; a keyboard traversal check reached the main navigation; no console errors were reported.
- Mobile 390px capture has no horizontal overflow (`scrollWidth === 390`).

## Comparison history

1. First desktop/mobile pass found an orphaned final character in the hero title at the 1080/390 breakpoints; the responsive type scale was reduced so the headline resolves into intentional lines.
2. The detector found an overused display font and a padding layout transition; IBM Plex Sans replaced Space Grotesk and the journal hover moved to transform-only motion.
3. The brand return anchor initially targeted the main content below the header; it now targets the page frame so the visible header is restored. Final desktop, unlocked, mobile, and full-page captures show no actionable P0/P1/P2 issue.

## Open questions

- Optional future direction: commission a more historically exact illustrated set or add a curator review pass to the generated landmark artworks.
- Product decisions still open: account sync, GPS verification, map links, and share/export.

## Finish review

disposition: ship

The finish review was run inline using the degraded reviewer path because no subagent tool was available in this session. The chosen direction contract remains in the first body comment of `/Users/sym/code/city-stamp/index.html`, including seed `1ba423c6` and the required finish line.

final result: passed
