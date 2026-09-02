---
name: 城市印记 · City Stamp
description: A dark, archival city check-in system built around luminous hexagonal landmark badges.
colors:
  black: "#07090a"
  panel: "#101415"
  ink: "#f3eadb"
  muted: "#a99d8e"
  gold: "#c9a87a"
  gold-bright: "#f2d2a0"
  shanghai-coral: "#df705d"
  suzhou-jade: "#65b8a6"
  beijing-amber: "#d2a258"
typography:
  display:
    fontFamily: "IBM Plex Sans, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: "clamp(48px, 5.5vw, 82px)"
    fontWeight: 720
    lineHeight: 0.97
    letterSpacing: "-0.075em"
  body:
    fontFamily: "IBM Plex Sans, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.9
  label:
    fontFamily: "IBM Plex Mono, monospace"
    fontSize: "10px"
    letterSpacing: "0.12em"
rounded:
  circle: "100px"
  dot: "50%"
  card: "0px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  section: "69px"
components:
  button-primary:
    backgroundColor: "transparent"
    textColor: "{colors.gold-bright}"
    rounded: "{rounded.card}"
    padding: "0 0 8px"
  chip-filter:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    rounded: "{rounded.circle}"
    padding: "0 11px"
  archive-card:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "25px 24px 22px"
---

# Design System: 城市印记 · City Stamp

## Overview

**Creative North Star: “The Illuminated City Archive”**

城市印记把黑色档案纸、旧金细线、透明地标插画和六边形徽章组合成一张可操作的城市海报。页面的装饰不是独立的皮肤：每一条序号、每一座城市的色彩、每一枚徽章的图像，都在说明访客走过了什么。

未打卡时，内容保持克制的灰阶；只有真实的状态变化才释放上海朱砂、苏州青绿或北京琥珀。访客不需要账户、地图或定位权限，就能把一次到访变成一条清晰、可回看的个人档案。

## Colors

- `#07090a` Archive Black is the page ground and the deepest frame.
- `#101415` Panel Charcoal is used for the hero badge core, archive card, and elevated surfaces.
- `#f3eadb` Archive Ink is the primary warm text color.
- `#a99d8e` Archive Muted is for supporting copy and inactive controls.
- `#c9a87a` Old Gold carries rules, borders, serials, and the quiet archive structure.
- `#f2d2a0` Paper Gold is reserved for high-priority headings, actions, and completed counts.
- `#df705d` Shanghai Coral, `#65b8a6` Suzhou Jade, `#d2a258` Beijing Amber, and `#76b8a4` Hangzhou Lake Jade identify cities and unlocked badges.

The state rule is intentional: undiscovered badges stay charcoal and desaturated; city colors appear in the active tab and unlocked artwork, where they communicate progress rather than decorate locked content. Shanghai, Suzhou, Beijing, and Hangzhou each contribute ten landmark badges.

## Typography

IBM Plex Sans Variable is self-hosted for the Latin interface voice, with PingFang SC / Microsoft YaHei fallbacks for Chinese glyph coverage. IBM Plex Mono handles serial numbers, timestamps, counts, city codes, and compact archival labels.

The display style is dense, warm, and slightly compressed through a `-0.075em` tracking value. The hero title uses a responsive `clamp(48px, 5.5vw, 82px)` scale, `720` weight, and `0.97` line-height. Body copy stays at `16px` with a relaxed `1.9` line-height. Small labels use the mono face, uppercase Latin where available, and approximately `0.12em` tracking.

## Layout

The page is one continuous archival sheet: a double gold frame surrounds the content and fine rules separate the hero, collection, check-in wall, journal, and archive status. The desktop hero is a two-column composition with the manifesto on the left and the featured hex badge on the right. The collection grid shows five columns on wide screens, then four, three, and two columns at `1120px`, `840px`, and `560px` breakpoints. The check-in wall uses a dense, overflow-safe, staggered hex mosaic on one shared five-column coordinate system, with a separate detail view and zoom control.

The frame uses a `max-width` of `1440px` with a `19px` outer margin. Major sections use approximately `69px` vertical spacing. On phones, the hero stacks, city tabs become a full-width segmented row, the wall keeps its own scrollable mosaic viewport, and the journal/archive area becomes a single column without page-level horizontal overflow.

## Elevation & Depth

Depth is quiet and material: dark panels, inset double rules, a soft ambient shadow under badges, and a state glow only after check-in. The generated artwork supplies the complete visible hexagonal badge surface; the wrapper only clips content and adds a pointer-driven Glass Glare Tilt Card: perspective rotation, inverse artwork parallax, and a specular sheen move together to suggest refraction. The one-time unlock moment combines a short scale/saturation burst and a toast that confirms the saved timestamp. `prefers-reduced-motion` removes the authored movement while preserving the final state and contrast.

## Shapes

Hexagons are the signature shape. Each generated landmark image already contains its own complete hexagonal bezel, so the CSS wrapper does not draw a second border or inset shell; it only keeps the artwork and overlays aligned to one silhouette. Cards remain square and archival; compact filters use a fully rounded pill (`100px`) only where the control needs to read as a chip. Focus rings are warm gold, visible, and offset from the clipped badge silhouette.

## Components

### Primary text action

The `开始收集` action is quiet and editorial: warm-gold text, a single underline rule, and a small arrow that moves on hover. It is the main entry into the collection rather than a filled dashboard button.

### Filter chip

Collection filters are compact rounded chips with a mono count. Inactive chips remain transparent and muted; hover, focus, and selection strengthen the gold border and text so the filter state is legible without relying on color alone.

### Archive status card

The archive status card is a square framed panel with a subtle inset rule, a large completed-count numeral, and one short line of personal context. Its reset action is deliberately secondary and placed beside the summary, not styled as a destructive red button.

### Hexagonal landmark badge

Every landmark is a button containing only the generated six-sided landmark artwork; city codes, serials, and status copy stay outside the image. The landmark name, district, state, and recorded time sit in the archive copy beneath the image so the artwork—not a text glyph—is the badge's content. A locked badge applies grayscale and reduced contrast to the artwork; a checked-in badge restores its city palette, adds a glow, and records the local time. The artwork tilts as one rigid surface toward the pointer while the sheen moves inversely to suggest refraction. Clicking an already checked-in badge toggles it back to undiscovered, removes its record from the wall, and explains the reversal. A separate explicit action opens a full-screen 3D detail view without changing progress.

### Check-in wall

The wall is a focused memory surface, not a second collection list. It places checked-in badges on exact staggered pointy-top hexagonal rows whose shared edges touch without overlap, balancing rows into a dense 5/4 honeycomb floor instead of centering each row independently. The wall frame fits the mosaic vertically, while zoom can expand it inside its own scrollable viewport. Selecting a wall tile opens the full-screen 3D detail view; the inspector remains a compact fallback with artwork, landmark copy, and time. Selection uses focus and accent glow rather than expanding a tile. On phones, the mosaic scrolls inside its own viewport so the page frame never acquires horizontal overflow.

### Share card

The share card is a portable version of the archive: a fixed-format PNG draws the checked-in wall, total progress, four city counts, and the public archive URL. Its modal keeps the generated image primary, with download, native share, and copy-link actions as explicit fallbacks. It inherits the charcoal paper, old-gold rules, city accents, and square archival corners rather than introducing a new social-media skin.

## Do’s and Don’ts

- Do keep the page frame and hairline rules continuous across sections.
- Do use a real generated landmark artwork for each badge and keep the six-sided silhouette stable.
- Do keep generated badge faces free of CSS/status text overlays; place metadata beside or below the image.
- Do keep counts, serials, and timestamps in the mono archival voice.
- Do place checked-in badges on an exact touching honeycomb grid and keep hover/selection from expanding a wall tile.
- Do keep the glass glare tilt pointer-driven: the whole badge follows the pointer direction, while only the sheen shifts inversely; disable it for reduced-motion users.
- Do preserve the text state (`待发现`, `已点亮`, and the recorded time) when simplifying the visual treatment.
- Don’t turn the archive into a generic rounded-card dashboard.
- Don’t draw a second CSS hex frame around the generated badge artwork.
- Don’t spend city accent color on locked content or unrelated decoration.
- Don’t remove keyboard focus styling, reduced-motion support, or the visible empty state.
