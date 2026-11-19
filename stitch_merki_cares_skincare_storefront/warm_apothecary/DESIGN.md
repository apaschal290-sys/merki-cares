---
name: Warm Apothecary
colors:
  surface: '#fbf9f5'
  surface-dim: '#dbdad6'
  surface-bright: '#fbf9f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3ef'
  surface-container: '#efeeea'
  surface-container-high: '#eae8e4'
  surface-container-highest: '#e4e2de'
  on-surface: '#1b1c1a'
  on-surface-variant: '#444748'
  inverse-surface: '#30312e'
  inverse-on-surface: '#f2f0ed'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#171818'
  on-primary: '#ffffff'
  primary-container: '#2c2c2c'
  on-primary-container: '#949393'
  inverse-primary: '#c8c6c5'
  secondary: '#715954'
  on-secondary: '#ffffff'
  secondary-container: '#f9d8d2'
  on-secondary-container: '#765d58'
  tertiary: '#001d07'
  on-tertiary: '#ffffff'
  tertiary-container: '#003413'
  on-tertiary-container: '#00aa4d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e4e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1b1c1c'
  on-primary-fixed-variant: '#474747'
  secondary-fixed: '#fcdbd5'
  secondary-fixed-dim: '#dfbfba'
  on-secondary-fixed: '#291714'
  on-secondary-fixed-variant: '#58413d'
  tertiary-fixed: '#66ff8e'
  tertiary-fixed-dim: '#3de273'
  on-tertiary-fixed: '#002109'
  on-tertiary-fixed-variant: '#005322'
  background: '#fbf9f5'
  on-background: '#1b1c1a'
  surface-variant: '#e4e2de'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 3rem
    fontWeight: '700'
    lineHeight: 3.5rem
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 2rem
    fontWeight: '700'
    lineHeight: 2.5rem
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 2.25rem
    fontWeight: '600'
    lineHeight: 2.75rem
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.625rem
    fontWeight: '600'
    lineHeight: 2.125rem
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.5rem
    fontWeight: '600'
    lineHeight: 2rem
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: 1.75rem
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: 1.75rem
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.5rem
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.375rem
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.875rem
    fontWeight: '600'
    lineHeight: 1.25rem
    letterSpacing: 0.02em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.75rem
    fontWeight: '600'
    lineHeight: 1rem
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.6875rem
    fontWeight: '500'
    lineHeight: 0.875rem
    letterSpacing: 0.03em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1.25rem
  margin-desktop: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system embodies the warmth, clarity, and safety expected of a family-first, adult-focused botanical skincare line. The visual voice blends the clinical trustworthiness of a clean apothecary with the intimate comfort of a domestic nursery or personal vanity.

Key pillars:
- **Atmospheric Warmth**: The experience rejects stark clinical sterility in favor of soft, natural ivory tones, subtle tactile blush accents, and generous spatial breathing room.
- **Gentle Reassurance**: Interfaces feel peaceful and uncomplicated. Parents and busy adults can navigate without visual overwhelm or sensory friction.
- **Accessible Utility**: High-contrast, soft-charcoal type pairs with distinct, pill-shaped interactions and dedicated conversational commerce touchpoints (such as direct WhatsApp consultations and orders).
- **Style Classification**: Modern Minimalist Apothecary infused with Soft Tactile Comfort.

## Colors

The palette establishes an organic, restful foundation with deliberate conversational callouts:

- **Primary (`#2C2C2C`)**: Deep charcoal/soft black used for key call-to-actions, core messaging, headers, and prominent structural elements. Provides clear readability without the harshness of pure `#000000`.
- **Secondary (`#F7D6D0`)**: Soft rose-blush, providing soothing accent washes, chip selections, badge highlights, and gentle interactive states. Supported by `#FCEBEB` for subtler tinted backdrops and `#ECA1A6` for defined active borders.
- **Tertiary (`#25D366`)**: Pure WhatsApp green, strictly reserved for immediate parent care assistance, live consultation triggers, and direct conversational checkout CTAs. Never used for general system success indicators to maintain its distinct functional association.
- **Neutral (`#FDFBF7`)**: Warm porcelain/ivory tone establishing the primary canvas, backed by pure `#FFFFFF` for elevated foreground cards and containers.

## Typography

The type system is powered by Plus Jakarta Sans across all layers. Its rounded humanist geometry communicates kindness, approachability, and modern clarity.

- **Headlines**: Weighted at semi-bold (600) and bold (700) with subtle negative letter-spacing to present an intentional, editorial boutique quality without geometric severity.
- **Body**: Regular weight (400) maintains open apertures and balanced horizontal proportions, ensuring effortless legibility when browsing ingredients or reading routine guidance on mobile displays.
- **Labels**: Set slightly tracked out with heightened weights (500–600) for botanical tags, size selectors, status pills, and CTA button text.

## Layout & Spacing

A mobile-first fluid grid prioritizes thumb navigation, vertical breathing space, and horizontal scrolling shelves:

- **Mobile Viewport (<768px)**: 4-column fluid layout with `1.25rem` outer canvas margin and `1rem` column gutters. Bottom padding on all views is augmented to prevent collision with fixed actions and floating chat elements.
- **Tablet/Desktop (≥768px)**: Expands into an 8 to 12-column grid maxed at 1200px container width, maintaining centered balance with `3rem` margins to emulate an uncluttered, spacious catalog.
- **Spacing Rhythm**: Component internals adhere to `0.5rem` (8px) base increments. Generous `space-xl` gaps divide product features, parental reassurance badges, and routine steps, preserving the airy boutique feeling.

## Elevation & Depth

This system avoids heavy, artificial drop shadows, relying instead on clean tonal surfaces, soft ambient diffusion, and subtle borders:

- **Canvas Base**: `#FDFBF7` provides a non-reflective porcelain surface.
- **Layer 1 (Cards & Modules)**: Pure `#FFFFFF` surfaces with an ultra-soft ambient shadow: `0 8px 24px -4px rgba(44, 44, 44, 0.04)`. Outlines are gentle and semi-translucent (`1px solid rgba(247, 214, 208, 0.45)`).
- **Layer 2 (Overlays, Modals, Quick-View)**: `#FFFFFF` paired with an expanded soft perimeter shadow: `0 16px 36px -6px rgba(44, 44, 44, 0.08)`.
- **Floating Controls (WhatsApp Trigger & Floating Cart)**: Raised distinctly via `0 10px 28px -4px rgba(37, 211, 102, 0.35)` to establish immediate interactive priority above the page flow.

## Shapes

The geometry of the design system is welcoming, organic, and friendly:

- **Level 3 (Pill-shaped)** defines the primary shape language. Interactive buttons, badges, chips, and quick tags use full pill radiuses (`9999px` / `rounded-full`).
- **Cards & Containers**: Large visual containers adopt exaggerated roundedness (such as `1.5rem` / `rounded-2xl` on mobile and `2rem` / `rounded-3xl` on desktop modules) to reflect safe, child-friendly, and non-abrasive physical product containers.
- **Form Controls & Inputs**: Form fields carry smooth `1rem` to full pill radii for natural tactile appeal.

## Components

### Buttons
- **Primary CTA**: Full pill shape (`rounded-full`), deep charcoal `#2C2C2C` background, `#FFFFFF` text, `label-lg` styling. Provides a reassuring and solid anchor for adding to bag or confirming steps.
- **WhatsApp Order CTA**: Full pill shape, WhatsApp Green (`#25D366`), `#FFFFFF` text, paired with the official conversational icon. Dedicated exclusively for "Order via WhatsApp" or "Ask a Skincare Specialist".
- **Secondary / Ghost**: Full pill shape, transparent background with a delicate `#F7D6D0` or charcoal outline, tinted `#2C2C2C` label, shifting to `#FCEBEB` on hover/active.

### Chips & Filter Pills
- Compact, full-pill structures used for skin concerns (e.g., "Eczema-Safe", "Fragrance-Free", "Newborn Gentle").
- Unselected: `#FFFFFF` fill with `1px solid rgba(44, 44, 44, 0.08)` border.
- Selected: Soft blush `#F7D6D0` fill with deeper `#2C2C2C` text and a subtle `#ECA1A6` boundary ring.

### Product & Routine Cards
- Grounded on `#FFFFFF` surfaces with `rounded-2xl` or `rounded-3xl` corners.
- Generous internal padding (`space-lg`), soft ivory product image backing (`#FDFBF7`), subtle price and concern tags, and direct quick-order actions.

### Form Inputs
- Rounded pill and container fields using a subtle `#FDFBF7` fill and a `#F7D6D0` resting outline.
- Active states feature a focused `#2C2C2C` hairline ring with no abrasive glow.

### Sticky Floating WhatsApp Chat Button
- Fixed bottom-right element (mobile: `bottom-5 right-5`, desktop: `bottom-8 right-8`), `rounded-full` 56px circular button in `#25D366` containing the conversational icon.
- Accompanied by an optional dismissible gentle pill tooltip: *"Have questions for your baby's skin? Chat with us."* with a `#FFFFFF` fill and soft ambient shadow.