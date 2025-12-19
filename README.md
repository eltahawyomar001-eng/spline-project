# Infrastructure Intelligence - Hero Section POC

A premium B2B hero section proof-of-concept featuring a 3D interactive building visualization using Spline, built with React, TypeScript, and TailwindCSS.

## ✨ Features

- **Dark Mode Luxury Design** - Bloomberg Terminal aesthetic with grid patterns, glass morphism, and soft bloom highlights
- **Interactive 3D Model** - Spline integration with hotspots for roof, windows, and parking areas
- **Animated Data Cards** - Framer Motion powered cards that appear on hover/click
- **Magnetic Buttons** - Subtle hover effect that follows cursor
- **Smooth Scrolling** - Lenis integration for butter-smooth page scrolling
- **Fully Responsive** - Optimized for mobile, tablet, and desktop
- **Accessible** - Focus styles, reduced motion support, semantic HTML

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Navigate to project directory
cd "spline project"

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be running at `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   └── Hero/
│       ├── Hero.tsx           # Main hero section component
│       ├── SplineBuilding.tsx # 3D Spline integration + hotspots
│       ├── DataCard.tsx       # Animated data cards
│       ├── MagneticButton.tsx # Magnetic hover effect buttons
│       └── index.ts           # Exports
├── hooks/
│   ├── useLenis.ts            # Smooth scrolling hook
│   └── useMagnetic.ts         # Magnetic effect hook
├── styles/
│   └── globals.css            # Global styles, utilities, animations
├── App.tsx                    # Main app with demo sections
└── main.tsx                   # Entry point
```

## 🎨 How to Create the Spline Scene

To make the 3D model fully interactive, you need to create a scene in Spline:

### Step 1: Create Your Scene
1. Go to [spline.design](https://spline.design) and create a new project
2. Build a building-like shape (box/glass/wireframe aesthetic)
3. Add distinct parts that users can interact with

### Step 2: Name Your Objects (CRITICAL!)
In Spline, select each interactive object and name them EXACTLY:
- `roof` - The roof/top section of the building
- `windows` - The facade/glazing/window section
- `parking` - The parking/ground level section

### Step 3: Add Interactions in Spline (Optional)
- Enable orbit/drag controls for rotation
- You can add glow effects on hover in Spline itself

### Step 4: Export and Get URL
1. Click **Export** in Spline
2. Select **Share**
3. Copy the public URL (looks like: `https://prod.spline.design/xxxxx/scene.splinecode`)

### Step 5: Update the Code
Open `src/components/Hero/SplineBuilding.tsx` and replace:

```typescript
const SPLINE_URL = 'YOUR_SPLINE_SCENE_URL_HERE';
```

With your actual Spline URL:

```typescript
const SPLINE_URL = 'https://prod.spline.design/your-scene-id/scene.splinecode';
```

## 🎯 Hotspot Configuration

The hotspot positions can be adjusted in `SplineBuilding.tsx`:

```typescript
const HOTSPOT_POSITIONS = {
  roof: { x: '50%', y: '15%', cardX: 280, cardY: 20 },
  windows: { x: '65%', y: '45%', cardX: 320, cardY: 150 },
  parking: { x: '35%', y: '80%', cardX: 50, cardY: 280 },
};
```

Adjust `x` and `y` percentages to match where your Spline objects appear visually.
Adjust `cardX` and `cardY` to position the data cards relative to the container.

## 🎭 Customization

### Colors
Edit `tailwind.config.js` to modify the color palette:

```javascript
colors: {
  dark: { ... },      // Background colors
  accent: { ... },    // Accent colors (blue, cyan)
  glass: { ... },     // Glass panel colors
}
```

### Content
Edit the hero content in `Hero.tsx`:
- Eyebrow text
- Headline
- Subtext
- CTA buttons
- Trust badges

### Data Cards
Edit the metrics displayed for each hotspot in `SplineBuilding.tsx`:

```typescript
const HOTSPOT_DATA = {
  roof: {
    title: 'Roof Systems',
    metrics: [
      { label: 'Load', value: '78%', status: 'neutral' },
      // Add more metrics
    ],
  },
  // ...
};
```

## 🔧 Technical Notes

### Spline Fallback
If the Spline URL is invalid or fails to load, a styled fallback placeholder is displayed. The hotspot overlay still works, so users can interact with the data cards even without the 3D model.

### Reduced Motion
The site respects `prefers-reduced-motion` - all animations are disabled for users who prefer reduced motion.

### Performance
- Spline component is lazy-loaded
- Animations use GPU-accelerated transforms
- No heavy images included

## 📦 Dependencies

| Package | Purpose |
|---------|---------|
| react | UI framework |
| framer-motion | Animations |
| @splinetool/react-spline | 3D Spline integration |
| @studio-freight/lenis | Smooth scrolling |
| tailwindcss | Styling |

## 📜 License

MIT
