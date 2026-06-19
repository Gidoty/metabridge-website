# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MetaBridge Academy is a Nigerian blockchain-based EdTech platform. The website is a **single-file static landing page** — all HTML, CSS, and JavaScript live in `metabridge-website.html`. There is no build system, package manager, framework, or backend.

## Development

To preview the site, open `metabridge-website.html` directly in a browser. There are no build, lint, or test commands.

## Architecture

Everything is in one file: `metabridge-website.html`. It is structured as:

1. **`<head>`** — Google Fonts imports (Syne, Outfit, JetBrains Mono) and all CSS in a single `<style>` block (~1,200 lines).
2. **`<body>`** — Sequential HTML sections followed by a `<script>` block at the bottom.
3. **`<script>`** — Three vanilla JS behaviours: scroll-triggered fade-in animations via `IntersectionObserver`, navbar opacity change on scroll, and FAQ accordion accordion (one-open-at-a-time).

### Page sections (in order)

| Section | ID | Notes |
|---|---|---|
| Background effects | — | Fixed orbs + grid overlay, `z-index: 0` |
| Floating WhatsApp button | — | Fixed, `z-index: 1000` |
| Navbar | — | Fixed, `z-index: 100` |
| Ticker banner | — | Scrolling marquee via CSS animation |
| Hero | — | Headline + CTAs + trust signals |
| Audience strip | — | Tag cloud, no anchor |
| Stats | — | 5-column grid |
| Courses | `#courses` | 2×2 card grid |
| How It Works | `#how` | 3-step grid |
| Who It's For | — | 3×2 card grid |
| Certificate | `#certificate` | 2-col layout with mockup |
| Testimonials | `#testimonials` | 3×2 card grid |
| Why Us | — | 4×2 card grid |
| Pricing | `#pricing` | 4-col card grid |
| FAQ | `#faq` | 2-col accordion grid |
| Final CTA | — | Full-width box |
| Footer | — | 4-col grid |

### Design system (CSS custom properties)

All colours are defined as CSS variables on `:root` at the top of `<style>`:

```
--ink / --navy / --card / --cardHov  (backgrounds)
--blue / --blueLt / --cyan           (primary brand)
--gold / --goldLt                    (accent/certificate)
--green / --red / --purple           (semantic/course colours)
--white / --off / --muted / --faint  (text/borders)
--border                             (rgba blue, used on all card borders)
```

Course-specific colour variants follow a consistent pattern: `.cc-cyber` (red), `.cc-crypto` (gold), `.cc-data` (cyan), `.cc-prompt` (purple) — applied to both cards and skill tags via `.st-*` / `.ci-*` / `.pc-*` prefixes.

### Enrolment flow

All CTAs point to `https://wa.me/2347034357206`. There is no form, no backend, and no payment integration in the HTML — enrolment happens entirely via WhatsApp.
