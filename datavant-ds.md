# Datavant Design System — Source of Truth

Generated from the Datavant Figma DS. Framework: Mantine. Last updated: April 2026.

## Overview

- **Font:** Geist (Medium + Regular weights only)
- **Base size:** 16px / 1rem
- **Framework:** Mantine (components follow Mantine Paper/Provider patterns)
- **Theming:** Light and Dark mode supported via token layers
- **Color architecture:** Primitive tokens → Semantic tokens → Component tokens

## Colors

### Primitive Scale

Each color has 10 shades (50–900). Larger index = darker shade.

| **Token** | **50** | **100** | **200** | **300** | **400** | **500** | **600** | **700** | **800** | **900** |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| gray | #F9F9FB | #F2F3F8 | #E4E6EB | #C7CCD4 | #ACB3BD | #8C94A1 | #606A78 | #383D45 | #1D2024 | #020202 |
| blue | #F4F4FA | #E7EAFE | #D6DAFF | #B0BAF5 | #7C8CEF | #475FF2 | #2945F0 | #102CD5 | #142592 | #091877 |
| violet | #F5F0F7 | #ECDFF5 | #DBBFEC | #C698DF | #AE6DD1 | #A350CC | #932BC4 | #730E9C | #5A1773 | #33133F |
| red | #FFEFEF | #FFDDDD | #FFC1C1 | #FF9595 | #FF5959 | #FF1C1C | #DE1212 | #BD0909 | #8F0000 | #4F0808 |
| yellow | #FDFAEB | #FCF4CA | #FFEA8C | #FFE045 | #FFD12B | #F7B500 | #D19200 | #A16B00 | #855000 | #5C3900 |
| green | #F0FAF2 | #D0F7DD | #9EF0BC | #65E59F | #38C97F | #0DA65C | #008545 | #046338 | #064D2E | #053922 |
| emerald | #F6FAF0 | #E2F7D0 | #B7E593 | #80D154 | #54B827 | #399C13 | #217300 | #165900 | #084600 | #0E3900 |
| cyan | #F0FFFE | #D6FFFF | #A3FBF9 | #68F8F7 | #14E7E8 | #0CCCCF | #0AA5B0 | #11818A | #0C616B | #0F3D4C |
| lightBlue | #F4F7FA | #E7F4FE | #C4E8FF | #8FD4FF | #40B9FF | #1C9BE5 | #007BC7 | #0065A3 | #005082 | #003557 |
| orange | #FFF9F2 | #FFEAD1 | #FFD19C | #FFB463 | #FF8B33 | #FF6608 | #E55400 | #C44800 | #9C3200 | #6E2200 |
| pink | #FEF1F6 | #FEE5EF | #FFCBE1 | #FFA1C6 | #FF5E99 | #F53676 | #E8185A | #C90641 | #9C0832 | #6E0A26 |

### Semantic Tokens

#### Primary

| **Token** | **Value** | **Usage** |
|:-:|:-:|:-:|
| primary.default | #2945F0 | CTAs, accent color, borders |
| primary.darker | #102CD5 | Hover states, darker shade |

#### Status Colors

| **State** | **Background** | **Text** |
|:-:|:-:|:-:|
| Error | #FFEFEF | #CC0000 |
| Warning | #FDFAED | #735F08 |
| Success | #EEFBF2 | #265949 |
| Info (violet) | #F2EAF5 | #773A92 |
| Info (blue) | #ECEEFE | #091877 |
| Neutral | #F0EFEA | #020202 |

#### Text Hierarchy

| **Token** | **Value** | **Usage** |
|:-:|:-:|:-:|
| text.primary | #020202 | Main body text |
| text.secondary | #6D7888 | Supporting text |
| text.tertiary | #B0B6BF | Hints, placeholders |

#### Backgrounds

| **Token** | **Value** |
|:-:|:-:|
| background.primary | #FFFFFF |
| background.gradient | linear-gradient(45deg, #F3FFFF, #E9EBFB, #EEECE7) |

#### Table

| **Token** | **Value** |
|:-:|:-:|
| table.rowHighlight | #F9F9FB |
| table.header | #F2F3F8 |

#### Fill Opacities

| **Token** | **Value** |
|:-:|:-:|
| fill.white100 | #FFFFFF |
| fill.white75 | rgba(255,255,255,0.75) |
| fill.dark100 | #020202 |
| fill.dark75 | rgba(2,2,2,0.75) |

## Typography

**Font family:** Geist, system-ui, sans-serif  
**Weights used:** 400 (Regular), 500 (Medium) — no other weights  
**Base:** 16px / 1rem

### Heading — Regular (weight 400)

Scale: 1.250 Major Third

| **Token** | **Size** | **Rem** | **Line Height** | **LH Rem** |
|:-:|:-:|:-:|:-:|:-:|
| heading-4xl | 32px | 2rem | 40px | 2.5rem |
| heading-3xl | 28px | 1.75rem | 32px | 2rem |
| heading-2xl | 20px | 1.25rem | 28px | 1.75rem |
| heading-xl | 18px | 1.125rem | 24px | 1.5rem |
| heading-md | 14px | 0.875rem | 18px | 1.125rem |
| heading-sm | 12px | 0.75rem | 16px | 1rem |
| heading-xs | 10px | 0.625rem | 14px | 0.875rem |

### Heading — Medium (weight 500)

Same size/line-height scale as above, fontWeight 500.

### Body — Regular (weight 400)

Scale: 1.125 Major Second

| **Token** | **Size** | **Rem** | **Line Height** | **LH Rem** |
|:-:|:-:|:-:|:-:|:-:|
| body-xl | 18px | 1.125rem | 28px | 1.75rem |
| body-lg | 16px | 1rem | 24px | 1.5rem |
| body-md | 14px | 0.875rem | 20px | 1.25rem |
| body-sm | 12px | 0.75rem | 16px | 1rem |
| body-xs | 10px | 0.625rem | 14px | 0.875rem |

### Body — Medium (weight 500)

Same size/line-height scale, fontWeight 500.

### Body — Uppercase (weight 500 + text-transform: uppercase)

Same size/line-height scale, fontWeight 500, textTransform uppercase.

## Spacing

Base: 16px / 1rem

| **Token** | **Value** |
|:-:|:-:|
| spacing-none | 0px |
| spacing-xxs | 2px |
| spacing-xs | 4px |
| spacing-sm | 8px |
| spacing-md | 12px |
| spacing-lg | 16px |
| spacing-xl | 24px |
| spacing-xxl | 32px |

## Radius

Base: 16px / 1rem  
Note: Radius scale intentionally mirrors the spacing scale for system coherence.

| **Token** | **Value** |
|:-:|:-:|
| radius-none | 0px |
| radius-xs | 2px |
| radius-sm | 4px |
| radius-md | 8px |
| radius-lg | 16px |
| radius-xl | 24px |
| radius-xxl | 32px |

**Usage guidance:**

- radius-sm (4px) — small interactive elements: badges, tags, chips
- radius-md (8px) — default for inputs, buttons, dropdowns
- radius-lg (16px) — cards, panels, modals
- radius-xl / radius-xxl — pill shapes, full-radius containers

## Shadows

Applied to Paper-based components (cards, modals, dialogs). xs has 2 layers; sm–xl have 3 layers.

| **Token** | **CSS Value** |
|:-:|:-:|
| shadow-xs | 0px 1px 3px 0px rgba(0,0,0,0.05), 0px 1px 2px 0px rgba(0,0,0,0.1) |
| shadow-sm | 0px 1px 3px 0px rgba(0,0,0,0.05), 0px 10px 15px -5px rgba(0,0,0,0.05), 0px 7px 7px -5px rgba(0,0,0,0.04) |
| shadow-md | 0px 1px 3px 0px rgba(0,0,0,0.05), 0px 20px 25px -5px rgba(0,0,0,0.05), 0px 10px 10px -5px rgba(0,0,0,0.04) |
| shadow-lg | 0px 1px 3px 0px rgba(0,0,0,0.05), 0px 28px 23px -7px rgba(0,0,0,0.05), 0px 12px 12px -7px rgba(0,0,0,0.04) |
| shadow-xl | 0px 1px 3px 0px rgba(0,0,0,0.05), 0px 36px 28px -7px rgba(0,0,0,0.05), 0px 17px 17px -7px rgba(0,0,0,0.04) |

## Iconography

### Primary Icons — Tabler Icons

- **Library:** Tabler Icons v2.20.0
- **Source:** https://tabler-icons.io
- **License:** Open source, free, no attribution required, commercial use allowed
- **Stroke style:** Normal (not Light or Thin — those variants are not used)
- **Color:** currentColor — icons inherit color from their parent component context
- **Layout:** Direction Horizontal, Alignment Middle Center, Vertical resizing Hug, Horizontal resizing Hug

#### Icon Size Tokens

Base: 16px / 1rem

| **Token** | **Size** | **Rem** |
|:-:|:-:|:-:|
| icon-xs | 12px | 0.75rem |
| icon-sm | 16px | 1rem |
| icon-md | 20px | 1.25rem |
| icon-lg | 24px | 1.5rem |
| icon-xl | 32px | 2rem |

#### Usage guidance

- icon-xs (12px) — dense UI, inline labels, table cells
- icon-sm (16px) — default for most inline/text-adjacent usage
- icon-md (20px) — default for standalone icon buttons and form inputs
- icon-lg (24px) — navigation, prominent actions
- icon-xl (32px) — empty states, feature callouts, marketing UI

#### Icon Categories available in Tabler v2.20.0

Animals, Arrows, Brand, Buildings, Charts, Communication, Computers, Currencies, Database, Design, Devices, Document, E-commerce, Electrical, Food, Gender, Gestures, Health, Laundry, Letters, Logic, Map, Math, Media, Misc, Mood, Nature, Numbers, Photography, Shapes, Sport, Symbols, System, Text, Vehicles, Version Control, Weather, Zodiac

### Supplementary Icon Resources

These are used alongside Tabler for specific use cases (flags, social media). They are **not** interchangeable with Tabler — use only for their intended contexts.

| **Resource** | **Use case** | **Source** |
|:-:|:-:|:-:|
| Flat Flags with Variants (259 vector flags) by Ferdi Çıldız | Country/region flag components | https://www.figma.com/community/file/981185634033365228 |
| Social Media Icons by Mads Egmose | Social platform logos and links | https://www.figma.com/community/file/839558611085349133/social-media-icons |

## CSS Variables — Artifact / HTML Prototyping

Copy this block as a `<style>` tag into any HTML prototype or Claude.ai artifact. All values are derived from the token file — do not edit here independently; update datavant-tokens.json and regenerate.

```css
@import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;500&display=swap');

:root {
  /* Font */
  --font-family:          'Geist', system-ui, sans-serif;
  --font-weight-regular:  400;
  --font-weight-medium:   500;

  /* Primary */
  --color-primary:        #2945F0;
  --color-primary-hover:  #102CD5;

  /* Text */
  --color-text-primary:   #020202;
  --color-text-secondary: #6D7888;
  --color-text-tertiary:  #B0B6BF;

  /* Backgrounds */
  --color-bg-primary:     #FFFFFF;
  --color-bg-gradient:    linear-gradient(45deg, #F3FFFF, #E9EBFB, #EEECE7);

  /* Status */
  --color-error-bg:       #FFEFEF;  --color-error-text:   #CC0000;
  --color-warning-bg:     #FDFAED;  --color-warning-text: #735F08;
  --color-success-bg:     #EEFBF2;  --color-success-text: #265949;
  --color-info-v-bg:      #F2EAF5;  --color-info-v-text:  #773A92;
  --color-info-b-bg:      #ECEEFE;  --color-info-b-text:  #091877;
  --color-neutral-bg:     #F0EFEA;  --color-neutral-text: #020202;

  /* Table */
  --color-table-header:   #F2F3F8;
  --color-table-row-alt:  #F9F9FB;

  /* Spacing */
  --space-xxs: 2px;   --space-xs: 4px;   --space-sm: 8px;
  --space-md:  12px;  --space-lg: 16px;  --space-xl: 24px;  --space-xxl: 32px;

  /* Radius */
  --radius-none: 0px;   --radius-xs: 2px;    --radius-sm: 4px;
  --radius-md:   8px;   --radius-lg: 16px;   --radius-xl: 24px;  --radius-xxl: 32px;

  /* Shadows */
  --shadow-xs: 0px 1px 3px 0px rgba(0,0,0,0.05), 0px 1px 2px 0px rgba(0,0,0,0.1);
  --shadow-sm: 0px 1px 3px 0px rgba(0,0,0,0.05), 0px 10px 15px -5px rgba(0,0,0,0.05), 0px 7px 7px -5px rgba(0,0,0,0.04);
  --shadow-md: 0px 1px 3px 0px rgba(0,0,0,0.05), 0px 20px 25px -5px rgba(0,0,0,0.05), 0px 10px 10px -5px rgba(0,0,0,0.04);
  --shadow-lg: 0px 1px 3px 0px rgba(0,0,0,0.05), 0px 28px 23px -7px rgba(0,0,0,0.05), 0px 12px 12px -7px rgba(0,0,0,0.04);
  --shadow-xl: 0px 1px 3px 0px rgba(0,0,0,0.05), 0px 36px 28px -7px rgba(0,0,0,0.05), 0px 17px 17px -7px rgba(0,0,0,0.04);

  /* Icon sizes */
  --icon-xs: 12px;  --icon-sm: 16px;  --icon-md: 20px;
  --icon-lg: 24px;  --icon-xl: 32px;
}

*, *::before, *::after { box-sizing: border-box; }

body {
  font-family: var(--font-family);
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: var(--font-weight-regular);
  color: var(--color-text-primary);
  background: var(--color-bg-primary);
  -webkit-font-smoothing: antialiased;
}
```

## Usage Notes for Prototyping

- Always use **Geist** — no other fonts
- Use **weight 400 or 500 only** — no bold (600/700)
- Primary action color is **#2945F0** (blue-600); hover is **#102CD5** (blue-700)
- Error/warning/success states use the semantic background + text pairs above — never raw primitive colors directly
- Text hierarchy: primary #020202 → secondary #6D7888 → tertiary #B0B6BF
- Spacing follows the 8-point-adjacent scale: 2, 4, 8, 12, 16, 24, 32
- Radius follows the same scale as spacing — use consistently with component size
- Card/surface shadows use shadow-sm or shadow-md by default
- Icons use **Tabler Icons v2.20.0**, stroke Normal only — never Light or Thin
- Icon color is always currentColor — never hardcode a color value on an icon directly
- Default icon size for inline/text use is icon-sm (16px); for standalone buttons use icon-md (20px)
- Flags and social media icons are separate resources — not Tabler substitutes
- Light/Dark mode is toggled at the container frame level via the Tokens layer property
