# Datavant Design System — Claude Code Brief

This project uses the **Datavant Design System**.  
All exact token values are in datavant-tokens.json. This file covers stack, rules, and anti-patterns only.

## Stack

- **Framework:** React (unless told otherwise)
- **UI Library:** Mantine
- **Font:** Geist — https://fonts.googleapis.com/css2?family=Geist:wght@400;500&display=swap
- **Icons:** @tabler/icons-react — stroke Normal, size from icon token scale (icon-sm 16px inline, icon-md 20px standalone)

## Non-negotiable rules

- **Font:** Geist only — never Inter, system-ui alone, or any other font
- **Font weights:** 400 and 500 only — never 600, 700, or font-bold
- **Colors:** Semantic tokens only — never raw primitives directly in components
- **Primary:** #2945F0 default, #102CD5 hover — never substitute a different blue
- **Icons:** currentColor always — never hardcode a color value on an icon
- **Radius default:** radius-md (8px) for inputs and buttons; radius-lg (16px) for cards
- **Shadows:** shadow-sm or shadow-md for cards and surfaces — no glows or colored shadows
- **Status states:** Always use semantic bg + text pair from tokens — never a raw primitive

## What "AI-generated" looks like — avoid all of these

- Generic blue (#3B82F6, #60A5FA) instead of #2945F0
- font-bold or font weight 600+ anywhere
- Excessive or multi-layer drop shadows, glows, or blurs
- Border radius larger than radius-lg (16px) on rectangular containers
- Tailwind color shortcuts like text-gray-500 — use exact DS hex values
- Gradient text
- More than one font family
- Spacing that doesn't follow the scale: 2 / 4 / 8 / 12 / 16 / 24 / 32px

## Token reference

All values → datavant-tokens.json  
Human-readable docs → datavant-ds.md
