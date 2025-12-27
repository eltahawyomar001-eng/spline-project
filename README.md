# Falke Facility Management - Corporate Website

A premium corporate website for Falke Facility Management, featuring a 3D interactive building visualization using Spline, built with React, TypeScript, and TailwindCSS.

## Features

- **Dark Mode Luxury Design** - Bloomberg Terminal aesthetic with grid patterns, glass morphism, and soft bloom highlights
- **Interactive 3D Model** - Spline integration with hotspots for roof, windows, and parking areas
- **Smooth Animations** - Framer Motion powered transitions and micro-interactions
- **Responsive Design** - Optimized for mobile, tablet, and desktop
- **Accessible** - Focus styles, reduced motion support, semantic HTML
- **German Language** - Full German content for the German market

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
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

## Project Structure

```
src/
├── components/
│   ├── Hero/
│   │   ├── Hero.tsx           # Main hero section component
│   │   ├── SplineBuilding.tsx # 3D Spline integration
│   │   ├── DataCard.tsx       # Animated data cards
│   │   └── MagneticButton.tsx # Professional button component
│   ├── Navbar.tsx             # Responsive navigation with mobile menu
│   ├── LogoWall.tsx           # Trust indicator logo wall
│   ├── LegalModal.tsx         # Modal for legal content (Impressum, etc.)
│   └── SiteLoader.tsx         # Premium loading screen
├── hooks/
│   ├── useLenis.ts            # Smooth scrolling hook
│   └── useMagnetic.ts         # Magnetic effect hook
├── styles/
│   └── globals.css            # Global styles, utilities, animations
├── App.tsx                    # Main app with all sections
└── main.tsx                   # Entry point
```

## Sections

- **Hero** - Premium landing with 3D building visualization
- **Logo Wall** - Trust indicators with partner/client logos
- **Leistungen** - Services section with card-based layout
- **Ueber Uns** - About section with company statistics
- **Kontakt** - Contact section with CTA
- **Legal Modals** - Impressum, Datenschutz, AGB in accessible modals

## Customization

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
Edit the content in `App.tsx`:
- Services data
- Company statistics
- Contact information
- Legal content

## Technical Notes

### Spline Integration
The 3D building is rendered using Spline. The scene URL can be updated in `SplineBuilding.tsx`.

### Reduced Motion
The site respects `prefers-reduced-motion` - all animations are disabled for users who prefer reduced motion.

### Performance
- Spline component is lazy-loaded
- Animations use GPU-accelerated transforms
- Optimized image assets

## Dependencies

| Package | Purpose |
|---------|---------|
| react | UI framework |
| framer-motion | Animations |
| @splinetool/react-spline | 3D Spline integration |
| tailwindcss | Styling |

## License

MIT
