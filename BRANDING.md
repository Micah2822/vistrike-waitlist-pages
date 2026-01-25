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

## Video Frame (Futuristic Display)

A cinematic video container with glowing corner accents and animated effects.

### Video Frame Container
```css
.video-frame {
  position: relative;
  border-radius: 20px;
  overflow: visible;
  background: rgba(10, 10, 15, 0.8);
  border: 2px solid rgba(37, 99, 235, 0.4);
  box-shadow: 
    0 0 60px rgba(37, 99, 235, 0.2),
    0 0 120px rgba(37, 99, 235, 0.1),
    0 40px 80px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}
```

### Corner Accent Marks
Glowing L-shaped corner marks on all four corners of the frame.

```css
.frame-corner {
  position: absolute;
  width: 24px;
  height: 24px;
  z-index: 10;
}

.frame-corner::before,
.frame-corner::after {
  content: '';
  position: absolute;
  background: rgba(37, 99, 235, 0.8);
  box-shadow: 0 0 8px rgba(37, 99, 235, 0.6);
}

/* Top-left corner */
.frame-corner.top-left { top: -2px; left: -2px; }
.frame-corner.top-left::before { width: 24px; height: 3px; top: 0; left: 0; }
.frame-corner.top-left::after { width: 3px; height: 24px; top: 0; left: 0; }

/* Top-right corner */
.frame-corner.top-right { top: -2px; right: -2px; }
.frame-corner.top-right::before { width: 24px; height: 3px; top: 0; right: 0; }
.frame-corner.top-right::after { width: 3px; height: 24px; top: 0; right: 0; }

/* Bottom-left corner */
.frame-corner.bottom-left { bottom: -2px; left: -2px; }
.frame-corner.bottom-left::before { width: 24px; height: 3px; bottom: 0; left: 0; }
.frame-corner.bottom-left::after { width: 3px; height: 24px; bottom: 0; left: 0; }

/* Bottom-right corner */
.frame-corner.bottom-right { bottom: -2px; right: -2px; }
.frame-corner.bottom-right::before { width: 24px; height: 3px; bottom: 0; right: 0; }
.frame-corner.bottom-right::after { width: 3px; height: 24px; bottom: 0; right: 0; }
```

### Frame Glow Animation
Animated glow effect behind the video frame.

```css
.frame-glow {
  position: absolute;
  inset: -4px;
  border-radius: 24px;
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.3) 0%, transparent 30%, transparent 70%, rgba(139, 92, 246, 0.2) 100%);
  z-index: -1;
  filter: blur(20px);
  animation: frameGlow 3s ease-in-out infinite;
}

@keyframes frameGlow {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}
```

### Video Element
```css
.showcase-video {
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
  display: block;
  border-radius: 18px;
}
```

### Video Overlay (Subtle Gradient)
```css
.video-overlay {
  position: absolute;
  inset: 0;
  border-radius: 18px;
  background: linear-gradient(
    180deg,
    rgba(37, 99, 235, 0.05) 0%,
    transparent 30%,
    transparent 70%,
    rgba(10, 10, 15, 0.3) 100%
  );
  pointer-events: none;
}
```

### JSX Structure
```jsx
<div className="video-frame">
  <div className="frame-corner top-left"></div>
  <div className="frame-corner top-right"></div>
  <div className="frame-corner bottom-left"></div>
  <div className="frame-corner bottom-right"></div>
  <div className="frame-glow"></div>
  <video className="showcase-video" autoPlay loop muted playsInline>
    <source src="/assets/video.mp4" type="video/mp4" />
  </video>
  <div className="video-overlay"></div>
</div>
```

---

## Analysis Dashboard (Fighter Report)

A glassmorphism dashboard for displaying fighter statistics and insights.

### Dashboard Container
```css
.analysis-dashboard {
  margin-top: 48px;
  background: rgba(10, 10, 15, 0.85);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(37, 99, 235, 0.2);
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4), 0 0 40px rgba(37, 99, 235, 0.08);
}
```

### Dashboard Header
```css
.dashboard-header {
  text-align: center;
  margin-bottom: 32px;
}

.dashboard-badge {
  display: inline-block;
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.2) 0%, rgba(139, 92, 246, 0.15) 100%);
  color: var(--accent-light); /* #3B82F6 */
  padding: 6px 14px;
  border-radius: 100px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: 12px;
  border: 1px solid rgba(37, 99, 235, 0.3);
}

.dashboard-title {
  font-size: 22px;
  font-weight: 700;
  color: var(--text-primary); /* #FFFFFF */
  margin: 0;
}
```

### Fighter Cards
Side-by-side comparison cards for Blue and Red corners.

```css
.fighters-comparison {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 24px;
  align-items: stretch;
  margin-bottom: 32px;
}

.fighter-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Blue corner accent */
.fighter-card.blue-corner {
  border-left: 3px solid #3B82F6;
}

/* Red corner accent */
.fighter-card.red-corner {
  border-left: 3px solid #EF4444;
}
```

### Corner Indicator (Glowing Dot)
```css
.corner-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.corner-indicator.blue {
  background: #3B82F6;
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
}

.corner-indicator.red {
  background: #EF4444;
  box-shadow: 0 0 10px rgba(239, 68, 68, 0.5);
}
```

### Stat Rows
```css
.stat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.stat-name {
  font-size: 13px;
  color: var(--text-muted); /* #71717A */
  min-width: 70px;
}

.stat-number {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary); /* #FFFFFF */
}
```

### Accuracy/Progress Bars
```css
.accuracy-bar {
  flex: 1;
  height: 8px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  max-width: 100px;
}

.accuracy-fill {
  height: 100%;
  border-radius: 4px;
  background: linear-gradient(90deg, #6B7280 0%, #9CA3AF 100%);
  transition: width 0.5s ease;
}

/* Success variant (green) */
.accuracy-bar.success .accuracy-fill {
  background: linear-gradient(90deg, #22C55E 0%, #4ADE80 100%);
  box-shadow: 0 0 8px rgba(34, 197, 94, 0.4);
}

/* Warning variant (amber) */
.accuracy-bar.warning .accuracy-fill {
  background: linear-gradient(90deg, #F59E0B 0%, #FBBF24 100%);
  box-shadow: 0 0 8px rgba(245, 158, 11, 0.4);
}

.accuracy-text {
  position: absolute;
  right: -36px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary); /* #A1A1AA */
}
```

### Fighter Insight Box
Quick insight callout with icon.

```css
.fighter-insight {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px;
  background: rgba(245, 158, 11, 0.08);
  border: 1px solid rgba(245, 158, 11, 0.2);
  border-radius: 10px;
  margin-top: auto;
}

.fighter-insight svg {
  width: 16px;
  height: 16px;
  color: #FBBF24;
  flex-shrink: 0;
}

.fighter-insight span {
  font-size: 12px;
  color: var(--text-secondary);
  line-height: 1.4;
}

/* Success variant */
.fighter-insight.success {
  background: rgba(34, 197, 94, 0.08);
  border-color: rgba(34, 197, 94, 0.2);
}

.fighter-insight.success svg {
  color: #4ADE80;
}
```

### VS Divider
```css
.vs-divider {
  display: flex;
  align-items: center;
  justify-content: center;
}

.vs-divider span {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-muted);
  letter-spacing: 0.1em;
}
```

### Key Moments Timeline
```css
.key-moments {
  margin-bottom: 28px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.moments-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0 0 16px;
}

.moment {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 10px;
  border: 1px solid transparent;
}

.moment.highlight {
  background: rgba(34, 197, 94, 0.05);
  border-color: rgba(34, 197, 94, 0.15);
}

.moment-time {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
  font-family: monospace;
  min-width: 36px;
}

.moment-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.moment-dot.blue {
  background: #3B82F6;
  box-shadow: 0 0 8px rgba(59, 130, 246, 0.5);
}

.moment-dot.red {
  background: #EF4444;
  box-shadow: 0 0 8px rgba(239, 68, 68, 0.5);
}

.moment-text {
  font-size: 13px;
  color: var(--text-secondary);
}

.moment.highlight .moment-text {
  color: var(--text-primary);
}
```

### Training Insights Cards
```css
.training-insights {
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.insights-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  font-weight: 600;
  color: var(--accent-light);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0 0 16px;
}

.insights-title svg {
  width: 16px;
  height: 16px;
}

.insights-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.insight-card {
  padding: 16px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
}

.insight-card.blue {
  border-left: 3px solid #3B82F6;
}

.insight-card.red {
  border-left: 3px solid #EF4444;
}

.insight-corner {
  display: inline-block;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 8px;
}

.insight-card.blue .insight-corner {
  color: #60A5FA;
}

.insight-card.red .insight-corner {
  color: #F87171;
}

.insight-card p {
  margin: 0;
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
}
```

### Responsive Behavior (Mobile)
```css
@media (max-width: 700px) {
  .analysis-dashboard {
    padding: 20px;
    margin-top: 32px;
    border-radius: 16px;
  }
  
  .fighters-comparison {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .insights-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .frame-corner {
    width: 16px;
    height: 16px;
  }
}
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
