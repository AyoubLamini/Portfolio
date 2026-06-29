---
name: "Ayoub Lamini Portfolio"
description: "Premium, minimal, and product-focused software engineering showcase."
colors:
  primary: "#4f46e5"
  primary-hover: "#4338ca"
  neutral-bg: "#09090b"
  neutral-surface: "#18181b"
  neutral-border: "#27272a"
  neutral-ink: "#f4f4f5"
  neutral-ink-muted: "#a1a1aa"
typography:
  display:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "clamp(3.5rem, 8vw, 6rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.05em"
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  "2xl": "48px"
  "3xl": "64px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-bg}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.neutral-ink}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
  card:
    backgroundColor: "{colors.neutral-surface}"
    rounded: "{rounded.md}"
    padding: "24px"
---

# Design System: Ayoub Lamini Portfolio

## 1. Overview

**Creative North Star: "The Engineer's Atelier"**

The visual system is centered on the principles of utility, precision, and restraint. It departs from the loud, glowing, cyberpunk gaming aesthetic to build a canvas that feels like a professional code editor or a high-end software studio. Space is treated as a functional structure rather than blank filling, and visual interest is derived entirely from typographic hierarchy, alignment, and high-quality microinteractions rather than decorative embellishments.

The design rejects any neon colors, glowing text, scanlines, floating blobs, or gratuitous scroll animations. It creates a calm, dark workspace where Ayoub Lamini's code, systems thinking, and web engineering capabilities are presented with absolute clarity and readability.

**Key Characteristics:**
- Premium dark minimalism (low-saturation Slate and Zinc tones).
- Typographic focus utilizing a single cohesive sans-serif family (Manrope) styled with negative letter-spacing for display.
- Strict, consistent grid alignment based on a 4px/8px system.
- Usability-first microinteractions and motion (150ms transitions).

## 2. Colors

The palette is monochromatic zinc accented by a single high-contrast primary color.

### Primary
- **Calm Indigo** (#4f46e5): Used for primary action buttons, active states, focus rings, and selection indicators. Never used for decorative lines or background gradients.

### Neutral
- **Studio Ink** (#09090b): The core canvas background color. A very dark, low-fatigue slate-black.
- **Panel Slate** (#18181b): Surface color for sections, card backdrops, header banners, and structured containers.
- **Rule Border** (#27272a): Used for borders, divider lines, and table lines to demarcate space without adding visual noise.
- **Studio Paper** (#f4f4f5): Primary ink for body copy, titles, and headers. Clean, high-contrast, and highly readable.
- **Ink Slate Muted** (#a1a1aa): Muted ink for subtext, secondary labels, metadata, and icons.

### Named Rules
**The Rare Accent Rule.** Calm Indigo must be applied to ≤5% of any screen. Its rarity is what gives it visual utility, immediately directing the visitor's eye to primary actions.
**The Border-as-Structure Rule.** Layout boundaries are defined by thin Rule Borders (#27272a) rather than shadow elevations or background gradients.

## 3. Typography

**Display Font:** Manrope (fallback: system-ui, -apple-system, sans-serif)
**Body Font:** Manrope (fallback: system-ui, -apple-system, sans-serif)
**Label/Mono Font:** JetBrains Mono (fallback: monospace)

**Character:** A single modern sans-serif family provides the typography, mirroring the cleanliness of high-end software tools. High contrast is created by changes in weight and negative letter-spacing for headlines.

### Hierarchy
- **Display** (SemiBold (600), clamp(3.5rem, 8vw, 6rem), 1, letter-spacing: -0.04em): Used for the main hero headline.
- **Headline** (SemiBold (600), clamp(2rem, 5vw, 3rem), 1.1, letter-spacing: -0.02em): Used for section headings.
- **Title** (Medium (500), 1.25rem, 1.4, letter-spacing: -0.01em): Used for card titles and project headers.
- **Body** (Regular (400), 1rem, 1.6, line length max 70ch): Used for long prose and description paragraphs.
- **Label** (Medium (500), 0.875rem (mono), 1.2, letter-spacing: 0.05em, uppercase): Used for buttons, metadata, tags, and small eyebrows.

### Named Rules
**The No-Orphan Rule.** Display, headline, and title elements must utilize `text-wrap: balance` to prevent single word wraps.
**The Contrast-Not-Variety Rule.** Do not introduce additional font families. Establish hierarchy strictly through weight, size, and letter-spacing variation.

## 4. Elevation

The system is flat-by-default. It relies on tonal layering (Panel Slate #18181b on top of Studio Ink #09090b) and thin Rule Borders (#27272a) to establish hierarchy.

### Named Rules
**The Flat-by-Default Rule.** Containers, panels, and buttons are completely flat at rest.
**The No-Glow Rule.** Shadows and glows (including box-shadow glow effects or neon drops) are prohibited on cards, texts, and buttons, even on hover.

## 5. Components

### Buttons
- **Shape:** Slightly rounded edges (4px radius).
- **Primary:** Calm Indigo background (#4f46e5), Studio Ink text (#09090b), padding (8px 16px).
- **Hover / Focus:** Transitions to Deep Indigo (#4338ca) over 150ms. Focus outlines with a 2px Calm Indigo ring.
- **Secondary:** Transparent background, Studio Paper text (#f4f4f5), Rule Border (1px solid #27272a). Hover transitions to a Panel Slate background (#18181b).

### Cards / Containers
- **Corner Style:** Rounded corners (8px radius).
- **Background:** Panel Slate (#18181b).
- **Shadow Strategy:** Flat (no shadows).
- **Border:** Thin border (1px solid #27272a).
- **Internal Padding:** Generous padding (24px).

### Inputs / Fields
- **Style:** Panel Slate background (#18181b), Rule Border (1px solid #27272a), rounded corners (4px radius).
- **Focus:** Transitions to a Calm Indigo border (#4f46e5) over 150ms.

### Navigation
- **Style:** Sticky top navigation bar. Clean, border-bottom (1px solid #27272a), Panel Slate background with a subtle backdrop-filter blur. Text items in Ink Slate Muted (#a1a1aa), transitioning to Studio Paper (#f4f4f5) on hover.

## 6. Do's and Don'ts

### Do:
- **Do** limit the line length of body paragraphs to 65-75ch to ensure optimal readability.
- **Do** use Manrope for both headlines and body text to maintain a consistent SaaS tool aesthetic.
- **Do** apply Calm Indigo strictly to primary CTA buttons and active states to guide user focus.
- **Do** implement high-contrast focus rings and aria-labels on all interactive elements.

### Don't:
- **Don't** use neon colors, glowing text, scanlines, or glitch effects.
- **Don't** use text gradients (`background-clip: text` combined with gradients) anywhere.
- **Don't** use Space Grotesk or any other fonts from the reflex-reject list.
- **Don't** use side-stripe borders (e.g. `border-left: 4px`) as accents on cards.
- **Don't** use decorative animations or floating blobs in the background.
- **Don't** use shadows or glassmorphism as a default backdrop decoration.
