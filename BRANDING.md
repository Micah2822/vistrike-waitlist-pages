# VISTRIKE Brand Guidelines

## Brand Name
**VISTRIKE** (all caps, no spaces)

---

## Colors

### Primary Colors
| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Charcoal Black | `#0A0A0C` | rgb(10, 10, 12) | Primary background |
| White | `#FFFFFF` | rgb(255, 255, 255) | Primary text, headings |
| Electric Blue | `#2563EB` | rgb(37, 99, 235) | Primary accent, buttons, CTAs |

### Secondary Colors
| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Dark Gray | `#111115` | rgb(17, 17, 21) | Secondary background, cards |
| Tertiary Gray | `#18181D` | rgb(24, 24, 29) | Tertiary surfaces |
| Light Blue | `#3B82F6` | rgb(59, 130, 246) | Accent hover states |
| Dark Blue | `#1D4ED8` | rgb(29, 78, 216) | Accent pressed states |

### Text Colors
| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Primary Text | `#FFFFFF` | rgb(255, 255, 255) | Headlines, important text |
| Secondary Text | `#A1A1AA` | rgb(161, 161, 170) | Body text, descriptions |
| Muted Text | `#71717A` | rgb(113, 113, 122) | Subtle labels, hints |

### Border Colors
| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Primary Border | `#1F1F28` | rgb(31, 31, 40) | Subtle borders |
| Secondary Border | `#2A2A38` | rgb(42, 42, 56) | Visible borders |

### Accent Glow
| Name | Value | Usage |
|------|-------|-------|
| Accent Glow | `rgba(37, 99, 235, 0.5)` | Button shadows, hover effects |
| Accent Subtle | `rgba(37, 99, 235, 0.1)` | Background tints, badges |

### Fighter Colors (for analytics display)
| Name | Hex | Usage |
|------|-----|-------|
| Fighter Red | `#EF4444` | Red corner fighter stats |
| Fighter Blue | `#3B82F6` | Blue corner fighter stats |

### Status Colors
| Name | Hex | Usage |
|------|-----|-------|
| Success | `#22C55E` | Success states, confirmations |
| Error | `#EF4444` | Error messages, warnings |

---

## Typography

### Font Family
**Inter** - Primary font for all text
- Source: Google Fonts
- Weights used: 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold), 800 (ExtraBold)

```css
font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
```

### Logo Typography
- Font: Inter ExtraBold (800)
- Letter spacing: 0.2em
- Transform: Uppercase
- Color: White (#FFFFFF)

### Heading Styles
| Element | Size | Weight | Letter Spacing |
|---------|------|--------|----------------|
| H1 (Hero) | 64px (clamp 36-64px) | 700 | -0.02em |
| H2 (Section) | 40px (clamp 28-40px) | 700 | normal |
| H3 | 24px | 700 | normal |
| Subheadline | 24px (clamp 18-24px) | 500 | 0.02em |

### Body Text
| Type | Size | Weight | Line Height |
|------|------|--------|-------------|
| Body Large | 20px | 400 | 1.6 |
| Body | 16px | 400 | 1.6 |
| Small | 14px | 400 | 1.5 |
| Caption | 12px | 600 | 1.4 |

---

## Visual Effects

### Glassmorphism
```css
background: rgba(17, 17, 21, 0.8);
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);
border: 1px solid rgba(37, 99, 235, 0.2);
```

### Accent Glow Effect
```css
box-shadow: 0 8px 32px rgba(37, 99, 235, 0.5);
```

### Hover Elevation
```css
transform: translateY(-2px);
box-shadow: 0 8px 32px rgba(37, 99, 235, 0.5), 0 0 0 1px rgba(255,255,255,0.1);
```

### Grid Background
```css
background-image: 
  linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
  linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
background-size: 60px 60px;
```

### Hero Glow
```css
background: radial-gradient(ellipse at center, rgba(37, 99, 235, 0.15) 0%, rgba(37, 99, 235, 0.05) 40%, transparent 70%);
filter: blur(60px);
```

---

## Animation & Transitions

### Default Transition
```css
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

### Fade In Up Animation
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
animation: fadeInUp 0.6s ease-out forwards;
```

### Pulse Glow Animation
```css
@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(37, 99, 235, 0.5);
  }
  50% {
    box-shadow: 0 0 40px rgba(37, 99, 235, 0.5), 0 0 60px rgba(37, 99, 235, 0.3);
  }
}
```

---

## Component Styles

### Buttons (Primary)
```css
background: #2563EB;
color: #FFFFFF;
border: none;
border-radius: 8px;
padding: 16px 32px;
font-size: 16px;
font-weight: 600;
```

### Cards
```css
background: #111115;
border: 1px solid #1F1F28;
border-radius: 16px;
padding: 24px;
```

### Badges
```css
background: rgba(37, 99, 235, 0.1);
color: #3B82F6;
padding: 8px 16px;
border-radius: 100px;
font-size: 12px;
font-weight: 600;
text-transform: uppercase;
letter-spacing: 0.1em;
border: 1px solid rgba(37, 99, 235, 0.2);
```

### Input Fields
```css
background: #0A0A0C;
border: 1px solid transparent;
border-radius: 12px;
padding: 0 20px;
height: 56px;
font-size: 16px;
color: #FFFFFF;
```

---

## Spacing Scale
| Size | Value |
|------|-------|
| xs | 4px |
| sm | 8px |
| md | 16px |
| lg | 24px |
| xl | 32px |
| 2xl | 48px |
| 3xl | 64px |
| 4xl | 80px |
| 5xl | 100px |

---

## Border Radius
| Size | Value |
|------|-------|
| sm | 8px |
| md | 12px |
| lg | 16px |
| xl | 24px |
| pill | 100px |

---

## CSS Variables Reference

All colors are defined in `src/index.css`:

```css
:root {
  --bg-primary: #0A0A0C;
  --bg-secondary: #111115;
  --bg-tertiary: #18181D;
  --border-primary: #1F1F28;
  --border-secondary: #2A2A38;
  --accent: #2563EB;
  --accent-light: #3B82F6;
  --accent-dark: #1D4ED8;
  --accent-glow: rgba(37, 99, 235, 0.5);
  --accent-subtle: rgba(37, 99, 235, 0.1);
  --text-primary: #FFFFFF;
  --text-secondary: #A1A1AA;
  --text-muted: #71717A;
  --error: #EF4444;
  --success: #22C55E;
  --fighter-red: #EF4444;
  --fighter-blue: #3B82F6;
}
```

---

## Brand Voice & Messaging

### Tagline
"Visual intelligence for combat sports"

### Subtagline
"Powered by AI. Built for everyday fighters."

### Key Messages
- Train smarter with real-time insights
- Every punch, every round, every session
- Built by fighters, for fighters

### Tone
- Confident but accessible
- Technical but not overwhelming
- Professional yet approachable
- Future-focused
