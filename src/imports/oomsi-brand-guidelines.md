# Oomsi Brand Guidelines

**Version 2.0 — March 2026**
For developers, designers, and anyone implementing the Oomsi brand.

---

## Brand Essence

Oomsi is an AI-enhanced property management platform. The brand should communicate **calm intelligence** — the feeling that everything just works. We lead with the outcome (ease of mind), not the technology (AI).

**Brand personality:** Calm, warm, smart, simple, joyful
**Brand voice:** Confident but not arrogant. Warm but not casual. Smart but not technical.

---

## The Spark Mark

The Oomsi logo is called **"The Spark"** — a six-pointed mark representing the moment when everything clicks. It's not a circuit, not a gear, not a brain. It's a moment of light.

### Logo Files

```
logos/
├── oomsi-lockup-forest.svg      ← PRIMARY - use this most
├── oomsi-lockup-light.svg       ← For dark backgrounds
├── oomsi-lockup-white.svg       ← For colored backgrounds (green, photos)
├── oomsi-lockup-mono.svg        ← Print, formal, single-color contexts
├── oomsi-spark-mark-forest.svg  ← Mark only (app icons, favicons, badges)
├── oomsi-spark-mark-light.svg   ← Mark only for dark backgrounds
├── oomsi-spark-mark-white.svg   ← Mark only for colored backgrounds
├── oomsi-spark-mark-mono.svg    ← Mark only monochrome
├── oomsi-wordmark-forest.svg    ← Text only (nav bars, tight spaces)
├── oomsi-wordmark-white.svg     ← Text only for dark backgrounds
├── oomsi-favicon.svg            ← 32px optimized for browser tabs
├── oomsi-social-avatar-dark.svg ← Social media (dark pine background)
└── oomsi-social-avatar-light.svg← Social media (warm linen background)
```

### Usage Rules

- **Minimum clear space:** Half the height of the spark mark on all sides
- **Minimum size:** 24px height for the mark, 80px width for the full lockup
- **Always use the provided SVGs** — never recreate the logo
- **Never rotate, stretch, add effects, or change colors** outside these variants
- **The wordmark is always lowercase** — `oomsi`, never `Oomsi` or `OOMSI`

### When To Use What

| Context | File |
|---------|------|
| Website header / nav | `oomsi-lockup-forest.svg` |
| Dashboard sidebar | `oomsi-lockup-light.svg` (if dark sidebar) or `forest` |
| App icon (iOS/Android) | `oomsi-social-avatar-dark.svg` |
| Favicon | `oomsi-favicon.svg` |
| Social media profile | `oomsi-social-avatar-dark.svg` (preferred) |
| Email header | `oomsi-lockup-forest.svg` |
| Dark section of website | `oomsi-lockup-light.svg` |
| Over photos/imagery | `oomsi-lockup-white.svg` |
| Print / one-color | `oomsi-lockup-mono.svg` |
| Nav bar (tight space) | `oomsi-wordmark-forest.svg` + small spark mark |

---

## Color System

### Primary Colors

| Name | Hex | CSS Variable | Usage |
|------|-----|-------------|-------|
| **Oomsi Sage** | `#34D399` | `--oomsi-primary` | CTAs, active states, interactive elements, success |
| **Deep Forest** | `#1B6B50` | `--oomsi-primary-deep` | Logo, primary buttons, headline accents |
| **Pine** | `#1B4332` | `--oomsi-pine` | Dark backgrounds, sidebar, footer, dark-mode |

### Neutral Colors

| Name | Hex | CSS Variable | Usage |
|------|-----|-------------|-------|
| **Warm Linen** | `#FAF7F2` | `--oomsi-bg` | Primary page background |
| **Morning Light** | `#FFF9F0` | `--oomsi-bg-accent` | Card backgrounds, feature sections |
| **Sand** | `#E8DFD1` | `--oomsi-border` | Borders, dividers |
| **Ink** | `#2A3330` | `--oomsi-ink` | Primary text, headings |
| **Text** | `#3D4A44` | `--oomsi-text` | Body text |
| **Text Mid** | `#6B7C74` | `--oomsi-text-mid` | Secondary text, descriptions |
| **Text Light** | `#97A79F` | `--oomsi-text-light` | Tertiary text, placeholders |

### Accent Colors

| Name | Hex | CSS Variable | Usage |
|------|-----|-------------|-------|
| **Terracotta** | `#E07A5F` | `--oomsi-coral` | Alerts, urgent badges, warm energy accent |
| **Pool Blue** | `#7EB8DA` | `--oomsi-sky` | Links, info states, secondary accent |
| **Lavender** | `#A78BFA` | `--oomsi-violet` | AI/smart feature hints (use sparingly) |

### CSS Variables Block (copy-paste ready)

```css
:root {
  /* Primary */
  --oomsi-primary: #34D399;
  --oomsi-primary-deep: #1B6B50;
  --oomsi-primary-soft: #6EE7B7;
  --oomsi-pine: #1B4332;

  /* Neutrals */
  --oomsi-bg: #FAF7F2;
  --oomsi-bg-accent: #FFF9F0;
  --oomsi-border: #E8DFD1;
  --oomsi-ink: #2A3330;
  --oomsi-text: #3D4A44;
  --oomsi-text-mid: #6B7C74;
  --oomsi-text-light: #97A79F;
  --oomsi-white: #FFFFFF;

  /* Accents */
  --oomsi-coral: #E07A5F;
  --oomsi-sky: #7EB8DA;
  --oomsi-violet: #A78BFA;
}
```

### Color Rules
- **Never use pure black** (`#000`) — use Ink (`#2A3330`) or Pine (`#1B4332`)
- **Never use pure white backgrounds** — use Warm Linen (`#FAF7F2`) or Morning Light (`#FFF9F0`)
- **Terracotta is for urgency only** — don't use it decoratively
- **Lavender is for AI-powered features only** — don't overuse; it should feel like a subtle hint
- **Primary buttons** use Deep Forest (`#1B6B50`) with white text — NOT bright Sage

---

## Typography

### Font Stack

```css
/* Headlines & Display */
font-family: 'Sora', sans-serif;

/* Editorial / Taglines (use sparingly) */
font-family: 'Instrument Serif', serif;

/* Body / UI */
font-family: 'Plus Jakarta Sans', sans-serif;

/* Data / Metrics */
font-family: 'JetBrains Mono', monospace;
```

### Google Fonts Import

```html
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Sora:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Usage Guide

| Element | Font | Weight | Size (desktop) | Color |
|---------|------|--------|----------------|-------|
| Page headline (H1) | Instrument Serif | Regular | 48-56px | `--oomsi-ink` |
| Section title (H2) | Instrument Serif | Regular | 32-40px | `--oomsi-ink` |
| Card title (H3) | Sora | 600 | 18-20px | `--oomsi-ink` |
| Subsection (H4) | Sora | 600 | 16px | `--oomsi-ink` |
| Body text | Plus Jakarta Sans | 400 | 16px | `--oomsi-text` |
| Small body | Plus Jakarta Sans | 400 | 14px | `--oomsi-text-mid` |
| Button text | Plus Jakarta Sans | 600 | 14-16px | white |
| Nav links | Plus Jakarta Sans | 500 | 14px | `--oomsi-text-mid` |
| Metrics / Stats | JetBrains Mono | 700 | 24-32px | `--oomsi-ink` |
| Badge / Label | Plus Jakarta Sans | 600 | 11-12px | varies |
| Section label | Sora | 700 | 11px, tracking 0.15em, uppercase | `--oomsi-primary-deep` |

### Typography Rules
- **Headlines use Instrument Serif for warmth** — NOT Sora (Sora is for card titles and UI)
- **The wordmark "oomsi" uses Sora 700** — this is the only headline use of Sora
- **Letter-spacing on Sora headlines:** `-0.03em`
- **Line-height for body text:** `1.65-1.75`
- **Never use more than 2 fonts on a single screen** — typically Jakarta + one display font

---

## Component Patterns

### Buttons

```css
/* Primary button */
.btn-primary {
  background: var(--oomsi-primary-deep);  /* #1B6B50, NOT bright green */
  color: white;
  border-radius: 10px;
  padding: 12px 24px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 600;
  font-size: 15px;
  border: none;
  transition: background 0.2s;
}
.btn-primary:hover { background: #155E44; }

/* Secondary / Ghost button */
.btn-ghost {
  background: transparent;
  color: var(--oomsi-text-mid);
  border: 1px solid var(--oomsi-border);
  border-radius: 10px;
  padding: 12px 24px;
}
```

### Cards

```css
.card {
  background: var(--oomsi-white);
  border-radius: 14px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  padding: 24px;
}
```

### Status Badges

```css
.badge-pending { background: #FFF9F0; color: #D97706; }
.badge-assigned { background: #ECFDF5; color: var(--oomsi-primary-deep); }
.badge-urgent { background: #FEF2F2; color: #B91C1C; }
.badge-declined { background: #FEF2F2; color: var(--oomsi-coral); }
.badge-completed { background: #ECFDF5; color: var(--oomsi-primary-deep); }
.badge-ai { background: #F5F3FF; color: var(--oomsi-violet); } /* For AI features */
```

### Sidebar

```css
.sidebar {
  background: var(--oomsi-pine);  /* #1B4332 */
  color: white;
  width: 240px;
}
.sidebar .nav-item { color: rgba(255, 255, 255, 0.6); }
.sidebar .nav-item:hover { color: white; background: rgba(255, 255, 255, 0.06); }
.sidebar .nav-item.active { color: white; background: rgba(52, 211, 153, 0.15); }
```

---

## Brand Voice Quick Reference

### Do say
- "Everything just works"
- "Less stress, fuller calendars"
- "Your mornings, simplified"
- "Smart tools for vacation rental operators"

### Don't say
- "AI-powered" (as a headline — fine in body copy)
- "Revolutionary technology"
- "Leverage our machine learning"
- "Next-generation platform"

### Tone spectrum
`Calm ←——●——→ Energetic` (we sit slightly left of center)
`Formal ←——●——→ Casual` (we sit slightly right of center)
`Technical ←●———→ Accessible` (we sit far right)

---

## File Naming Convention

When exporting additional assets, follow this pattern:
```
oomsi-[type]-[variant]-[size?].svg
oomsi-lockup-forest.svg
oomsi-spark-mark-white.svg
oomsi-social-avatar-dark.svg
oomsi-og-image-1200x630.png
```

---

*Questions? Contact Santiago or refer to the rebrand proposal document.*
